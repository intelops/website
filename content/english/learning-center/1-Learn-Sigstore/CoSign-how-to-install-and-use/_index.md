---
title: "CoSign"
date: 2023-07-10
draft: true
weight: 2
# description
description: "Step by step guide on how to sign software artifacts with CoSign"
---

Signing your work is the new Industry standard, and so is by law. Gitsign implements a keyless Sigstore to sign Git commits with a valid OpenID Connect identity. This document is a step-by-step guide on setting up Gitsign globally for all commits in your local and how to verify the commits using Git and Gitsign.

### Before Git Sign

Lets see what it looks like before you have setup a Global Git Sign. Let's do an empty commit with the message `"UmsignedCommit"`.

```cmd
git commit --allow-empty -m "UmsignedCommit"
```

You should see something like this,

```cmd
[main 14ee0af] UmsignedCommit
```

Let's push the commit to remote Github Repository

```cmd
root@835a70e3cec7:/end_to_end_ML_model# git push origin main
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 211 bytes | 211.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:VishwasSomasekhariah/end_to_end_ML_model.git
   b9de83c..14ee0af  main -> main
```

No authentication was requested and no signature was signed for this work. You can check this on Github.
![github_unsigned_commit](image1.jpg)

### Install Gitsign using Homebrew

If you have homebrew, use `brew tap` to add Sigstore's repository to your system

```cmd
brew tap sigstore/tap
```

Use `brew install` to install gitsign using homebrew

```cmd
brew install gitsign 
```

### Install Gitsign using `.deb` package if on Ubuntu

If you are on a linux machine like me, you can use `wget` to download the `.deb` or `.rpm` files. Here is a list of [releases](https://github.com/sigstore/gitsign/releases). Please download the right one based on your system.

```cmd
wget https://github.com/sigstore/gitsign/releases/download/v0.7.1/gitsign_0.7.1_linux_amd64.deb
```

You should see the package downloaded in your PWD
![PWD](image2.jpg)
Use the downloaded file to install gitsign.

```cmd
dpkg -i gitsign_0.7.1_linux_amd64.deb
```

You should be seeing this for successful installation

```cmd
Selecting previously unselected package gitsign.
(Reading database ... 11084 files and directories currently installed.)
Preparing to unpack gitsign_0.7.1_linux_amd64.deb ...
Unpacking gitsign (0.7.1) ...
Setting up gitsign (0.7.1) ...
```

Verify the gitsign installation typing `gitsign --version`

```cmd
gitsign version v0.7.1
```

### Configuring gitsign for all globally

Meaning every project that you contribute to, would be signed using gitsign automatically taking away the hassle to remember it for each repository.

```cmd
git config --global commit.gpgsign true  # Sign all commits
git config --global tag.gpgsign true  # Sign all tags
git config --global gpg.x509.program gitsign  # Use Gitsign for signing
git config --global gpg.format x509  # Gitsign expects x509 args
```

Now let's try to commit and see what happens

```cmd
git commit --allow-empty -m "SignedCommit"
```

A browser or a new tab opens with a sigstore authentication
![sigstore_authentication](image3.jpg)

If the page does not automatically open for any reason you can click on the HTTPS link displayed on the terminal.

```cmd
Go to the following link in a browser:

         https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=BqTyUwBAeZxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&code_challenge_method=S256&nonce=2SQjOT6jSubdXXXXXXXXXXXXXXX&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=openid+email&state=2SQjORRgGVwwXXXXXXXXXXXXXXX

```

If you have a 2 Factor authentication in place you may be prompted asking to enter a verification code in the terminal.

```cmd
Go to the following link in a browser:

         https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=BqTyUwBAeZxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&code_challenge_method=S256&nonce=2SQjOT6jSubdXXXXXXXXXXXXXXX&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=openid+email&state=2SQjORRgGVwwXXXXXXXXXXXXXXX
Enter verification code:
```

On login you should see a verification code on the browser
![sigstore_verification_code](image4.jpg)

Enter the code in the terimal to complete the authentication of your signature.

```cmd
```cmd
Go to the following link in a browser:

         https://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=BqTyUwBAeZxXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&code_challenge_method=S256&nonce=2SQjOT6jSubdXXXXXXXXXXXXXXX&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&scope=openid+email&state=2SQjORRgGVwwXXXXXXXXXXXXXXX
Enter verification code: hywra4ozXXXXXXXXXXXXXX
```

On successfull authentication you should see this

```cmd
tlog entry created with index: 27073525
[main 43633f0] SignedCommit
```

### Verifying the commit

First verify using `git verify-commit`

```cmd
git verify-commit HEAD
```

You should see details about the signature used for your last git commit.

```cmd
tlog index: 27073525
gitsign: Signature made using certificate ID 0xdf16bc1599ff0480xxxxxxxxxxxxxxxxxxxxxxxx | CN=sigstore-intermediate,O=sigstore.dev
gitsign: Good signature from [{certificate-identity}]({certificate-oidc-issuer})
Validated Git signature: true
Validated Rekor entry: true
Validated Certificate claims: false
WARNING: git verify-commit does not verify cert claims. Prefer using `gitsign verify` instead.
```

As the message says you can also verify commit using `gitsign verify`. Remember the values for `certificate-identity` and the `certificate-oidc-issuer` can be found in the terminal output above.

```cmd
gitsign verify --certificate-identity={certificate-identity} --certificate-oidc-issuer={certificate-oidc-issuer} HEAD
```

You should see the details of the signature used for your last git commit

```cmd
tlog index: 27073525
gitsign: Signature made using certificate ID 0xdf16bc1599ff0480acfc3514fa8e0f738b7f1812 | CN=sigstore-intermediate,O=sigstore.dev
gitsign: Good signature from [vkumar@intelops.dev](https://github.com/login/oauth)
Validated Git signature: true
Validated Rekor entry: true
Validated Certificate claims: true
```

Congrats!! You have now successfully learnt how to install `gitsign` and how to verify commits using `gitsign` and `git`.

### ______________________________  

For the curious few, let's push the commit to gitub and see how it shows up there.

```cmd
git push origin main
```

Successful push looks like this

```cmd
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 1.22 KiB | 1.22 MiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:VishwasSomasekhariah/end_to_end_ML_model.git
   14ee0af..43633f0  main -> main
```

On Github you should see a note next to your commit signaling that the commit was signed but saying 'unverified'. For the time being GitHub doesn't validate the certificate authority used by Gitsign (Sigstore) but should change once more users start using it.
![github_signed_commit](image5.jpg)
