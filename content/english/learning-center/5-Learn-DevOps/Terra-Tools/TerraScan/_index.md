---
title: "Terraform scan using terrascan"
date: 2023-11-16
draft: false
description: "IAC Terraform scanning"
weight: 4
---

# Enhance Your Terraform Security with Terrascan

As the adoption of Infrastructure as Code (IaC) continues to rise, ensuring the security and compliance of your infrastructure templates becomes paramount. This is where Terrascan comes into play. Terrascan is an open-source tool that provides static code analysis for your IaC, helping you identify security risks, compliance violations, and best practice issues. In this blog post, we'll explore what Terrascan is, why it's crucial for your IaC projects, and how you can start using it to bolster your infrastructure security.

## What is Terrascan?

Terrascan is a static code analyzer designed specifically for IaC written in HashiCorp Configuration Language (HCL). It scans your Terraform code for potential security vulnerabilities, compliance violations, and adherence to best practices. Terrascan supports various cloud providers including AWS, Azure, Google Cloud, and Kubernetes.

## Why Use Terrascan?

### 1. **Security First Approach**

Terrascan helps you proactively identify security risks in your infrastructure code. It scans for misconfigurations and potential vulnerabilities before they can be exploited.

### 2. **Compliance Assurance**

For organizations subject to compliance requirements, Terrascan ensures that your infrastructure code adheres to industry-specific standards. It checks for compliance with frameworks like CIS, NIST, and HIPAA.

### 3. **Best Practice Adherence**

Terrascan enforces best practices for IaC development. It identifies areas where your code can be optimized for performance, maintainability, and readability.

### 4. **Easy Integration**

Terrascan can be seamlessly integrated into your CI/CD pipeline. This allows you to automate the scanning process and catch issues early in the development lifecycle.

## Getting Started with Terrascan

### Installation

Getting started with Terrascan is straightforward. Begin by downloading the latest release for your platform from the [official GitHub repository](https://github.com/accurics/terrascan). Once downloaded, add the Terrascan binary to your system's PATH.

### Scanning Your Terraform Code

To scan your Terraform code, navigate to the directory containing your Terraform files and run the following command:

```bash
terrascan scan
```
## Integrating Terrascan into Your Workflow

### CI/CD Pipeline Integration

To automate security checks in your CI/CD pipeline, incorporate Terrascan into your existing workflow. This can be done by adding a Terrascan scan step before deploying your infrastructure.

```yaml
# Example tekton task configuration
apiVersion: tekton.dev/v1beta1
kind: ClusterTask
metadata:
  name: terrascan-task
spec:
  params:
    - name: BASE_IMAGE
      description: The base image for the task
      type: string
      default: tenable/terrascan:latest
    - name: terrascan_format
      type: string
      default: json
    - name: terrascan_outputs
      type: string
      default: terrascan_results.json
    - name: IAC_DIR
      type: string
      default: "terraform"
  workspaces:
    - name: source
  steps:
    - name: terrascan
      image: $(params.BASE_IMAGE)
      workingDir: $(workspaces.source.path)      
      script: |    
        terrascan scan -o $(params.terrascan_format) -d $(params.IAC_DIR) | tee -a $(params.terrascan_outputs)
        cat $(params.terrascan_outputs)
```

```yaml
# Example .gitlab-ci.yml configuration

stages:
  - scan
  - deploy

terrascan_scan:
  stage: scan
  script:
    - terrascan scan
  only:
    - merge_requests
```


In this example, we've added a terrascan_scan job to our Tekton/GitLab CI/CD pipeline. This job executes the terrascan scan command, which scans our Terraform code for potential security issues. The job is triggered only for merge requests.

**You can observe the output as follows:**
```json
Defaulted container "step-terrascan" out of: step-terrascan, prepare (init), place-scripts (init), working-dir-initializer (init)
{
  "results": {
    "scan_errors": [
      {
        "iac_type": "arm",
        "directory": "/workspace/source/terraform",
        "errMsg": "ARM files not found in the directory /workspace/source/terraform"
      },
      {
        "iac_type": "docker",
        "directory": "/workspace/source/terraform",
        "errMsg": "Dockerfile not found in the directory /workspace/source/terraform"
      }
    ],
    "violations": [
      {
        "rule_name": "unrestrictedIngressAccess",
        "description": "Ensure no security groups allow ingress from 0.0.0.0/0 to ALL ports and protocols",
        "rule_id": "AC_AWS_0231",
        "severity": "HIGH",
        "category": "Infrastructure Security",
        "resource_name": "testvm",
        "resource_type": "aws_security_group",
        "module_name": "root",
        "file": "main.tf",
        "plan_root": "./",
        "line": 53
      }
    ]
{
  "results": {
    "scan_errors": [
      {
        "iac_type": "arm",
        "directory": "/workspace/source/terraform",
        "errMsg": "ARM files not found in the directory /workspace/source/terraform"
      }
    ]
   }
}                      
```

By integrating Terrascan into your CI/CD pipeline, you can ensure that your infrastructure code is continuously validated for security and compliance.

## Conclusion

Terrascan is a valuable addition to your Infrastructure as Code (IaC) toolkit. By providing static code analysis tailored for Terraform, it empowers teams to proactively identify security risks, compliance violations, and best practice issues in their infrastructure code.

With features like custom policies, remote execution, and multi-cloud support, Terrascan offers flexibility and extensibility to meet the specific needs of your organization.

---

*Note: Always refer to the official Terrascan documentation for the latest information and best practices.*

