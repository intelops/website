---
title: Tooltip
date: 2023-07-01
draft: false
# description
description: "Adding Tooltip to your website"
weight: 19
---
Tooltip - used for information on icons, buttons and so on. Tooltips are important in webdesign, they give us information just by hovering over a component.

#### Import 
```js
import Tooltip from '@intelops/intelops_ui/packages/react/components/Tooltip/src';
```

### Create a Tooltip
```js
<Tooltip
    variant="top"
    placeholder="enter text"> 
    Tooltip data 
</Tooltip>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| variant     | string      | The placement of the tooltip |
| type        | string      | Valid HTML5 input value |


#### Variant
The placement of the tooltip, if you want to place the tooltip at the:

1. top
2. bottom
3. left or
4. right