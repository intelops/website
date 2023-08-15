---
title: Alert
date: 2023-07-01
draft: false
# description
description: "Adding Alerts to your website"
weight: 1
---

Alerts - Are mainly used to display details about a single topic - can be actions or just content. Cards should be relevant actionable information. For example if you want to show you companies sales in numbers you can use a card to highlight it in a better way. Mainly used on:

- Homepages
- Dashboards 

#### Import 
```js
import Alert from '@intelops/intelops_ui/packages/react/components/Alert/src';
```

### Create an Alert
```js
<Alert 
    variant="orange"
    className="alert">
    IntelOps alert
</Alert>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| children    | node        | Components content |
| variant     | string      | Has eight different color variants|

#### Alert Variants 

The variants in this case is that you can choose frm 8 different colors 

**Variants (colors)** 

1. <span style="color: #FF00FF">fushia</span>
2. <span style="color: #708090">slate</span>
3. <span style="color: lime">lime</span>
4. <span style="color: red">red</span>
5. <span style="color: orange">orange</span>
6. <span style="color: cyan">cyan</span>
7. <span style="color: #adb5bd">gray</span> 
8. <span style="color: #495057">darkGray</span>


