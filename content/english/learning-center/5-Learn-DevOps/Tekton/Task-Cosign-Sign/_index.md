---
title: "Tekton Task Image Signing"
date: 2023-11-16
draft: false
description: "Sign the Image using Cosign"
weight: 8
---

# cosign-sign

This task is responsible for signing container images using Cosign.

### Workspaces
- `source`: The workspace containing the source code.
- `dockerconfig`: An optional workspace that allows providing a `.docker/config.json` file for Buildah to access the container registry. The file should be placed at the root of the Workspace with the name `config.json`.
- `cosign`: Cosign private key to sign the image.

### Parameters
- `image`: The image to be signed by Cosign.

### Steps

#### cosign-sign

This step performs the actual signing process.

```bash
#!/usr/bin/env sh
mkdir -p ~/.docker/
export registry=`cat /workspace/dockerconfig/registry`
export username=`cat /workspace/dockerconfig/username`
export password=`cat /workspace/dockerconfig/password`
cosign login $registry -u $username -p $password
export COSIGN_PASSWORD=""
cosign sign -y --key /workspace/cosign/cosign.key $(params.image)
```

It extracts the registry, username, and password from the provided workspace and logs into the specified registry. Cosign login to registry and sign the Image and push the signing key to container registry.