---
date: 2023-06-01
title: Evans CLI - A Go gRPC Client
description: Implementation of Evans-CLI in go-gRPC client
image: images/blog/Evans-CLI-A-Go-gRPC-Client/undraw_client.svg
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
- Evans CLI
- gRPC
- gRPC Client
- Applications
- CLI Tools

tags:
- Application Development
- Low-Code
- gRPC
- Evans CLI
- Kubernetes Applications Development
- Cloud Native Applications
- gRPC CLient

# image color code in undraw.co #FB7E44
feedback: false
draft: false

---

{{< image src="images/blog/Evans-CLI-A-Go-gRPC-Client/undraw_client.svg" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Evans CLI is a command-line tool designed to facilitate interaction with Go gRPC services. It offers a range of features that simplify the testing and debugging of gRPC services. Here are some of the advantages of using Evans CLI:

### Advantages of Evans CLI

Evans CLI stands out from other tools for interacting with gRPC services due to the following advantages:

- **Ease of use:** Evans CLI provides a simple command-line interface, making it incredibly user-friendly. It allows you to effortlessly send requests and receive responses from gRPC services.

- **Powerful features:** Evans CLI boasts several powerful features that streamline the testing and debugging process. These features include automatic service discovery, an interactive mode, and code generation capabilities.

- **Open source:** Evans CLI is an open-source tool, which means it is free to use and modify. This makes it a flexible and cost-effective choice for developers.

### Installation of Evans CLI

To install Evans CLI, follow these steps:

- **Prerequisites:**
  - Ensure that the following dependencies are installed:
        1. [protobuf-compiler](https://grpc.io/docs/protoc-installation/)
        2. [libprotobuf-dev](https://howtoinstall.co/en/libprotobuf-dev)

- Install Evans CLI by referring to the official documentation: [https://github.com/ktr0731/evans#installation](https://github.com/ktr0731/evans#installation). The documentation provides detailed instructions on how to download and install Evans CLI.

### Sample gRPC Server Project

For the purpose of demonstrating the usage of Evans CLI, let's consider a sample gRPC server that implements CRUD (Create, Read, Update, Delete) operations based on an office protocol file.

You can find the source code for this [sample project here](https://github.com/intelops/evans-cli-grpc-in-go).

### How Evans CLI Solves Client-Side Issues for the gRPC Server

Evans CLI addresses client-side issues for the gRPC server through its REPL (Read-Eval-Print Loop) mode and CLI (Command Line Interface) mode. In this example, we will focus on the REPL mode, as it offers a more user-friendly way to interact with the server.

To start the Evans CLI client in REPL mode, execute the following command in the root directory of your project:

```bash
evans -r repl -p <your-gRPC-server-port>
```

![Evans CLI REPL Mode](./images/evans-cli-repl.gif)

Here are some useful commands you can utilize with Evans CLI:

- To view the available packages on your server, use the command:

```bash
show package
```

![View Packages](./images/see-packages.gif)

- To select a specific package from the available options, use the command:

```bash
package <Package_Name>
```

For example:

```bash
package gen
```

![Select Package](./images/select-package.gif)

- To view the services within the selected package, use the command:

```bash
show service
```

![View Services](./images/see-services.gif)

- To select a specific service from the available options, use the command:

```bash
service <Service_Name>
```

For example:

```bash
service OfficeService
```

![Select Service](./images/select-service.gif)

- To view the messages within the services.package, use the command:

```bash
show message
```

![View Messages](./images/see-messages.gif)

- To obtain more information about a particular message and its fields, use the command:

```bash
desc <Message_Name>
```

For example:

```bash
desc Office
```

![Message Description](./images/desc-msg.gif)

- To view the RPC methods

 available in the services, use the command:

```bash
show rpc
```

![View RPC Methods](./images/see-rpc.gif)

- To call a method from a service, use the command:

```bash
call <rpc-method-name>
```

For example:

```bash
call CreateOffice
```

![Call Method](./images/call-method.gif)
![Check RPC](./images/rpc-check.gif)

### Conclusion

Evans CLI is a powerful tool that simplifies the testing and debugging of Go gRPC services. With its easy-to-use interface, rich set of features, and open-source nature, Evans CLI provides developers with an efficient way to interact with gRPC servers.

By installing Evans CLI and utilizing its REPL mode, developers can seamlessly explore, inspect, and test the different APIs exposed by their gRPC servers. This interactive approach enhances the development workflow, improves efficiency, and boosts confidence in the reliability of gRPC-based systems.

Embrace Evans CLI as your go-to tool for testing and debugging Go gRPC services, and experience the benefits of its simplicity, power, and open-source nature. Happy coding!
