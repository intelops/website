---
date: 2022-11-17
title: Connecting The OpenTelemetry Collector To Vector
description: Series on how to transfer OpenTelemetry data to your desired Target using Vector.
image: images/blog/connecting-the-opentelemetry-collector-to-vecor/collecting.png

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: hannan-khan
series: DevSecOps Series
categories:
- DevSecOps
- Cloud Native
- Kubernetes
- Observability
- Monitoring

# image color code in undraw.co #FB7E44 
feedback: false
draft: false
---

{{< image src="images/blog/connecting-the-opentelemetry-collector-to-vecor/collecting.png" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

OpenTelmetry provides amazing, standardized tools for collecting observability information about your cluster, one of which is a
Collector which can receive/process/export data. Vector, on the other hand, is also a very powerful tool for collecting, transforming,
and exporting data. Its power comes from the sheer amount of plugins available for it. To combine these two would result in an even
more capable data pipeline, as all of your data would be in one place. However, if you try to export OpenTelemetry data to Vector via
gRPC, you will likely encounter issues. This blog aims to show how to set up an OpenTelmetry Collector, set up Vector, and connect the two.  
________________

# Deploying An OpenTelemetry Collector

We will be using `helm` to deploy our services to our cluster. This will allow for easy installs/uninstalls. It will also
allow for being able to configure our services via one single YAML file each.
> Need to refresh your knowledge on YAML? Take a look at our blog [Hacking YAML to your Benefit](http://intelops.ai/blog/hacking-yaml-to-your-benefit/)

# [open-telemetry collector](https://raw.github.com/open-telemetry/opentelemetry.io/main/iconography/Otel_Collector.svg "The Collector's receivers and exporters")

The OpenTelemetry Collector (OTel Collector) allows multiple sources including OTLP formatted data, Jaeger, and Prometheus. The data we will be passing into
our OTel Collector will be Pixie data. If you would like a tutorial on how to deploy Pixie on your cluster, take a look at [this blog](http://intelops.ai/blog/failed-pixie-deployment-on-civo-kubernetes/).  
There is a [helm-chart](https://github.com/open-telemetry/opentelemetry-helm-charts) that is offered by OpenTelemetry, which we will be using.
Deploying the OTel Collector is as easy as running the following commands:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install otel-collector open-telemetry/opentelemetry-collector
```

This deployment will use the [default values.yaml](https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml) file.
Download this file, rename it to `collector_values.yaml`, and keep in a folder, as we will be modifying it to redeploy the OTel Collector with our custom values.  
At this point, you should set up your OTel Collector's source correctly. In our case, this means updating the Pixie's UI with the correct long-term data retention plugin (the OpenTelemetry one).

# Deploying A Vector Aggregator

Deploying Vector is as easy as deploying the OTel Collector. The helm-chart can be found [here](https://github.com/vectordotdev/helm-charts/tree/develop/charts/vector), while the default
values YAML file can be found [here](https://github.com/vectordotdev/helm-charts/blob/develop/charts/vector/values.yaml). Make sure to save this values file as well, as we will be updating it
with our custom configuation, and redeploying Vector. The commands below will deploy the Vector Aggregator:

```shell
helm repo add vector https://helm.vector.dev
helm repo update
helm install vector vector/vector --namespace vector --create-namespace
```

At any point, while Vector is deploying and running successfully, you can check the status of your aggregator's events using this command:

```shell
kubectl -n vector exec -it statefulset/vector -- vector top
```

# Modifying The Values Files

Let's start by opening up the `collector_values.yaml` file we had saved earlier. In this file, we need to change a few configurations for our OTel Collector to be able to communicate with our Vector
Aggregator.  

1. The `mode` value needs to be changed from empty quotes to "deployment".
2. For this particular tutorial, using Pixie as the data source, the config parameter of this file needs to be modified to reflect Pixie as a data receiver:

 ```yaml
 config:
   receivers:
  otlp:
    protocols:
   grpc:
     endpoint: 0.0.0.0:4317
 ```

3. Within the same `config` parameter, we need to set the exporters. We will be exporting to two places, the logs for the OTel Collector pod, and the HTTP connection to Vector.

 ```yaml
 exporters:
  logging:
   loglevel: debug
   sampling_initial: 5
   sampling_thereafter: 200
  otlphttp:
   endpoint: http://vector.vector.svc.cluster.local:80
 ```

 Here, I have decided to use `port 80` to send data to Vector.
4. Within the `config.service.pipelines` parameter, we need to modify the following:

 ```yaml
    pipelines:
      logs: { }
      metrics:
        receivers: [ otlp ]
        processors: [ memory_limiter, batch ]
        exporters: [ otlphttp, logging ]
      traces:
        receivers: [ otlp ]
        processors: [ memory_limiter, batch ]
        exporters: [ otlphttp, logging ]
 ```

5. Your OTel Collector is ready to be upgraded. Use the following command to force upgrade your collector with the new values file.

 ```shell
 helm upgrade otel-collector open-telemetry/opentelemetry-collector -f collector_values.yaml
 ```

Now, let's move on to modifying the `vector_values.yaml` file to modfiy the configuration for our Vector Aggregator.

1. The `role` parameter needs to be set to "Aggregator".
2. Within the `service.ports` parameter, we need to expose `port 80` for our otlp (OpenTelemetry) data to flow in:

 ```yaml
 ports:
   - name: otlp-http
     port: 80
     protocol: TCP
     targetPort: 80
 ```

3. In the `customConfig` parameter,  we provide our custom configuration for the Vector Aggregator we are going to deploy.

 ```yaml
 customConfig:
   api:
  enabled: true
  address: 127.0.0.1:8686
  playground: true
   sources:
  otlp-http:
    type: http
    address: 0.0.0.0:80
    # this path is automatically added by OpenTelemetry.
    # this is because we are exporting metrics, so it adds a default path.
    # The path can be changed/set in the collector_values.yaml file.
    path: /v1/metrics
    encoding: text
   sinks:
  stdout:
    encoding:
   codec: json
    inputs:
    - otlp-http
    target: stdout
    type: console
 ```

 Here, we are receiving input (sources) from our OTel Collector, at `localhost:80`. This has a path `/v1/metrics` appended to it by the OTel Collector itself.
 For sinks (exporters) we are defining one exporter, `standard output (stdout)`. This will take the data from our `HTTP` connection, and output it in the form of logs within our Vector Aggregator pod.
4. Now you have configured all that is necessary for Vector to be able to get data from the OTel Collector. We can upgrade our Vector deployment with the new values, using the following command:

 ```shell
 helm upgrade vector vector/vector --namespace vector --values vector_values.yaml
 ```

# Verifying Our Data Collection Using Vector

At this point, with both the OTel Collector and the Vector Aggregator deployed, we should start seeing data flowing from one to the other. Run the command below to see how many events Vector has seen:

```shell
# if on Windows, run in Admin PowerShell
kubectl -n vector exec -it statefulset/vector -- vector top
```

Which should give you an output similar to this:
![vector top command](images/vector_events.jpg)
Horray! We have finally got the data flowing.

# Conclusion

In this blog, we have explored how to export data from an OpenTelemetry Collector to a Vector Aggregator. This is done using `HTTP`, as [support for OpenTelemetry over gRPC has not been added yet to Vector](https://github.com/vectordotdev/vector/issues/1444).
We hope that a solution gets created, but until then, feel free to use this workaround.
