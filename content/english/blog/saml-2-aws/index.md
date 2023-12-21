---
title: "Never store your AWS secrets again"
date: 2023-04-20
draft: true
# description
description: "CLI tool to login and retrieve AWS temporary credentials using Azure AD."
image: images/blog/saml-2-aws/secrets.svg

cover_image: false
cover_image_src: 
cover_image_height: ""
cover_image_width: ""

author: vishwas-prasanna
categories:
- CLI
- Applications

# image color code in undraw.co #FB7E44 
feedback: false
draft: false
---
`SAML` (Security Assertion Markup Language) is a popular standard for exchanging authentication and authorization data between parties, particularly in web applications. `SAML Identity Providers` (IdPs) are the entities that provide user authentication and authorization information to Service Providers (SPs) over SAML.  

`saml2aws` is a command-line tool for logging in to an AWS environment using a IdPs. Today we will see how to use Azure AD.  

#### Why temporary credential?

- `Enhanced security`: Temporary credentials provide an additional layer of security by limiting the amount of time that a user or application has access to a resource. This reduces the risk of unauthorized access and helps prevent potential security breaches.

- `Easy management`: It is easy to revoke temporary credentials and since they are set to expire you don't need to worry about the risk of security breaches caused by outdated or unused credentials.

- `Granular access control`: Temporary credentials can be scoped to specific resources or actions. This can help ensure that users or applications only have access to the resources they need, and nothing more.

#### Prerequisites to use `saml2aws` tool

- One of the supported Identity Providers set up. We will see use Azure AD but [here](https://github.com/Versent/saml2aws#requirements) is a list of suported IdPs.
- AWS SAML Provider configured.

#### Setup SSO with Amazon AWS using Azure Active Directory

Let's first aquire Azure AD Enterprise App ID,  

- Go to https://myapps.microsoft.com/
- Click on AWS app after logging in, the URL that loads before redirecting has a querystring parameter called `applicationID`.
- Use this to configure saml2aws.

#### Installing `saml2aws`

I'm on Windows, so I use [Scoop](https://github.com/ScoopInstaller/Install#scoop-uninstaller) to install pretty much anything.

```powershell
Scoop install saml2aws
```

If you are on Linux or OSX you can install using [homebrew](https://docs.brew.sh/Installation)

```Shell
brew install saml2aws
```

To validate the installation, use the below command that returns the version of the saml2aws

```Shell
saml2aws --version
```

#### Configure your application with `saml2aws`

`saml2aws` cli tool has multiple flags to cater your needs. Below is a simple template to use AzureAD as the IdPs with PhoneAppNotification as 2-factor authetication.

```Powershell
saml2aws configure \
  --idp-provider='AzureAD' \
  --mfa='PhoneAppNotification' \
  --profile='saml' \
  --url='https://account.activedirectory.windowsazure.com' \
  --username='username@company.com' \   
  --app-id=$ApplicationID \
  --session-duration=7200 \
  --skip-prompt
```

Change `username@company.com` with your email ID and `applicationID` with the value that you grabbed from the URL querystring earlier.  
This will create a config file at `<USER_HOME>\.saml2aws` with a AWS profile called `saml`.

If you don't already have aws CLI, then you can follow [this](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) document to install it.  

I'm on windows, so I just do  

```Powershell
scoop install aws
```

Create a `.aws` directory within `<USER_HOME>\` and place an empty file named `credentials`

```Powershell
cd ~
mkdir .aws
cd .\.aws
ni credentials
```

This provides a file that can be accessed by `saml2aws` to write temporary credentials and `aws` to read them for authentication and authorization purposes.

Let's login to SAML 2.0 IDP which is Azure AD in our case.

```Powershell
saml2aws login
```

Once you login, a temporary STS token is written to `<USER_HOME>\.aws\credentials` file created earlier which would be valid for 2 hours since we specified 7200secs as the session duration in the `<USER_HOME>\.saml2aws` config file.

Now you can continue to use AWS cli using `saml` profile.

```Powershell
aws s3 ls --profile saml
```

This would list all the S3 objects in all your S3 buckets.

Remember, if you run into any errors, make use of the `--verbose` option provided by `saml2aws` to debug.
