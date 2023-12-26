---
date: 2023-05-05
title: Understanding Software Supply Chain Security
description: What is software supply chain security, and how does it affect your projects?
image: images/blog/understanding-software-supply-chain-security/secure_server.svg

cover_image: false
cover_image_src:
cover_image_height: ""
cover_image_width: ""

author: hannan-khan

series: Secure Software Supply Chain

categories:
  - Software Supply Chain Security

tags:
  - Software Supply Chain Security
  - Secure Software Supply Chain

# image color code in undraw.co #FB7E44
feedback: false
draft: false
---

{{< image src="/images/blog/understanding-software-supply-chain-security/secure_server.svg" alt="alter-text" height=""
width="300px" class="img-fluid" caption="" webp="false" position="float-left" >}}

Nowadays, software companies tend to use/borrow a lot of code that has been created by third-parties. Usually, this code
is taken from open-source codebases. In fact,
<a href="https://venturebeat.com/entrepreneur/synopsys-84-of-codebases-contain-an-open-source-vulnerability/" target="_blank">
around 85% of enterprise codebases contain code that has been taken
from open-source</a>. Each addition of this open-source code counts as a dependency for the enterprise codebase, and
each dependency adds to the list of possible vulnerabilities in the software product. This is
where `software supply chain security` comes into play.  
This is a concept not understood often by fledgling developers, so let's get into what this is, and which best practices
to follow.
________________

# The What & Why Of Software Supply Chain Security

The software supply chain is defined by anything and everything that takes part in your software product. This includes
everything from binaries and open source libraries, to whoever wrote the code and known vulnerabilities.  
We must care about this security as developers because, as mentioned before, software products carry a lot of
dependencies from open-source. If any of these dependencies have vulnerabilities, then those vulnerabilities extend into
your software product as well. This also means that all parts of a supply chain can affect our software, and can
contribute to vulnerabilities.  
This is extremely important, as keeping track of vulnerabilities in our supply chain can get tedious if your software
product has hundreds of open source codebases to keep track of.

# Software Supply Chain Attacks

An attack occurs on the software supply chain when malicious code is added to a component of software, and spread using
that same software's supply chain.  
These are very real attacks that can be executed very easily. The reasoning behind which is that anyone can contribute
to open source code. If the code is not well maintained and/or the pull request is not reviewed thoroughly, malicious
code can be inserted into the codebase. This will then be used by whatever software supply chains the open source
codebase is part of.
The now inserted malicious code can execute crypto mining, or create a backdoor for bots to access.
Fewer than 10 attacks occur each year, and they are extremely targeted.

> ## **Did You Know?** - `Log4Shell` Attack
>
> `Log4Shell` is a vulnerability within a popular Java library used for logging errors in applications.  
> This vulnerability allows attackers to take control of a device (through the internet) if the device is using a
> certain
> version of this library. Since this library was ubiquitous, this in turn resulted in millions of attempted exploits.  
> This snafu serves as a reminder to developers and enterprises to maintain our software supply chain security.

# Current Software Supply Chain Security

Currently, major threats to software supply chains are still present within open source codebases. More specifically,
vulnerabilities that have been identified within these codebases tend to persist without being fixed. Of course, it's
most likely that these vulnerabilities will eventually be fixed with patches. However, the identification of and
patching these vulnerabilities tends to make software supply chain attacks easier to execute.

# Software Supply Chain Best Practices

Keeping your software supply chain secure goes beyond just constantly applying patches. In order to fully embrace a
secure software
supply chain, you must adopt the DevSecOps philosophy. This idea aims to integrate security into every aspect of
development and deployment for an app.  
There are three key best practices:

* Keep track of dependencies - this includes transitive dependencies (a dependency of a dependency). You must also keep
  track of vulnerabilities in your dependencies.
* Manage your dependencies - if/when any new vulnerabilities are discovered, your dependencies need to be patched
  accordingly. During this step, you must keep track of updating your dependencies.  
  **Note:** At times, when a dependency updates,
  it can add a transitive dependency to your supply chain.
* Monitor your supply chain - inspect and enforce your dependencies often, to prevent a drift in your software supply
  chain.

Of course, these practices can be combined with other, more basic practices. You can try to use signed builds of
dependencies, or verified components such that you maintain the integrity of your supply chain. An important word to
note is “provenance”, which is knowing where a component came from, and verifying/trusting its source.  
There are also certain tools that can make following these practices easy. For example, identifying dependencies is easy
on GitHub using
the [`dependency graph`](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph).
Other tools such as GitHub's [`Dependabot`](https://docs.github.com/en/code-security/dependabot) can help you by
notifying you of vulnerabilities within your codebase's dependencies.

# Conclusion

In conclusion, the software supply chain is composed of any and all parts that are required to make software. Meanwhile,
software supply chain security deals with protecting our software from all of the vulnerabilities that our dependencies
bring to the table. In order to keep software products up-to-date and secure, we must keep track and manage all of our
dependencies.
