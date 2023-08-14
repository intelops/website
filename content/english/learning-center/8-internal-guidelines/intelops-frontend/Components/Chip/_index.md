---
title: Chip
date: 2023-07-01
draft: false
# description
description: "Adding Chip to your website"
weight: 7
---

Chips - allows users to show information, make selections, to filter content or to trigger actions. How are they different from buttons? Buttons usually appear consistently along with a action attached to them, while chips usually appear dynamically as interactive elements.
One of the most common use of chips is as:
- Contact tags

#### Import 
```js
import Chip from '@intelops/intelops_ui/packages/react/components/Chip/src';
```

### Create an Alert
```js
<Chip 
    title = "chip"
    variant="orange">
    Text on the chip
</Chip>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| children    | node        | Components content |
| variant     | string      | Has multiple colors - eight in total |

#### Chip Variants 

The variants in this case is that you can choose frm 8 different colors 

**Variants** 

1. <span style="color: #FF00FF">fuchsia</span>
2. <span style="color: #708090">slate</span>
3. <span style="color: lime">lime</span>
4. <span style="color: red">red</span>
5. <span style="color: orange">orange</span>
6. <span style="color: cyan">cyan</span>
7. <span style="color: #adb5bd">gray</span> 
8. <span style="color: #495057">dark</span>
