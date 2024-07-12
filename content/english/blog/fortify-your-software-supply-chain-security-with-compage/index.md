---
date: 2023-10-03
title:  Code Signing With Compage- Safeguarding Your Software Supply Chain from Threats
description: Automating Security Process
image: images/blog/fortify-your-software-supply-chain-security-with-compage/automatesoftwaresupplychainsec.jpg
cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: shreya
series: Software Supply Chain Security
categories:
- Compage
- Software Supply Chain Security

tags:
- code signing
- docker image signing
- oidc approach
- keyless


# image color code in undraw.co #FB7E44
feedback: false
draft: false

---
{{< image src="/images/blog/fortify-your-software-supply-chain-security-with-compage/automatesoftwaresupplychainsec_v1.jpg" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

A software supply chain comprises the code, people, system, and processes of creating, distributing, and maintaining software. In short, anything that touches it at any point. Software supply chain attacks are not new but have recently become more dangerous. Exposed to weak links across the software development life cycle, a vulnerability at any stage or in any dependencies can make your software susceptible to a potential compromise.

According to a report by [Gartner](https://www.gartner.com/en/newsroom/press-releases/2022-03-07-gartner-identifies-top-security-and-risk-management-trends-for-2022), by 2025, 45% of organizations worldwide will have experienced attacks on their software supply chains. Overcoming this issue requires companies to develop a robust plan to keep their software safe throughout its creation and distribution.

Therefore, Software supply chain security refers to the set of practices and measures that an organization must implement to safeguard their software from potential threats and supply chain vulnerabilities. These measures include conducting code reviews, managing dependencies, verifying software authenticity, and monitoring continuously to ensure software integrity.

Companies must adopt a couple of secure methods: **Code & Artifacts Signing**.

## What is Code Signing?

Code signing is a security practice that utilizes a unique digital signature to sign software code. The signature is a marker of authenticity, verifying that the code has not been tampered with or altered. The transparency provided by code signing enables tracking and helps pinpoint the root cause of security issues or breaches in the software supply chain.

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7113013653993390080" height="350" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

Companies not opting for code signing can face a range of issues:

* Unsigned software is more susceptible to tampering by malicious actors who can inject malware or compromise the software’s integrity. This exposes companies to heightened cybersecurity risks, resulting in data breaches, financial losses, and reputational damage.
* Additionally, companies may encounter difficulties distributing software through trusted platforms and marketplaces that often mandate code signing as a prerequisite, limiting their market reach and impacting their sales. Moreover, non-compliance can lead to legal liabilities and regulatory fines in regions where code signing is legally required.
* Developers encounter a series of challenges when code signing is omitted. It exposes their software to elevated security risks, erodes user trust due to concerns about code integrity, and adds complexity to the debugging process, potentially affecting the overall software quality.

When code signing and artifacts signing practices are implemented, tools like gitSign, GPG/PGP, CoSign, in-toto would make your life easy to sign every git commit and also artifacts like container images. Since signing git commits is very simple, we will skip explaining it here. If you want to learn step-by-step about gitsign and cosign, you can refer [here](https://docs.sigstore.dev/signing/gitsign/).

## OpenID Connect Explained  

The OIDC (OpenID Connect) approach is a secure authentication and authorization protocol used to verify the identity of users in web applications and APIs. It combines the capabilities of OAuth 2.0 with identity verification, enhancing security by confirming the authenticity of users before granting access to resources.  

## Compage – The OIDC Approach to Container Image Signing

[Compage](https://capten.ai/compage/) leverages the capabilities of Sigstore and its integration with the Cosign tool. Sigstore, an open-source tool, enhances software supply chain security by providing transparency and verification for software artifacts. It accomplishes this through the Cosign tool, which is used for signing Docker images.

[Signing Docker images with Sigstore](https://github.com/sigstore/cosign) involves a keyless approach, where the Social Login mechanism (login via GitHub, Google, Microsoft, etc.) serves as the authentication provider, guaranteeing user authentication and identity verification with Human interaction.

When someone attempts to access these signed Docker images, a dual-check approach comes into play. This dual-check approach ensures that only authenticated users can sign or access images, making it difficult for unauthorized parties to tamper with the images.  

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7113413683707342849" height="350" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

#### Why a keyless approach?  

* Keyless approaches simplify key management, reducing the risk of key compromise.  
* They support automated CI/CD pipelines and are compatible with container security best practices.  
* Content trust ensures container image integrity based on content rather than private keys, providing a scalable and secure alternative to traditional key-based signing.

### Mitigating Software Supply Chain Risks

Integrating Compage with signing container images capability is a proactive step in mitigating risks associated with compromised images and their artifacts. Now, as supply chain attacks are a growing concern, our framework acts as a safeguard, helping prevent unauthorized changes to software components and artifacts, thus maintaining the reliability of the software supply chain for the code generated via Compage.

Want to see Compage in action? Check it out on [GitHub](https://github.com/intelops/compage). You can also get started by checking out [Compage documentation](https://docs.capten.ai/compage/latest/) for more details. If you like what we are doing, please leave us a star. And, if there are any burning questions we have not yet answered, feel free to contact us via LinkedIn. We would love to talk to you!
