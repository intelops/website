---
title: "Setting up Tracetest"
date: 2023-05-25
draft: false
# description
description: "Learn Tracebased testing and Funtional testing using assertions"
weight: 1
---

# Getting started with tracetest
## Why tracetest
Tracetest enables trace-based testing using OpenTelemetry traces, allowing you to define tests and assertions against microservices at every step of a request transaction. It offers flexibility in using your preferred trace backend, supports multiple transaction triggers, and ensures both response and underlying process correctness.

## Setting up tracetest on k8s
#### Install Tracetest CLI on local

###### LINUX
~~~shell
curl -L https://raw.githubusercontent.com/kubeshop/tracetest/main/install-cli.sh | bash
~~~
###### WINDOWS
~~~shell
choco source add --name=kubeshop_repo --source=https://chocolatey.kubeshop.io/chocolatey ; choco install tracetest
~~~
###### MAC
~~~shell
brew install kubeshop/tracetest/tracetest
~~~

#### Install the Tracetest server through Tracetest CLI
On terminal run the below command after installing the tracetest cli.
~~~shell
tracetest server install
~~~

Then you will find 2 options to setup the tracetest server. There you need to select kubernetes installation. Please check the below result after run the above command.

~~~shell
How do you want to run TraceTest? [type to search]:
  Using Docker Compose
> Using Kubernetes
~~~

#### Install the Tracetest server through Helm

You can find the Helm chart github location in below link 
[Github tracetest helm repo][def3]

You can install them locally on your machine with the command:
~~~shell
helm repo add kubeshop https://kubeshop.github.io/helm-charts
helm repo update
~~~

After that, you can install Tracetest with helm install:

~~~shell
helm install tracetest kubeshop/tracetest --namespace=tracetest --create-namespace
~~~

You will deployments of tracetest on tracetest namespace.

![alt text][def2]

> **NOTE**: 
> * Follow the prompts and continue with all the default settings. This will deploy all resources to Kubernetes. To see exactly what is deployed, view the deployment instructions in the Deployment section of the docs.

> **Condensed expected output from the Tracetest CLI:**
~~~shell
export POD_NAME=$(kubectl get pods --namespace demo -l "app.kubernetes.io/name=pokemon-api,app.kubernetes.io/instance=demo" -o jsonpath="{.items[0].metadata.name}")
export CONTAINER_PORT=$(kubectl get pod --namespace demo $POD_NAME -o jsonpath="{.spec.containers[0].ports[0].containerPort}")
echo "Visit http://127.0.0.1:8080 to use your application"
kubectl --namespace demo port-forward $POD_NAME 8080:$CONTAINER_PORT
kubectl --kubeconfig <path-to-your-home>/.kube/config --context <your-cluster-context> --namespace tracetest port-forward svc/tracetest 11633
~~~

Open your browser on http://localhost:11633.

You can now able to create tests on the UI of tracetest.

:star: Here is the UI of tracetest
![alt text][def]

## Reference Links

* Tracetest official docs - [Link][def5]
* Github Helm Repo - [Link][def4]


## Conclusion

Tracetest revolutionizes testing by leveraging OpenTelemetry traces. It enables trace-based testing with assertions at every step of a request, supporting multiple transaction triggers and offering flexibility with trace back-ends. Tracetest ensures both response and underlying process correctness, making it a valuable tool for end-to-end and integration testing in distributed systems.

[def]: ./tracetest-ui.png
[def2]: ./tracetest-helm-services.png
[def3]: https://github.com/kubeshop/helm-charts/tree/main/charts/tracetest
[def4]: https://github.com/kubeshop/helm-charts/tree/main/charts/tracetest
[def5]: https://docs.tracetest.io/