---
title: "Hooks"
date: 2023-05-05
draft: false
# description
description: "Different kind of hooks."
weight: 2
---

1. **Tracepoint**
    <p>Tracepoints are predefined events in the kernel that allow you to trace the flow of control in the kernel. Tracepoints are inserted at specific points in the kernel code and can be used to record function calls, function returns, and other events.
    </p>

2. **RawTracepoint**
    <p>Raw tracepoints are similar to tracepoints, but they allow you to define your own events in the kernel. Raw tracepoints can be used to trace specific events in the kernel that are not covered by the predefined tracepoints.
    </p>

3. **Kprobe**
    <p>
    Kprobes allow you to trace function calls in the kernel. Kprobes are inserted at specific points in the kernel code and can be used to record arguments, return values, and other information about the function call.
    </p>

4. **kretprobe**
    <p>
    Kretprobes are similar to kprobes, but they are used to trace function returns in the kernel. Kretprobes can be used to record return values and other information about the function return.
    </p>

5. **Uprobe**
    <p>
    Uprobes allow you to trace function calls in user space applications. Uprobes are inserted at specific points in the application code and can be used to record arguments, return values, and other information about the function call.
    </p>

6. **Uretprobe**
    <p>
     Uretprobes are similar to uprobes, but they are used to trace function returns in user space applications. Uretprobes can be used to record return values and other information about the function return.
    </p>

7. **Fentry**
    <p>
    Fentry hooks are used to trace function calls in the kernel. Fentry hooks are inserted at the beginning of a function and can be used to record arguments, return values, and other information about the function call.
    </p>

8. **Cgroups**
    <p>
    Cgroups hooks allow you to attach eBPF programs to control groups (cgroups) in the kernel. Cgroups hooks can be used to monitor the resource usage of processes in the cgroup.
    </p>

9. **XDP**
    <p>
    XDP (eXpress Data Path) hooks are used to process network packets as soon as they arrive in the network stack, before any other processing takes place. XDP hooks can be used to filter, modify, or drop packets, and can be used to implement fast packet processing in the kernel.
    </p>