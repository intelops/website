---
title: "Generic System Call Table"
date: 2023-09-22
draft: false
# description
description: "Explore in-depth insights into Linux system calls with our comprehensive series of blogs. Delve into the intricacies of syscalls, from their initiation to their interaction with the Linux kernel, uncovering the technical layers and methodologies. Whether you're a seasoned developer or a budding enthusiast, traverse through the realms of system call tables, fast system calls, and more, enhancing your understanding of Linux's core functionalities. Dive deep into the world of system calls, understand varied architectures, and grasp the kernel interactions for optimized software development and enriched knowledge in system-level programming."
type : "learning-center"
weight: 13
---
### Introduction:
In the Linux Kernel, architecture-specific syscall tables are inherent in certain architectures like x86. However, numerous architectures share a generic syscall table to maintain a uniform interface. This post provides a detailed technical view on the creation and usage of the generic system call table, focusing on how new system calls can be added for utilisation across multiple architectures.

### Architecture-Specific and Generic Syscall Tables:
Some architectures, notably x86, possess their own unique architecture-specific syscall tables. In contrast, a variety of other architectures coalesce around a generic syscall table to establish commonality and shareability. The kernel developers need to update this generic syscall table when introducing new system calls, ensuring that they are accessible and usable across different architectures.

### Adding a New System Call:
To append a new system call to the generic list, developers need to make an entry in the `include/uapi/asm-generic/unistd.h` file. Here's an example of adding a hypothetical `sys_hello` system call:
```c
#define __NR_hello 434
__SYSCALL(__NR_hello, sys_hello)
```
`__NR_hello` is the system call number, and `sys_hello` is the handler for this system call in the kernel space.

### Updating the System Call Count:
Post the addition of a new system call, it is paramount to update the `__NR_syscalls` count to reflect the incorporation of the additional system call.
```c
#define __NR_syscalls 435
```
This adjustment ensures that the kernel is aware of the correct number of available system calls.

### Conclusion:
The Linux Kernel employs a generic system call table to facilitate multiple architectures in utilizing a shared set of system calls. Adding a new system call to this table and updating the system call count are essential steps for developers looking to extend the kernel's capabilities and maintain compatibility across various architectures. This approach ensures that the added functionalities are readily available and maintainable across diverse architectural landscapes.

### Key Takeaways:
- Certain architectures like x86 have architecture-specific syscall tables, while many share a generic syscall table.
- To make a system call available across multiple architectures, developers add it to the generic list located in `include/uapi/asm-generic/unistd.h`.
- Following the addition of a new system call, updating the `__NR_syscalls` count is critical to maintaining the correct number of available system calls in the kernel.

### References:
- Linux Kernel Source: include/uapi/asm-generic/unistd.h
- Linux Kernel Documentation
