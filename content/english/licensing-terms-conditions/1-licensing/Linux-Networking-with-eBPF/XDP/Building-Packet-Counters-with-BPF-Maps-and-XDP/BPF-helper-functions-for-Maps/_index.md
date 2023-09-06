---
title: "BPF Helper Functions for Maps"
date: 2023-04-17
draft: false
# description
description: "Explaining BPF Helper Functions for Maps with examples."
weight: 11
---



[bpf_map_lookup_elem](https://elixir.bootlin.com/linux/latest/source/tools/lib/bpf/bpf.c#L398) is a function in the Linux kernel's BPF subsystem that is used to look up an element in a BPF map. 
 BPF maps are key-value data structures that can be used by BPF programs running in the Linux kernel to store and retrieve data.

The `bpf_map_lookup_elem` function takes two arguments:

1. `map`: A pointer to the BPF map to perform the lookup on.
1. `key`: A pointer to the key used to look up the element in the map.

The function **returns a pointer** to the value associated with the given key in the BPF map if the key is found, or `NULL` if the key is not found.

The function signature for `bpf_map_lookup_elem`:

```C
void *bpf_map_lookup_elem(void *map, const void *key);
```
In our program, `bpf_map_lookup_elem()` the helper function provided by the eBPF API that is used to look up an element in the BPF map. It takes two arguments:

```C
rec = bpf_map_lookup_elem(&xdp_stats_map, &key);
```
1.  `&xdp_stats_map`: A **pointer** to the BPF map (struct bpf_map_def) that we want to perform the lookup on. In this case, it refers to the `xdp_stats_map` BPF map that was defined earlier in the code.
1.  `&key`: A **pointer** to the `key` that you want to look up in the map. The key is of `type __u32` and its value is determined by the variable key in the code, which is set to `XDP_PASS`.

The `bpf_map_lookup_elem()` function **returns a pointer** to the value associated with the given key in the BPF map `(&xdp_stats_map)`. 
<p>In other words, it allows you to retrieve the value stored in the BPF map corresponding to the key <code>XDP_PASS</code> and store it in the <code>rec</code> variable, which is of <code>type struct datarec</code> and represents the data record stored in the map.</p>
<p>Note that if the lookup fails (i.e., the key does not exist in the map), the function may return <code>NULL</code>, and it's important to perform a <b>null pointer</b> check, as shown in the code, to ensure the safety and correctness of the eBPF program.</p>

```C
	if (!rec)
		return XDP_ABORTED;
```

<p> Code  <code>if (!rec)</code> is checking if the value of the pointer <code>rec</code> is <code>NULL</code> or not.</p> 
<p> If <code>rec</code> is <code>NULL</code>, it means that the lookup operation using <code>bpf_map_lookup_elem()</code> function failed, and the corresponding entry for the given <code>key</code> was not found in the BPF map <code>xdp_stats_map</code>. </p>
<p> The function returns <code>XDP_ABORTED</code> as the return value.</p>

The program defines a BPF hash map named <b>xdp_stats_map</b> to store the statistics. The map is an array with a size equal to <b>XDP_ACTION_MAX</b> (max entries), where each entry represents a different XDP action.

```C
struct bpf_map_def SEC("maps") xdp_stats_map = {
	.type        = BPF_MAP_TYPE_ARRAY,
	.key_size    = sizeof(__u32),
	.value_size  = sizeof(struct datarec),
	.max_entries = XDP_ACTION_MAX,
};
```
The XDP actions are enumerated in **enum xdp_action**,which is defined in `include/uapi/linux/bpf.h` and their values are XDP_ABORTED, XDP_DROP, XDP_PASS, XDP_TX, and XDP_REDIRECT. For each XDP action, a corresponding entry is created in the <code>xdp_stats_map</code> to store the number of packets that are associated with that action.

```C
enum xdp_action {
	XDP_ABORTED = 0,
	XDP_DROP,
	XDP_PASS,
	XDP_TX,
	XDP_REDIRECT,
};
```

___
___
##### Safely modifying shared data with _sync_fetch_and_add

```C
#ifndef lock_xadd
#define lock_xadd(ptr, val)	((void) __sync_fetch_and_add(ptr, val))
#endif
```

We define a macro `lock_xadd` that wraps the `__sync_fetch_and_add` function using the GCC built-in function `__sync_fetch_and_add` for performing an atomic fetch-and-add operation on a given memory location.
 <p>The macro takes two arguments: a pointer ptr to the target memory location, and a value val to be added to the current value of the memory location.</p>
<p><code>__sync_fetch_and_add</code> is a <b>built-in</b> GCC (GNU Compiler Collection) function that provides an atomic operation for fetching the current value of a memory location, adding a value to it, and storing the result back into the same memory location in a single, uninterruptible step. </p>
 <p>This function is typically used in multi-threaded or concurrent programming to safely update shared variables without race conditions or other synchronization issues.</p>
<p> The macro definition simply wraps the <code>__sync_fetch_and_add</code> function call with an additional <code>(void)</code> cast to suppress any potential warnings about unused results, as the function returns the previous value of the memory location before the addition, which might not be used in some cases.</p>

##### lock_xadd

```C
	lock_xadd(&rec->rx_packets, 1);
```
The `lock_xadd()` function is used to **atomically increment** the value of `rec->rx_packets` by `1`.
<p> This operation ensures that the <b>increment</b> is performed <b>atomically</b>, meaning that it is thread-safe and can be safely used in a multi-CPU environment where multiple threads may be accessing the same memory location simultaneously.</p>
<p> The purpose of this operation is to <b>increment</b> the packet count in the <code>rx_packets</code> field of the <code>struct datarec</code> data record, which is stored in the <code>xdp_stats_map</code> BPF map.</p>
This allows the eBPF program to keep <b>track of the number of packets</b> that pass through the <b>XDP hook</b> </p>
<p> Once the packet count is updated, the eBPF program may return <code>XDP_PASS</code> to indicate that the packet should be allowed to continue processing by the kernel networking stack. </p>
