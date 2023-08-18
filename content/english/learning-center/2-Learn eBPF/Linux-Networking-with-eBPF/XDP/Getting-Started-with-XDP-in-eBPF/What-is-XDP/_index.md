---

title: "What is XDP"

date: 2023-04-17

draft: false

weight: 4

# description

description: "Learning eBPF programming for XDP hooks"

---

**eBPF** (extended Berkeley Packet Filter) **XDP** (Express Data Path) programs are a type of eBPF program that are attached to a network interface using the XDP hook. The XDP hook is a low-level hook that allows eBPF programs to be executed early in the packet receive path, before the packet is passed up the network stack.

XDP programs can be used to perform various packet processing tasks, such as filtering, forwarding, modifying, or collecting statistics on network traffic. Because they execute in the kernel, they have access to low-level network metadata and can be used to implement advanced networking features that would otherwise require kernel modifications.

The **XDP hook** (eXpress Data Path) is a hook in the Linux kernel that allows for packet processing at the earliest possible stage in the networking stack. It provides a low-level interface to packet filtering and manipulation, and is often used for high-performance network processing.

XDP programs are written in C and compiled into eBPF bytecode using the LLVM compiler. The eBPF bytecode is then loaded into the kernel using the bpf system call. Once loaded, the XDP program can be attached to a network interface.

XDP programs can be used to implement a variety of network functions, including:

1. **Packet filtering**: XDP programs can be used to selectively drop or allow packets based on various criteria, such as source/destination addresses or protocols. 
1. **Load balancing**: XDP programs can be used to distribute incoming traffic across multiple network interfaces or backend servers.
1.  **Traffic monitoring**: XDP programs can be used to collect statistics or logs on incoming network traffic.