---
title: "BPF Maps"
date: 2023-04-21
draft: false
# description
description: "Explaining BPF Maps."
type : "learning-center"
weight: 9
---

eBPF maps are a generic data structure for storage of different data types.They allow sharing of data between eBPF kernel programs, and also between kernel and user-space applications.
  Using eBPF maps is a method to keep state between invocations of the eBPF program, and allows sharing data between eBPF kernel programs, and also between kernel and user-space applications.


  Each map type has the following attributes:


       *  type

       *  maximum number of elements

       *  key size in bytes

       *  value size in bytes

It is defined in [tools/lib/bpf/libbpf.c](https://elixir.bootlin.com/linux/latest/source/tools/lib/bpf/libbpf.c#L479),as a struct

```C
struct bpf_map_def {
	unsigned int type;
	unsigned int key_size;
	unsigned int value_size;
	unsigned int max_entries;
	unsigned int map_flags;
};
```
# Map type 
Currently, the following values are supported for `type` defined at `/usr/include/linux/bpf.h`

```C
enum bpf_map_type {
	BPF_MAP_TYPE_UNSPEC,
	BPF_MAP_TYPE_HASH,
	BPF_MAP_TYPE_ARRAY,
	BPF_MAP_TYPE_PROG_ARRAY,
	BPF_MAP_TYPE_PERF_EVENT_ARRAY,
	BPF_MAP_TYPE_PERCPU_HASH,
	BPF_MAP_TYPE_PERCPU_ARRAY,
	BPF_MAP_TYPE_STACK_TRACE,
	BPF_MAP_TYPE_CGROUP_ARRAY,
	BPF_MAP_TYPE_LRU_HASH,
	BPF_MAP_TYPE_LRU_PERCPU_HASH,
	BPF_MAP_TYPE_LPM_TRIE,
	BPF_MAP_TYPE_ARRAY_OF_MAPS,
	BPF_MAP_TYPE_HASH_OF_MAPS,
	BPF_MAP_TYPE_DEVMAP,
	BPF_MAP_TYPE_SOCKMAP,
	BPF_MAP_TYPE_CPUMAP,
	BPF_MAP_TYPE_XSKMAP,
	BPF_MAP_TYPE_SOCKHASH,
	BPF_MAP_TYPE_CGROUP_STORAGE_DEPRECATED,
	/* BPF_MAP_TYPE_CGROUP_STORAGE is available to bpf programs attaching
	 * to a cgroup. The newer BPF_MAP_TYPE_CGRP_STORAGE is available to
	 * both cgroup-attached and other progs and supports all functionality
	 * provided by BPF_MAP_TYPE_CGROUP_STORAGE. So mark
	 * BPF_MAP_TYPE_CGROUP_STORAGE deprecated.
	 */
	BPF_MAP_TYPE_CGROUP_STORAGE = BPF_MAP_TYPE_CGROUP_STORAGE_DEPRECATED,
	BPF_MAP_TYPE_REUSEPORT_SOCKARRAY,
	BPF_MAP_TYPE_PERCPU_CGROUP_STORAGE,
	BPF_MAP_TYPE_QUEUE,
	BPF_MAP_TYPE_STACK,
	BPF_MAP_TYPE_SK_STORAGE,
	BPF_MAP_TYPE_DEVMAP_HASH,
	BPF_MAP_TYPE_STRUCT_OPS,
	BPF_MAP_TYPE_RINGBUF,
	BPF_MAP_TYPE_INODE_STORAGE,
	BPF_MAP_TYPE_TASK_STORAGE,
	BPF_MAP_TYPE_BLOOM_FILTER,
	BPF_MAP_TYPE_USER_RINGBUF,
	BPF_MAP_TYPE_CGRP_STORAGE,
};
```
map_type selects one of the available map implementations in the kernel.For all map types, eBPF programs access maps with the same `bpf_map_lookup_elem()` and `bpf_map_update_elem()` helper functions.

# Key Size
This field specifies the size of the key in the map, in bytes.
1. The key is used to index the values stored in the map.
1.  The key can be a scalar type or a structure, but it must fit within the specified size.
1. The `sizeof(__u32)` specifies the size of the map keys. In this case, the keys are 32-bit unsigned integers.

# Value Size

This field specifies the size of the value in the map, in bytes.
1.  The value is the data that is stored in the map at each key.
1.  Like the key, the value can be a scalar type or a structure, but it must fit within the specified size.
1.  The `sizeof(struct datarec)` specifies the size of the map values. 
1. In this case, the values are structs of type struct datarec.

# Max Entries

 This field specifies the maximum number of entries that the map can hold.
 1.  This is the maximum number of key-value pairs that can be stored in the map.
 1. This number is set at map creation time and cannot be changed later.
 1.  In this case, the maximum number of entries is `XDP_ACTION_MAX`, which is a constant defined

# Map flags

 This field specifies additional flags that control the behavior of the map.
   For example, the BPF_F_NO_PREALLOC flag can be used to indicate that the kernel shouldgit  not pre-allocate memory for the map, which can save memory in certain scenarios.
