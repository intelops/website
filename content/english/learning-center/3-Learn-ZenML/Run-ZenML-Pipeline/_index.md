---
title: "Run ZenML Pipeline"
date: 2023-02-20
draft: false
weight: 3
# description
description: "How to create and run your ZenML Pipeline"
---

So far we have seen,

```
1. How to setup your local machine to use ZenML 
2. What are the components of ZenML.
3. How to create ZenML Steps and Pipelines. 
4. How to register different stacks to the registry and activate them to use for our project.
```

Now, Let's see what are some of the things that you need to keep in mind when converting your ML project into different Steps and Pipeine.

1. You can probably create a step for each function within your ML model but commonly we try to group functions that do a certain task as a step. A common template to follow would be build a step for each stage of your model building. For example,
 - Data Ingestion
 - Data Processing
 - Data Splitting
 - Model Training
 - Model Evaluation
 - Model Development
 - Monitor Model Performance
2. Each step should be considered as its very own process that reads and writes its inputs and outputs from and to the artifact store. This is where materializers comes into play.  
3. A materializer dictates how a given artifact can be written to and retrieved from the artifact store. It contains all serialization and deserialization logic. You can know more about the materializers from [here](https://docs.zenml.io/v/0.10.0/developer-guide/materializer).
4. Step and pipeline configurations are used to dynamically set parameters at runtime. It is a good practice to configure from the CLI and a YAML config:
 >Do this when you want to launch pipeline runs without modifying the code at all. This is most useful in production scenarios. Learn more from [here](https://docs.zenml.io/v/0.10.0/developer-guide/runtime-configuration).
5. You can create a separate ***step_filename.py*** for each step you like to use in your pipeline, especially if you want to create common steps that can be used across different pipelines.
6. Repeat the same for materializers and store them as ***materializer_filename.py***
7. Now you can import any step and materializer that you want and create a pipeline using them. Save it as ***zenml_pipeline_filename.py***
8. Congrats!!! You are now all set to run your first pipeline.  

```cmd
python zenml_pipeline_filename.py [-c] [path/to/your/config_file.py]  
```

Yes it is as simple as that.
