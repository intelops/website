---
title: Switch
date: 2023-07-01
draft: false
# description
description: "Adding Switch to your website"
weight: 14
---

Switch - used to adjust settings on/off. Switch can also be used as controls, as well as the state it's in. Usually seen in:
- Login page (Remember me)


#### Import 
```js
import Switch from '@intelops/intelops_ui/packages/react/components/Switch/src';
```

### Create a Switch
```js
  <SwitchButton
    className="switch"
    disabled ="false"
  >
  Name of the switch 
  </SwitchButton>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| children    | node        | Components content   |
| disabled    | boolean     | If you want th switch to be diabled add true, else add false |
| onChange     | function    | To handle click  changes - applied to the DOM element |
