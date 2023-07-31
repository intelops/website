---
title: Installation
date: 2023-06-28
draft: false
# description
description: "Setting up and creating your SASS website using IntelOps templates"
type : "learning-center"
weight: 2
---

Install IntelOps UI for your design needs. 

> **Note:** You can see the template in [Intelops UI private repo](https://github.com/intelops/ui-templates-common-repo)

### Package Prerequisites

> **Note:** Since this is a private repo, just installing using npm won't download the packages, we need to follow a few more steps - adding GitHub PATs to your VScode.

[How to add GitHub Personal Access Tokens to your VsCode](https://intelops.ai/blog/adding-pats-to-vscode/)

To install the published UI packages into your code:
1. Create a `.npmrc` file inside the root directory of the [Intelops UI private repo](https://github.com/intelops/ui-templates-common-repo)
2. Add the below two lines in the npmrc file
    - **registry**=https://npm.pkg.github.com
    - **auth_token**={Personal access token generated using intelops private github account}
3. Now add the below line in `package.json` file under dependencies
    - "@intelops/intelops_ui": "0.0.2"

### Dependencies
```js
"Dependencies":{
"intelops-common-ui": "^0.0.2",
}
```

### Installation
Now to install the package, run one of the following commands in your project:

**npm**
```bash
npm install intelops-common-ui@latest 
```
**yarn**
```bash
yarn add @intelops/intelops_ui@latest --registry=https://npm.pkg.github.com
```
Aftr installation make sure to check if the latest bersion of the common ui package has been installed under node_modules folder




