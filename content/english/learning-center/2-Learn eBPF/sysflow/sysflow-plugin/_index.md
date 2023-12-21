---
title: "SysFlow Plugin for ebpf data transfer"
date: 2023-04-17
draft: false
weight: 1
# description
description: "How to build a plugin for a sysflow to transfer eBPF data to your custom endpoint"
---

### How to build a plugin for a sysflow transfer eBPF data to your custom endpoint

sf-processor provides a performance optimized policy engine for processing, enriching, filtering SysFlow events, generating alerts, and exporting the processed data to various targets.

Please check [Sysflow Processor](https://sysflow.readthedocs.io/en/latest/processor.html) for documentation on deployment and configuration options.

1. Let's clone the [sf-processor](https://github.com/sysflow-telemetry/sf-processor) repository.

 ```cmd
 git clone https://github.com/sysflow-telemetry/sf-processor.git
 ```

2. Go to cloned repository

 ```cmd
 cd sf-processor
 ```

3. Open the Dockerfile.

 ```cmd
 vi Docker
 ```

 Add the local endpoint PORT to your Dockerfile

 ```
  EXPOSE 9091 
 ```

 update ```loglevel=trace```
4. Go to core/exporter/transports

 ```cmd
 cd core/exporter/transports
 ```

 In file.go file find the Export() function. Add custom endpoint code

 ```
  resp, err := http.Post("http://localhost:8080/api", "application/json", bytes.NewBuffer(buf))
  if err != nil {
   return err
  }
 ```

5. In order to test in your local with docker container. Open sf-processor/docker-compose.yml file and add/update below fields under the   sf-processor environment:

 ```
   POLICYENGINE_MODE: enrich
   EXPORTER_TYPE: json
   EXPORTER_EXPORT: file
   EXPORTER_HOST: localhost
   EXPORTER_FILE_PATH: /processor-export/data.json # container local export data.json file path
 ```

 NOTE: Need to set ``` ECS_TYPE_INFO = "trace" ```  In order to see the trace logs in your sf-processor

6. Now build the docker build

 ```cmd
 cd sf-processor
 make docker-build
 ```

7. Now log in to the public docker hub account in terminal or command line(CLI)

 ```cmd
  docker login -u username
  
 ```

8. Now rename the build docker image and push it to the your docker hub account.

 ```cmd
  sudo docker images
  sudo docker tag sysflowtelemetry/sf-processor:0.5.0 <docker-hub-username>/sf-processor:0.5.0
  sudo docker push <docker-hub-username>/sf-processor:0.5.0
 ```

### Sysflow deployment for a  custom endpoint with docker hub image local testing

 sf-deployments contains deployment packages for SysFlow, including Docker, Helm, and OpenShift.

Please check [Sysflow Deployments](https://sysflow.readthedocs.io/en/latest/deploy.html) for documentation on deployment and configuration options.

1. Let's clone the [sf-deployments](https://github.com/sysflow-telemetry/sf-deployments) repository.

 ```cmd
 git clone https://github.com/sysflow-telemetry/sf-deployments.git
 ```

2. Go to cloned repository

 ```cmd
 cd sf-deployments
 ```

3. Open the docker config file.

 ```cmd
 vi docker/config/.env.processor
 ```

 update below fields:

 ```
  POLICYENGINE_MODE=enrich
  EXPORTER_FORMAT=json            
  EXPORTER_EXPORT=file
  EXPORTER_FILE_PATH=/processor-export/data.json
 ```

4. Update the docker-compose.processor.yml file under the ```services -> sf-processer```

 ```
 image: <docker-hub-username>/sf-processer:0.5.0
  example: image: pyswamy/sf-processor:0.5.0
 ```

 under the Volumes:

 ```cmd
 volumes:
      - socket-vol:/sock/
      - /tmp/sysflow:/processor-export/
 ```

5. Now got to ```cd sf-deployment/docker/``` do the deployment by running below command

 ```cmd
  sudo docker-compose -f docker-compose.processor.yml up 
 ```

NOTE: The local api server is always up and running. ```https://localhost:8080/api```
