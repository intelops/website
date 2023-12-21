---
date: 2023-08-09
title: "Kubernetes: Hello World"
description: Deploy your first application on Kubernetes
image: images/blog/k8s-hello-world/logo.png
cover_image: true
cover_image_src: ""
cover_image_height: ""
cover_image_width: ""

author: pratik_jagrut
series: Kubernetes
categories:
- Kubernetes
- Cloud Native
tags:
- Kubernetes

# image color code in undraw.co #FB7E44
feedback: false
draft: false
---
{{< image src="images/blog/k8s-hello-world/cover.png" alt="k8s-logo" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Imagine embarking on a journey across uncharted seas—the world of software deployment. Navigating these waters is akin to steering a ship, facing challenges that range from smooth sailing to avoiding treacherous downtime, all while adapting to ever-changing conditions.

Just as a seasoned captain guides a ship through unpredictable waters, **Kubernetes** emerges as the expert navigator of the digital realm. Think of it as an automated navigation system, expertly guiding your application through the complexities, ensuring a steady course regardless of the turbulence.

Kubernetes, often referred to as **K8s**, is more than just a tool—it's an open-source container orchestration platform. It simplifies the intricate tasks of deploying, scaling, and managing applications packaged in containers. Containers are like compact, self-sufficient units containing everything an application needs, promoting consistency across diverse environments.

Through this blog, we'll uncover Kubernetes' key role in orchestrating deployments. We'll explore from setting the stage (environment) to crafting your app's performance (building container image) and culminating in the main event (deploying your app).

### Prerequisites

Before embarking on the process of deploying your first application on Kubernetes, make sure you have the following tools and accounts ready:

1. **Docker**: Install Docker to create container images for your application. Refer to the official [Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.

2. **Image Registry Account**: Sign up for an account on [GitHub](https://github.com), [DockerHub](https://hub.docker.com), or any other container image registry. You'll use this account to store and manage your container images.

With these tools and accounts in place, you're equipped to begin your journey into Kubernetes deployment. Let's begin!

### Prepare the application

#### Clone the Repository

In this guide, we're using [***hello-Kubernetes***](https://github.com/pratikjagrut/hello-kubernetes) simple web-based application written in Go. You can find the source code [here](https://github.com/pratikjagrut/hello-kubernetes).

```bash
git clone https://github.com/pratikjagrut/hello-kubernetes.git
cd hello-kubernetes
```

#### Understanding the Code

```go
package main

import (
 "fmt"
 "log"
 "net/http"
 "os"
)

func handler(w http.ResponseWriter, r *http.Request) {
 log.Printf("Received request from %s", r.RemoteAddr)
 fmt.Fprintf(w, "Hello, Kubernetes!")
}

func main() {
 port := os.Getenv("PORT")
 if port == "" {
  port = "8080"
 }

 http.HandleFunc("/", handler)

 go func() {
  log.Printf("Server listening on port %s...", port)
  err := http.ListenAndServe(":"+port, nil)
  if err != nil {
   log.Fatal("Failed to start the server")
  }
 }()

 log.Printf("Click on http://localhost:%s", port)

 done := make(chan bool)
 <-done
}
```

In this code snippet, the `main` function sets up an HTTP server to handle requests. The `handler` function responds to requests with a "Hello, Kubernetes!" message and logs request details. By launching the server in a separate goroutine, the program continues executing, allowing you to interact with the server via `http://localhost:8080`. A channel is used to keep the main function from exiting immediately. Understanding this code gives you insight into how the application handles requests and concurrently manages server operations.

#### Understanding the Dockerfile

The repository also includes a Dockerfile that employs a multi-stage build process to craft a streamlined container image for a GoLang application.

```dockerfile
FROM cgr.dev/chainguard/go:latest as builder

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Download dependencies
RUN go mod download

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Create a minimal final image
FROM scratch

# Copy the compiled application binary from the builder image
COPY --from=builder /app/main /app/main

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["/app/main"]
```

Let's deconstruct each segment of the Dockerfile to grasp its purpose:

```Dockerfile
FROM cgr.dev/chainguard/go:latest as builder
```

In this line, we're leveraging the Go images provided by Chainguard, based on Wolfi. These images are tailored for constructing Go workloads and follow a "Distroless" approach. Distroless images encapsulate your application and its runtime dependencies exclusively, omitting package managers and extraneous components found in typical Linux distributions. This practice, endorsed by tech giants like Google, refines the signal-to-noise ratio of security scanners and streamlines establishing provenance.

Distroless images exhibit remarkable compactness. The smallest one, [gcr.io/distroless/static-debian11](http://gcr.io/distroless/static-debian11), weighs in at around 2 MiB—roughly half the size of Alpine (~5 MiB) and less than 2% of the heft of Debian (124 MiB). Chainguard offers both a minimal runtime image for executing Go workloads and a development image that encompasses a shell and standard Go build tooling. You can delve deeper into Chainguard's Go image details [here](#link-to-chainguard-go-image-page).

```Dockerfile
# Set the working directory inside the container
WORKDIR /app
COPY . .
```

In this portion, we establish the working directory as /app within the container. Subsequently, the COPY . . command duplicates all files from the host directory (where the Dockerfile resides) into the /app directory of the container.

```Dockerfile
# Download dependencies
RUN go mod download

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .
```

This sequence initiates by fetching the Go module dependencies outlined in the go.mod file. Following that, it proceeds to build the Go application, meticulously configuring the compilation process.

```Dockerfile
# Create a minimal final image
FROM scratch

# Copy the compiled application binary from the builder image
COPY --from=builder /app/main /app/main
```

This section introduces a fresh base image called scratch. This image serves as a blank canvas upon which to construct. Scratch finds its utility in crafting base images (like debian and busybox) or extremely minimal images (housing only one binary and its prerequisites, such as "hello-world").

Subsequently, the COPY directive transports the compiled application binary (main) from the builder stage (the part marked by `FROM cgr.dev/chainguard/go:latest as builder`) to the `/app` directory in the ultimate image.

```Dockerfile
# Expose port 8080 to the outside world
EXPOSE 8080
```

The EXPOSE command signifies that the container's enclosed application listens on port 8080. Yet, it doesn't publish this port to the host—it necessitates specification during container execution.

```Dockerfile
# Command to run the executable
CMD ["/app/main"]
```

The final line defines the default command executed when the container commences. It launches the `main` executable—the Go application built earlier.

#### Building the Container Image

1. Open the terminal and navigate to the repository directory.

2. Build the container image using the following command:

    ```bash
    docker build -t ghcr.io/pratikjagrut/hello-kubernetes .
    ```

    This command builds the container image using the `Dockerfile` from current directory. The `-t` flag specifies the image name.

#### Running the Container

1. Once the image is built, run a Docker container from the image:

    ```bash
    ➜ docker run -p 8080:8080 ghcr.io/pratikjagrut/hello-kubernetes
    2023/08/08 13:25:24 Click on the link http://localhost:8080
    2023/08/08 13:25:24 Server listening on port 8080...
    ```

    This command maps port 8080 of your host machine to port 8080 in the container.

2. Open a web browser and navigate to [`http://localhost:8080`](http://localhost:8080). You should see the `Hello, Kubernetes!` message.

#### Pushing the Docker Container Registry

For our blog, we've opted for the GitHub container registry. However, feel free to select a registry that aligns with your preferences.

1. Log in to Docker using the GitHub Container Registry:

    ```bash
    docker login ghcr.io
    ```

    When you run the command, it will ask for your username and password. Enter these credentials to log into your container registry.

2. Push the tagged image to the GitHub Container Registry:

    ```bash
    docker push ghcr.io/pratikjagrut/hello-kubernetes
    ```

3. Verify that the image is in your GitHub Container Registry by visiting the `Packages` section of your GitHub repository.

With our application now prepared and containerized, the subsequent phase involves provisioning a Kubernetes cluster and orchestrating the deployment of this containerized application onto it.

### Setup Kubernetes cluster

In this section, we'll walk you through setting up a Kubernetes cluster to begin your deployment journey. We'll use KIND (Kubernetes in Docker) as our chosen tool, which provides an easy way to create a local Kubernetes cluster. However, we'll also mention alternative options for local and cloud-based clusters, ensuring you find the setup that suits you best.

#### Installing KIND and Kubectl

Before we dive into setting up the Kubernetes cluster, you'll need to install both KIND and kubectl on your machine.

* **KIND (Kubernetes in Docker)**: KIND allows you to run Kubernetes clusters as Docker containers, making it perfect for local development. Follow the [official KIND installation guide](https://kind.sigs.k8s.io/docs/user/quick-start/) to install it on your system.

* **kubectl**: This command-line tool is essential for interacting with your Kubernetes cluster. Follow the [Kubernetes documentation](https://kubernetes.io/docs/tasks/tools/) to install kubectl on your machine.

**Creating Your KIND Cluster**

Once KIND and Kubectl are set up, let's create your local Kubernetes cluster:

1. Open your terminal.

2. Run the following command to create a basic KIND cluster:

    ```bash
    kind create cluster
    ```

3. Check if the cluster is properly up and running using `kubectl get ns`

    It should get all the namespaces present in the cluster.

    ```bash
    ➜ kubectl get ns
    NAME                 STATUS   AGE
    default              Active   3m13s
    kube-node-lease      Active   3m14s
    kube-public          Active   3m14s
    kube-system          Active   3m14s
    local-path-storage   Active   3m9s
    ```

##### Alternative Setup Options

* **Minikube**: If you prefer another local option, [Minikube](https://minikube.sigs.k8s.io/docs/start/) provides a hassle-free way to run a single-node Kubernetes cluster on your local machine.

* **Docker Desktop**: For macOS and Windows users, [Docker Desktop](https://www.docker.com/products/docker-desktop) offers a simple way to set up a Kubernetes cluster.

* **Rancher Desktop**: [Rancher Desktop](https://rancherdesktop.io/) is another choice for a local development cluster that integrates with Kubernetes, Docker, and other tools.

* **Cloud Clusters**: If you'd instead work in a cloud environment, consider platforms like [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine) or [Amazon EKS](https://aws.amazon.com/eks/) for managed Kubernetes clusters.

With your Kubernetes cluster up and running, you're ready to sail ahead with deploying your first application.

### Deploy application on Kubernetes

Now, we'll deploy our application onto the Kubernetes cluster.

#### Create a Kubernetes Deployment

A **Deployment** in Kubernetes serves as a manager for your application's components, known as *Pods*. Think of it like a supervisor ensuring that the right number of Pods are running and matching your desired configuration.

In more technical terms, a Deployment lets you define how many Pods you want and how they should be set up. If a Pod fails or needs an update, the Deployment Controller steps in to replace it. This ensures that your application remains available and runs smoothly.

To put it simply, a Deployment takes care of keeping our application consistent and reliable, even when Pods face issues. It's a fundamental tool for maintaining the health of your application in a Kubernetes cluster.

Here's how we can create a Deployment for our application:

**Create a YAML file named `hello-k8s-deployment.yaml`:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-k8s-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-k8s
  template:
    metadata:
      labels:
        app: hello-k8s
    spec:
      containers:
        - name: hello-k8s-container
          image: ghcr.io/pratikjagrut/hello-kubernetes
          ports:
            - containerPort: 8080
```

This YAML defines a Deployment named `hello-k8s-deployment` that runs two replicas of our application.

**Apply the Deployment to your Kubernetes cluster:**

```bash
kubectl apply -f hello-k8s-deployment.yaml
```

Now, if you're using a GitHub registry just like me then you'll see an error(`ImagePullBackOff or ErrImagePull`) in deploying your application. By default the images on the GitHub container registry are private.

When you describe the pods you'll see warning messages in the events section such as `Failed to pull image "`[`ghcr.io/pratikjagrut/hello-kubernetes`](http://ghcr.io/pratikjagrut/hello-kubernetes)`"`.

```bash
➜ kubectl describe pods hello-k8s-deployment-54889c9777-549rn
...
Events:
  Type     Reason     Age                  From               Message
  ----     ------     ----                 ----               -------
  Normal   Scheduled  2m40s                default-scheduler  Successfully assigned default/hello-k8s-deployment-54889c9777-549rn to kind-control-plane
  Normal   Pulling    75s (x4 over 2m39s)  kubelet            Pulling image "ghcr.io/pratikjagrut/hello-kubernetes"
  Warning  Failed     74s (x4 over 2m39s)  kubelet            Failed to pull image "ghcr.io/pratikjagrut/hello-kubernetes": rpc error: code = Unknown desc = failed to pull and unpack image "ghcr.io/pratikjagrut/hello-kubernetes:latest": failed to resolve reference "ghcr.io/pratikjagrut/hello-kubernetes:latest": failed to authorize: failed to fetch anonymous token: unexpected status: 401 Unauthorized
  Warning  Failed     74s (x4 over 2m39s)  kubelet            Error: ErrImagePull
  Warning  Failed     50s (x6 over 2m39s)  kubelet            Error: ImagePullBackOff
  Normal   BackOff    36s (x7 over 2m39s)  kubelet            Back-off pulling image "ghcr.io/pratikjagrut/hello-kubernetes"
```

This happened because Kubernetes is trying to pull the private image and it does not have permission to do so.

When a container image is hosted in a private registry, we need to provide Kubernetes with credentials to pull the image. Create an **Image Pull Secret** to store these credentials:

**Create a Docker registry secret:**

```bash
kubectl create secret docker-registry my-registry-secret \
  --docker-username=<your-username> \
  --docker-password=<your-password> \
  --docker-server=<your-registry-server>
```

**Attach the secret to your Deployment:**

```yaml
spec:
  template:
    spec:
      imagePullSecrets:
        - name: my-registry-secret
```

**Apply the changes to the Deployment:**

```bash
kubectl apply -f hello-k8s-deployment.yaml
```

After applying the updated deployment you can see that all the pods are running.

```bash
➜ kubectl get pods
NAME                                    READY   STATUS    RESTARTS   AGE
hello-k8s-deployment-669788ccd6-4dbb6   1/1     Running   0          22s
hello-k8s-deployment-669788ccd6-k5gfg   1/1     Running   0          37s
```

#### Access Your Application

With the Deployment in place, we can access our application externally. Since we're using KIND, we can use port-forwarding to access the application:

**Find the name of one of the deployed Pods:**

```bash
kubectl get pods -l app=hello-k8s
```

**Forward local port 8080 to the Pod:**

```bash
kubectl port-forward <pod-name> 8080:8080
```

Now, if you open a web browser and navigate to [`http://localhost:8080`](http://localhost:8080) or use `curl http://localhost:8080` you should see "Hello, Kubernetes!" displayed, indicating your application is running successfully.

```bash
➜ curl http://localhost:8080
Hello, Kubernetes!%
```

> NOTE: Port forwarding isn't the optimal method for accessing applications within a production cluster. In such scenarios, it's recommended to establish a Kubernetes service and employ Ingress for handling traffic.

### Conclusion

To wrap up our beginner's guide, we've navigated through the steps of deploying your very first application on Kubernetes. However, this journey is only the initial leg of a much larger expedition. In Kubernetes, a world of opportunities awaits, allowing you to optimize and fine-tune your application's performance, scalability, and resilience. From advanced networking and load balancing to automated scaling and self-healing, Kubernetes offers many tools to ensure your applications run seamlessly in any environment. So, while this guide concludes here, your exploration of Kubernetes is just beginning – embark on this adventure with confidence and curiosity!
