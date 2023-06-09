---
title: "Socket Programming Essentials in C"
date: 2023-04-17
draft: false
# description
description: "
Master the essentials of network programming with our comprehensive guide on socket programming in C. Unravel the intricacies of socket communication, gain prerequisite knowledge, and unleash the full potential of network applications. Start your journey to becoming a proficient network programmer today."

weight: 2
---

"Socket Programming Essentials in C" is your ultimate guide to gaining the foundational knowledge necessary for proficient network programming. In this blog, we delve into the intricacies of socket programming, exploring key concepts, techniques, and tools essential for building robust network applications using the C programming language

# sock_common

The struct [sock_common](https://elixir.bootlin.com/linux/v3.12/source/include/net/sock.h) structure represents a common structure used for socket connections in the Linux kernel. Let's go through the fields and understand their meanings:

```C
 struct sock_common {
	/* skc_daddr and skc_rcv_saddr must be grouped on a 8 bytes aligned
	 * address on 64bit arches : cf INET_MATCH() and INET_TW_MATCH()
	 */
	union {
		__addrpair	skc_addrpair;
		struct {
			__be32	skc_daddr;
			__be32	skc_rcv_saddr;
		};
	};
	union  {
		unsigned int	skc_hash;
		__u16		skc_u16hashes[2];
	};
	/* skc_dport && skc_num must be grouped as well */
	union {
		__portpair	skc_portpair;
		struct {
			__be16	skc_dport;
			__u16	skc_num;
		};
	};
	unsigned short		skc_family;
	volatile unsigned char	skc_state;
	unsigned char		skc_reuse:4;
	unsigned char		skc_reuseport:4;
	int			skc_bound_dev_if;
	union {
		struct hlist_node	skc_bind_node;
		struct hlist_nulls_node skc_portaddr_node;
	};
```

**1.skc_addrpair (union)**
It represents the source and destination IP addresses as a pair.
The structure contains two fields: `skc_daddr` and `skc_rcv_saddr`, both of type `__be32` (big-endian 32-bit value).
 * `skc_daddr` represents the `destination IP address.`
 * `skc_rcv_saddr` represents the `source IP address` of the received packet.

**2. skc_hash (union)**

* It is used for hash calculations and contains a single field, `skc_hash`.
* `skc_hash` is an unsigned integer used for storing the calculated hash value.

**3. skc_portpair (union)**

It represents the source and destination port numbers as a pair.

* The structure contains two fields: skc_dport and skc_num.
* `skc_dport` represents the `destination port number.`
* `skc_num` is an unsigned 16-bit value used for various purposes.

**4. skc_family**

* It represents the address family of the socket connection.
* The address family is typically indicated by predefined constants such as `AF_INET` (IPv4) or `AF_INET6` (IPv6).

**5. skc_state**

* It indicates the state of the socket connection.
* The meaning of the different values depends on the specific socket type (e.g, TCP or UDP).

**6. skc_reuse and skc_reuseport**

* These fields are used for socket reuse and port reuse functionality, respectively.
* They store 4-bit values that control the behavior of socket and port reuse.

**7. skc_bound_dev_if**

* It represents the index of the network device to which the socket is bound.
* It identifies the specific network interface associated with the socket.

**8. skc_bind_node and skc_portaddr_node (unions)**

* These unions represent different types of linked list nodes used by the kernel for managing socket bindings and port addresses.
* Each field in the struct sock_common structure plays a specific role in storing and managing socket connection information, including IP addresses, port numbers, address family, socket state, reuse options, and network device binding.

# sockaddr_in and in_addr

The structures struct `sockaddr_in` and struct `in_addr` are used for handling internet addresses in networking applications. Here are the details of these structures:

**1. struct sockaddr_in**

* This structure is defined in <netinet/in.h>.
* It represents an IPv4 socket address.
* The structure has the following fields:
  * `sin_family`: A short integer representing the address family, such as AF_INET.
sin_port: An unsigned short integer representing the port number. It is typically converted to network byte order using the htons() function.
  * `sin_addr:` A structure of type struct in_addr that represents the IP address. It contains the field s_addr, an unsigned long integer representing the IP address in network byte order.
  * `sin_zero:` An array of 8 characters used for padding. It is typically set to all zeros. This field is often ignored.


**2. struct in_addr**

* This structure is defined in <netinet/in.h>.
* It represents an IPv4 address.
* The structure has a single field:
  * `s_addr:` An unsigned long integer representing the IP address in network byte order. 
  * The `inet_aton()` function is commonly used to load an IP address into this field.

These structures are used in networking programming to work with IPv4 addresses and socket addresses. They provide a standardized format for representing IP addresses and port numbers. The struct `sockaddr_in structure` is often used as an argument for socket-related system calls, while struct `in_addr` is used for storing IP addresses independently.

