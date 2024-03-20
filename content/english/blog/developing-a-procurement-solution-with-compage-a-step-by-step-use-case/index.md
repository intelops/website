---
date: 2023-08-22
title: Developing a Procurement Solution With Compage - A Step-by-Step Example Use Case
description: Compage Use Case
image: images/blog/developing-a-procurement-solution-with-compage-a-step-by-step-use-case/procurement-use-case-blog-image-02.png
cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: shreya
series: Use Case 
categories:
- Compage

tags:
- cicd
- shift left
- use case 
- backend automation
- procurement solution
- code security

# image color code in undraw.co #FB7E44
feedback: false
draft: false

---
{{< image src="/images/blog/developing-a-procurement-solution-with-compage-a-step-by-step-use-case/procurement-use-case-blog-image-02.png" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Whatever your business, customers want a great product and even better customer service. Delivering such an experience _at pace_ demands a refined software development lifecycle (SDLC) that focuses on saving time, effort, and cost wherever possible. Despite many advances in software development, teams have yet to catch up. With developers needing to make hundreds of changes to their software daily, it would be hard to imagine the time taken for testing and delivering these changes, if done manually.

However, sluggish development, infrequent releases, and siloed teams form the reality of many development teams today, negatively impacting businesses. Another challenge for developers is poor code, which leads to an increase in bug-fixing time. According to VentureBeat, developers spend as much as 20% of their time on bug-fixing, affecting their efficiency and diverting their attention from more rewarding tasks like building code.

{{< image src="images/good-code-bad-code.png" webp="false" >}}

Image Source: Clean Code, a book by Robert C. Martin
  
Poor software quality resulting from cutting corners and not following standards not only impacts developers within the organization or new ones joining the project, but it also carries financial repercussions. In 2020 alone, according to the Consortium for Information and Software Quality, [poor software quality cost US companies around $2.08 trillion](https://www.it-cisq.org/the-cost-of-poor-software-quality-in-the-us-a-2020-report/).

## What's the Solution?

Overcoming these long-standing issues requires the adoption of **Continuous Integration and Continuous Delivery (CI/CD)**. CI/CD automates code building, testing, and deployment, reducing development time. By testing and delivering daily changes quickly, CI/CD allows developers to move to shorter release cycles. Automated testing helps catch errors early, ensuring that the code is always deployment-ready. Prompt resolution leaves room for releasing more features to meet consumer demand. Additionally, CI/CD minimizes reliance on a small number of skilled developers by standardizing practices and processes, allowing new developers to start on projects immediately. According to GitLab, adopting CI/CD can result in a 78% savings in development costs per program.

The recommendation is to follow the **12-factor approach** alongside CI/CD to further scale and maintain applications flexibly, while laying the foundation for a successful software ecosystem.

## The 12-Factor Methodology for Enterprise Applications

The [twelve-factor methodology](https://12factor.net/) offers principles for building scalable, high-performing, resilient enterprise applications. It requires applications to use declarative formats to reduce time and cost for new developers, maintain a clean contract and achieve maximum portability, have suitability for deployment on modern cloud platforms, minimum disparity between development and production for continuous deployment and scalability without any significant changes to tooling, architecture, or development practices.

{{< image src="images/12-factor-principles.png" webp="false" >}}

## How Compage Helps?

Compage, our [low-code universal language framework](https://intelops.ai/compage/), is built for modern applications that adopt the 12-factor methodology. It automates the backend development process, saving businesses time and money. Compage follows established security best practices, so you don't have to make a choice between faster releases and secure code.

* **Endpoint Creation:** Compage automatically generates REST and gRPC endpoints, eliminating manual coding, and reducing the risk of errors. It follows established endpoint patterns for cohesive, comprehensible, and maintainable code.
* **Enhanced Development Environment:** Compage integrates with industry-standard tools, enhancing your development process. This includes tools for code analysis, testing, and deployment.
* **Security & Compliance:** With features such as code scanning, vulnerability identification, and signing Docker images, Compage helps improve the security and compliance of your codebase.
* **Streamlined Deployment:** Compage generates cloud-native code deployable on Kubernetes, simplifying deployment and making scaling applications easier.
* **Automated Workflow:** Compage automates code building, pushing, and testing, freeing up your team to focus on other tasks.
* **Testing Guidance:** Compage help you to identify untested code areas. This ensures that your applications are fully tested and that any bugs are identified early on.
* **Agility & Adaptability:** Compage's code remains adaptable and deployable, empowering you to respond to changing business needs with confidence.

P.S. We've prepared a [complete guide to Compage](https://intelops.ai/blog/introducing-compagedev-centric-platform-for-auto-code-generation--fortified-security/), check it out!

## Compage in Action – Building a Procurement Solution

We wanted to build a procurement solution that is more efficient and agile. To achieve this, we chose Compage for automating the development process. Below are the specific details:

1. This use case considers two processes: invoice generation and payment.
2. The invoice service will be developed using Go and will include REST and gRPC servers.
3. Payment service endpoints will be available via both REST and gRPC protocols.
4. The invoice service will feature CRUD operations for Purchase Orders and Invoices, while the payment service will handle CRUD operations for Payments.

Check out our step-by-step guide on how we implemented a procurement solution with Compage.

## Implementation

1\. Sign into Compage with GitHub.

{{< image src="images/step-1-sign-in.png" webp="false" >}}
  
2\. Once signed in, create a project. Since we are building this use case from scratch, we will make a New Project.

{{< image src="images/step-2-create-project.png" webp="false" >}}

3\. Name your project and repository. We opted for a domain-specific format and named our project and repository **intelops-procurement-solution**. Domain-specific names provide clarity, contextual relevance, improved searchability, alignment with business logic and ease of maintenance. Once completed, the repository name will appear on GitHub.

{{< image src="images/step-3-add-name-to-project.png" webp="false" >}}

{{< image src="images/step-4-project-saved-in-github.png" webp="false" >}}

4\. Once the project is created, we can begin building nodes (microservices). The first node we are creating will be for the invoice service.

{{< image src="images/step-5-create-a-node.png" webp="false" >}}

5\. Double click on the node and add the required details, including the component name, preferred language, and the server. Compage provides built-in support for Go; however, we also offer support for other languages through OpenAI.

{{< image src="images/step-6-add-node-properties.png" webp="false" >}}

6\. After selecting the Server (we chose REST server), select the template, framework, port and database.

{{< image src="images/step-7-node-properties-added.png" webp="false" >}}

7\. As we are creating a node for the invoice service, we will define attributes we want to capture the data for, including amount, payment terms, and items.

{{< image src="images/step-8-add-or-update-the-rest-server.png" webp="false" >}}

8\. Once done. click on **Update Changes** followed by **Generate Code**. The generated code is saved to GitHub repository.

{{< image src="images/step-9-generate-code.png" webp="false" >}}

{{< image src="images/step-10-code-saved-to-github-repository.png" webp="false" >}}

{{< image src="images/step-11.png" webp="false" >}}

{{< image src="images/step-12.png" webp="false" >}}

Let's take a moment to pause and explore a few integrations we have used.

#### CodeCov

CodeCov helps collect code coverage data for codebases. The collected data can be used to identify untested code areas and measure the overall test coverage. Compage's integration with CodeCov allows it to automatically collect code coverage data for projects. This saves time and helps ensure that the code is fully tested.

{{< image src="images/step-13-codecove-integration.png" webp="false" >}}

#### DeepSource

DeepSource integration within Compage provides an advanced code review and analysis layer, systematically identifying code quality issues and potential bugs.

{{< image src="images/step-14-deep-source-integration.png" webp="false" >}}

#### GitHub Actions

GitHub Actions is a CI/CD platform used to automate software development workflows. It can be used to perform tasks such as building, testing, and deploying code.

{{< image src="images/step-15-github-actions.png" webp="false" >}}

#### Trivy

Trivy is an open-source security scanner that scans container images for vulnerabilities. Compage's integration with Trivy helps in developing more secure applications by automation the security scanning process and providing visibility into the security risks of container images.

{{< image src="images/step-16.png" webp="false" >}}

{{< image src="images/step-17-of-trivy-integration.png" webp="false" >}}

9\. Merge first pull request.

{{< image src="images/step-18-merge-first-pull-request.png" webp="false" >}}

{{< image src="images/step-19.png" webp="false" >}}

####

#### Kubernetes

K8s integration is a way to deploy applications to Kubernetes clusters. This can help to improve the scalability and reliability of applications and make it easier to manage applications.

{{< image src="images/step-20-k8s-integration" webp="false" >}}

#### Cosign

Cosign enhances the security of Docker images by digitally signing them, providing verifiable proof of the image's origin and integrity. Integrating Cosign image signing with Compage adds a layer of trust and security to application deployment process.

{{< image src="images/step-21-cosign-images.png" webp="false" >}}

{{< image src="images/step-22.png" webp="false" >}}

10\. The code for the invoice service is ready and reflected on GitHub.

{{< image src="images/step-23.png" webp="false" >}}

11\. Start server on local, curl request.

{{< image src="images/step-24.png" webp="false" >}}

#### DevSpace

DevSpace is an open-source CLI tool used to develop, deploy, and manage cloud-native applications.

{{< image src="images/step-25-devspace-integration.png" webp="false" >}}

{{< image src="images/step-26.png" webp="false" >}}

{{< image src="images/step-27.png" webp="false" >}}

#### Prometheus

Prometheus, an open-source monitoring system, collects metrics from applications and stores them in a time series database. Compage integrates with Prometheus to gather metrics from microservices, enabling monitoring of their health and performance for troubleshooting.

{{< image src="images/step-28.png" webp="false" >}}

11\. Follow Step 4-6 to create a new node (microservice) for Payment Service. For Payment Service, we will use gRPC server and we will select Invoice (which we created a node for) as an attribute to establish a 1-to-1 relationship. Other attributes include invoice number and total.

{{< image src="images/step-29-another-node-grpc-server.png" webp="false" >}}

12\. Both nodes can now be connected by an edge. Click on edge to modify its properties, such as name, server and port number.

{{< image src="images/step-30-connecting-two-nodes.png" webp="false" >}}

{{< image src="images/step-31.png" webp="false" >}}

13\. Merge second pull request.

{{< image src="images/step-32-merge-second-pull-request.png" webp="false" >}}

14\. Compage can generate both REST clients and gRPC clients for the backend workloads that you design. REST clients are typically used for communication with HTTP APIs, while gRPC clients are used for communication with gRPC APIs.

{{< image src="images/step-33-rest-clients.png" webp="false" >}}

{{< image src="images/step-34.png" webp="false" >}}

15\. Start the server locally (both REST and gRPC servers run with a single command), and use the Evans CLI to make gRPC calls.

{{< image src="images/step-35.png" webp="false" >}}

{{< image src="images/step-36.png" webp="false" >}}

####

#### DevContainers (DevPods)

DevContainers provides a way to develop applications in isolated environments containing all the necessary dependencies. This improves reproducibility of development environments, making it easier to debug problems. Compage integrates with DevContainers to create DevPods, which are pre-configured DevContainers optimized for Compage development. The integration saves time and effort required for setting up environment and guarantees that dev environments are always consistent.

{{< image src="images/step-37.png" webp="false" >}}

15\. The procurement solution has been set up with both the codes ready for use.

What would have taken days is now possible in hours. That's the power of Compage! Try it for yourself; check out the [Compage documentation](https://docs.intelops.ai/compage/latest/) for more details. If you like what we are doing, check out [Compage on GitHub](https://github.com/intelops/compage). A star is always appreciated. We have more updates coming so, follow us on [LinkedIn](https://www.linkedin.com/company/intelopsai).
