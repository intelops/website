---
title: "Health Check Probes and it's importance in Kubernetes"
date: 2023-04-28
draft: false
# description
description: "A way to check if a container in a pod is running and ready to serve traffic using liveness probe, readiness probe and startup probe in Kubernetes."
image: images/blog/health-check-probes-and-its-importance/healthcheck.svg

categories:
- Kubernetes
cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: vishwas-prasanna
---
Health check probes, a Kubernetes concept to determine if a container in a pod is running and serving traffic or not, aka healthy or not. 😃

#### Types of Probes

* `Liveness Probe` - To check whether the container is running and is used to restart the container.
* `Readiness Probe` - To check whether the container is ready to serve traffic and is used to stop sending traffic.
* `Startup Probe` - To check whether the container has started up for the first time and is used to restart the container.

#### Why you may need Startup Probes?

Legacy Applications may contain slow starting containers that needs added time on their initialization, to address this problem we configure the startup probes.  
If my application takes 3 mins to finish startup during worst case scenario, then we configure the startupProbe to reflect this as below.

```yaml
startupProbe: 
 httpGet: 
  path: /healthz
  port: 8080
 failureThreshold: 30
 periodSeconds: 6
```

How 3 mins you ask 😕, `failureThreshold * periodSeconds = 30 * 6 = 180 secs = 3 min.` 🤓

#### How to configure Liveness and Readiness Probes?

Health check probes are defined in the deployment configuration file of your application under pod's template spec field.

```yaml
apiversion: myDemoApplication/v1
kind: Deployment
metadata:
  name: demo-deployment
spec:
  replicas: 1
  selector:
 matchLabels:
   app: my-demo-app
  template:
    metadata:
      labels: 
      app: my-demo-app
    spec:
      containers:
   - name: demo-app-container
     image: demo-app-container:latest
     ports:
     - containerPort: 8080
     livenessProbe:
        httpGet:
            path: /healthz
            port: 8080
         initialDelaySeconds: 15
         periodSeconds: 20
        readinessProbe:
         httpGet:
            path: /ready
            port: 8080
         initialDelaySeconds: 5 
         periodSeconds: 10
```

In the above sample deployment file, the liveness probe and the readiness probe is defined using an `HTTP GET` request to the `/healthz` and `/ready` endpoint respectively on port 8080. You can also define a [TCP](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-tcp-liveness-probe) or [gRPC](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#define-a-grpc-liveness-probe) livelness probes as well.

initialDelaySeconds and periodSeconds are only couple of fields that is defined for probes in this `sample-deployment.yaml`. We can use other fields like timeoutSeconds, successThreshold, failureThreshold and terminationGracePeriodSeconds. To learn what each field signifies you can refer [here](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

#### Conclusion

If you want to ensure the stability and reliability of your application in Kubernetes consider defining the health check probes. Configuring them can help you to monitor the health of your application and take necessary actions in case if something goes wrong, which inturn leads to having a smooth operating, high availability application in a Kubernetes environment.
