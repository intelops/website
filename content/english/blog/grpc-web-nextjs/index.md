---
date: 2023-06-19
title: Building Next.js Applications with gRPC Web - Efficient Communication for Modern Web Development
description: Implementation of gRPC web in  Next.js applications
image: images/blog/grpc-web-nextjs/grpc-nextjs.png

cover_image: false

author: tanuja-pyneni
series: 
categories:
- Cloud Native
- gRPC
- Next.js
- gRPC Protocol Buffers
- Applications
  
tags:
- Application Development
- Low-Code
-  Protocol Buffers
- Cloud Native Applications

# image color code in undraw.co #FB7E44 
feedback: false
draft: false

---

{{< image src="images/blog/grpc-web-nextjs/grpc-nextjs.png" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

gRPC(Google Remote Procedure Call) is an open-source, high-performance framework for building distributed systems - helps you design efficient communication between various services and applications across different programming languages and platforms.  It was created by Google and is now a part of the Cloud Native Computing Foundation (CNCF). Interceptor support is one of gRPC's key features. In this blog, we will look at interceptors and how to use them in gRPC applications written in the Go programming language with monitoring example.

### Why Interceptors in gRPC?
Interceptors in gRPC are useful because they allow developers to add custom logic to the request/response processing pipeline.
One exciting reason for the need for gRPC interceptors is that they allow us to implement cross-cutting concerns in a modular and reusable manner. Assume we want to add authentication to all of our gRPC services. Rather than modifying each service separately, we can write a single interceptor that checks the authentication token and adds the user ID to the request context. This interceptor can then be added to any gRPC service we create without requiring any changes to the service code.
Another interesting reason for using gRPC interceptors is that they enable us to implement features like tracing and monitoring. We can easily trace the flow of requests through our system and identify any performance or reliability issues by including an interceptor that logs the start and end of each request. Similarly, by incorporating an interceptor that collects metrics on request/response sizes and latencies, we can monitor our system's health and detect any anomalies.

### How is gRPC different fron gRPC-web?	 
Both gRPC and gRPC web are basically two variations of the same underlying technology. One of the main difference is that they both use different terms of protocols they use for communication and the platforms they are designed for

### Go implementation for interceptors in gRPC
In this blog, We are going to create a logging middleware which helps to log the messages. Follow the below steps to achieve it.
#### Pre-requisite
- Go ([https://go.dev/doc/install](https://go.dev/doc/install))
- protoc ([https://grpc.io/docs/protoc-installation/](https://grpc.io/docs/protoc-installation/))
- Evans CLI ([https://github.com/ktr0731/evans/releases](https://github.com/ktr0731/evans/releases)) [It's totally optional, I've used it to test my server]

#### Source Code
Please refer the code [here](https://github.com/intelops/go-interceptors-demo)

Install the required modules from go package
```bash
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

Create a proto file with the messages and services required.
```proto
syntax = "proto3";
package demo;

option go_package="./;demo";

message DemoRequest {
  string message = 1;
}

message DemoResponse {
  string message = 1;
}

// gRPC service which has a Demo method returns message as response
service MyService {
  rpc DemoMethod(DemoRequest) returns (DemoResponse) {}
}
```
- There is only one method named "DemoMethod" in the service, which is defined in the "demo" package.
- A message of type "DemoRequest" is passed to the "DemoMethod" in order to receive it, and it returns a message of type "DemoResponse" in return.
- The messages include a single field called "message" that is of the string data type and has the tag value 1.
- The "rpc" keyword is used in the "MyService" service definition to denote remote procedure calls for client-server communication.

Compile this proto file using **protoc** with the following command:
```bash
mkdir pb && protoc --go_out=./pb --go-grpc_out=./pb proto/*.proto
```
- Using Protocol Buffers files in the "proto" directory, this command creates a directory called "pb" and generates Go code for gRPC services and the messages that go along with them.
- The resulting code comprises message definitions, gRPC server and client stubs, and is stored in the "pb" directory.

Start building your server using Go as explained below. Open Terminal and type the following commands:
```bash
# Please use your module name for the further references
go mod init YourModuleNameGoesHere
# This line will create a main.go file in root dir
touch main.go
```


First, run the server using the following step in the terminal:
```bash
go run main.go
```
Open a new terminal and run the evans cli which works like a client:
```bash
evans -r repl -p 50051

# This command helps to choose the package 
package demo

# To check the services defined 
show services

:'
# Output generated
+-----------+------------+--------------+---------------+
|  SERVICE  |    RPC     | REQUEST TYPE | RESPONSE TYPE |
+-----------+------------+--------------+---------------+
| MyService | DemoMethod | DemoRequest  | DemoResponse  |
+-----------+------------+--------------+---------------+
'
# To call this method use this command
call DemoMethod

:'
# Output generated
# Example 1
demo.MyService@127.0.0.1:50051> call DemoMethod
message (TYPE_STRING) => Dr.Strange
{
  "message": "Hello Dr.Strange"
}
# Example 2
demo.MyService@127.0.0.1:50051> call DemoMethod
message (TYPE_STRING) => Compage
{
  "message": "Hello Compage"
}

#logs generated from server
2023/03/31 23:37:40 Received request: message:"Dr.Strange"
2023/03/31 23:39:16 Received request: message:"Compage"
'
# To stop CLI use this command
exit
```

### Conclusion
Finally, we've seen how to use Go to implement an interceptor in a gRPC server. Interceptors enable us to extend the functionality of our gRPC server, such as logging or authentication, by intercepting incoming requests and modifying or performing additional actions on them before they are handled by our server. We saw how to define a server struct that implements the protobuf interface, how to define a logging interceptor function, and how to create a new gRPC server with the interceptor and register our service with it in this example. We also tested how it works with Evans CLI. Please feel free to add your suggestions.
