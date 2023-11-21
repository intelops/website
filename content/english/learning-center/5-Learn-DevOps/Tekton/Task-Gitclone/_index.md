---
title: "Tekton Task Git-Clone"
date: 2023-11-16
draft: false
description: "Cloning The Source Code"
weight: 2
---

# Tekton ClusterTask: git-clone

## Description

The `git-clone` ClusterTask is used to clone a Git repository. It supports various parameters for customization, such as specifying the repository URL, revision, refspec, and more. This task is essential for fetching source code from a Git repository in a Tekton pipeline.

## Parameters

- **url** (type: string, default: ""):
  The URL of the Git repository to clone from.

- **revision** (type: string, default: ""):
  The revision to checkout (branch, tag, sha, ref, etc.).

- **refspec** (type: string, default: ""):
  The refspec to fetch before checking out the revision.

- **submodules** (type: string, default: "true"):
  Initialize and fetch Git submodules.

- **depth** (type: string, default: "0"):
  Perform a shallow clone, fetching only the most recent N commits.

- **sslVerify** (type: string, default: "true"):
  Set the `http.sslVerify` global Git config. Setting this to `false` is not advised unless you are sure that you trust your Git remote.

- **crtFileName** (type: string, default: "ca-bundle.crt"):
  The file name of the mounted certificate using the `ssl-ca-directory` workspace.

- **subdirectory** (type: string, default: ""):
  Subdirectory inside the `output` workspace to clone the repo into.

- **sparseCheckoutDirectories** (type: string, default: ""):
  Define the directory patterns to match or exclude when performing a sparse checkout.

- **deleteExisting** (type: string, default: "true"):
  Clean out the contents of the destination directory if it already exists before cloning.

- **httpProxy** (type: string, default: ""):
  HTTP proxy server for non-SSL requests.

- **httpsProxy** (type: string, default: ""):
  HTTPS proxy server for SSL requests.

- **noProxy** (type: string, default: ""):
  Opt out of proxying HTTP/HTTPS requests.

- **verbose** (type: string, default: "true"):
  Log the commands that are executed during `git-clone`'s operation.

- **gitInitImage** (type: string, default: "gcr.io/tekton-releases/github.com/tektoncd/pipeline/cmd/git-init:v0.40.2"):
  The image providing the `git-init` binary that this Task runs.

- **userHome** (type: string, default: "/home/git"):
  Absolute path to the user's home directory.

- **PARAM_SCM** (type: string, default: "github.com"):
  Define the Source Code Management URL.

## Workspaces

- **output**:
  The Git repository will be cloned onto the volume backing this Workspace.

- **ssh-directory** (optional):
  A `.ssh` directory with private key, known_hosts, config, etc. Copied to the user's home before Git commands are executed. Used to authenticate with the Git remote when performing the clone. Binding a Secret to this Workspace is strongly recommended over other volume types.

- **basic-auth** (optional):
  A Workspace containing a `.gitconfig` and `.git-credentials` file. These will be copied to the user's home before any Git commands are run. Any other files in this Workspace are ignored. It is strongly recommended to use `ssh-directory` over `basic-auth` whenever possible and to bind a Secret to this Workspace over other volume types.

- **ssl-ca-directory** (optional):
  A workspace containing CA certificates, which will be used by Git to verify the peer when fetching or pushing over HTTPS.

## Results

- **commit**:
  The precise commit SHA that was fetched by this Task.

- **url**:
  The precise URL that was fetched by this Task.

- **committer-date**:
  The epoch timestamp of the commit that was fetched by this Task.

## Steps

### clone

This step uses the `git-init` binary provided by the specified `gitInitImage` to perform the Git clone operation. It sets up the necessary Git configurations, handles authentication, and clones the repository.

### git-sign

This step verifies the integrity of the fetched commit using Git's signature. It checks if the commit has a Good sign (G) or an Evil sign (E). If an Evil sign is detected, it exits with a non-zero status, indicating a potential issue.

### Steps

#### clone

This step is responsible for performing the Git clone operation. It utilizes the `git-init` binary provided by the specified `gitInitImage`. Here's a breakdown of what it does:

1. **Setting Up Environment**: It sets up the environment variables required for the clone operation. This includes parameters like URL, revision, refspec, etc.

2. **Handling Authentication**:
   - If `WORKSPACE_BASIC_AUTH_DIRECTORY_BOUND` is set to `true`, it configures Git credentials using the `.git-credentials` file. This allows authentication with the Git remote.
   - If `WORKSPACE_SSH_DIRECTORY_BOUND` is set to `true`, it copies the `.ssh` directory (containing private key, known_hosts, config, etc.) to the user's home. This is used for SSH authentication.

3. **SSL Certificate Verification**:
   - If `WORKSPACE_SSL_CA_DIRECTORY_BOUND` is set to `true`, it configures Git to use CA certificates for SSL verification.

4. **Cleaning Existing Directory (if required)**:
   - If `PARAM_DELETE_EXISTING` is set to `true`, it clears the contents of the destination directory.

5. **Configuring Proxies (if specified)**:
   - It sets HTTP and HTTPS proxy servers if provided.

6. **Cloning the Repository**:
   - It uses `git-init` to perform the clone operation. This includes parameters like URL, revision, refspec, etc.
   
7. **Result Handling**:
   - It captures the commit SHA and committer date for later use.

This script ensures that the Git clone operation is performed with the specified parameters and configurations, allowing for a seamless integration into the Tekton pipeline.

#### git-sign

This step verifies the integrity of the fetched commit using Git's signature. It checks if the commit has a Good sign (G) or an Evil sign (E). If an Evil sign is detected, it exits with a non-zero status, indicating a potential issue.

```bash
#!/bin/sh

ls -al
cat /etc/os-release
apk update --no-cache && apk add git gpg gpgsm --no-cache
git config --global --add safe.directory /workspace/output
if git log --format="%G?" -n 1 "$(params.revision)" | grep -vq "N"; then
    echo "The commit has a Good sign (G)."
else
    echo "The commit has an Evil sign (E)."
    exit 1
fi
```