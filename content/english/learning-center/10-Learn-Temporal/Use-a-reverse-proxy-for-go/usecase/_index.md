---
title: "Use case with a go gin server and traefik"
date: 2024-06-16
draft: false
description: "This is a use case to the reverse proxy using traefik and golang gin server using compage."
type: "learning-center"
weight: 2
---

### Use Case Overview

**Objective:**
- Set up a Go Gin server to serve APIs.
- Use Traefik as a reverse proxy to manage incoming traffic.

**Components:**
1. **Go Gin Server:** A lightweight and fast web framework for Go that will handle your blog's backend.
2. **Traefik:** A modern reverse proxy and load balancer designed to route traffic to your Go Gin server.

### Why Use This Setup?

1. **Scalability:** Traefik can handle multiple services and scale with your application's needs.
2. **Dynamic Configuration:** Traefik automatically updates its configuration as services start and stop.
3. **Secure Routing:** Traefik can manage SSL certificates and enforce HTTPS, ensuring secure connections.
4. **Ease of Deployment:** Docker simplifies the deployment process, making it easier to manage and scale your applications.

### Detailed Explanation

#### Go Gin Server

- **Purpose:** To handle HTTP requests, process them, and return the appropriate responses for your blog.
- **Benefits:** High performance, easy to use, and minimalistic, making it ideal for microservices and APIs.

#### Traefik Reverse Proxy

- **Purpose:** To act as an entry point for your web traffic, routing requests to the appropriate backend services (in this case, your Go Gin server).
- **Benefits:** Automatic discovery of services, load balancing, SSL termination, and integration with Docker.

### `docker-compose.yaml` Analysis

Let's examine your `docker-compose.yaml` file to understand how these components are configured.

```yaml
version: '3.7'

services:
  traefik:
    image: traefik:v2.3
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=your-email@example.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
      - "8080:8080"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./letsencrypt:/letsencrypt"
    networks:
      - web

  blog:
    build:
      context: .
      dockerfile: Dockerfile
    labels:
      - "traefik.http.routers.blog.rule=Host(`yourdomain.com`)"
      - "traefik.http.routers.blog.entrypoints=web"
      - "traefik.http.routers.blog.middlewares=redirect@file"
      - "traefik.http.routers.blog-secure.rule=Host(`yourdomain.com`)"
      - "traefik.http.routers.blog-secure.entrypoints=websecure"
      - "traefik.http.routers.blog-secure.tls.certresolver=myresolver"
    networks:
      - web

networks:
  web:
    external: true
```

### Explanation of `docker-compose.yaml`

1. **Version:** Specifies the version of Docker Compose being used.
2. **Services:**
   - **traefik:**
     - **Image:** Specifies the Traefik image to use.
     - **Command:** Configures Traefik with various options such as enabling the API, setting up Docker as a provider, defining entry points for HTTP and HTTPS traffic, and configuring the ACME protocol for automatic SSL certificate management.
     - **Ports:** Maps ports on the host to the container (80 for HTTP, 443 for HTTPS, and 8080 for the Traefik dashboard).
     - **Volumes:** Mounts the Docker socket and a directory for Let's Encrypt certificates.
     - **Networks:** Specifies the network to which the service belongs.
   - **blog:**
     - **Build:** Specifies the context and Dockerfile for building the Go Gin server image.
     - **Labels:** Configures routing rules for Traefik, specifying how traffic should be directed to the blog service.
     - **Networks:** Specifies the network to which the service belongs.

### `Dockerfile` Analysis

Now, let's review your `Dockerfile` to understand how the Go Gin server is built.

```Dockerfile
# Start from the official Go image
FROM golang:1.16-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
```

### Explanation of `Dockerfile`

1. **FROM:** Uses the official Go image as the base.
2. **WORKDIR:** Sets the working directory inside the container to `/app`.
3. **COPY:** Copies the `go.mod` and `go.sum` files, then downloads the dependencies.
4. **RUN:** Copies the source code and builds the Go application.
5. **EXPOSE:** Exposes port 8080, which is where the Go Gin server listens for requests.
6. **CMD:** Specifies the command to run the Go application.

[source file](https://github.com/azar-writes-code/traefik-poc)

### Conclusion

This setup uses Traefik as a reverse proxy to handle incoming traffic, manage SSL certificates, and route requests to your Go Gin server, which serves your blog content. The `docker-compose.yaml` file orchestrates the services, and the `Dockerfile` defines how to build and run the Go Gin server. This combination provides a scalable, secure, and efficient environment for your blog.