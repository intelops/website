---
date: 2022-11-15
title: Hacking YAML to your Benefit
description: Learn to use YAML.
image: images/blog/hacking-yaml-to-your-benefit/learn.png

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: vishwas-prasanna
categories:
- Dev-Tools

# image color code in undraw.co #FB7E44 
feedback: false
draft: false
---

{{< image src="images/blog/hacking-yaml-to-your-benefit/learn.png" alt="alter-text" height="" width="100px" class="img-fluid" caption="" webp="false" position="float-left" >}}

YAML(yam-ul) is a Data Serialization language used to capture your data in a key-value pair format, making it easy to read and understand. In this article, I will cover the basic concepts of YAML. It's Benefits and drawbacks over other markup languages like JSON and XML. YAML in DevOps and best practices to use while writing a YAML file.
>If you want to learn more about What is DevOps? Check [<span style="text-decoration: underline;">this</span>](https://intelops.ai/blog/devops-what-and-why/) out.

## Basics to quickly start writing YAML files

* A simple YAML file needs to have two items to be complete, a key and a value separated by a colon and a space.

> ItemKey: ItemValue

* Each line is a new item. You can have any number of items in a file.

> Item1: Value</br>Item2: Value</br>.</br>.</br>.</br>Last_Item: Value

* Users can add multiple documents into the same YAML file, just separate them using "---"

> \-\-- </br>ItemKey: ItemValue</br>\-\-- </br>Item1: Value</br>Item2: Value</br>.</br>.</br>.</br>Last_Item: Value

* Users can add a comment by starting it using a "**#**" symbol. If you have a multi-line comment, add "**#**" at the beginning of each line.

> #Let's create an item 'a' with value 10</br>a: 10</br>#Now lets create another item 'b' </br>#with value 20 but wait create a thrid item 'c' with value 30</br>b: 20</br>c: 30

* We can create a List or a Dictionary in YAML.
  * **List** is a collection of elements defined by one key either as a block style,
  > States:</br>&nbsp;&nbsp;- Texas</br>&nbsp;&nbsp;- North Carolina</br>&nbsp;&nbsp;- Arizona</br></br>Or you can use a flow style</br></br>States: [Texas, North Carolina, Arizona]
  * **Dictionary** is a collection of key-value paired elements either as a block style,
  > Address:</br>&nbsp;&nbsp;City: Raleigh</br>&nbsp;&nbsp;State: North Carolina</br>&nbsp;&nbsp;Zipcode: 27606</br></br>Or you can use a Flow style</br></br>Address: {City: Raleigh, State: North Carolina, Zipcode: 27606}
* YAML supports all essential data types like nulls, numbers, and strings. It also recognizes a few language-specific data types, such as dates, timestamps, and unique numerical values.

> String_item: "1234"</br>Integer_item: 1234</br>Float_item: 12.34</br>Boolean_item: No

## Pros of using YAML over other markup languages

1. It has a human-readable format. So it is easy to understand.
2. YAML, JSON, and XML store the data as Key-Value pairs. So converting a YAML file to JSON or XML is easy.
3. Most languages use YAML for configuration files.
4. More powerful to represent complex data.
5. Due to its simple structure, parsing is easy.
6. You can add comments to gain more insight into the data.

## Cons of using YAML

1. It has a strict syntax, so we need to be cautious about the indentation. Even a single space mismatch can stop the code from working.

> Easy way to overcome this would be to use a YAML validator.

2. YAML is simple for writing but complex for processing since data can be represented in many ways making a complex data hierarchy.

## YAML in DevOps

YAML has seen recent popularity in the DevOps community due to all the benefits mentioned above. Creating a configuration file with configuration code that adheres to best practices is quick and easy. We can then define development pipelines using these configuration files. These pipelines are versioned, making it easy to find problems and undo changes with each new build.

Yaml configuration files are source files. So we add them to the root of the repository.

YAML in Prominent DevOps tools:

* Azure DevOps: You can simplify defining the build and release tasks using a YAML designer provided by Azure.
* Kubernetes: Creating storage and lightweight Linux virtual machines using YAML
* Dockers: Feature YAML files called Dockerfiles that are blueprints for everything. To run the software, including codes, runtime, tools, settings, libraries, etc.

## Conclusion

Best Practices and things to look out for writing a config.yml file,

1. Do not use a tab for indentation.
2. Try to use the Flow style whenever you can to avoid creating complicated nested blocks.
3. You cannot start a block-style list or dictionary on the same line as the mapping key

>key: another_key: map</br>This is not possible</br></br>Key: - List_item</br>This is not possible too so try avoiding it.</br></br>fruits:</br>&nbsp;- apple: sweet</br>&nbsp;&nbsp;&nbsp; lemon: sour</br>This is possible

4. Save your YAML files with the ".yaml" or ".yml" extension.
