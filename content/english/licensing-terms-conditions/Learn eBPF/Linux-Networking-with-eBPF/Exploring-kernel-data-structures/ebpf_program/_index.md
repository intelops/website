---
title: "Socket Programming For Getting Connection info in eBPF"
date: 2023-04-17
draft: false
# description
description: "A Beginner's Guide to High-Speed Packet Processing"
weight: 2
---

The `get_connection_info` function in the eBPF program is responsible for extracting relevant information from the `struct sock_common` object and populating the corresponding data structures (`struct sockaddr_in` or `struct sockaddr_in6`) based on the `address family (conn->skc_family)` and `event` type (event).

```C
static __always_inline int get_connection_info(struct sock_common *conn, struct sockaddr_in *sockv4, struct sockaddr_in6 *sockv6, sys_context_t *context, args_t *args, u32 event)
{
    switch (conn->skc_family)
    {
    case AF_INET:
        sockv4->sin_family = conn->skc_family;//Sets the address family 
        sockv4->sin_addr.s_addr = conn->skc_daddr;//Copies the destination IP address
        sockv4->sin_port = (event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8);//
        args->args[1] = (unsigned long)sockv4;
        context->event_id = (event == _TCP_CONNECT) ? _TCP_CONNECT : _TCP_ACCEPT;
        break;

    case AF_INET6:
        sockv6->sin6_family = conn->skc_family;
        sockv6->sin6_port = (event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8);
        bpf_probe_read(&sockv6->sin6_addr.in6_u.u6_addr16, sizeof(sockv6->sin6_addr.in6_u.u6_addr16), conn->skc_v6_daddr.in6_u.u6_addr16);
        args->args[1] = (unsigned long)sockv6;
        context->event_id = (event == _TCP_CONNECT) ? _TCP_CONNECT_v6 : _TCP_ACCEPT_v6;
        break;

    default:
        return 1;
    }

    return 0;
}

```

1. Here's a breakdown of the get_connection_info function:

The function takes several parameters: `conn` (a pointer to struct sock_common), `sockv4` (a pointer to struct sockaddr_in), `sockv6` (a pointer to struct sockaddr_in6), `context` (a pointer to sys_context_t), `args` (a pointer to args_t), and `event` (an unsigned 32-bit integer representing the event type).

2. The function begins with a switch statement based on the `skc_family` field of `conn`.

 3.1.   In the case `AF_INET` branch, which corresponds to IPv4 addresses:

```C
sockv4->sin_family = conn->skc_family;
```
 * The `sin_family` field of `sockv4` is set to `conn->skc_family`, indicating the address family as `AF_INET.`

```C
sockv4->sin_addr.s_addr = conn->skc_daddr;
```
 * The `sin_addr.s_addr` field of `sockv4` is assigned the value of `conn->skc_daddr`, which represents the `destination IP address.`

 ```C
 sockv4->sin_port = (event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8);
 ```
The `sin_port` field of `sockv4` is set based on the ternary expression `(event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8).` If event is equal to _TCP_CONNECT, it assigns conn->skc_dport to sockv4->sin_port. Otherwise, it swaps the byte order of `conn->skc_num` and assigns the result as the `port number.` This ensures the correct representation of the port number in network byte order (big endian).
```C
args->args[1] = (unsigned long)sockv4;
```
* The second argument of args is set to the unsigned long value of sockv4, allowing passing the sockv4 structure to user-space.
```C
context->event_id = (event == _TCP_CONNECT) ? _TCP_CONNECT : _TCP_ACCEPT;
```
* The `event_id` field of context is set to `_TCP_CONNECT` if event is equal to `_TCP_CONNECT`, otherwise, it is set to `_TCP_ACCEPT.`

3.2.   In the case AF_INET6 branch, which corresponds to IPv6 addresses:

```C
sockv6->sin6_family = conn->skc_family;
```

* The `sin6_family` field of sockv6 is set to `conn->skc_family`, indicating the `address family` as `AF_INET6.`

```C
sockv6->sin6_port = (event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8);
```
* The `sin6_port` field of `sockv6` is set in a similar manner as in the IPv4 case, based on the ternary expression `(event == _TCP_CONNECT) ? conn->skc_dport : (conn->skc_num >> 8) | (conn->skc_num << 8).`

```C
bpf_probe_read(&sockv6->sin6_addr.in6_u.u6_addr16, sizeof(sockv6->sin6_addr.in6_u.u6_addr16), conn->skc_v6_daddr.in6_u.u6_addr16);
```

* The IPv6 address is read from `conn->skc_v6_daddr.in6_u.u6_addr16` using bpf_probe_read and stored in the `sin6_addr.in6_u.u6_addr16` field of `sockv6`. This ensures that the IPv6 address is safely accessed and copied to user-space.

```C
args->args[1] = (unsigned long)sockv6;
```
* The second argument of `args` is set to the `unsigned long value of sockv6`, allowing passing the sockv6 structure to user-space.

```C
context->event_id = (event == _TCP_CONNECT) ? _TCP_CONNECT_v6 : _TCP_ACCEPT_v6;
```
* The `event_id` field of context is set to `_TCP_CONNECT_v6` if event is equal to `_TCP_CONNECT`, otherwise, it is set to `_TCP_ACCEPT_v6`.

---

