---
title: Textfield
date: 2023-07-01
draft: false
# description
description: "Adding Textfield to your website"
weight: 18
---
Textfield - how is it different from textarea? textfield is a single line, while textarea is usually multiple lines.
 
#### Import 
```js
import TextField from '@intelops/intelops_ui/packages/react/components/TextField/src';
```

### Create a Textfield
```js
<TextField 
    variant="small"
    placeholder="enter text"
    name="textarea name"
    required="true"/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| variant     | string      | The size of your textfield and its padding |
| type        | string      | Valid HTML5 input value |
| placeholder | string      | text that is visible before you enter data |
| name        | string       | title of the textarea |
| onChange    | function     | To handle change - when you enter data |
| onClick     | function     | To handle Click |
| required    | boolean      | If true, then the field cannot be left empty |
| disabled    | boolean      | If true, then the component is disabled |

#### Variant
1. small
2. default
3. large