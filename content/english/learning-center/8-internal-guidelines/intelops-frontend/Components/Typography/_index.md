---
title: Typography
date: 2023-07-01
draft: false
# description
description: "Adding Typography to your website"
weight: 20
---

Typography - used to choose your headings(titles or subtitles) on your webpage. 

#### Import 
```js
import Typography from '@intelops/intelops_ui/packages/react/components/Typography/src';
```

### Add Typography
```js
<Typography
    variant="h5">
    Text to be displayed
</Typography>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| variant     | string      | The level of the heading |
| type        | string      | Valid HTML5 input value |


#### Variants
The different levels of the heading. There are 6 levels from h1-h6 with h1 being the largest and h6 being the smallest.

<h1>h1. Level 1</h1>
<h2>h2. Level 2</h2>
<h3>h3. Level 3</h3>
<h4>h4. Level 4</h4>
<h5>h5. Level 5</h5>
<h6>h6. Level 6</h6>