---
title: "Error-Handling"
date: 2023-04-27
draft: false
# description
description: "Get-to-know-about grpc"
weight: 2
---

In this blog we are going to talk about error handling while streaming between frontend and backend.

Here's an example of how you can handle errors on both server-side and client side.

```go
func (s *server) StreamHello(req *pb.HelloRequest, stream pb.HelloService_StreamHelloServer) error {
  for i := 1; i <= 10; i++ {
    resp := &pb.HelloResponse{
      Message: fmt.Sprintf("Hello, %s! This is message %d.", req.GetName(), i),
    }
    if err := stream.Send(resp); err != nil {
      log.Printf("Error sending message: %v", err)
      return err
    }
    time.Sleep(500 * time.Millisecond)
  }
  return nil
}
```
In this updated implementation, we are handling errors that may occur during the streaming process. If an error occurs while sending a message, we log the error and return it to the client.

On the client-side, you can handle the error using the stream.on('error',...) event. 

Here's an example:

```go

stream.on('error', err => {
  console.error('Error:', err);
});
```
In this example, we are logging the error to the console.

By handling errors on both the server-side and client-side, you can ensure that your application is robust and handles errors gracefully.