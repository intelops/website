---
title: Tab
date: 2023-07-01
draft: false
# description
description: "Adding Tab to your website"
weight: 15
---
Tab - can be used to create secondary navigation for your page. Tabs can also be used to navigate withing the same page taht is to render and display subsections for your website. 

#### Import 
```js
import Tab from '@intelops/intelops_ui/packages/react/components/Tab/src';
```

### Create a Tab
```js
<Tab
    tabDetails={[
        {
            id: 1,
            label: "App",
            url: "#",
            icon: <ChartPieIcon className="w-6 h-6" color="red"/>, 
        },
        {
            id: 2,
            label: "Messages",
            url: "#",
            icon: <UserGroupIcon className="w-6 h-6" color="red"/>,
        },
        {
            id: 3,
            label: "Settings",
            url: "#",
            icon: <ServerIcon className="w-6 h-6" color="red"/>,
        },
    ]}
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles |
| label       | string      | Name of the tab element |
| url         | string      | Url or the page that the user will be taken to on selecting the tab element |
| icon        | string      | Icon for the tab element - may need a seperate className |
