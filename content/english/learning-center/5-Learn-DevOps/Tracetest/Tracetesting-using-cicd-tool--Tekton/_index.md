---
title: "Tracetesting using ci/cd tool - Tekton"
date: 2023-05-25
draft: false
# description
description: "Learn Tracebased testing and Funtional testing using assertions"
weight: 2
---

## Setting up tekton pipelines on k8s

To install Tekton Pipelines on a Kubernetes cluster:
1. Run one of the following commands depending on which version of Tekton Pipelines you want to install:
* **Latest official release:**
```cmd
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```

* **Specific release:**
```cmd
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/previous/<version_number>/release.yaml
```
Replace <version_number> with the numbered version you want to install. For example, v0.28.2

2. Monitor the installation:
```cmd
kubectl get pods --namespace tekton-pipelines --watch
```

When all components show 1/1 under the READY column, the installation is complete. Hit Ctrl + C to stop monitoring.

After you can see the complete resource by running below command.
```cmd
kubectl get all -n tekton-pipelines
```

The result looks like 
![atl text][def3]

### Before starting trace testing, you need to setup the tracetest server on kubernetes.

For the tracetest server installation please follow the setting up tracetest document from [intelops website][def] [learning center][def2].

### Creating Docker image for Tracetest CLI

In our Tekton task for Tracetest, we will create a custom Docker image that includes the Tracetest CLI, which we have installed beforehand.

You have the flexibility to either use the provided Dockerfile to set up your own Tracetest CLI image or utilize Intelops' pre-built Tracetest image within your Tekton task.

**Dockerfile**
~~~docker
FROM cgr.dev/chainguard/wolfi-base as build

RUN apk update && apk add curl bash
RUN curl -L https://raw.githubusercontent.com/kubeshop/tracetest/main/install-cli.sh | bash
RUN chmod 755 /tmp/tracetest

FROM cgr.dev/chainguard/wolfi-base

COPY --from=build /tmp/tracetest /usr/bin/tracetest 

ENTRYPOINT ["/bin/bash -l"]
~~~

## Getting started with Tracetest

1. We need Microservice with OTEL instrumented.
2. Deploy the Microservice in K8s.
3. Check the traces in data source like Grafana tempo or Jaeger.
4. Define your tracetest definition file to test the microservice.
   
Here is an example definition file test.yaml which I deployed my NodeJS app into K8s.

```yaml
type: Test
spec:
  name: otempo-post-req
  description: post req test
  trigger:
    type: http
    httpRequest:
      url: http://otempo-service.default.svc.cluster.local:8080/items
      method: POST
      headers:
      - key: Content-Type
        value: application/json
      body: |2-
         {
        "name": "user-name",
        "description": "to test the NodeJS app",
        "price": 98
        }
  specs:
    - selector: span[name = "POST /items"]
      assertions:
        - attr:tracetest.span.duration <= 500ms
        - attr:http.status_code = 201
  outputs:
  - name: USER_TEST_ID
    selector: span[name = "work testing post"]
    value: attr:tracetest.response.body | json_path '$.id'
```

5. Save your definition file in git repo.
6. Use the below tekton task to test you Micoservice.
```yaml
apiVersion: tekton.dev/v1beta1
kind: ClusterTask
metadata:
  name: tracetest
spec:
  params:
    - name: file-name
      type: string        
  workspaces:
    - name: source      
  steps:
  - name: tracetest
    image: pradeepgoru/tracetest:latest
    workingDir: $(workspaces.source.path)
    script: |
       sleep 20
       pwd
       ls -al
       tracetest configure --endpoint http://tracetest.tracetest.svc.cluster.local:11633 --analytics=false
       tracetest test run --definition $(params.file-name) --verbose -w
```

7. We need a pipeline configured with git-clone and tracetest task. Here is my pipeline
   
```yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: tracetest
spec:
  params:
  - name: repo-url
    type: string 
    description: The git repo URL to clone from.
  - name: file-name
    type: string
    description: The definition file
  workspaces:
  - name: shared-data
    description: |
      This workspace contains the cloned repo files, so they can be read by the
      next task.
  - name: git-credentials
    description: basic-auth
  tasks:
  - name: fetch-source
    taskRef:
      name: git-clone
      kind: ClusterTask
    workspaces:
    - name: output
      workspace: shared-data
    - name: basic-auth
      workspace: git-credentials
    params:
    - name: url
      value: $(params.repo-url)
  - name: tracetest
    taskRef:
      name: tracetest
      kind: ClusterTask
    runAfter:
      - fetch-source
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: file-name
      value: $(params.file-name)
```

8. Provide the necessary configurations to git-clone and then add the tracetest task in the pipeline.

9. Now we need configure a PipelineRun to  trigger the pipeline.

Here is an example pipelinerun

```yaml
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: tracetest-run
spec:
  pipelineRef:
    name: tracetest
  podTemplate:
    securityContext:
      fsGroup: 65532
  workspaces:
  - name: shared-data
    volumeClaimTemplate:
      spec:
        accessModes:
        - ReadWriteOnce
        resources:
          requests:
            storage: 2Gi
  - name: git-credentials
    secret:
      secretName: basic-auth
  params:
    - name: repo-url
      value: https://gitlab.com/intelops/definitions-files.git
    - name: file-name
      value: test.yaml
```

After run the pipeline you will find the tekton taskruns and pipelinerun succeeded and jobs in completed state.

![alt text][def4]
![alt text][def6]
![alt text][def5]

The logs of tracetest task be like 

![alt text][def7]

## Reference Links
Tekton Docs - [Link][def8]
Instrumentation - [Link][def9]
Tracetest Definition - [Link][def10]
Tracetest Github Examples - [Link][def11]

[def]: https://capten.ai/
[def2]: https://capten.ai/learning-center/
[def3]: ./tekton-installation-show.png
[def4]: tekton-taskrun-completed.png
[def5]: tekton-task-completed.png
[def6]: tekton-pr-completed.png
[def7]: tekton-tracetest-job-logs.png
[def8]: https://tekton.dev/docs/
[def9]: https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/
[def10]: https://docs.tracetest.io/live-examples/pokeshop/use-cases/add-pokemon
[def11]: https://github.com/kubeshop/tracetest/tree/main/examples