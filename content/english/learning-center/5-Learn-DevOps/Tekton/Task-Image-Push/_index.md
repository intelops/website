---
title: "Tekton Task Image Push"
date: 2023-11-16
draft: false
description: "Pusing the Container Image using Buildah"
weight: 5
---

## Build and Push

This Tekton task builds a container image using Buildah and pushes it to a container registry.

### Parameters

- **IMAGE**: Reference of the image Buildah will produce.
- **BUILDER_IMAGE**: The location of the Buildah builder image.
  - Default: quay.io/buildah/stable:v1.29.1
- **STORAGE_DRIVER**: Set the Buildah storage driver.
  - Default: vfs
- **DOCKERFILE**: Path to the Dockerfile to build.
  - Default: ./Dockerfile
- **CONTEXT**: Path to the directory to use as context.
  - Default: src
- **FORMAT**: The format of the built container, oci or docker.
  - Default: "docker"

### Workspaces

- **source**
- **dockerconfig**: 
  An optional workspace that allows providing a .docker/config.json file for Buildah to access the container registry. The file should be placed at the root of the Workspace with the name `config.json`.

### Results

- **IMAGE_DIGEST**: Digest of the image just built.
- **IMAGE_URL**: Image repository where the built image would be pushed to.

### Steps

#### build

This step performs the build and push process.

```bash
#!/usr/bin/env sh
set -x
ls -al target/images/

buildah --storage-driver=$(params.STORAGE_DRIVER) images

buildah --storage-driver=$(params.STORAGE_DRIVER) pull docker-archive:target/images/docker-image-local.tar

buildah --storage-driver=$(params.STORAGE_DRIVER) images  

buildah --storage-driver=$(params.STORAGE_DRIVER) push \
  --authfile /workspace/dockerconfig/config.json \
  --digestfile /tmp/image-digest $(params.IMAGE) \
  docker://$(params.IMAGE)
  
cat /tmp/image-digest | tee $(results.IMAGE_DIGEST.path)
echo -n "$(params.IMAGE)" | tee $(results.IMAGE_URL.path)
```
It uses Buildah commands to pull the built image, and finally, it pushes the image to the specified container registry. The resulting image digest and repository URL are saved as task results.




