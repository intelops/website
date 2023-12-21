---
date: 2023-04-14
title: Enhancing Your Pixie PXL Script By Manipulating Data
description: How to use in-built functionality of PXL to manipulate your data.
image: images/blog/enhancing-your-pixie-pxl-script-by-manipulating-data/undraw_join.svg

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

{{< image src="images/blog/enhancing-your-pixie-pxl-script-by-manipulating-data/undraw_join.svg" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Pixie can be utilized for gathering monitoring metrics from your clusters. It offers you the benefit of having pre-written scripts, as well as custom scripts that extrapolate data. The custom scripts are written
in Pixie's very own language, PXL, which is similar to Python. Last week, we had been working on [creating our first custom PXL script to gather data](https://intelops.ai/blog/writing-your-first-pixie-pxl-script/).
In this tutorial, lets focus on customizing the data we have gathered and tuning it to our own preferences.
________________

# PXL Uses DataFrames

Within the PXL language, we can see that we use dataframes to interact with our data. For those of you familiar with Python, specifically `pandas`, this blog post will come as second nature to you. Dataframes are just
tabular representations of data. You can think of a dataframe as a spreadsheet, but way more powerful.  
You can tell from the script we wrote last week that the columns included were from the `process_stats` table. (see script below)

```python
# We import px, which is the library we will be using to add extra data to our table.
import px
# We gather data from the last 5 minutes, from the `process_stats` table, and create a dataframe from it.
df = px.DataFrame(table='process_stats', start_time='-5m')
# Below, we are adding extra data to our table, using `context` or `execution_time_functions`
df.pod_id = df.ctx['pod_id']
df.pod_name = px.upid_to_pod_name(df['upid'])
df.pod_id = px.pod_name_to_pod_id(df['pod_name'])
df.cmd = df.ctx['cmdline']
df.pid = df.ctx['pid']
df.container_name = df.ctx['container_name']
df.container_id = df.ctx['container_id']
# We group the dataframe based on certain attributes, and aggregate the data.
df = df.groupby(['pid', 'cmd', 'upid', 'container_name']).agg()
# We display the dataframe.
px.display(df, 'processes_table')
```

This script used basic functions on the dataframe, such as adding new columns. It also used slightly more advanced functions such as the `groupby` function, and the aggregation function `.agg()`.  
Let's get right into how we can enhance our PXL scripts by manipulating data.

# Joining Tables Using PXL

On top of just adding a few extra columns, we can also join two tables together based on common columns shared by the two tables. This process is called `merging`. Take a look at the code below for an example/explanation.

```python
# We import px, which is the library we will be using to add extra data to our table.
import px
# We gather data from the last 5 minutes, from the `conn_stats` table,
# and create a dataframe from it.
df = px.DataFrame('conn_stats', start_time='-5m')
# We also gather data from the `http_events` table.
http_e_df = px.DataFrame('http_events', start_time='-5m')
# We can now combine the two tables, using the merge function.
df = df.merge(http_e_df, how='left', left_on=['time_', 'upid'], right_on=['time_', 'upid'], suffixes=['', '_x'])

px.display(df, 'conn_stats_and_http_events_table')
```

In the script above, we are using the `merge` function to join columns from the `http_events` table to the `conn_stats` table. Here is a brief explanation of what the parameters in this function mean:  

* `how`: how we are going to be joining one table to another.  
 `'left'` means we will keep all data from the left table.  
 `'right'` means we keep all data from the right table.  
 `'inner'` means we will only be keeping the data that is present in both tables.
 `'outer'` means that we will be keep all data present in both tables.
* `left_on`/`right_on`: These define the columns which we will compare between the two tables to align the data correctly. In the code above, we are aligning data based on the `time_` and `upid` columns.
* `suffixes`: defines what strings to attach to the duplicate columns in the resulting table.
At the end of the merging done in this script, you will notice that we have columns from both tables. Yet, we will only have observations (rows) from the `conn_stats` table, since it is the left table.

# Dropping Columns

We can drop certain columns that we would not like from a table. For example, if there is a column that is duplicated from the previous `merge` we have done, we can drop it after merging. Take a look below:

```python
...

# We can now combine the two tables, using the merge function.
df = df.merge(http_e_df, how='left', left_on=['time_', 'upid'], right_on=['time_', 'upid'], suffixes=['', '_x'])
# we get rid of duplicate values such as `time__x` and `upid_x`
df = df.drop(['time__x', 'upid_x'])

...
```

Notice that the colums we are dropping have the duplicate suffixes attached to their names. This ensures that the original columns are still present, so that we do not lose the data.

# Adding A Custom Column

We can add custom columns to our data based on calculations we have done ourselves, or calculations based on other columns. This process is called `mapping`. For example, we might want to convert bytes to megabytes. This can be done via:

```python
df['req_body_size'] = df['req_body_size']/1.0e6
```

We can also add custom columns with whatever data we would like. If I wanted a column named `foo`, with the attribute `bar` added to each observation, I could do that using the following:

```python
df['foo'] = "bar"
```

# Filtering Data

We can filter data within our script using PXL's `filter` function. This functionality is similar to what is done in Python's `pandas` package. In the example below, I am filtering to include the rows that
have their `bytes_sent` value higher than `65399738`:

```python
df = df[df['bytes_sent'] > 65399738]
```

# Other Useful Functions

Pixie docs list a whole bunch of [useful functions that can be applied to PXL dataframes](https://docs.pixielabs.ai/reference/pxl/operators/). Some of my favorites are:

* `Dataframe.head()`: For when you need only a certain number of rows to be received from Pixie. This is extremely helpful in debugging while you are writing PXL scripts.
* `Dataframe.groupby()`: As we have used in our previous [PXL blog](https://intelops.ai/blog/writing-your-first-pixie-pxl-script/).
* `Dataframe.stream()`: For when you have so much data that you need it on a streaming basis.

# Conclusion

In this blog, we have understood what PXL dataframes are, and the special dataframe functions we can use to enhance our PXL script and manipulate our data. Feel free to look at the [PXL Docs](https://docs.pixielabs.ai/reference/pxl/operators/#title) to learn more.
