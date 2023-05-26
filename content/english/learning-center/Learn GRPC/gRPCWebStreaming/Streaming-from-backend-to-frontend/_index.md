---
title: "Streaming-between-frontend-backend"
date: 2023-04-29
draft: false
# description
description: "Get-to-know-about grpc"
weight: 1
---

In this section, we'll discuss how you can use gRPC Streaming for your backend and front end.

**Note:** We are not going to look at frontend and backend parts in this excercise this is a sample demonstration of what we are going to do if we frontend and backend where we can implement gRPC streaming.

***Step 1:***

Setting up the Go gRPC Server

- First, you'll need to set up a gRPC server in Go. You can use the official Go gRPC libraries to set up the server. Once the server is set up, you can define your gRPC service and implement the streaming methods you need.

Here's an example of a gRPC service that supports Server-Side Streaming:

```go
syntax = "proto3";

package hello;

service HelloService {
  rpc StreamHello(HelloRequest) returns (stream HelloResponse) {}
}

message HelloRequest {
  string name = 1;
}

message HelloResponse {
  string message = 1;
}
```
This service defines a single method called StreamHello that takes a HelloRequest and returns a stream of HelloResponse messages.

***Step 2:***
So next what I'm going to do is to implement the above methods in the gRPC server code. Here's an example of how you can implement those:

```go

func (s *server) StreamHello(req *pb.HelloRequest, stream pb.HelloService_StreamHelloServer) error {
```
***Step 3:*** In this implementation, we are sending ten HelloResponse messages to the client, with a delay of 500 milliseconds between each message. You can customize the response messages and delay as per your requirements.
```css
  for i := 1; i <= 10; i++ {
    resp := &pb.HelloResponse{
      Message: fmt.Sprintf("Hello, %s! This is message %d.", req.GetName(), i),
    }
    if err := stream.Send(resp); err != nil {
      return err
    }
    time.Sleep(500 * time.Millisecond)
  }
  return nil
}
```
***Step 4:*** Setting up the Next.js Front End

Next, you'll need to set up your Next.js front end to communicate with the gRPC server. To do this, you'll need to use the @improbable-eng/grpc-web library, which provides gRPC Web support for JavaScript clients.

Here's an example of how you can set up the gRPC Web client in your Next.js application:

```javascript

import { HelloServiceClient } from './hello_grpc_web_pb';
import { HelloRequest } from './hello_pb';

const client = new HelloServiceClient('http://localhost:8080');

const request = new HelloRequest();
request.setName('John');

const stream = client.streamHello(request, {});

stream.on('data', response => {
  console.log(response.getMessage());
});

stream.on('end', () => {
  console.log('Streaming ended.');
});

stream.on('error', err => {
  console.error(err);
});

```
In this example, we are importing the HelloServiceClient and HelloRequest classes from the generated gRPC Web files. We are then creating a new client instance and a new request instance with the name "John".

Next, we are calling the streamHello method on the client instance, which returns a stream object. We are then attaching event handlers to the stream object to handle the data, end, and error events.

***Step 5:*** Testing the Implementation

you can test the implementation by running the gRPC server and the Next.js application. You can use the following command to start the gRPC server:

```cmd
go run server.go
```

This will start the gRPC server on port 8080.

Next, you can run the Next.js application using the following command:

```cmd
npm run dev
```
This will start the application on port 3000.

Once both the server and the application are running, you can open the application in your web browser and check the console output. You should see ten HelloResponse messages with a delay of 500 milliseconds between each message.

In this blog post, we discussed how you can use gRPC Streaming for a Go backend and Next.js front end. We covered how to set up a gRPC server, define a gRPC service, and implement the streaming methods in Go. We also discussed how to set up the gRPC Web client in a Next.js application and handle the stream events.