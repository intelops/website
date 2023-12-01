---
title: "Tekton Task Trivy-Scanning"
date: 2023-11-16
draft: false
description: "Scan Container Image to check Vulnerabilities"
weight: 6
---

## Trivy Scanner

This Tekton task uses Trivy, a comprehensive scanner for vulnerabilities in container images, file systems, and Git repositories, as well as for configuration issues. It scans for vulnerabilities in the source code in standalone mode.

### Parameters

- **ARGS**: The arguments to be passed to the Trivy command.
- **TRIVY_IMAGE**: Trivy scanner image to be used.
  - Default: docker.io/aquasec/trivy@sha256:dea76d4b50c75125cada676a87ac23de2b7ba4374752c6f908253c3b839201d9
- **IMAGE_PATH**: Image or path to be scanned by Trivy.
- **EXIT_CODE**: Define the exit code if severity vulnerabilities are found.

### Workspaces

- **manifest-dir**

### Steps

#### trivy-scan

This step runs the Trivy scanner on the specified image or path.

```bash
#!/usr/bin/env sh
ls -al
pwd
ls -al /workspaces
ls -al target/images
cmd="trivy image --input target/images/docker-image-local.tar --format json"
# cmd="trivy $* /tmp/trivy_scanner_image.tar"
echo "Running trivy task with command below"
echo "$cmd"
eval "$cmd"
echo "result of above command $?"
trivy image --severity CRITICAL --input target/images/docker-image-local.tar --exit-code $(params.EXIT_CODE)
if [[ $? == 1 ]]
then
  echo "find critical vulns"
  exit 1
else
  echo "no critical vulns"
fi
```
It then constructs and executes the Trivy command to scan the specified image. If critical vulnerabilities are found, the task exits with an error code.

