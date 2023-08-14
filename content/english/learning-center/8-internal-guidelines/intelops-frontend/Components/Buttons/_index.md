---
title: Button
date: 2023-07-01
draft: false
# description
description: "Adding Buttons to your website"
weight: 3
---

Buttons - To allow users to make choices, take actions with a single click. Buttons are usually used in:
- Forms
- Tables
- Cards
- Toolbars

#### Import 
```js
import Button from '@intelops/intelops_ui/packages/react/components/Button/src';
```

### Create a Button
```js
 <Button
    variant="gradient"
    className="mybutton"
    size="medium"
    color="orange"
    onClick={handleButtonClick}>
    Button Name
</Button>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| children    | node        | Components content   |
| className   | text        | To add new or to override the applied styles  |
| type        | text        | the type of button - can be given custom names and be used for grouping and styling |
| variant     | text        | The type of variant to use (all available button types in the table below)
| href        | string      | URL link to the page when you click the button| 
| onClick     | function    | To handle clicks - applied to the DOM element |
| color       | string      | To change buttons color |

#### Variant Types (Available button types)
The button come in different styles, colors and sizes.

##### Button Style

| **Variant**   | **Description**      |
| :----:             |    :----:            |
| contained          | basic button with a single colored background |
| gradient           | button with a gradient of 2 colors            |
| outlined           | button with a outline but no backgorund color |
| text               | button with colored text but no outline or background |
| setIcon            | button with an icon instead of text           |

##### Button Color
Each button has 8 colors to choose from:

1. <span style="color: #FF00FF">fushia</span>
2. <span style="color: #708090">slate</span>
3. <span style="color: lime">lime</span>
4. <span style="color: red">red</span>
5. <span style="color: orange">orange</span>
6. <span style="color: cyan">cyan</span>
7. <span style="color: #adb5bd">gray</span> 
8. <span style="color: #495057">darkGray</span>

##### Button Sizes
3 size options: 
- small
- medium
- large