---
title: "Workflow with Temporal"
date: 2024-06-16
draft: false
description: "Understanding temporal workflows with a sample workflow `hello_world`"
type : "learning-center"
weight: 3
---

# Understanding Temporal's workflows with a Hello World Example

### Components Overview

1. **Worker**: The worker listens for tasks and executes the workflow and activities.
2. **Starter**: The starter initiates the workflow.
3. **Workflow and Activities**: These define the actual tasks to be performed.

### The Worker

The worker is responsible for executing the workflows and activities registered with it. Here’s a closer look at the worker implementation:

```go
package worker

import (
    "log"
    temporallearnings "temporal-learnings"

    "go.temporal.io/sdk/client"
    "go.temporal.io/sdk/worker"
)

func HelloWorker() {
    c, err := client.Dial(client.Options{})
    if err != nil {
        log.Fatalln("Unable to create client", err)
    }
    defer c.Close()

    w := worker.New(c, "hello-world", worker.Options{})

    w.RegisterWorkflow(temporallearnings.Workflow)
    w.RegisterActivity(temporallearnings.Activity)

    err = w.Run(worker.InterruptCh())
    if err != nil {
        log.Fatalln("Unable to start worker", err)
    }
}
```

**Explanation**:
1. **Client Connection**: Establishes a connection to the Temporal server.
2. **Worker Creation**: Creates a new worker that listens to the "hello-world" task queue.
3. **Register Workflow and Activity**: Registers the workflow and activity functions defined in the `temporallearnings` package.
4. **Run Worker**: Starts the worker to listen for tasks until interrupted.

### The Starter

The starter is responsible for initiating the workflow execution. Here's how it's done:

```go
package main

import (
    "context"
    "log"
    temporallearnings "temporal-learnings"

    "go.temporal.io/sdk/client"
)

func main() {
    c, err := client.Dial(client.Options{})
    if err != nil {
        log.Fatalln("Unable to create client", err)
    }
    defer c.Close()

    workflowOpts := client.StartWorkflowOptions{
        ID:    "hello-world_workflow_id",
        TaskQueue: "hello-world",
    }

    workflowExec, err := c.ExecuteWorkflow(context.Background(), workflowOpts, temporallearnings.Workflow, "TemporalLearning")
    if err != nil {
        log.Fatalln("Unable to execute workflow", err)
    }

    log.Println("Started workflow", workflowExec.GetID(), "with runID", workflowExec.GetRunID())

    var result string
    err = workflowExec.Get(context.Background(), &result)
    if err != nil {
        log.Fatalln("Unable to get workflow result", err)
    }
    log.Println("Workflow result: ", result)
}
```

**Explanation**:
1. **Client Connection**: Establishes a connection to the Temporal server.
2. **Workflow Options**: Defines options for starting the workflow, such as the workflow ID and the task queue name.
3. **Execute Workflow**: Starts the workflow execution, passing "TemporalLearning" as an input parameter to the workflow function.
4. **Get Result**: Waits for the workflow to complete and retrieves the result.

### The Workflow and Activities

The workflow and activities define the tasks that will be executed. Here’s the implementation:

```go
package temporallearnings

import (
    "context"
    "time"

    "go.temporal.io/sdk/activity"
    "go.temporal.io/sdk/workflow"
)

func Workflow(ctx workflow.Context, name string) (string, error) {
    actOpts := workflow.ActivityOptions{
        StartToCloseTimeout: 10 * time.Second,
    }

    ctx = workflow.WithActivityOptions(ctx, actOpts)

    logger := workflow.GetLogger(ctx)
    logger.Info("TemporalLearning Workflow started, name: " + name)

    var result string
    err := workflow.ExecuteActivity(ctx, Activity, name).Get(ctx, &result)
    if err != nil {
        logger.Error("Activity failed.", "Error", err)
        return "", err
    }
    logger.Info("TemporalLearning Workflow completed, result: " + result)
    return result, nil
}

func Activity(ctx context.Context, name string) (string, error) {
    logger := activity.GetLogger(ctx)
    logger.Info("TemporalLearning Activity started, name: " + name)

    time.Sleep(5 * time.Second)
    return name + " Activity completed", nil
}
```

**Explanation**:
1. **Workflow Function**: This is the main function that orchestrates the workflow. It configures activity options and executes the activity.
    - **Activity Options**: Sets a timeout for the activity.
    - **Logger**: Logs the start and completion of the workflow.
    - **Execute Activity**: Runs the activity and waits for its result.
2. **Activity Function**: This defines the task to be performed.
    - **Logger**: Logs the start of the activity.
    - **Sleep**: Simulates a task by sleeping for 5 seconds.
    - **Return Result**: Returns a completion message.

### Putting It All Together

1. **Start the Worker**: Run the worker to start listening for tasks.
    ```sh
    go run worker.go
    ```
2. **Start the Workflow**: Run the starter to initiate the workflow.
    ```sh
    go run starter.go
    ```

The worker will pick up the task from the task queue, execute the workflow and its associated activities, and return the result. The starter will log the workflow result once the workflow execution is complete.

[Source code](https://github.com/azar-writes-code/temporal-learnings)

### Conclusion

This simple "Hello World" example demonstrates the basic structure of a Temporal application, including worker setup, workflow initiation, and task execution. Temporal's powerful features allow developers to build robust and scalable applications with ease.
