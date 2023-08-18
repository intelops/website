---
title: Avatar
date: 2023-07-01
draft: false
# description
description: "Adding Avatar to your website"
weight: 2
---

Avatar - can be used to display people or objects, its basically like a profile photo. Usually we see avatars in:
- User Profile pages

#### Import 
```js
import Avatar from '@intelops/intelops_ui/packages/react/components/Avatar/src';
```

### Create an Avatar
```js
<Avatar
    src="https://avatars.githubusercontent.com/u/91454231?s=280&v=4"
    alt="intelops logo"
    variant="circle"
    className="avatar"
    size="medium">
    Avatar Name
</Avatar>
```
#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| children    | node        | Components content |
| variant     | string      | The shape in which your avatar appears - square or circle |
| src         | string      | The URL of the image that needs to be displayed |
| alt         | string      | The alternate text in case the image fails to load |
| size        | string      | To alter your avatar sizes, from xsmall to xlarge |

#### Variant Types (Available button types)
Avatars come in different shapes and sizes.

##### Size Variants
2 avatar variants:
- circle
- square

##### Avatar Sizes
5 size options:
- xsmall 
- small
- medium
- large
- xlarge
