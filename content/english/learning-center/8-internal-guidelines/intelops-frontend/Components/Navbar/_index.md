---
title: Navbar
date: 2023-07-01
draft: false
# description
description: "Adding Navbar to your website"
weight: 12
---

Navbar - can be used to navigate your website. Links, icons, search bars and all can be added. Usually at the top of you page.

#### Import 
```js
import Navbar from '@intelops/intelops_ui/packages/react/components/Navbar/src';
```

### Create a Navbar
```js
<Navbar
    className="navbar"/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |