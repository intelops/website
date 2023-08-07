---
date: 2023-04-21
title: Advanced PXL Script Functions
description: Combining all that we have learned into one script.
image: images/blog/advanced-pxl-script-functions/online_test.svg

cover_image: false
cover_image_src: ""
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

{{< image src="images/blog/advanced-pxl-script-functions/online_test.svg" alt="alter-text" height="" width="200px"
class="img-fluid" caption="" webp="false" position="float-left" >}}

Over the past couple of weeks, we have been covering the powerful cluster monitoring tool, Pixie. We have covered how to
get custom data by [writing your own PXL script](https://intelops.ai/blog/writing-your-first-pixie-pxl-script/). We have
also covered how
to [enhance your custom script](https://intelops.ai/blog/enhancing-your-pixie-pxl-script-by-manipulating-data/)
by using data manipulation functions provided by Pixie. Let's wrap up our coverage of Pixie's custom data collection by
diving into an example of an advanced PXL script.
________________

# A Quick Refresher

Pixie is a cloud observation tool used for gathering monitoring metrics from your clusters. It provides a `Live UI`
which is a dashboard
that can be accessed from anywhere. It also provides users the ability to execute custom scripts to gather custom
data.  
These scripts can be executed from the `Live UI` or even from the Pixie API. The language these scripts are written in
is PXL, which is
similar in syntax to Python. In fact, users of the Python library `pandas` will notice many similarities between PXL
and `pandas`, such as
the fact that they both use dataframes (which are like spreadsheets but faster).

## What We Covered In The First Blog

In the first blog about PXL, we ran the script below.

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

This script covered the following:

* The syntax of a PXL script.
* Retrieving a table's data (`process_stats`) for the past 5 minutes.
* Adding new columns containing context data.
* Grouping by certain columns and aggregating the data.

## What We Covered In Last Week's Blog

In last week's blog, we covered some advanced PXL functions used for manipulating data. These included:

* Joining Tables - so we can add data from other tables based on common attributes between the two tables.
* Dropping/Creating Columns - so we can add more context to our data.
* Filtering Data - based on columnar values.

This week, let's dive into using all of these at once to create an advanced PXL script that gives us the exact data that
we want!

# Creating Our Script

Let's set a goal for this script. I would like to get the `conn_stats` table data and merge it with the `network_stats`
table data. To do this, I would need to merge both tables on as many unique identifiers as possible. In this case, that
would constitute the `time_` and `pod_id` columns.  
There is only one problem though. The `network_stats` table is an
aggregate table. This means that it collects data on an interval basis, and sums up the collected data, so it can be
added
to the table. This also means that the `time_` column in the `network_stats` table will not always align with
the `time_`
column in the `conn_stats` table. In fact, in order to align the two, we will need to manipulate the data in the `time_`
column to match both tables, which we will do later on.  
Let's start our script by setting up the base structure. We will get both of the tables, and display one for now.

```python
import px

conn_stats_df = px.DataFrame('conn_stats', start_time='-5m')
net_stats_df = px.DataFrame('network_stats', start_time='-5m')

px.display(conn_stats_df, 'conn_stats_df')
```

## Setting Up More Variables (For Context/Merging)

Now, let's add more variables to our script to get even more data out of each run/call. Let's start by adding the
following
contextual columns to the `conn_stats_df` dataframe:

```python
...

conn_stats_df.pod = conn_stats_df.ctx['pod']
conn_stats_df.pod_id = px.upid_to_pod_id(conn_stats_df.upid)
conn_stats_df.container_name = px.upid_to_container_name(conn_stats_df.upid)
conn_stats_df.container_id = px.upid_to_container_id(conn_stats_df.upid)
conn_stats_df.namespace = px.pod_id_to_namespace(conn_stats_df.pod_id)
conn_stats_df.node = px.pod_id_to_node_name(conn_stats_df.pod_id)

...
```

We will also add a column that will help us merge with the `network_stats` table later:

```python
...

conn_stats_df.time_aligned = px.bin(conn_stats_df.time_, 1000000000)

...
```

Note that the above function is advanced. Here is what is does:

* Creates a new column called `time_aligned`
* Bins the original `time_` column.
  * The binning is done in one second increments (equivalent to 1000000000 nanoseconds)
  * You can think of this as 'rounding' in a way.

We will create a similar binned time value in the `net_stats_df` by using the following:

```python
...

net_stats_df.time_aligned = px.bin(net_stats_df.time_, 1000000000)

...
```

Notice that we are using the same exact values for binning. This is important, as this is what will allow the dataframes
to be aligned correctly.

## Merging The Two Tables

Now that we have everything set up correctly, we can start merging (joining) the two tables. This is a similar step to
the joining we have done before.
Let's add this snippet to the code, right before the `px.display()` call:

```python
...

df = conn_stats_df.merge(net_stats_df, how='left', left_on=['time_aligned', 'pod_id'], right_on=['time_aligned', 'pod_id'], suffixes=['', '_x'])

...
```

This will result in one big table with all of the columns of `conn_stats` and `network_stats`. This includes duplicate
columns
(which will now have the suffix '_x' added on to them). Let's take care of cleaning this data.  
<mark>Also, take note that this is a `left` join, meaning that all the observations from the `conn_stats` table will be
present.</mark>

## Cleaning Up The Joined Table

Let's drop the columns that are duplicated:

```python
...

df = df.drop(['time__x', 'time_aligned_x', 'pod_id_x'])

...
```

Now let's rename some columns that used to be in `network_stats` for more clarity:

```python
...

df['received_bytes'] = df['rx_bytes']
df['received_packets'] = df['rx_packets']
df['received_errors'] = df['rx_errors']
df['received_drops'] = df['rx_drops']
df['transmitted_bytes'] = df['tx_bytes']
df['transmitted_packets'] = df['tx_packets']
df['transmitted_errors'] = df['tx_errors']
df['transmitted_drops'] = df['tx_drops']

...
```

Of course, since we renamed the columns, we will have to drop the old columns:

```python
...

df = df.drop(['rx_bytes', 'rx_packets', 'rx_errors', 'rx_drops', 'tx_bytes', 'tx_packets', 'tx_errors', 'tx_drops'])

...
```

# Full Code

You can find the full code for this script below. To give it a quick test-run, you can try it out using the 'Scratch
Pad'
function of the `Pixie Live UI`.

```python
import px

# get the conn_stats data.
conn_stats_df = px.DataFrame('conn_stats', start_time='-5m')
# add contextual data about the cluster.
conn_stats_df.pod = conn_stats_df.ctx['pod']
conn_stats_df.pod_id = px.upid_to_pod_id(conn_stats_df.upid)
conn_stats_df.container_name = px.upid_to_container_name(conn_stats_df.upid)
conn_stats_df.container_id = px.upid_to_container_id(conn_stats_df.upid)
conn_stats_df.namespace = px.pod_id_to_namespace(conn_stats_df.pod_id)
conn_stats_df.node = px.pod_id_to_node_name(conn_stats_df.pod_id)
# we convert the time value from nanoseconds and bin it to the nearest second (since there are 1000000000 ns in 1 s)
conn_stats_df.time_aligned = px.bin(conn_stats_df.time_, 1000000000)
# get the network_stats data.
net_stats_df = px.DataFrame('network_stats', start_time='-5m')
# we convert the time value from nanoseconds and bin it to the nearest second (since there are 1000000000 ns in 1 s)
net_stats_df.time_aligned = px.bin(net_stats_df.time_, 1000000000)
# merging the two dataframes based on the time_aligned and pod_id attributes.
df = conn_stats_df.merge(net_stats_df, how='left', left_on=['time_aligned', 'pod_id'], right_on=['time_aligned', 'pod_id'], suffixes=['', '_x'])
# drop the duplicate time_ column
df = df.drop(['time__x', 'time_aligned_x', 'pod_id_x'])
# rename some columns
df['received_bytes'] = df['rx_bytes']
df['received_packets'] = df['rx_packets']
df['received_errors'] = df['rx_errors']
df['received_drops'] = df['rx_drops']
df['transmitted_bytes'] = df['tx_bytes']
df['transmitted_packets'] = df['tx_packets']
df['transmitted_errors'] = df['tx_errors']
df['transmitted_drops'] = df['tx_drops']
# get rid of the old named columns
df = df.drop(['rx_bytes', 'rx_packets', 'rx_errors', 'rx_drops', 'tx_bytes', 'tx_packets', 'tx_errors', 'tx_drops'])
# display the merged dataframe
px.display(df, 'df')
```

# Conclusion

In this blog, we have understood how to create an advanced PXL script for use with clusters that have Pixie deployed on
them. We have combined all the ideas from the previous blogs into a final, advanced tutorial script. You are now a PXL
script expert! 🙌  
Keep in mind that there are a number of other functions you can use in your advanced PXL scripts. These can be found on
[Pixie's documentation page](https://docs.pixielabs.ai/reference/pxl/).
