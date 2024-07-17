---
date: 2023-08-04
title: Introducing Compage – Dev-Centric Platform for Auto-Code Generation & Fortified Security
description: Overview blog for compage
image: images/blog/Introducing-Compage–Dev-Centric-Platform-for-Auto-Code-Generation-&-Fortified Security/CompageAutoCodeGenerationandSoftware-SupplyChainSecurity.png
cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: shreya
series: Cloud Native Applications
categories:
- Cloud Native
- Kubernetes
- Low-Code
- gRPC
- Backend Automation
- Visibiity and Control
tags:
- Application Development
- Low-Code
- gRPC
- Overview
- Compage
- Kubernetes Applications Development
- Cloud Native Applications

# image color code in undraw.co #FB7E44
feedback: false
draft: false

---

{{< image src="images/blog/Introducing-Compage–Dev-Centric-Platform-for-Auto-Code-Generation-&-Fortified Security/CompageAutoCodeGenerationandSoftware-SupplyChainSecurity.png" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Organizations today face a slew of challenges that significantly impact their growth.
According to a survey conducted by Wiley, [69% of HR professionals believe their organizations face a skill gap.](https://universityservices.wiley.com/closing-the-skills-gap-2023/)Upskilling the existing workforce requires investment, and while hiring qualified candidates is time-consuming, the greater challenge lies in retaining them, as employees with in-demand skills seek flexible working environments and competitive compensation.

Another pressing issue plaguing organizations is the escalating number of security threats. Thales, in its [Data Threat Global Edition 2023](https://cpl.thalesgroup.com/data-threat-report)  report, highlighted a significant increase in both the volume and severity of attacks, with a 59% increase in malware, a 48% increase in ransomware, and a 43% increase in phishing attacks. While human error is the primary reason for data breaches, poor software quality owing to “build fast, fix later” exposes organizations to vulnerabilities and contributes to the accumulation of technical debt.

{{< image src="images/Skill_Gap_and_Security_Challenges_Software_Development.png" webp="false" >}}

Managing technical debt becomes a significant challenge for leaders amidst constant changes, high customer expectations, evolving requirements, cybersecurity threats, and employee turnover, hurting product development velocity, software quality, and the value delivered to customers.

All of these challenges have far-reaching implications for businesses. From difficulty in meeting growth targets and driving innovation to capitalizing on market opportunities, organizations risk losing market share. Furthermore, any organization that struggles to embrace emerging technologies and implement digital transformation initiatives risks jeopardizing its future viability.

Teams are now required to examine the entire SDLC and streamline every aspect of the development process. To understand the impact, let's begin with the first step of the software development life cycle—the build phase—and explore how optimizing development workflow empowers developers in delivering high-quality and secure code.

{{< image src="images/Optimized_Dev_Workflows_Compage.png" webp="false" >}}

## Optimize Development Workflow With Compage

[Compage](https://capten.ai/compage/), an opensource project, is a low-code universal language framework that accelerates the application development process through the adoption of emerging technologies such as Rest API, gRPC, GraphQL, microservices, WebAssembly, FaaS, IoT, and edge services.

But, Compage goes beyond development. It automates the use of best practices, ensuring that the application is developed securely and that it adheres to software supply chain security standards. It also incorporates SBOM (Software Bill of Materials), enabling development teams to maintain transparency and ensure code governance.

Compage enables developers to take full advantage of Kubernetes’ capabilities to create scalable and reliable applications. The framework, specifically catering to Kubernetes enthusiasts, offers tools and features tailored for K8s development, including controllers, CRDs (Custom Resource Definitions), unique APIs, operators, hooks, etc.

## Who is it for?

### **Developers**

Compage is a perfect ally to developers, freeing up their time from complex coding processes to focus on the project’s core, increasing their productivity and efficiency.

### **Growing Businesses**

Expanding businesses can easily scale their development efforts with Compage, achieving faster time to market without compromising on security or quality. Our solution gives startup and growing businesses the flexibility and efficiency to remain competitive, whether they are developing Rest APIs, microservices, or embracing new-age technologies and application protocols.

### **Enterprise**

Compage comes with enterprise-grade capabilities that enable enterprises to deploy applications rapidly. The solid low-code framework ensures that security protocols, best practices, and software supply chain governance are adhered to. With specialized tools for Kubernetes development, Compage stands as an excellent choice for enterprises using containerization and microservices architecture.

## Compage Capabilities

- Diagramming library to visually describe backend workloads for cloud-native and Kubernetes settings.
- Simple user interface for easy adoption.
- Authentication, container build tools, cosign and other Git integrations for accelerated development process.
- Automated code generation based on diagram-to-code input flow.
- Automated software supply chain procedures for configuring tools like codecov, deepsource, cosign, deployments and services in Kubernetes environments.
- Completely agnostic to tools, platforms, programming languages, infrastructure, cloud, etc.

**We've got an update!**

Compage now integrates with gRPC, a high-performance, open-source framework for building efficient and scalable APIs. This latest enhancement will now allow developers to leverage gRPC in their backend workloads. Because gRPC allows for quick and efficient communication across microservices, it is an excellent solution for cloud-native systems for developing low latency and secure applications.

## How is Compage Different?

**Code Quality:** Compage utilizes the strengths of GO and Rust to generate clean, reliable, and secure code. GO's simplicity and readability enable developers to create optimized and maintainable backend workloads and Rust's focus on memory safety and preventing common errors enhances code reliability and security. By combining the two, Compage helps developers to produce high-quality backend workloads.

**Visibility and Control:** With Compage, you have a clear view and full control over your project, making it simple to track, review, and understand your work. Compage helps development teams to maintain high standards by following best practices and industry regulations. With a focus on code-level governance, Compage simplifies project management, reduces risks, and ensures effortless compliance.

**Agnostic:** Compage is agnostic to specific cloud providers, Kubernetes distributions, UI frameworks, container build tools, source code management platforms, Kubernetes resources, and deployment options. This agnosticism allows users to leverage Compage in their preferred environments, enabling flexibility and freedom of choice.

**Backend Automation:** Compage stands out with its unique focus on automated backend development. While other tools primarily cater to frontend development needs, Compage takes a distinctive approach by eliminating the need for manually writing extensive lines of code. It automates backend functionalities such as database handling, server-side scripting, and API integrations, freeing up developers to prioritize other project aspects. Compage’s approach ensures consistency, minimizes errors, and enhances the stability and performance of software systems.

## Future Roadmap

Compage is an opensource project with a very big vision ahead. Some of the interesting features we are developing are, but not limited to:

- Auto-Code generation in multiple programming languages
- Support code generation for Microservice, REST API, gRPC, GraphQL, WebSocket, WebHook, WebAssembly, etc.
- Auto instrumentation of the generated code with cloud-native de facto observability tools like openTelemetry, Prometheus, Profiling tools, etc.
- Integration with Generative AI LLM models like ChatGPT to auto generate test cases, documentation, etc.
- Integration with multiple code quality and vulnerability platforms like DeepSource, Codecove, SonarQube, Checkmarkx, Mend, Snyk, Trivy, etc.
- Integrations with software supply chain tools and frameworks like SigStore, Cosging, Grype, Syft, ClycloneDX, SigStore, SLSA, NIST, etc.
- Build tools integration for containerization, WebAssembly, Kubernetes manifests, etc.
- Integration with development tools like VSCode, GitPod, DevPod, Devspace, etc.
- Integration with software catalog tools like Backstage, Bit.dev, etc.
- Generating configurations to make the auto generated code work with API Gateways, Service Mesh, Databases, Monitoring tools, etc.
- Monorepo and multi-repo support

Our list of integrations and features to develop is continuously growing with the feedbacks we are getting. Thanks to the opensource community.

## How Do I Get Started?

Developers can integrate Compage with Git platform by linking their accounts to create repositories and commit generated code directly. Compage follows the monorepo method (for now) and establishes a one-on-one relationship with the Git repository, which encompasses all the generated source code for each node created on the drawing panel. Developers can use the sketching canvas to configure services, save projects, and instantly upload the resulting code to their connected Git repository. This integration between Compage and Git platform enhances collaboration and simplifies version control, thereby providing valuable support to developers in their backend development efforts. Check out the [Compage documentation](https://docs.capten.ai/compage/latest/) for more details.

If you like what we are doing, check out  [Compage On Github](https://github.com/intelops/compage).  A star is always appreciated. We have more updates coming so, follow us on  [LinkedIn](https://www.linkedin.com/company/intelopsai/).
