---
title: "Get-to-know-grpcurl"
date: 2023-04-29
draft: false
# description
description: "Get-to-know-about grpc"
weight: 2
---
***grpcurl is a command-line tool that can be used to interact with gRPC servers. Here are some examples of how to use grpcurl to make gRPC requests by hand:***

- List available services - 
```cmd
grpcurl -plaintext localhost:50051 list
```
This will output a list of available gRPC services.

- List available methods - To list the available methods for a particular service, you can run the following command:
```cmd
grpcurl -plaintext localhost:50051 list api.PersonService
```
This will output a list of available methods for the PersonService gRPC service.

- Make a unary RPC call - To make a unary RPC call to a gRPC server, you can run the following command:
```cmd
grpcurl -plaintext -d '{"name": "Alice", "email": "alice@example.com", "phone": "555-1234"}' localhost:50051 api.PersonService/CreatePerson
```
This will create a new person with the given name, email, and phone number.

- Make a server-side streaming RPC call - To make a server-side streaming RPC call to a gRPC server, you can run the following command:
```cmd
grpcurl -plaintext -d '{"id": 1}' localhost:50051 api.PersonService/GetPerson
```
This will retrieve the person with the given ID, and will stream the person's data back to the client.



**These are just a few examples of how to use grpcurl to make gRPC requests by hand. The tool is quite flexible and can be used to make a wide variety of gRPC requests like REST calls.**

**implementing a gRPC service involves more than just writing the code to handle RPC methods. You'll also need to consider how to handle errors, handle authentication and authorization, and perform testing and debugging.**