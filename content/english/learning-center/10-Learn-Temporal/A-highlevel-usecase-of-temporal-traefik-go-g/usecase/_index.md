---
title: "Use Case"
date: 2024-06-16
draft: false
description: "This is a use case example to the reverse proxy using traefik and golang with temporal go SDK."
type: "learning-center"
weight: 1
---
### Setting Up the Golang Project

#### go.mod and go.sum

These files manage dependencies for the Go project. Here is a brief overview of the important dependencies in `go.mod`:

- `github.com/gin-gonic/gin`: Gin framework for the web server.
- `go.temporal.io/sdk`: Temporal Go SDK for creating workers and managing workflows.

#### Example of go.mod:
```go
module your_module_name

go 1.16

require (
    github.com/gin-gonic/gin v1.7.7
    go.temporal.io/sdk v1.7.0
)
```

### Integrating Temporal with Golang

#### Creating a Temporal Worker

A Temporal worker polls for workflow and activity tasks and executes them. Below is a simplified example of a worker setup:

```go
package main

import (
    "go.temporal.io/sdk/client"
    "go.temporal.io/sdk/worker"
    "your_module_name/workflows"
)

func main() {
    // Create the client object just once per process
    c, err := client.Dial(client.Options{})
    if err != nil {
        panic(err)
    }
    defer c.Close()

    // Create a worker that listens on task queue "hello-world"
    w := worker.New(c, "hello-world", worker.Options{})

    // Register the workflow and activity function
    w.RegisterWorkflow(workflows.YourWorkflow)
    w.RegisterActivity(workflows.YourActivity)

    // Start listening to the task queue
    err = w.Run(worker.InterruptCh())
    if err != nil {
        panic(err)
    }
}
```

#### Defining Workflows and Activities

```go
package workflows

import (
    "context"
    "go.temporal.io/sdk/workflow"
)

// YourActivity is an example of an activity function
func YourActivity(ctx context.Context, name string) (string, error) {
    return "Hello, " + name, nil
}

// YourWorkflow is an example of a workflow function
func YourWorkflow(ctx workflow.Context, name string) (string, error) {
    ao := workflow.ActivityOptions{
        StartToCloseTimeout: time.Minute,
    }
    ctx = workflow.WithActivityOptions(ctx, ao)

    var result string
    err := workflow.ExecuteActivity(ctx, YourActivity, name).Get(ctx, &result)
    if err != nil {
        return "", err
    }
    return result, nil
}
```

### Creating and Running Temporal Workers

#### Dockerfile

The `Dockerfile` sets up the environment for running the Golang application, including the Temporal worker:

```dockerfile
FROM golang:1.16

WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o main .

CMD ["./main"]
```

#### docker-compose.yaml

This file sets up the necessary services, including the Temporal server and the Traefik reverse proxy:

```yaml
version: '3.7'

services:
  temporal:
    image: temporalio/auto-setup:latest
    ports:
      - "7233:7233"
    environment:
      - TEMPORAL_CLI_ADDRESS=temporal:7233

  gin-server:
    build: .
    depends_on:
      - temporal
    ports:
      - "8080:8080"

  traefik:
    image: traefik:v2.2
    ports:
      - "80:80"
      - "8080:8080"
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
```

### Hosting the Application with Docker and Traefik

Traefik is configured to route traffic to the Gin server. The `docker-compose.yaml` file ensures that the Temporal server, Gin server, and Traefik are properly set up and can communicate with each other.

### Putting it All Together

#### Step-by-Step Guide

1. **Setup Project Structure**:
   - Create a directory structure: `cmd`, `pkg`, `workflows`, etc.
   - Place your main application file in `cmd`.

2. **Define Workflows and Activities**:
   - Create files in the `workflows` directory to define your Temporal workflows and activities.

3. **Create Dockerfile**:
   - Write a `Dockerfile` to containerize your application.

4. **Setup Docker Compose**:
   - Use `docker-compose.yaml` to set up services for Temporal, your Gin server, and Traefik.

5. **Run the Application**:
   - Use `docker-compose up` to start all services.

Please find the [source code](https://github.com/azar-writes-code/traefik-temporal-poc) here.
### Conclusion

By following these steps, you will integrate Temporal with a Golang Gin server, create a worker using the Temporal Go SDK, and host the application using Traefik as a reverse proxy. This setup allows you to run workflows efficiently and scale as needed.