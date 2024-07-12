---
date: 2023-04-27
title: What Is gRPC?
description: A dive into the whats and whys of gRPC.
image: images/blog/what-is-grpc/work_chat.svg

cover_image: false
cover_image_src:
cover_image_height: ""
cover_image_width: ""

author: hannan-khan
series: gRPC Series
categories:
  - gRPC
  - Services

tags:
  - gRPC
  - Services

# image color code in undraw.co #FB7E44
feedback: false
draft: false
---

{{< image src="images/blog/what-is-grpc/work_chat.svg" alt="alter-text" height="" width="200px"
class="img-fluid" caption="" webp="false" position="float-left" >}}

Most times, when we want to bridge the communication between two services, developers opt to use REST API. This however,
presents a problem when trying to communicate between two services using different networks or languages. This is where
gRPC comes in.  
gRPC is a high performance Remote Procedure Call (RPC) framework. gRPC offers many advantages to REST. Both are API
standards, allowing for communication between systems. However, they differ in the message formats, and error codes they
use. In order to understand the benefits/advancements of gRPC, let's take a look at remote procedure calls.
________________

# Remote Procedure Calls - What Are They?

A Remote Procedure Call (RPC) is when one computer causes a process/subroutine to run on another computer. Usually this
call is written as if it
were to occur on the first computer. Remote calls are usually slower and less reliable than local calls and are treated
as a form of inter-process communication, the only difference being that the processes have different address-spaces (
they
each have access to physically separate memory addresses).  
RPCs are a request-response protocol. They follow the standard of clients requesting access to resources, and the server
side responding to those requests. RPC calls can be blocking (client stops its program until the server response is
received), or asynchronous (client continues execution, and processes the server response in the background when it
arrives).

## Typical RPC Flow

Below is how RPC events typically take place between a client and a server:

1. The client calls the client stub (a client-side object that is responsible for communication).
2. The client stub takes the parameters from the client (received in the above call) and creates a message with them in
   it.
3. It then calls upon the system to send the message.
4. The client OS handles the sending of the message from the client to the server machine.
5. The server OS receives the message, and unpacks the parameters.
6. The server stub calls a server procedure to process the remote call, and sends a response. The response is sent in
   reverse steps.

Since this process is very standard, many RPC systems have been created to allow for inter-platform RPCs. These
typically use interface description language, which is used to generate code on each client and server platforms.

# So What Is gRPC?

gRPC is an open source RPC framework created by Google. It is based on "Stubby", the proprietary RPC framework
previously developed and used by Google.
gRPC allows the definition of methods, along with their parameters and return types. Clients using gRPC can access these
methods using their stub, and treat them as a local object. Servers using gRPC implement these methods, and handle
client calls via a separate gRPC server.
gRPC supports many languages, and the client/server can use the supported language of their choosing. In order to do so,
gRPC needs to convert the data being transferred into a format that can be understood by both languages. This is where
`protocol buffers` (also known as `protobufs` or `protobuf`) come in.

## Protocol Buffers

Before objects in one language can be used in another, it needs to be converted into a format which is interpretable by
the second language. Objects are usually converted into bytes in a process called serialization. Serialized objects can
theoretically be used by any language, as the object itself can be recreated from the serialized form whenever
necessary. This is what protocol buffers are used to do.

### Advantages

There are also many advantages to using protocol buffers instead of other formats like JSON. For example, protocol
buffers offer:

1. Compact storage
2. Fast parsing
3. Cross-language compatability
4. Automatically generated classes/code

Another major advantage to protocol buffers is that proto definitions can be updated without damaging old code. The old
code can simply run by ignoring the newly added data.

### A Small Example On Protocol Buffers

You can define the structure of your serializable data using a '.proto' file. Each object is stored as a message. Think
of the message as a struct, filled with multiple variable-value fields. Here is an example:

```protobuf
message Car {
  string make = 1;
  string model = 2;
  int32 year = 3;
  bool is_hybrid = 4;
  int32 mpg = 5;
  int32 tank_gallons = 6;
}
```

You can then use a compiler to make a code file filled with getters/setters for each field in every message of your
proto file. The compiler, `protoc`, can be used to compile proto files into the language of your choice. The compiler
will also create methods to both serialize and recreate the object from the gRPC messages. Lastly, the code generated
from the proto file will include both client and server code. This includes services. Below is another example of the
service we can use with our car example.

```protobuf
service CalculateTotalMilesOnFullTank {
  rpc GetTotalMilesOnFullTank (MPG) returns (TotalMiles) {}
}
message MPG {
  int32 mpg = 1;
  int32 tank_gallons = 2;
}
message TotalMiles {
  int32 total_miles = 1;
}
```

After serialization, the clients and servers will be sending these "proto requests" and "proto response" instead of
regular requests/responses.
The current protocol buffers version is proto3, and this is the version recommended by gRPC. It can be installed in each
language individually, however, I've found that Python and GoLang implementations are the quickest/easiest to install.

# So Then What's The Difference Between gRPC & REST?

Both are APIs used to create a standardized interface for systems to communicate with each other. And both types of API
standards have their own separate benefits. Using a specific standard depends on the project at hand.
If your project is meant to handle high loads (due to lower latency), two-way communication, and you also want
simplicity in your code, you should use the gRPC framework.
However, if your project will require statelessness, self-contained messages, and language agnosticity, then REST is the
better framework for it.
Keep in mind that gRPC can still allow for communication between systems with different languages, it's just that some
features offered by gRPC are language dependent.
Lastly, gRPC uses HTTP/2 which offers many more benefits than REST APIs HTTP/1.1.

# Conclusion

In this blog, we learned what Remote Procedure Calls are, what gRPC is and its advantages over REST API. We even went a
little bit into protocol buffers with some example code, to see how gRPC code is set up by the developer to be generated
by the compiler `protoc`. Lastly, once we had understood a bit more about gRPC, we went back into how REST API compares
to gRPC.  
You can read more about gRPC [here](https://grpc.io/docs/what-is-grpc/introduction/), and even get started with some
sample code in the langauge of your choosing [here](https://grpc.io/docs/languages/).

> # Want to learn more?
>
> Check out our <a href="https://capten.ai/learning-center/6-learn-grpc/" target="_blank">learning center</a> section on
> gRPC, with more details and code.
