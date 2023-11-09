---
title: "Docbox Layouts links page"
date: 2018-12-25T11:02:05+06:00
draft: true
description: "This is just a sample draft of how to use fancy content writing."
type : "learning-center"
---

{{< cta-with-image-row >}}

  {{< cta-with-image title=`Linux Networking With eBPF` image=`images/illustration/2.png` link=`/` link-label=`See More`>}}

  {{< cta-with-image title=`Socket Programming Essentials in C` bg-color=`#f0763214` image=`images/illustration/1.png` link=`/` link-label=`See More`>}}

{{</ cta-with-image-row >}}

---

{{< cta-card-row >}}

  {{< cta-card title=`Linux Networking With eBPF` icon=`far fa-lightbulb` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/` link-label=`See More`>}}

  {{< cta-card title=`Socket Programming Essentials in C` icon=`far fa-lightbulb` icon-color=`white` icon-bg-color=`#fb923b` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/`>}}

  {{< cta-card title=`Linux Networking With eBPF` icon=`far fa-lightbulb` icon-color=`white` icon-bg-color=`#fb923b` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/` link-label=`See More`>}}

  {{< cta-card title=`Socket Programming Essentials in C` icon=`far fa-lightbulb` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/` link-label=`View Details`>}}

{{</ cta-card-row >}}

---

{{<code file-name=`process_stats_data_processing.py` file-extension=`PY`>}}

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

{{</code>}}
