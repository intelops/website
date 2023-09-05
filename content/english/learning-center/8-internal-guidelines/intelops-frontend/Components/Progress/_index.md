---
title: Progress
date: 2023-07-01
draft: false
# description
description: "Adding Progress to your website"
weight: 13
---

Progress - used to show progress. Progress can be determinate or indeterminate. Progress bar used to show ongoing process that takes time to finish. Usually used in:
- Surveys
- Linkedin Profiles 
- Feedback forms

#### Import 
```js
import Progress from '@intelops/intelops_ui/packages/react/components/Progress/src';
```

### Create Progress bar
```js
<Progress
    className="progress"
    variant="orange"
    progressPercentage="50"/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| variant     | string      | Has multiple colors - eight in total |
| progressPercentage | string | Progress percentage |


**Variants** 

1. <span style="color: #FF00FF">fushia</span>
2. <span style="color: #708090">slate</span>
3. <span style="color: lime">lime</span>
4. <span style="color: red">red</span>
5. <span style="color: orange">orange</span>
6. <span style="color: cyan">cyan</span>
