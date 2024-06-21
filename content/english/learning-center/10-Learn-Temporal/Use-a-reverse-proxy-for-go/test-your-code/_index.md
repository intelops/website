---
title: "Test your use case with a go gin server and traefik"
date: 2024-06-16
draft: false
description: "This is a use case test document for the reverse proxy using traefik and golang gin server using compage."
type: "learning-center"
weight: 3
---

# How to Test the gin server and traefik in local environment

- You can test the gin server and traefik in local environment using the following command:
    ```docker
    # Go to root directory
    docker compose up -d
    ```
    ```bash
    # once the containers are up and running you will see the following output
    ✔ Container traefik-poc-mongodb-1                        Started 0.6s 
    ✔ Container traefik                                      Started 0.5s 
    ✔ Container traefik-poc-go-gin-1                         Started 0.5s
    ```
![container status](./containers-up-success.png)

- To check the status of your traefik, you can click on the traefik link in the browser. [https://localhost:8080](https://localhost:8080)
![browser-view](./traefik-dashboard.png)

- To check the status of your gin server, you can click on the gin server link in the browser. [https://localhost:9000](https://localhost:9000)
![Image](./success-http.png)