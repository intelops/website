---
date: 2023-05-19
title: Containers, Containers, Containers
description: What containers are, their benefits, and their use cases.

page_layout: "" # ("default" or empty string) Mandatory (If you want to use blog single page layout)

hide_footer: true # hide footer except call to action
hide_header_except_logo: true
# cta section
hide_cta: true # hide call to action

hide_search_related_code: true # Global search feature will not work in only this page if you enable this option

# Popup contact form
hide_clickup_form: ture

# Tawk chat widget
hide_tawk: ture # Hide tawk chat widget related code in this page if you enable this option

# you must have to set page_layout to "default" to make following options work
cover_image: false
cover_image_src: ""
cover_image_height: ""
cover_image_width: ""

bannerarea: false
bannertext: "This is banner area text"
bannertext_color: "#fff"
bannerimage: images/banner/mindmaps-page/undraw_mindmap_banner2.png

hide_series_post: true # Hide series post
hide_related_post: true # hide related post located at the end of the page
hide_post_meta: true # hide post meta like last update & publish data, estimated reading time etc.

author:
series:
categories:

draft: true
---

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
