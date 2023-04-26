---
title: "Prerequisites"
date: 2023-04-13T14:06:36-06:00
draft: false
weight: 1
# description
description: "The purpose of this document is to provide guidance on the necessary prerequisites for working with eBPF."
---


To develop eBPF programs, a Linux-based operating system with a kernel version of at least 3.18 is required. However, to fully utilize all available eBPF features and improvements, it is recommended to use a more recent kernel version. 

To begin developing eBPF programs, you will need the following.

### Software Requirements
- Linux OS - You can have linux as a
    - Primary OS
    - Virtual Machine
    - WSL virtualization
- Clang and LLVM - compilers
- libbpf - ABI's
    > Provides helper functions to interact with kernel information.
    
- bpftool
- perf

### Prerequisities
- Having prior knowledge about Linux commands, system calls, and networking can greatly facilitate the development phase.
- Basic understand of C and GO programming languages is recommended to develop eBPF programs, as eBPF programs are typically written in these languages.
