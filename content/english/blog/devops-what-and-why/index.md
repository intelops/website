---
date: 2022-10-04
title: DevOps - What and Why?
description: Brief concept intro on DevOps.
image: images/blog/devops-what-and-why/blog1.png

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: hannan-khan
series: DevOps Series
categories:
- DevOps

# image color code in undraw.co #FB7E44 
feedback: false
draft: false
---

{{< image src="images/blog/devops-what-and-why/blog1.png" alt="alter-text" height="" width="100px" class="img-fluid" caption="" webp="false" position="float-left" >}}

DevOps, literally, is the intersection of development and operations. It is an extremely broad term, used differently by different industries. The best definition for it is that it's a combination of cultural philosophies, practices, and tools to release software fast and with high quality. This is accomplished by combining development, testing, security, and operations into a continuous and streamlined development/deployment process.
________________

### Why Use DevOps?

In order to recognize the benefits that DevOps brings to organizations, we must understand what DevOps is. The simplest way to understand DevOps is to consider it in the aspect of application development. Each time an application is created or updated, it follows a development process which ends with the app being deployed to the cloud or servers. The application is deployed in order to ensure delivery to its end-users.
The application development process includes:

1. Idea
2. Requirements
3. Coding/Testing
4. Building/Packaging
5. Deploying
6. Operations & Monitoring  
  
Each time an update happens to the application (i.e. a feature is added), you will need to run through the entire process. This would be fine, however, the process is riddled with hindrances which delay the release/deployment of new features. DevOps aims to improve on this process by making it faster, and delivering the same new features with minimal bugs.
________________

### Hindrances in the Current Development Process

The way the current process is set up, development and deployment (a.k.a. operations) are handled by two separate teams. This leads to obstacles which inhibit the process’s ability to implement new features, and introduces release delays. Some of which I have outlined below:

* Conflict of interests
  * Since development and operations are split into separate teams, this presents a conflict of interest between the two. The developers want to release as many new features as possible. The operations team wants to maintain the stability of their system. When new features are introduced, the stability of the system is risked, creating a conflict of interest. Ultimately, this will present itself as a release delay.
* Lack of collaboration
  * With two separate teams, a lack of communication arises. Bad documentation or too many bugs can cause the operations team to send the application back to the developers. This back-and-forth ‘handover’ process adds slowdowns to the workflow. This can delay releases from days to months.
* Manual work
  * Most of the release process contains manual work. Everything from deploying the app to configuring user access is done manually. Even if we consider creating scripts to automate parts of the process, those scripts would have to be run manually.
  * Inter-peer and inter-team knowledge sharing becomes extremely cumbersome when doing manual work. This is because each person would have to update the other party on everything they have changed.
  * Any changes in the server infrastructure can introduce massive delays and headaches in manual work.
* Security
  * After development, a separate security team would check for vulnerabilities. This is also manual work, which, again, introduces delays in our application process (You might have heard of another intersectional term, DevSecOps, which incorporates the security aspect).
* Testing
  * Most of the application tests are automated, however, given new features, certain aspects of the application need to be tested manually. This adds to the manual work and release delays.

________________

By removing one hindrance at a time, DevOps aims to combine all of these different areas (development, testing, security, and operations). This creates an automated and streamlined development/deployment process. In tackling each hindrance, a series of best practices have manifested to help organizations to adopt DevOps culture.
________________

### Best DevOps Practices

In order for organizations to fully embrace DevOps philosophies, there are some key practices that need to be implemented. Starting with:

* Continuous Integration/Continuous Delivery pipeline - this application development and delivery pipeline can help organizations manage any operational challenges that might arise from transitioning to a DevOps culture. This pipeline also provides systematic and streamlined delivery of features/bug fixes.
* Microservices architecture - This type of application design allows for flexible application use, and easier innovation within each component of the application.
* Frequent updates - smaller, more frequent updates are key to the DevOps philosophy. These updates would usually be cumbersome, however, with all other practices embraced, can be easy to implement.
* Infrastructure As Code - this best practice helps organizations to maintain their development, testing, and production infrastructure through the use of code and development techniques. There are many other “X as Code” practices that have sprung up since this, such as Policy As Code.
* Collaboration - using tools associated with each DevOps practice, the responsibilities of the development and operations teams get merged. This increases collaboration between the teams resulting in knowledge sharing, and increased communication.
* Monitoring - by observing key metrics in real-time, organizations can maintain the stability of their applications. Organizations would also be monitoring the infrastructure that is serving the applications.

________________

### Benefits Of Implementing DevOps

Upon implementing the practices, hindrances in the old development process are eliminated. The organization who has now adopted the DevOps culture can reap the benefits, which include:

* Reliability - systematic workflows help to ensure both the quality and integrity of the application.
* Delivery speed - the application can now have more frequent release, as well as there being less response time needed for bug-fixes.
* Improved collaboration between teams.
* Security - certain DevOps practices can include automated compliance policies which increase the security of your application.
* Scaling - through the use of certain practices, such as Infrastructure As Code, organizations can easily manage their development, testing, and production environments.

________________

### Conclusion

DevOps is broad terminology referring to the set of practices which help release software with speed and quality. These practices were created to overcome hindrances in the old development process. By using a DevOps mindset, organizations can implement these practices, and ultimately the DevOps philosophy. Once embraced, this philosophy offers numerous benefits to the organization such as reliability, scaling, and reduced delivery speed.
