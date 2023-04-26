---

title: "Kernel Space eBPF program for XDP hook"

date: 2023-04-17

draft: false

weight: 5
# description

description: "Writing yur first eBPF program for an XDP hook"

---


```Go
//go:build ignore
```
This is a build constraint for Go. It specifies that this file should be ignored by the Go build system.

```C
#include "bpf_endian.h"
#include "common.h"
```
 __Header__ files that provide some utility functions and macros that are used in the program  defined in the Cilium eBPF library.

1. bpf_endian.h: This header file defines macros for converting between host and network byte order. It is used to ensure that the program works correctly on different endianness architectures (either big-endian or little-endian).
1. common.h: This header file contains common definitions and macros used by the program, such as the Ethernet protocol (ETH_P_IP),XDP pass/fail return codes (XDP_PASS and XDP_DROP), including macro definitions for BPF_MAP_TYPE_LRU_HASH

```C
char __license[] SEC("license") = "Dual MIT/GPL";
```

This specifies the __license__ for the program.

 This line declares a character array named `__license` and assigns it a value of `"Dual MIT/GPL"`.
 The `SEC("license")` attribute attached to the declaration is used by the eBPF verifier to place this data into a specific section of the eBPF object file. In this case, the license section.
	
Note : In Linux kernel programming and eBPF programming, the **__license** variable is used to specify the license under which the code is distributed. The Linux kernel is distributed under the GNU GPL license, but some parts of it may be licensed under other open source licenses, such as the MIT license. This line is used to indicate that the eBPF code in question is dual-licensed under both the MIT and GPL licenses.

```C
#define MAX_MAP_ENTRIES 16
```
This defines the maximum number of entries that the LRU hash map can hold.


```C
/* Define an LRU hash map for storing packet count by source IPv4 address */
struct {
	__uint(type, BPF_MAP_TYPE_LRU_HASH);
	__uint(max_entries, MAX_MAP_ENTRIES);
	__type(key, __u32);   // source IPv4 address
	__type(value, __u32); // packet count
} xdp_stats_map SEC(".maps");

```
This is defining an LRU hash map data structure called xdp_stats_map that will be stored in the maps section of the compiled BPF program.
```
The following configuration attributes are needed when creating the eBPF map:

union bpf_attr {
 struct { /* anonymous struct used by BPF_MAP_CREATE command */
        __u32   map_type;       /* one of enum bpf_map_type */
        __u32   key_size;       /* size of key in bytes */
        __u32   value_size;     /* size of value in bytes */
        __u32   max_entries;    /* max number of entries in a map */
        __u32   map_flags;      /* prealloc or not */
 };
}
```
 `struct { ... } xdp_stats_map` - Defines a structure named xdp_stats_map.
1. `__uint(type, BPF_MAP_TYPE_LRU_HASH);` - Sets the type field of the structure to BPF_MAP_TYPE_LRU_HASH, indicating that this is a hash map with least-recently-used eviction policy.
1.  `__uint(max_entries, MAX_MAP_ENTRIES);` - Sets the max_entries field of the structure to the maximum number of entries that the hash map can hold. MAX_MAP_ENTRIES is a preprocessor macro that is defined elsewhere in the program.
1.  `__type(key, __u32);` - Sets the key field of the structure to the data type used as the key in the hash map. In this case, it's a 32-bit unsigned integer (__u32) representing the source IPv4 address.
1.  `__type(value, __u32);` - Sets the value field of the structure to the data type used as the value in the hash map. In this case, it's also a 32-bit unsigned integer (__u32) representing the packet count.
1.  `SEC(".maps")` - Sets the section in which the xdp_stats_map structure will be stored when the BPF program is compiled. In this case, it will be stored in the maps section, which is reserved for BPF maps.

[Learn more about different types of eBPF maps and how to create them](https://prototype-kernel.readthedocs.io/en/latest/bpf/ebpf_maps_types.html#types-of-ebpf-maps)

```C
SEC("xdp")
```
This is a C macro that tells the eBPF compiler that this function should be compiled as an __XDP program__. xdp is the name of the section where this program will be loaded.

```C
int xdp_prog_func(struct xdp_md *ctx) {
```
This is the definition of the XDP program. It takes a single argument __struct xdp_md *ctx__ which contains metadata about the received packet.
The parameter struct xdp_md *ctx is a pointer to a metadata structure that contains information about the incoming packet that the XDP program is processing.
This metadata structure, xdp_md, is defined in the [/include/uapi/linux/bpf.h](https://elixir.bootlin.com/linux/latest/source/include/uapi/linux/bpf.h) header file and contains various fields, such as pointers to the start and end of the packet data, the incoming interface index, and the packet's hardware headers.

```C
struct xdp_md {
	__u32 data;
	__u32 data_end;
	__u32 data_meta;
	/* Below access go through struct xdp_rxq_info */
	__u32 ingress_ifindex; /* rxq->dev->ifindex */
	__u32 rx_queue_index;  /* rxq->queue_index  */

	__u32 egress_ifindex;  /* txq->dev->ifindex */
};
```
The XDP program is a program that runs in the kernel space of the operating system and is executed when an incoming packet is received by the network interface card. The XDP program processes the packet, and then either forwards it to the next network stack layer, or drops it.

```C
	__u32 ip;
	if (!parse_ip_src_addr(ctx, &ip)) {
		// Not an IPv4 packet, so don't count it.
		goto done;
	}
```
This block of code attempts to parse the source IP address from the received packet using the parse_ip_src_addr function. If the function returns 0, it means that the packet is not an IPv4 packet, so the program skips to the end of the function using a goto statement.

```
__u32 *pkt_count = bpf_map_lookup_elem(&xdp_stats_map, &ip);
if (!pkt_count) {
	// No entry in the map for this IP address yet, so set the initial value to 1.
	__u32 init_pkt_count = 1;
	bpf_map_update_elem(&xdp_stats_map, &ip, &init_pkt_count, BPF_ANY);
} else {
	// Entry already exists for this IP address,
	// so increment it atomically using an LLVM built-in.
	__sync_fetch_and_add(pkt_count, 1);
}
```
1. If the packet is an IPv4 packet, this block of code uses the `bpf_map_lookup_elem` function to look up the packet count for the source IP address in the `xdp_stats_map` hash map. 
1. If there is no entry in the map for the IP address, the program inserts a new entry with an initial packet count of 1 using the `bpf_map_update_elem` function.
1. If there is already an entry in the map for the IP address, the program increments the packet count atomically using the `__sync_fetch_and_add` built-in function.

```C
done:
	// Try changing this to XDP_DROP and see what happens!
	return XDP_PASS;
}
```
 This block of code is the end of the XDP program. 
If the packet is not an IPv4 packet, the program jumps to the done label and returns `XDP_PASS`, indicating that the packet should be passed through to the next program in the chain. 
If the packet is an IPv4 packet, the program increments the packet count and also returns `XDP_PASS`.
By default, `XDP_PASS` indicates that the packet should be passed through to the next program in the chain, it can be changed to `XDP_DROP` to drop the packet.