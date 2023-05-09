---
title: "Interacting With Maps"
date: 2023-04-17
draft: false
# description
description: "Explaining the interaction with eBPF Maps."
type : "learning-center"
weight: 10

---

Interacting with eBPF maps happens through  **lookup/update/delete** primitives.

## Userspace

The userspace API map helpers for eBPF are defined in `tools/lib/bpf/bpf.h` and include the following functions:

```C

/* Userspace helpers */
int bpf_map_lookup_elem(int fd, void *key, void *value);
int bpf_map_update_elem(int fd, void *key, void *value, __u64 flags);
int bpf_map_delete_elem(int fd, void *key);
/* Only userspace: */
int bpf_map_get_next_key(int fd, void *key, void *next_key);
```

 To interact with an eBPF map from userspace, you use the [bpf](https://man7.org/linux/man-pages/man2/bpf.2.html) syscall and a `file descriptor (fd)`. The `fd` serves as the **map handle**.On success, these functions return zero, while on failure they return -1 and set errno.
-  The wrappers for the bpf syscall are implemented in [tools/lib/bpf/bpf.c](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/tools/lib/bpf/bpf.c) and call functions in [kernel/bpf/syscall.c](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/kernel/bpf/syscall.c), such as map_lookup_elem.</p>

- It's worth noting that `void *key` and `void *value` are passed as void pointers. This is because of the memory separation between kernel and userspace, and it involves making a copy of the value. Kernel primitives like `copy_from_user()` and `copy_to_user()` are used for this purpose, as seen in [map_lookup_elem](https://elixir.bootlin.com/linux/latest/source/kernel/bpf/syscall.c#L1327), which also allocates and deallocates memory using `kmalloc+kfree` for a short period.
- From userspace, there is no direct function call to increment or decrement the value in-place. 
Instead, the bpf_map_update_elem() call will overwrite the existing value with a copy of the value supplied. 
The overwrite operation depends on the map type and may happen atomically using locking mechanisms specific to the map type.


## Kernel-side eBPF program
The eBPF program helpers for kernel-side interaction with maps are defined in the [samples/bpf/bpf_helpers.h](https://elixir.free-electrons.com/linux/v4.2.8/source/samples/bpf/bpf_helpers.h#L11) header file and are implemented in the [kernel/bpf/helpers.c](https://elixir.free-electrons.com/linux/v4.2.8/source/kernel/bpf/helpers.c#L29) file via macros.

```C
/* eBPF program helpers */
void *bpf_map_lookup_elem(void *map, void *key);
int bpf_map_update_elem(void *map, void *key, void *value, unsigned long long flags);
int bpf_map_delete_elem(void *map, void *key);
```


The `bpf_map_lookup_elem()` function is a **kernel-side helper function** that allows eBPF programs to directly access the value stored in a map by providing a pointer to the map and a pointer to the key.
- Unlike the userspace API, which provides a copy of the value, the kernel-side API provides a **direct pointer** to the memory element inside the kernel where the value is stored.
- This allows eBPF programs to perform **atomic** operations, such as incrementing or decrementing the value "in-place", using appropriate compiler primitives like `__sync_fetch_and_add()`, which are understood by LLVM (Low-Level Virtual Machine) when generating eBPF instructions.
-This direct access to the value memory element in the kernel provides more efficient and optimized access to map data structures for eBPF programs running in the kernel. So, the `bpf_map_lookup_elem()` function in the kernel-side eBPF API enables efficient and direct access to map values from eBPF programs running in the kernel.
