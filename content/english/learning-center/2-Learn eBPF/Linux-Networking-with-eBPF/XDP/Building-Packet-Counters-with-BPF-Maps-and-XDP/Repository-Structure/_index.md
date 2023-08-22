---
title: "Repository Structure"
date: 2023-04-21T16:14:50-04:00
draft: false
# description
description: "Explaining the xdp function(s) and repo structure."
weight: 12
---

##### xdp_prog_func

The main function in the program is `xdp_prog_func`, which is the actual XDP hook function.
* This function is executed whenever a packet passes through the XDP hook.

* The function first retrieves the data record associated with the XDP_PASS action from the xdp_stats_map using the `bpf_map_lookup_elem()` function.
* If the lookup is successful, the function increments the packet counter associated with the `XDP_PASS` action using an atomic add operation `(lock_xadd())`.


____
____

##### common_kern_user.h

The `common_kern_user.h` header file is used by both the kernel-side BPF programs and userspace programs to share common structures and definitions.

##### struct datarec

In this specific case, the `struct datarec` is defined in `common_kern_user.h` as a data record that will be stored in a BPF map. 
* It has a single field `rx_packets` of type `__u64`, which is an unsigned 64-bit integer that represents the **number of received packets.**

##### XDP_ACTION_MAX

The `XDP_ACTION_MAX` is also defined in `common_kern_user.h` and represents the **maximum number of actions** that can be performed by an XDP (eXpress Data Path) program. 
* It is defined as `XDP_REDIRECT + 1`, where `XDP_REDIRECT` .
* `XDP_REDIRECT` is a predefined constant that represents the maximum value of the enum xdp_action enumeration, which is an enum used to define different actions that can be taken by an XDP (eXpress Data Path) program in the Linux kernel.
```C
enum xdp_action {
	XDP_ABORTED = 0,
	XDP_DROP,
	XDP_PASS,
	XDP_TX,
	XDP_REDIRECT,
};
```
* In the provided code, the value of `XDP_REDIRECT` is used as the **maximum number of entries** in the `xdp_stats_map` BPF array map, which is used to store statistics for each possible XDP action. 
* By setting `XDP_REDIRECT + 1` as the **maximum number of entries**, the `xdp_stats_map` array map will have enough space to store statistics for all possible XDP actions, including `XDP_REDIRECT`.
* Therefore, the value of `XDP_REDIRECT` is used to determine the size of the array map and ensure that it has enough entries to accommodate all possible actions.
