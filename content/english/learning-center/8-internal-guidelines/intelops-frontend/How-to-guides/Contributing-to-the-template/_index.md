---
title: Contributing to the UI template
date: 2023-07-01
draft: false
# description
description: "Creating components for the UI template"
weight: 4
---

Since this template is for internal usage, we can always try and add things that you think might be a useful addition to the existing UI template. How can you do that?

**Step 1:** First you'll have to get access to the GitHub repo - you need permissions to access the repo without permissions you won't be able to see the name of the template repo.

**Step 2:** Clone the [ui-templates-common-repo](https://github.com/intelops/ui-templates-common-repo) to your local.

**Step 3:** Once your clone is complete you should be able to see  intelops-common-ui in the node modules.

**Step 4:** Do npm install to get he latest package into the node_modules. You need to check the file structure and try to make your components in the same structure. This will help maintain the consistency of the code.

**Step 5:** Create your component - you can also follow the sample [Creating your own components](https://capten.ai/learning-center/learn-intelops-ui/how-to-guides/creating-your-own-components/).

> **Note:** Always try to create re-usable react components that is try not to hard code anything.

**Step 6:** Now that you have your component ready - raise a PR to the develop branch of [ui-templates-common-repo](https://github.com/intelops/ui-templates-common-repo).

Once your code is reviewed by the admin - they'll merge it into the branch. 