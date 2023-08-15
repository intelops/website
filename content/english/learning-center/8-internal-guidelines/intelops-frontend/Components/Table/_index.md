---
title: Table
date: 2023-07-01
draft: false
# description
description: "Adding Table to your website"
weight: 16
---

Tables - used to organize data in rows and columns and when you need to organize data. Tables also allow users to look up a specific information.

#### Import 
```js
import Table from '@intelops/intelops_ui/packages/react/components/Table/src';
```

### Create a Table
```js
<Table 
    title ="Intelops"
    className="table"
    columns={[
        {Header:"Name", accessor:"userName"},
        {Header:"Status", accessor:"status"},
        { Header: "Actions", accessor: "actions" },
        ]}
    tabledata={[
        {
            userName: "TJ",
            role: "Manager",
            actions: "Edit", 
        },
        {
            userName: "Ron",
            role: "Developer",
            actions: "Edit", 
        }
        ]}
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| title       | string      | Title of the table   |
| columns     | list of array elements | Names of the columns and the accessor to add data into the respective columns |
| tabledata        |  list of array elements | Data that needs to appear in the table - json format| 
