---
title: Dropdown
date: 2023-07-01
draft: false
# description
description: "Adding Dropdown to your website"
weight: 9
---
Dropdown - 

#### Import 
```js
import Dropdown from '@intelops/intelops_ui/packages/react/components/Dropdown/src';
```

### Create a Dropdown
```js
<Dropdown
    title = "dropdown"
    content = {[
        { 
            id: 1,
            option: "Action",
            value: "",
            href: "" },
        { 
            id: 2,
            option: "Another action",
            value: "",
            href: "" },
        ]}
    onChange={handleChange}
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| title       | string      | The title of the dropdown list |
| content     | List of array elements | Data in the dropdown list - json file |