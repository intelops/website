---
date: 2024-02-09
title: Securing Your Code from the Start - The Power of Pre-Commit Hooks in DevSecOps.
description: The Power of Pre-Commit Hooks in DevSecOps.
image: images/blog/securing-your-code-from-the-start/secure_undraw.svg

cover_image: false
cover_image_src: ""
cover_image_height: ""
cover_image_width: ""

author: Santosh Kaluskar
series: DevSecOps Series
categories:
  - DevSecOps
  - Security
  - Shift-left
  - Development
  - SDLC
tags:
  - Development
  - DevSecOps
  - Shift-Left
  - shiftleft

# image color code in undraw.co #FB7E44
feedback: false
draft: false
---

{{< image src="images/blog/securing-your-code-from-the-start/secure_undraw.svg" alt="alter-text" height="" width="200px" class="img-fluid" caption="" webp="false" position="float-left" >}}

**Introduction**
In the ever-evolving world of software development, the traditional reactive security approach has been the go-to for many organizations. This approach, which often treats security as a mere afterthought, prioritizes functionality and relegates security checks to the last minute, typically just before deployment. When vulnerabilities emerge late in this cycle, the resulting fixes can be costly and delay-ridden. It's a retroactive model, standing in clear contrast to the Shift-Left movement in DevSecOps, which champions early security integration for a more proactive and efficient development process.

The Shift-Left movement in DevSecOps heralds a proactive revolution in software security. Rather than waiting for the final stages of development to address vulnerabilities, Shift-Left emphasizes the importance of integrating security from the very inception of a project. By prioritizing security alongside functionality from the outset, it ensures a seamless blend of both, reducing costly delays and fostering a development culture where security is everyone's responsibility. This forward-thinking approach not only anticipates potential threats but also builds more resilient systems, reflecting a holistic vision of software development where quality and security go hand in hand.

## Embracing Early Integration: The Evolution and Impact of the Shift-Left Paradigm in Software Development

**Shift-Left**, in software development refers to integrating tasks like quality assurance, testing, and security earlier in the software development lifecycle (SDLC) rather than at the end. This approach, which emerged as a response to the inefficiencies of late-stage testing and security fixes, aims to improve efficiency, product quality, and address cybersecurity threats more effectively. Over time, it has evolved into a cultural shift within the industry, promoting proactive problem-solving and cross-functional collaboration.

**Traditional vs. Shift-Left Security in Software Development**: The traditional approach, reactive and isolated, often leads to costly late-stage remediation and higher risks of security breaches. In contrast, the Shift-Left approach advocates for proactive, collaborative security practices from the project's inception, aiming for efficiency, cost-effectiveness, and reduced risk. In essence, while traditional security approaches often act as last-minute gatekeepers, the Shift-Left paradigm ensures security is a continuous, collaborative, and proactive journey from the start.

## How Securing from the Start Works
Securing from the start transforms the approach to software development by integrating robust security practices right from the initial phases, ensuring a foundation of safety and reliability throughout the project's lifecycle. This method involves:

   - Emphasis on security during requirement gathering, analysis, and design phases.
   - Embedding security during the initial phases of development.
   - Continuous and automated security checks at **CI** stage as a foundational process.

In this post, I will be discussing few specific tools and technologies which can help us acheive the above objectives. One among them is [**Git Hooks**](https://git-scm.com/docs/githooks) and How we can secure our source code in Continonous Integration (CI) phase.

## What are Git Hooks

Git hooks are executable scripts that trigger actions at certain points in git’s execution. They are a powerful feature for automating and customizing Git's internal behavior and are used to enforce code quality standards, run tests, run static analysis of the source code (SAST) or even automate deployment tasks.

Each Git repository has a `.git/hooks` folder containing sample scripts for various hook points. These scripts are customizable and can be written in any language that can be executed on your system. The most common types of hooks include:

- **Pre-Commit**: Executes before a commit is finalized, allowing you to inspect the snapshot that's about to be committed. Triggered with `git commit` workflow.
- **Pre-Push**: Runs during git push before any objects are transferred, verify what is about to be pushed.  Called by `git push` command
- **Post-Commit**: Triggered after a commit is made, useful for notification or automation following a commit.

These hooks enable developers to set up policies for code review, formatting checks, or to trigger CI/CD workflows. By leveraging Git hooks, teams can greatly enhance their development workflows, ensuring secure code and, that only quality code makes it to their repositories.


## Leveraging Pre-Commit Hooks for Enhanced Security

Pre-commit hooks are especially crucial in the Shift-Left paradigm. They act as the first line of defense, ensuring that vulnerabilities and coding errors are caught and resolved before they make their way further into the development pipeline. Here are some examples of how pre-commit hooks can be used to enhance security:

- **Code Quality Checks**: Pre-commit hooks can be configured to run linters and code formatters, ensuring that all committed code adheres to predefined coding standards and best practices. This not only improves readability but also reduces the chances of security vulnerabilities that are often associated with poorly written code.

- **Static Application Security Testing (SAST)**: By integrating SAST tools into pre-commit hooks, you can automatically scan for common security issues like SQL injection, cross-site scripting (XSS), and buffer overflows before the code is even committed.

- **Dependency Checks**: With these hooks, you can automate the scanning of dependencies for known vulnerabilities. This is crucial because third-party libraries and frameworks can often introduce vulnerabilities into your code base.

### Example of a Pre-Commit Hook for Code Quality Check

Git hooks are highly flexible and can be written in any programming language that your system can execute, including shell scripts. This versatility allows developers to choose the language they are most comfortable with or that best suits the task at hand. For instance, shell scripts are commonly used for Git hooks due to their simplicity and direct access to Git commands, making them an excellent choice for automating routine tasks like code linting, running tests, or performing security checks before commits and pushes.

Here is a simple example of a pre-commit hook script that checks for code formatting issues using a tool like ESLint for JavaScript:

```shell
# exlint.sh


# Get a list of staged files that are being committed, filtering for JavaScript files.
# `git diff --cached --name-only --diff-filter=ACM`: Lists names of staged files (A-added, C-copied, M-modified)
# `grep '\.js$'`: Filters the list to include only files ending with .js (JavaScript files)
files=$(git diff --cached --name-only --diff-filter=ACM | grep '\.js$')

# Check if the variable 'files' is not empty, indicating that there are JavaScript files to lint.
if [ -n "$files" ]; then
    # Run ESLint on the staged JavaScript files.
    # `npx eslint $files`: Executes ESLint for the specified files. 'npx' runs a package executable.
    npx eslint $files
    # Check the exit status of ESLint
    if [ $? -ne 0 ]; then
        echo "ESLint found issues."
        exit 1
    fi
fi
```

The above script will run ESLint on all staged JavaScript files and block the commit if there are any linting errors. It ensures that only code that meets the quality standards is committed, thereby reducing the likelihood of security issues.

Now, to use the above shell script as a pre-commit hook, we need to make the script executable by using the following command:

```shell
chmod +x ./eslint.sh
```

Once done, navigate to the root directory of your Git repository. Then place the executable script `./eslint.sh` in the `.git/hooks` directory. That's it!

### Testing the Hook:
Now, the pre-commit hook is set up. It will run automatically whenever you attempt to commit changes. To test it, try committing a JavaScript file with some linting errors. The commit should be blocked, and you should see the "ESLint found issues." message if there are any lint errors.

**Remember**, the above pre-commit hook is local to your repository and needs to be set up in each repository where you want this functionality. Also, it relies on having ESLint installed and properly configured in your project. If your project doesn't already include ESLint, you'll need to set it up separately.

## Enhancing Security with Pre-Push Hooks

Pre-push hooks take security checks a step further by executing custom scripts before changes are pushed to a remote repository. This provides an additional layer of security, ensuring that not only is the code quality maintained but also that any changes meet the project's security standards before they are shared with others or integrated into the main codebase.

### Use Cases for Pre-Push Hooks

- **Running Unit Tests**: Ensure that all unit tests pass before allowing a push to proceed. This helps to catch any breaking changes or regressions early in the development cycle.
- **Performing Integration Tests**: Run integration tests to verify that changes work as expected with external systems and services, preventing potential issues in production environments.shell.
- **Security Audits**: Conduct security audits or vulnerability scans on the codebase to identify any new security threats before they are pushed to a central repository.

## Automating Tasks with Post-Commit Hooks
Post-commit hooks offer a unique opportunity to automate tasks immediately after a commit is made, enhancing workflow efficiency and ensuring that necessary actions are not overlooked.

### Use Cases for Post-Commit Hooks
- **Notification Systems**: Send notifications to team members or integration tools about the new commit, facilitating immediate feedback or further actions.
- **Automating Documentation**: Automatically update documentation based on the latest commit, ensuring that project documentation stays up-to-date with code changes.
- **Continuous Integration Triggering**: Trigger a build or continuous integration process, ensuring that each commit is automatically tested in an isolated environment.

## Conclusion
Incorporating Git hooks like pre-commit, pre-push, and post-commit into your development workflow can significantly enhance the security and efficiency of your software development process. By automating checks and tasks, developers can catch issues early, maintain code quality, and ensure compliance with security standards, embodying the Shift-Left ethos of integrating security from the start. As DevSecOps continues to evolve, the adoption of these tools and practices will become increasingly crucial for developing secure, high-quality software in an efficient and collaborative environment.shell
