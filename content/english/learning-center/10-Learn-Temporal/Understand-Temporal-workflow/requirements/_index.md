---
title: "Pre-requisites"
date: 2024-06-16
draft: false
description: "Requirements for understanding temporal workflows"
type : "learning-center"
weight: 1
---

To setup a temporal workflow, you will need to follow the steps below:

1. Install Temporal CLI, download the version for your architecture.
    Once you've downloaded the file, extract the downloaded archive and add the temporal binary to your PATH by copying it to a directory like /usr/local/bin.

    ```bash
    go install github.com/temporalio/temporal@latest
    ```

2. Create a temporal server

    ```bash
    temporal server start-dev
    ```

    This command starts a local Temporal Service. It starts the Web UI, creates the default Namespace, and uses an in-memory database.

    The Temporal Service will be available on localhost:7233.
    The Temporal Web UI will be available at http://localhost:8233.