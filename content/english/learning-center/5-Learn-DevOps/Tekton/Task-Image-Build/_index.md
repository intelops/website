---
title: "Tekton Task Image build"
date: 2023-11-16
draft: false
description: "Building the container Image using Buildah"
weight: 4
---

## Build Dockerfile

This Tekton task builds a Docker image using Buildah, providing the necessary parameters for customization.

### Parameters

- **IMAGE**: Reference of the image that Buildah will produce.
- **BUILDER_IMAGE**: The location of the Buildah builder image.
  - Default: quay.io/buildah/stable:v1.29.1
- **STORAGE_DRIVER**: Set the Buildah storage driver.
  - Default: vfs
- **DOCKERFILE**: Path to the Dockerfile to build.
  - Default: ./Dockerfile
- **CONTEXT**: Path to the directory to use as the build context.
  - Default: src
- **FORMAT**: The format of the built container, either oci or docker.
  - Default: docker

### Workspaces

- **source**: Workspace containing the source code.
- **dockerconfig** (Optional):
  - An optional workspace that allows providing a .docker/config.json file for Buildah to access the container registry.
  - The file should be placed at the root of the Workspace with the name `config.json`.

### Steps

#### Build

This step executes the build process using Buildah.

```bash
set -x
pwd 
ls -ltr
buildah --storage-driver=$(params.STORAGE_DRIVER) bud \
  --format=$(params.FORMAT) \
  --no-cache \
  -f $(params.DOCKERFILE) -t $(params.IMAGE)

rm -rf "target/images"
mkdir -p "target/images"
buildah push \
  --storage-driver=$(params.STORAGE_DRIVER) \
  --format docker \
  $(params.IMAGE) \
  docker-archive:target/images/docker-image-local.tar
ls -al target/images
```
The script begins by setting up the environment, then initiates the build process with Buildah. After the build, it manages the resulting image and stores it in the desired format and location.

**Security Context:** This step requires privileged access.