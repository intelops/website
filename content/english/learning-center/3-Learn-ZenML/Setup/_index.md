---
title: "Setup"
date: 2023-02-20
draft: false
weight: 1
# description
description: "How to setup your local machine to use ZenML"
---

### How to make your system ZenML Ready

ZenML comes as a Python library so it is necessary to have a ***python>=3.7,<= 3.10*** installed on your local machine.  
Virtual environments let's you have a stable, reproducible, and portable environment. You are in control of which package versions are installed and when they are upgraded.  
I use Anaconda to create and manage my Python envionments but you can also use ```pyenv-virtualenv``` or ```python -m venv```.

1. Let's create a new environment called *zenml_playground*.

 ```cmd
 conda create --name zenml_playground python=3.8
 ```

2. Activate the virtual environment.

 ```cmd
 conda activate zenml_playground
 ```

3. Install ZenML inside the virtual environment.

 ```cmd
 pip install zenml
 ```

4. [Optional] In order to get access to the ZenML dashboard locally you need to launch ZenML Server and Dashboard locally. For this, you need to install ZenML Server separately.

 ```cmd
 pip install "zenml[server]"
 ```

5. To verify if the installation is completed start Python interpreter and try to import zenml.

 ```python
 import zenml
 print(zenml.__version__)
 ```  

 If you see a ZenML version displayed on your command prompt then you are all set to explore ZenML Steps and Pipelines.
