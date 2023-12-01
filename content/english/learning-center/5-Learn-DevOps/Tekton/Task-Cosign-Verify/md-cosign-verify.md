---
title: "Tekton Task Image Sign Verify"
date: 2023-11-16
draft: false
description: "Verifying the Image sign using Cosign"
weight: 9
---

# cosign-image-verify

This task is responsible for verifying the signature of a container image using Cosign.

### Description
This task uses Cosign to verify the signature of a container image.

### Workspaces
- `source`: The workspace containing the source code.
- `dockerconfig`: An optional workspace that allows providing a `.docker/config.json` file for Buildah to access the container registry. The file should be placed at the root of the Workspace with the name `config.json`.
- `cosign`: Cosign private key to verify the image signature.

### Parameters
- `image`: The image to be verified by Cosign.

### Steps

#### cosign-sign

This step performs the actual verification process.

```bash
#!/usr/bin/env sh
mkdir -p ~/.docker/
export registry=`cat /workspace/dockerconfig/registry`
export username=`cat /workspace/dockerconfig/username`
export password=`cat /workspace/dockerconfig/password`
cosign login $registry -u $username -p $password
export COSIGN_PASSWORD=""
cosign verify --key /workspace/cosign/cosign.pub $(params.image)
```

It extracts the registry, username, and password from the provided workspace and logs into the specified registry.And it uses Cosign to verify the signature of the provided image using the specified public key.

Please ensure the necessary configurations are provided in the workspaces (dockerconfig and cosign) before running this task.