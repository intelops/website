---
title: "64-bit Fast System Calls"
date: 2023-09-22
draft: false
# description
description: "Explore in-depth insights into Linux system calls with our comprehensive series of blogs. Delve into the intricacies of syscalls, from their initiation to their interaction with the Linux kernel, uncovering the technical layers and methodologies. Whether you're a seasoned developer or a budding enthusiast, traverse through the realms of system call tables, fast system calls, and more, enhancing your understanding of Linux's core functionalities. Dive deep into the world of system calls, understand varied architectures, and grasp the kernel interactions for optimized software development and enriched knowledge in system-level programming."
type : "learning-center"
weight: 8
---

### Introduction:
In the realms of operating systems, the expedition from user mode to kernel mode is marked by the execution of system calls. For 64-bit Linux systems, this transition is streamlined by the `SYSCALL` and `SYSRET` instructions, integral components of the Fast System Call mechanism, optimizing the call and return transitions between privilege levels. This article explores the technical depths of these instructions, their implementation, and their roles in the execution of system calls.

### Fast System Calls in 64-bit Systems:
#### - **SYSCALL:**
   - **Functionality:** Invokes an OS system-call handler at privilege level 0 (CPL 0).
   - **Transition:** Facilitates transitions from CPL 3 to CPL 0.
   - **Operation:** Loads RIP from the IA32_LSTAR MSR, saving the address of the subsequent instruction into RCX.

#### - **SYSRET:**
   - **Functionality:** Complements `SYSCALL` by ensuring the efficient return to user mode after the system call execution.
   - **Transition:** Facilitates transitions from CPL 0 to CPL 3.

### Technical Details:
To process incoming system calls, the kernel registers the address of the code to be executed when a system call occurs by writing its address to the IA32_LSTAR MSR. This registration is done in the `syscall_init()` function in `arch/x86/kernel/cpu/common.c`.

Here’s a glimpse of the implementation:
```c
void syscall_init(void)
{
    wrmsrl(MSR_LSTAR, (unsigned long)entry_SYSCALL_64);
}
```
This function writes the address of `entry_SYSCALL_64` to the IA32_LSTAR MSR, paving the way for the execution of `SYSCALL`.

### Execution Flow:
When `SYSCALL` is executed, control is handed over to `do_syscall_64`, which activates the interrupt and checks if there are any entry works pending before executing the system call.

```c
__visible void do_syscall_64(unsigned long nr, struct pt_regs *regs)
{
    enter_from_user_mode();
    local_irq_enable();
    struct thread_info *ti = current_thread_info();

    if (READ_ONCE(ti->flags) & _TIF_WORK_SYSCALL_ENTRY)
        nr = syscall_trace_enter(regs);

    nr &= __SYSCALL_MASK;
    if (likely(nr < NR_syscalls)) {
        nr = array_index_nospec(nr, NR_syscalls);
        regs->ax = sys_call_table[nr](regs);
    }
    syscall_return_slowpath(regs);
}
```
Here, `do_syscall_64` manages the execution and return paths of the system call, dealing with different scenarios and ensuring the correct system call is executed from the system call table.

### Conclusion:
The intricacies of 64-bit fast system calls, manifested through `SYSCALL` and `SYSRET` instructions, demonstrate the meticulous engineering behind Linux's operation. By illuminating the kernel’s subtle interplays and the sophisticated execution flow of system calls, one can appreciate the unparalleled efficiency and precision inherent to the Linux operating system in handling transitions between different privilege levels.


