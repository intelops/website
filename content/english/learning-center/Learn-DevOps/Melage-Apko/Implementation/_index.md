---
title: "Implementation"
date: 2023-06-13
draft: false
# description
description: "Creating distroless images using Melange and Apko"
type : "learning-center"
weight: 1
---

# Getting started with Melange and Apko

##### This is an apk builder tool

Melange is a powerful apk builder tool that creates multi-architecture apks using declarative pipelines from a single YAML file. This makes it a valuable addition to container image factories when combined with apko.

# Why Melange

Industry experts and security researchers warn that software supply chain threats are rapidly increasing, especially with the rise of automated workflows and cloud native deployments. To combat this, it's crucial to give users the ability to verify the origin of all relevant software artifacts. With melange, you can build your application once and compose it into different architectures and distributions, just like any other image component.

This guide will teach you how to use melange to build a software package. By combining melange with apko builds, we can create a minimalist container image with the generated apk. To illustrate this powerful combination, we'll package a small go application and walk through the steps to build the container image.

# Requirements

 
To follow along with this guide, you will need an operating system that supports Docker and shared volumes. If you don't have Docker installed already, you can find installation instructions for your operating system on the official Docker documentation website: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

You won’t need GO installed on your system, since we’ll be using Docker to build the demo app.

# Linux users note

To build apks for multiple architectures using Docker, you will need to register additional QEMU headers within your kernel. Docker Desktop users have this step done automatically, so if you're using macOS, you don't need to worry about it. However, for other operating systems, you may need to perform this step manually.

Run the following command to register the necessary handlers within your kernel, using the multiarch/qemu-user-static image.
~~~shell
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
~~~

## Step 1 - Download Melange image 
Pull the docker image using below command
~~~shell
docker pull cgr.dev/chainguard/melange:latest
~~~
Above command will download the latest version of melange image. To check version of melange please run below command
~~~shell
docker run --rm cgr.dev/chainguard/melange version
~~~
Result of above command you can see below and find ther version melange.
~~~shell
  __  __   _____   _          _      _   _    ____   _____
 |  \/  | | ____| | |        / \    | \ | |  / ___| | ____|
 | |\/| | |  _|   | |       / _ \   |  \| | | |  _  |  _|
 | |  | | | |___  | |___   / ___ \  | |\  | | |_| | | |___
 |_|  |_| |_____| |_____| /_/   \_\ |_| \_|  \____| |_____|
melange

GitVersion:    v0.3.2-dirty
GitCommit:     4ed1d07ef6955379e936cf237f8dfec382454f47
GitTreeState:  dirty
BuildDate:     '1970-01-01T00:00:00Z'
GoVersion:     go1.20.3
Compiler:      gc
Platform:      linux/amd64
~~~

## Step 2 - Preparing the demo go app

Use the Go example application from the below link.
~~~shell
git clone https://github.com/MrAzharuddin/go-backend.git
~~~

It is a simple application running on 8080 port.
~~~shell
go mod tidy # install the modules.
go build  # Create the binary over the code.
~~~
## Step 3 - Getting started with Melange
Create a directory and run the commands in that directory only because it will keep generated files all in there.

Generate the melange keys to sign the APK files.

Generating signing keys with Melange is important for signing and verifying the authenticity of apk files. The private key is used to sign the files while the public key is used to verify the signature.

~~~shell
docker run --rm -v "${PWD}":/work cgr.dev/chainguard/melange keygen
~~~

Create a melange.yaml file and add the below content in that file.

~~~shell
package:
  name: trail
  version: v0.0.1
  epoch: 0
  description: 'the go hello world program'
  target-architecture:
    - all
  copyright:
    - paths:
        - '*'
      attestation: |
        Copyright 1992, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2005,
        2006, 2007, 2008, 2010, 2011, 2013, 2014, 2022 Free Software Foundation,
        Inc.
      license: GPL-3.0-or-later
  dependencies:
    runtime:
     - busybox
     - ca-certificates
     - git
     - wget
     - bash
     - go
environment:
  contents:
    keyring:
      - https://packages.wolfi.dev/os/wolfi-signing.rsa.pub
    repositories:
      - https://packages.wolfi.dev/os
    packages:        
      - busybox
      - ca-certificates-bundle
      - git
      - wget
      - bash
      - go
pipeline:
  - uses: git-checkout
    with:
      repository: https://github.com/MrAzharuddin/go-backend.git
      destination: build-dir
  - runs: |
      cd build-dir
      git checkout master
  - uses: go/build
    with:
      modroot: build-dir
      tags: enterprise
      packages: ./main.go
      output: backend-tutorial 
  - runs: |
      ls -al /home/build/build-dir
~~~

1. The file defines package metadata including its name, version, description, and target architecture.
2. It specifies copyright and licensing information for the package's code.
3. The file lists runtime dependencies for the package, including busybox, ca-certificates, git, wget, bash, and go.
4. It sets up the environment by defining keyring, repository, and packages for the build process.
5. The file specifies a pipeline of actions to be performed, including cloning a Git repository, building the Go application, and listing the contents of the build directory.

Run the file to generate the APK package.

Command:-
~~~shell
docker run --privileged --rm -v "${PWD}":/work cgr.dev/chainguard/melange build --debug melange.yaml --arch amd64 --signing-key melange.rsa
~~~

If you observe above command, it only generate the APK file for architecture amd64(X86_64). Instead of that we can also create APK files for multiple architectures like x86, arm6, arm7, aarch64.

After run the above command the you  will find the packages directory and in it there are packages for multiple Architectures.

~~~shell
pradeep@pradeep-Inspiron-5567:~/Documents/apko/go/trail2-go/packages$ ll
total 12
drwxr-xr-x 2 root    root    4096 May  2 19:19 x86_64/

pradeep@pradeep-Inspiron-5567:~/Documents/apko/go/trail2-go/packages$ ls -al x86_64/
total 5812
-rw-r--r-- 1 root root     929 May  3 11:51 APKINDEX.tar.gz
-rw-r--r-- 1 root root 5935318 May  3 11:51 trail-v0.0.1-r0.apk
~~~
Here I only generate APK files only for  amd64 architecture.  You can find the package name trail as mentioned in the melange.yaml file. APKINDEX is used by the Alpine Linux package manager to index and track available packages in a repository for quick search and download.


## Step 4 - Getting Started with Apko

Apko is a tool that allows you to build lightweight and secure Docker images using Alpine Linux as the base image. It supports a declarative YAML-based syntax that allows you to define your image in a simple and readable way. Here are the steps to install and use apko:

# Installing apko and usage example
1. Install Docker: Apko requires Docker to be installed on your system. You can download and install Docker from the official website for your operating system.
2. Install apko: You can install apko by running the following command:

~~~shell
curl https://raw.githubusercontent.com/chainguard-dev/apko/main/install.sh | sh
~~~
We don't need to install any binary in our local for now, cause we already using docker for it.

Create a apko.yaml file and add the below content.
~~~shell
contents:
    keyring:
       - https://packages.wolfi.dev/os/wolfi-signing.rsa.pub
    repositories:
       - https://packages.wolfi.dev/os
       - '@local /work/packages'
    packages:
      - trail@local 
accounts:
  groups:
    - groupname: nonroot
      gid: 65532
  users:
    - username: nonroot
      uid: 65532
  run-as: 65532
entrypoint:
  command: ./usr/bin/backend-tutorial
~~~

Run the apko build then it will generate the image we expecting.

Command:-
~~~shell
docker run --rm -v ${PWD}:/work cgr.dev/chainguard/apko build --debug --arch amd64 apko.yaml trail:v0.0.1 trail.tar -k melange.rsa.pub
~~~

Note:- We can generate the same architecture image from APK files with melange. Otherwise there will be issues like we cannot build the images as we expected.

Above command will generate the image tar ball named trail.tar. We need load the image in docker then we can find the image. Run the below command

~~~shell
docker load < trail.tar

pradeep@pradeep-Inspiron-5567:~/Documents/apko/go/trail2-go$ docker load < trail.tar 
c00a6b2e8f93: Loading layer [==================================================>]  213.1MB/213.1MB
Loaded image: trail:v0.0.1-amd64
~~~

We generate the image named trail:v0.0.1-amd64. 

To test the application please run below commands
~~~
docker run -it --name test -p 8000:8080 trail:v0.0.1-amd64

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /api                      --> main.main.func1 (1 handlers)
[GIN-debug] GET    /users                    --> backend-tutorial/controllers.GetUsers (1 handlers)
[GIN-debug] GET    /user/:id                 --> backend-tutorial/controllers.GetUser (1 handlers)
[GIN-debug] PATCH  /user/:id                 --> backend-tutorial/controllers.EditUser (1 handlers)
[GIN-debug] POST   /addUser                  --> backend-tutorial/controllers.AddUser (1 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
~~~

Now you can access the application on localhost:8000/api

```
{"message":"Hello World!"}
```

# Cleanup

Remove the docker images Melange, Apko which we use for build the application. And also remove the generated image. Remove the directory you worked on to build the image.

# Reference links

* [Introducing wolfi](https://www.chainguard.dev/unchained/introducing-wolfi-the-first-linux-un-distro)
* [Melange Github](https://github.com/chainguard-dev/melange)
* [Apko Github](https://github.com/chainguard-dev/apko)
* [Official documentation of Melange](https://edu.chainguard.dev/open-source/melange)
* [Example application](https://edu.chainguard.dev/open-source/melange/tutorials/getting-started-with-melange/)

# Conclusion

The use of tools like wolfi, melange, and apko streamlines the process of building and packaging applications in container images, providing an efficient and secure way to deploy software in cloud-native environments. By utilizing declarative pipelines, multi-architecture apks, and attestation keys, these tools help ensure the provenance and integrity of the software artifacts, reducing the risk of security threats in the software supply chain.


