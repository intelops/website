---
title: "Create-Dashboards-With-Jsonnet"
date: 2023-04-24
draft: false
# description
description: "Learn Grafonnet and implementation of dashboards using Jsonnet"
weight: 3
---

## This article will demonstrate how to create grafana dashboards using go-jsonnet library 

Here's a basic example of how you can use go-jsonnet to evaluate a Jsonnet template and generate Grafana dashboard JSON:

- **Step 1:** Define a Jsonnet template

```go
func main() {
	// Define a Jsonnet template
	template := 
	{
		"title": "Example Dashboard",
		"panels": [
			{
				"type": "graph",
				"title": "Example Graph",
				"targets": [
					{
						"query": "SELECT count(*) FROM example_table"
					}
				]
			}
		]
	}

```

- **Step 2** Create a Jsonnet VM

```go
vm := jsonnet.MakeVM()
```

- **Step 3** Evaluate the template

```go
jsonString, err := vm.EvaluateSnippet("example.jsonnet", template)
	if err != nil {
		panic(err)
	}
```
- **Step 4** Convert the JSON string to a map

```go
var dashboard map[string]interface{}
	err = json.Unmarshal([]byte(jsonString), &dashboard)
	if err != nil {
		panic(err)
	}
```

- **Step 5** Print the resulting dashboard JSON

```go
jsonBytes, err := json.MarshalIndent(dashboard, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(jsonBytes))
}
```

**This example defines a simple Jsonnet template for a Grafana dashboard, evaluates it using a Jsonnet VM, and then converts the resulting JSON string to a map using the json.Unmarshal() function. The resulting map can then be further manipulated or serialized as needed.**


>  ***Note that this is just a basic example, and there are many ways to extend and customize this approach for your specific needs***

#### The next article will tell you about how to create a Jsonnet library that defines a set of functions and objects for creating and configuring the components of your dashboard in the frontend.