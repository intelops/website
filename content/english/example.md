---
date: 2023-05-19
title: Containers, Containers, Containers
description: What containers are, their benefits, and their use cases.

page_layout: "default" # Mandatory (If you want to use blog single page layout)
hide_series_post: true # Hide series post
hide_related_post: true # hide related post located at the end of the page
hide_post_meta: false # hide post meta like last update & publish data, estimated reading time etc.

cover_image: false
cover_image_src: ""
cover_image_height: ""
cover_image_width: ""

bannerarea: true
bannertext: "This is banner area text"
bannertext_color: "#fff"
bannerimage: images/banner/mindmaps-page/undraw_mindmap_banner2.png

author:
series:
categories:

draft: true
---

{{< image src="images/blog/containers-containers-containers/container_ship.svg" alt="alter-text" height="" width="420px"
class="img-fluid w-md-full" caption="" webp="false" position="float-left" >}}

`Containers` seem to be a buzzword in the industry nowadays. As more and more companies are undergoing cloud
transformation, they are hoping to convert their legacy applications into containerized ones. This is being done all
while trying to adapt to a microservice architecture, in lieu of a monolith one.  
But what exactly is a container? What are its use cases, and what benefits does it provide? Let's take a dive into these
questions, to see why companies are so forward about adopting containerized applications.

---

# What Are Containers?

Containers are a type of virtualization technology that allow you to run portable software on any machine. In essence, a
container will have the code for a software product, and all of it dependencies and requirements, such that the code
can run anywhere the container can. This means that containerized code can run on numerous different machines, even
after it has only been developed using a specific environment.

## What Is A Container `Image`?

A container image is the package of the application code, its dependencies, and more. Images are usually executable, and
they contain **everything** required to run the application code. This will include stuff like system tools, libraries,
settings, and even the runtime. The instructions for how to build the image are usually within a document called the
DOCKERFILE. We can modify/create a custom dockerfile, in order to install our own dependencies into the container image.

## What Is The Difference Between An Image And A Container?

An image is the first step in the process of creating a container. During runtime, container images become containers.

# What Problem Do Containers Solve?

Normally, when you want to run your application on a server (i.e. a host), you would have to customize the entire server
to be able to serve the needs of your software product. This can get very expensive very quickly.  
In order to take this a step further, we can create multiple virtual machines (VMs) on a single server. This VM is a
type of virtualization technology that allows you to run one operating system on another (linux on windows, for
example). This way, we don’t need to customize each server, but rather each VM to accommodate the software product. This
allows for less overhead. Each VM, however, still creates their own operating systems.  
What if your software doesn't need access to the entire OS, and the OS just serves as extra baggage?  
Containers aim to solve this by taking the VM concept to the next step. Suppose we take VMs and reduce their overhead.
This can be accomplished by each container sharing the host's operating system. This way, we can get rid of the extra
baggage. If a container needs some extra components for your software to run, then we can install those within the
container itself, instead of on the host. Their small size also allows you to put numerous containers on a single host.

---

{{< cta-with-image-row >}}

{{< cta-with-image title=`Linux Networking With eBPF` image=`images/illustration/2.png` link=`/` link-label=`See More`>}}

{{< cta-with-image title=`Socket Programming Essentials in C` bg-color=`#f0763214` image=`images/illustration/1.png` link=`/` link-label=`See More`>}}

{{</ cta-with-image-row >}}

---

{{< cta-card-row >}}

{{< cta-card title=`Linux Networking With eBPF` icon=`far fa-lightbulb` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/` link-label=`See More`>}}

{{< cta-card title=`Socket Programming Essentials in C` icon=`far fa-lightbulb` icon-color=`white` icon-bg-color=`#fb923b` description=`Curabitur arcu erat, accu msan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ac diam.` link=`/`>}}

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

---

# Containers VS Virtual Machines

Containers can accomplish the same things as VMs, all while:

- Reducing overhead
- Reducing disk size taken
- Reducing startup time (seconds instead of minutes)
- And Using fewer resources

# Container Orchestration (`Kubernetes`)

Since each host can hold multiple containers, and organizations usually have numerous hosts, we need a way to manage
containers, a process known as orchestration. For example, if you need to allocate 5 containers, then you would allocate
5 hosts to hold each container. This is to ensure that if a host fails, your containers are safe, and your software
product does not experience downtime. In this case, it is best to use a container orchestration tool.  
Container orchestration can be used to build, manage, and automate the management of containers and container
infrastructure.  
This is where tools like `Kubernetes` comes into play. These tools help you automate containers to the point of being
able to offer zero-downtime deployment (apps can run even while being upgraded). Self-healing apps, and automated
scaling of resources.
Sometimes, cloud providers include container management tools out of the box, such as Google Cloud offering the Google
Kube engine. Docker swarm (offered by Docker), Nomad, and Marathon are both good alternatives to Kubernetes.

# Benefits Of Containers

Building upon the benefits that containers offer over VMs. They also offer:

- Software portability - your app can run on any machine.
- Isolation - software can be split into separate, individual pieces.
- Scaling - can increase/decrease resources as needed, saving money.
- Automation - saves time and money for your organization.

# Limitations Of Containers

Containers do have their own limitations, even when compared to VMs. These are:

- Less flexibility than VMs - currently, you can create a Windows VM on a Linux machine. However, you cannot create a
  Windows container on a Linux machine,
  <a href="https://stackoverflow.com/questions/42158596/can-windows-containers-be-hosted-on-linux#:~:text=Q%3A%20Can,on%20Linux%20only." target="_blank">
  yet</a>.
- Orchestration challenges - due to their large numbers, managing containers can be a hassle. This is made easier
  through container management software such as Kubernetes.

# So, What Is `Docker`?

`Docker` is, officially, a container runtime. It is a piece of software that allows you to build/create/run containers
and
their images.  
There are other options besides Docker, <a href="www.github.com/rkt/rkt/" target="_blank">rkt</a> (project
has ended), and <a href="https://containerd.io/" target="_blank">containerd</a>.

# Use Cases Of Containers

- Microservices - normally, apps are written using a monolithic architecture, where each component of the app is
  typically part of one service (think of this as one process doing everything the app needs to have done).  
  If that same app is written using a microservice architecture, each component of the app is written using a separate
  service (with its own endpoint). This allows for each service to be built/modified independently of other services.  
  We can then deploy these microservices each within its own container to allow for easy and efficient scaling,
  whichever service is being used more often, will be scaled up.
- Cloud transformation - this is the process of bringing an organization’s existing IT infrastructure and codebase to
  the cloud. This can be accomplished easily with containers.
- Automated scaling - container orchestration tools can allow for increased stability and decreased running costs of
  the app you have deployed. This is achieved through automated scaling. More copies of the app are created when load is
  high, and less are created when load is low.
- Continuous deployment - containers allow for the easy deployment of new code automatically and frequently. This
  increases the stability of your app through easy/quick bug fixes.
- Self-healing apps - these can detect when problems have occurred, and take steps necessary to rectify. For example,
  suppose a container has run into a problem, the server can be set to automatically reboot. OR, since containers start
  up so quickly, you can just replace the bad container with a brand new, working container on a completely separate
  host. This will reduce the startup time immensely compared to the first method. It will also allow that host to be
  restarted, all while still maintaining access to the container (now on the new host).
- Developer visibility - there typically are problems between development and production teams. These are due to an app
  working in development, but not while in production. With containers, however, the development team can use the same
  container image the production team is using. This completely gets rid of this issue.

# Containers In/Versus The Cloud?

A lot of times, there seems to be confusion about the relationship between the Cloud and containers. Let's provide some
disambiguation:  
Cloud providers allow their customers access to their servers. These same servers can be thought of as hosts for
containers to run on. Therefore, you can run your containers in the cloud.
Cloud provider-offered containers are super cheap, include extra tools for orchestration, and have good support right
out of the box.

# Conclusion

In this blog, we learned about what containers are, their benefits, how they are built, and their use cases. Using the
basic concepts you have learned here, you can try to <a href="https://docs.docker.com/get-started/" target="_blank">
containerize your first app</a> using Docker's tutorial, as the next step in your journey with containers.
