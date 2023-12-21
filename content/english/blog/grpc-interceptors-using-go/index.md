---
date: 2023-04-11
title: gRPC Interceptors using go
description: Implementation of gRPC interceptors in go
image: images/blog/grpc-interceptors-using-go/undraw_advanced_customization.svg

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: azar
series: Cloud Native Applications
categories:
- Cloud Native
- Kubernetes
- Low-Code
- gRPC
- gRPC Interceptors
- Applications

tags:
- Application Development
- Low-Code
- gRPC
- gRPC Interceptors
- Kubernetes Applications Development
- Cloud Native Applications

# image color code in undraw.co #FB7E44 
feedback: false
draft: false

---

{{< image src="images/blog/grpc-interceptors-using-go/undraw_advanced_customization.svg" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

gRPC is an open-source, high-performance framework for developing remote procedure call (RPC) applications. It was created by Google and is now a part of the Cloud Native Computing Foundation (CNCF). Interceptor support is one of gRPC's key features. In this blog, we will look at interceptors and how to use them in gRPC applications written in the Go programming language with monitoring example.

### Why Interceptors in gRPC?

Interceptors in gRPC are useful because they allow developers to add custom logic to the request/response processing pipeline.
One exciting reason for the need for gRPC interceptors is that they allow us to implement cross-cutting concerns in a modular and reusable manner. Assume we want to add authentication to all of our gRPC services. Rather than modifying each service separately, we can write a single interceptor that checks the authentication token and adds the user ID to the request context. This interceptor can then be added to any gRPC service we create without requiring any changes to the service code.
Another interesting reason for using gRPC interceptors is that they enable us to implement features like tracing and monitoring. We can easily trace the flow of requests through our system and identify any performance or reliability issues by including an interceptor that logs the start and end of each request. Similarly, by incorporating an interceptor that collects metrics on request/response sizes and latencies, we can monitor our system's health and detect any anomalies.

### What are interceptors in gRPC?

Interceptors are one of the powerful gRPC features that allows you to intercept and modify client-server requests and responses. Interceptors are middleware that sits between the client and server handlers, intercepting requests and responses as they traverse the network stack.

- Interceptors can ensure that only authorised users have access to resources through authentication and authorization.
- Interceptors can log request and response metadata to assist with debugging and performance analysis.
- **Caching**: By caching responses, interceptors can reduce network requests.
- **Compression and encryption**: By compressing and encrypting requests and responses, interceptors can improve performance and security.

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

Open **main.go** file and Try this code:

```go
package main

import (
 "context"
 "log"
 "net"

 pb "YourModuleNameGoesHere/pb"
 "google.golang.org/grpc"
 "google.golang.org/grpc/reflection"
)

// gRPC loggingInterceptor which helps to log
func loggingInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
 log.Printf("Received request: %v", req)
 resp, err := handler(ctx, req)
 return resp, err
}

type Server struct {
 pb.UnimplementedMyServiceServer
}

func main() {
 // Create a new gRPC server with the logging interceptor
 s := grpc.NewServer(
  grpc.UnaryInterceptor(loggingInterceptor),
 )

 // Register your gRPC service with the server
 myService := &Server{}
 pb.RegisterMyServiceServer(s, myService)
 reflection.Register(s)

 // Listen on port 50051
 lis, err := net.Listen("tcp", ":50051")
 if err != nil {
  log.Fatalf("failed to listen: %v", err)
 }

 log.Printf("Starting server in port :%d\n", 50051)

 // Start the server
 if err := s.Serve(lis); err != nil {
  log.Fatalf("failed to serve: %v", err)
 }
}
```

- We import the required packages, such as the gRPC framework from **google.golang.org/grpc** and our produced protobuf package **pb**, which defines our gRPC service and messages.
- To implement the **MyServiceServer** interface created by protobuf, we define a struct called **Server**. For every RPC method listed in our protobuf service description file, a method is present in this interface.
- The **"DemoMethod"** method, which accepts a Request message as input and outputs a Respond message, is what we implement. Here, we only send back a Respond message with a Message field that contains the Message field from the inbound Request message joined to "Hello".
- To log incoming requests, we define the **loggingInterceptor** function. **"grpc.UnaryServerInfo"** object that includes information about the called RPC method is passed to this function together with a context object, the object representing the incoming request, and the context object. Also, it accepts a **"grpc.UnaryHandler"** object, which is a function that processes incoming requests and sends back responses.
- **"grpc.NewServer()"** is used to start a new gRPC server. With the command **"grpc.UnaryInterceptor(loggingInterceptor)"**, we pass in our **loggingInterceptor** function as a unary interceptor.
- With **pb.RegisterMyServiceServer(s, myService)**, we tell the server about our **Server** struct. It instructs the gRPC server to use our **Server** struct to respond to requests for our service.
- We use **net.Listen("tcp", ":50051")** to monitor port **50051** for incoming gRPC requests.
- **s.Serve(lis)** is used to launch the gRPC server. By doing this, an infinite loop is launched, which watches for incoming requests and processes them using our **Server** struct.

How to check this code......??? Well, I have used **Evans CLI**, which is a development tool for creating and testing gRPC APIs. It includes an interactive shell with auto-completion and syntax highlighting, as well as the ability to automatically generate client and server stubs. It accelerates and shortens the development and testing of gRPC APIs.
You can also test it by creating client side code. Just to make it simple, I'm using Evans CLI method.

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
