---
title: Collapse
date: 2023-07-01
draft: false
# description
description: "Adding Collapse to your website"
weight: 8
---

Collapse - is a accordion component allows users to show and hide sections of content on a page. Usually used to display:
- Menus and Submenus
- FAQs and so on

#### Import 
```js
import Collapse from '@intelops/intelops_ui/packages/react/components/Collapse/src';
```

### Create a Collapse
```js
<Collapse
    className= "collapse"
    summary= "Intelops Collapse"
    details= "the information in the collapse file">
</Collapse>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| summary     | string      | Title/ a glimpse of whats inside |
| details     | string      | The information on the component |