---
title: Modal
date: 2023-07-01
draft: false
# description
description: "Adding Modal to your website"
weight: 11

---

Modal - is used to inform users about a important decision or task. Usually appears when:
- Deleting elements from a list until user delete/cancels.
- Disabling app functionalities until user confirms/cancels.

#### Import 
```js
import Modal from '@intelops/intelops_ui/packages/react/components/Modal/src';
```

### Create a Modal
```js
<Modal
    header="Modal Testing"
    modalExit={true}
    content="Conent Here"
    footer={true}
    />
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| header      | string      | Modal Header         |
| footer      | boolean     | If your modal needs footer add true else say false |
| modalExit   | boolean     | If you need a close button for your modal add true, else false |
| content     | string      | Content on the modal |
