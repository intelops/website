---
title: "System Call Returns"
date: 2023-09-22
draft: false
# description
description: "Explore in-depth insights into Linux system calls with our comprehensive series of blogs. Delve into the intricacies of syscalls, from their initiation to their interaction with the Linux kernel, uncovering the technical layers and methodologies. Whether you're a seasoned developer or a budding enthusiast, traverse through the realms of system call tables, fast system calls, and more, enhancing your understanding of Linux's core functionalities. Dive deep into the world of system calls, understand varied architectures, and grasp the kernel interactions for optimized software development and enriched knowledge in system-level programming."
type : "learning-center"
weight: 10
---

### Introduction:
In operating systems, a system call creates a gateway between the user space and the kernel space, allowing user programs to request services from the kernel. While the execution of system calls varies across different architectures, a universal aspect is the method of conveying the outcome of a system call through return values. This blog elucidates the significance and handling of the return values of system calls in Linux, focusing on the interplay between positive, negative values and the role of the `errno` variable.

### Return Values of System Calls:
In Linux, system calls conventionally return a `long` data type. The value returned can be broadly categorized into:
1. **Positive or Zero Value:**
   - **Implication:** Denotes successful termination of the system call.
   - **Example:** A call to the `read()` system call returns the number of bytes read, which is non-negative.

2. **Negative Value:**
   - **Implication:** Signifies an error condition.
   - **Error Code:** The value is the negation of the error code intended to be returned to the application program in the `errno` variable.
   - **Example:** A call to the `open()` system call may return -1, implying an error occurred, and `errno` is set accordingly.

### Handling of `errno` Variable:
The `errno` variable holds the error code of the last system call that failed. However, the Linux Kernel neither sets nor uses the `errno` variable directly. Instead, it is the wrapper routines in the C library that undertake the task of setting this variable upon return from a system call.

For instance, if a system call fails, the kernel returns a negative value, which the wrapper routine then converts to -1 and sets the `errno` variable with the absolute value of the returned value. This enables user programs to check `errno` and determine the specific error that occurred.

```c
ssize_t ret = read(fd, buf, count);
if(ret == -1) {
    perror("read");
    // Handles error based on the value in errno
}
```

In this example, if the `read()` system call fails, the wrapper routine sets `errno`, allowing the user program to handle the error appropriately using error handling functions like `perror()` or by manually interpreting the `errno` value.

### Conclusion:
Understanding the return values of system calls is crucial for effective system-level programming in Linux. The interpretation of return values, coupled with the adept handling of the `errno` variable, empowers developers to write robust programs capable of gracefully managing errors and exceptions arising from system call executions.

### Takeaway Points:
- All system calls in Linux return a value of type `long`.
- A positive or zero value typically represents successful execution.
- A negative value represents an error, with the `errno` variable holding the corresponding error code.
- The Linux Kernel does not directly interact with the `errno` variable; instead, wrapper routines set this variable after a return from a system call.

### References:
- Linux Manual Pages
- Advanced Programming in the UNIX Environment by W. Richard Stevens


