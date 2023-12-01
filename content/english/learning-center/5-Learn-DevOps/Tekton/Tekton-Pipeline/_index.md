---
title: "Setting up Tekton Pipeline"
date: 2023-11-16
draft: false
description: "Create TektonCI Pipeline"
weight: 1
---

# Tekton Pipeline

## Description
This pipeline performs a series of tasks related to source code management, Docker image building, scanning, and signing.

## Parameters
- **repo-url**: The URL of the Git repository to clone.
- **revision**: The revision to use.
- **PARAM_SCM**: Source Code Management URL (default: github.com).
- **pathToContext**: Path to the build context (default: src).
- **imageUrl**: Image name including repository.
- **imageTag**: Image tag (default: latest).
- **STORAGE_DRIVER**: Storage driver to use (default: vfs).
- **trivy-args**: Arguments for Trivy scanner (default: ['--format json']).
- **TRIVY_EXIT_CODE**: Exit code if critical vulnerabilities are found.
- **syft-args**: Arguments for Syft scanner (default: ['target/images/docker-image-local.tar', '-o syft-json']).
- **grype-args**: Arguments for Grype scanner (default: ['target/images/docker-image-local.tar', '-o json']).
- **SBOM_FORMAT**: Software Bill of Materials format (default: spdx-json).

## Workspaces
- **shared-data**: Contains the cloned repository files.
- **git-credentials**: Basic authentication for Git.
- **sonar-project.properties**: Sonar details for scanning and pushing results to SonarCloud.
- **sonar-token**: Sonar authentication token.
- **dockerconfig**: Docker configuration.
- **cosign**: Cosign configuration (private key).
- **cosign-pub**: Cosign configuration (public key).
- **docker-credentials**: Docker credentials.
- **clickhouse**: Clickhouse database connection.
- **python-clickhouse**: Python Clickhouse valuse.

## Tasks

### 1. fetch-source
- **Description**: Clones the Git repository.
- **Parameters**:
  - url: $(params.repo-url)
  - PARAM_SCM: $(params.PARAM_SCM)
  - revision: $(params.revision)

### 2. sonarqube-scanner
- **Description**: Runs SonarQube scanner.
- **Dependencies**: fetch-source
- **Workspaces**:
  - source: shared-data
  - sonar-settings: sonar-project.properties
  - sonar-token: sonar-token

### 3. build-dockerfile
- **Description**: Builds the Docker image.
- **Dependencies**: fetch-source, sonarqube-scanner
- **Workspaces**:
  - source: shared-data
  - dockerconfig: docker-credentials
- **Parameters**:
  - CONTEXT: $(params.pathToContext)
  - IMAGE: $(params.imageUrl):$(params.imageTag)

### 4. trivy-scanner
- **Description**: Scans the Docker image using Trivy.
- **Dependencies**: build-dockerfile
- **Workspaces**:
  - manifest-dir: shared-data
- **Parameters**:
  - IMAGE_PATH: $(params.imageUrl):$(params.imageTag)
  - ARGS: $(params.trivy-args[*])
  - EXIT_CODE: $(params.TRIVY_EXIT_CODE)

### 5. buildah-push
- **Description**: Pushes the Docker image to a registry.
- **Dependencies**: trivy-scanner
- **Workspaces**:
  - source: shared-data
  - dockerconfig: docker-credentials
- **Parameters**:
  - CONTEXT: $(params.pathToContext)
  - IMAGE: $(params.imageUrl):$(params.imageTag)
  - STORAGE_DRIVER: $(params.STORAGE_DRIVER)

### 6. trivy-sbom
- **Description**: Generates a Software Bill of Materials using Trivy.
- **Dependencies**: buildah-push
- **Workspaces**:
  - manifest-dir: shared-data
  - clickhouse: clickhouse
  - python-clickhouse: python-clickhouse
- **Parameters**:
  - IMAGE: $(params.imageUrl)
  - DIGEST: $(tasks.buildah-push.results.IMAGE_DIGEST)
  - format: $(params.SBOM_FORMAT)

### 7. cosign-sign
- **Description**: Signs the Docker image using Cosign.
- **Dependencies**: buildah-push
- **Workspaces**:
  - source: shared-data
  - dockerconfig: dockerconfig
  - cosign: cosign
- **Parameters**:
  - image: "$(params.imageUrl)@$(tasks.buildah-push.results.IMAGE_DIGEST)"

### 8. cosign-image-verify
- **Description**: Verifies the signed Docker image using Cosign.
- **Dependencies**: cosign-sign
- **Workspaces**:
  - source: shared-data
  - dockerconfig: dockerconfig
  - cosign: cosign-pub
- **Parameters**:
  - image: "$(params.imageUrl)@$(tasks.buildah-push.results.IMAGE_DIGEST)"
