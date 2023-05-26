---
title: "gRPC-Web-Streaming"
date: 2023-04-29
draft: false
# description
description: "Get-to-know-about grpc"
weight: 2
---

gRPC Web Streaming is a way of using gRPC communication over HTTP/1.1 or HTTP/2, rather than using gRPC over a binary protocol like TCP. This enables gRPC to be used in web browsers, which do not support binary protocols. However, since HTTP/1.1 and HTTP/2 do not support bidirectional streaming, gRPC Web Streaming does not support bidirectional streaming, which is a feature of gRPC. As a result, gRPC Web Streaming only supports Server-Side Streaming and Client Streaming, but not Bidirectional Streaming.

gRPC Web Streaming supports two types of streaming:

- Server-Side Streaming: In Server-Side Streaming, the client sends a single request message to the server, and the server responds with a stream of messages, similar to traditional Server-Side Streaming in gRPC.

-  Client-Side Streaming: In Client-Side Streaming, the client sends a stream of request messages to the server, and the server responds with a single response message, similar to traditional Client-Side Streaming in gRPC.


gRPC Web Streaming provides many benifits, including improved performance, reduced network latency, and increased flexibility. By using HTTP/1.1 pr HTTP/2, gRPC Web Streaming enables gRPC to be used in web browsers and web applications. This allows client-side web applications to communicate with server side applications using gRPC, providing a consistent and efiicient way of communication across the entire application stack.

Additionally , gRPC Web Streaming reduces the amount of network traffic and improves application performance by enabling the client and server to exchange only the necessary data, rather than sending large data sets all at once. Thus is especially important in web applications where network latency can have a significant impact on application performance.

