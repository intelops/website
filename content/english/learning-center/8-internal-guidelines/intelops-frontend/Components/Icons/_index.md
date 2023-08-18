---
title: Icons
date: 2023-07-01
draft: false
# description
description: "Adding Icons to your website"
weight: 10
---

Icons - 

#### Import 
```js
import Icon from '@intelops/intelops_ui/packages/react/components/Icon/src';
```

### Create a Icon
```js
<Icon
    icon="ChartPieIcon"
    className="w-8 h-8"
    color="Orange"
    size="small"
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| icon        | string      | Name of the icon from the heroicons   |
| children    | node        | Components content   |
| className   | text        | To add new or to override the applied styles  |
| type        | text        | the type of button - can be given custom names and be used for grouping and styling |
| variant     | text        | The type of variant to use (all available button types in the table below)
| color       | string      | To change buttons color |

##### Icon Color
Each icon has 8 colors to choose from:

1. <span style="color: #FF00FF">fushia</span>
2. <span style="color: #708090">slate</span>
3. <span style="color: lime">lime</span>
4. <span style="color: red">red</span>
5. <span style="color: orange">orange</span>
6. <span style="color: cyan">cyan</span>
7. <span style="color: #adb5bd">gray</span> 
8. <span style="color: #495057">darkGray</span>

##### Icon Sizes
3 size options: 
- small
- medium
- large