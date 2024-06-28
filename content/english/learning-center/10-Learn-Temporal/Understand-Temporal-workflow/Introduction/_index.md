---
title: "Introduction"
date: 2024-06-16
draft: false
description: "This is an introduction to the temporal workflow using the Temporal CLI , and understand how to use the Temporal server along with golang SDK."
type: "learning-center"
weight: 2
---

## Demystifying Temporal Workflows: A Hello World Example with Go Workers

Temporal offers a robust platform for building reliable distributed applications. It achieves this with a core concept: workflows. But how do these workflows function, and how do workers fit into the picture? Let's explore this with a classic example – a "Hello World" program written in Golang that utilizes Temporal workflows and workers.

## Understanding Workflows and Activities

A Temporal workflow orchestrates a sequence of tasks. Each task within a workflow is encapsulated as an activity function. These activities are independent, often performing specific actions like database access or external API calls. The workflow dictates the order of activity execution and handles any dependencies between them.

## The Worker's Role

Workers are the engines that power Temporal workflows. They are standalone processes responsible for executing both workflow and activity functions. A worker typically registers the workflow and activity definitions it can handle. When the Temporal server initiates a workflow execution, it dispatches tasks to available workers based on their registered capabilities.