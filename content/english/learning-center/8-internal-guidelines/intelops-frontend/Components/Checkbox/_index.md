---
title: Checkbox
date: 2023-07-01
draft: false
# description
description: "Adding Checkbox to your website"
weight: 6
---

Checkboxes - are used for input control, which allows us to select items from a group. Checkboxes are usually used in:
- Lists when you have to select one or more items.
- To show lists with sub-sections.
- To represent if something is on/off.

Note: Incase you want to show a single option, its better to use a switch than a checkbox because its sometimes easier to miss a single checkbox.

#### Import 
```js
import Checkbox from '@intelops/intelops_ui/packages/react/components/Checkbox/src';
```

### Create a Checkbox
```js
<Checkbox 
    type="checkbox" 
    onChange={handleChange}>
    Checkbox Name
</Checkbox>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| children    | node        | Components content   |
| type        | string      | Valid HTML5 input value |
| name        | string       | title of the textarea |
| onChange    | function     | To handle change - when you enter data |