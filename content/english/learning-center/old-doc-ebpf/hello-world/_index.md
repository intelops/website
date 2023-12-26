---
title: "Hello World!"
date: 2023-04-13T14:06:36-06:00
draft: false
weight: 3
# description
description: "This document provides guidance on how to write eBPF programs and their execution flow."
---

{{< notice "info" >}}
Here is the github link to the code. [hello_world-demo](https://github.com/c-ravela/hello_world-demo)
{{< /notice >}}

Our ebpf program is depended on few header files. Run the following commands to move them to your current project location.

>```bash
>bpftool btf dump file /sys/kernel/btf/vmlinux format c > headers/vmlinux.h
>```
>
> This header file provides defintions for data types, data structures and other kernel related information. In other terms it is called as dumping BTF(BPF Type Format) of the kernel

>```bash
>cp /usr/include/bpf/bpf_helpers.h headers/bpf_helpers.h && 
>cp /usr/include/bpf/bpf_helper_defs.h headers/bpf_helper_defs.h
>```
>
> This header file provides defintions for linux ABI's and also provides definitions for the different types of helper functions that are available.

### User space and kernel space part

>```c
>//go:build ignore
>
>#include "vmlinux.h"
>#include "bpf_helpers.h"
>
>SEC("tp/syscalls/sys_enter_execve")
>void execve(){
>    bpf_printk("Hello World! I am triggered by enter point of execve.");
>};
>
>char _license[] SEC("license") = "Dual MIT/GPL";
>```
>
>This is our kernel space program. This program will get triggered every time execve syscall was invoked.
>
>```go
>package main
>
>//go:generate go run github.com/cilium/ebpf/cmd/bpf2go -cc clang -cflags $BPF_CFLAGS bpf index.bpf.c -- -I./headers
>
>import (
> "fmt"
> 
> "github.com/cilium/ebpf/link"
>)
>
>func main() {
> ebpfObj := bpfObjects{}
> err := loadBpfObjects(&ebpfObj, nil)
> if err != nil {
>  panic(err)
> }
> defer ebpfObj.Close()
>
> hook, err := link.Tracepoint("syscalls", "sys_enter_execve", ebpfObj.Execve, nil)
> if err != nil {
>  panic(err)
> }
> defer hook.Close()
>
> fmt.Println("Waiting for event to trigger!")
> 
> for {
> }
>}
>```
>
>This our user space program. This program loads and attaches the ebpf program to the hook and wait for it till we terminate the program.

### Compilation
>
> To compile this program we are the following the way defined by cilium/ebpf.
>
> ```go
> //go:generate go run github.com/cilium/ebpf/cmd/bpf2go -cc clang -cflags $BPF_CFLAGS bpf index.bpf.c -- -I./headers
> ```
>
> This line is responsible for compling the kernel space code. It will also generate big endian and little endian version based go files which provides the definition for `bpfObjects` and `loadBpfObjects`.
>
> ```bash
> go generate
> ```
>
> This triggers the above line it then complies the kernel space code and generates the defintion for ebpf objects.
>
>
> {{< image src="generate.png" webp="false" alt="go generate" position="center">}}
>
> ```bash
> go build -o demo
> ```
>
> This builds the code and generates the executable with name `demo`.
> {{< image src="build.png" webp="false" alt="go build" position="center">}}
>
### Execution
>
> ```bash
> sudo ./demo
> ```
>
> {{< image src="run.png" webp="false" alt="run" position="center">}}
>

### Output
>
> In order to see the print statements we need to move to `/sys/kernel/debug/tracing` directory. Run the following command.
>
> ```bash
>  cat trace_pipe | grep -i hello
> ```
>
> {{< image src="hello.png" webp="false" alt="output" position="center">}}
>
