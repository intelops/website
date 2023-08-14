---
title: Textarea
date: 2023-07-01
draft: false
# description
description: "Adding Textarea to your website"
weight: 17
---
Textarea -  allows users to enter sizeable amount of free-form text. Usually used in:
- Forms
- Tickets

#### Import 
```js
import Textarea from '@intelops/intelops_ui/packages/react/components/Textarea/src';
```

### Create a Textarea
```js
<Textarea 
    rows="4"
    placeholder="enter text"
    name="textarea name"/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| rows        | int         | height of the box |
| placeholder | string      | text that is visible before you enter data |
| Name        | string       | title of the textarea |
| onChange    | function     | To handle change - when you enter data |