---
title: Card
date: 2023-07-01
draft: false
# description
description: "Adding Cards to your website"
weight: 4
---

Cards - Are mainly used to display details about a single topic - can be actions or just content. Cards should be relevant actionable information. For example if you want to show you companies sales in numbers you can use a card to highlight it in a better way. Mainly used on:

- Homepages
- Dashboards 

#### Import 
```js
import Card, {StatsCard,} from '@intelops/intelops_ui/packages/react/components/Card/src';
```

### Create a Card
```js
<Card
  className="w-full"
  title="IntelOps"
  titleHref="https://capten.ai/"
  caption="Trusted By Fast Growing Brands And Enterprises. Be The Captain."
  body="Website is under active development.
  Our products are currently in Stealth mode development.
  Building the Next-Gen Tech For Cloud-Native.
  Ai-based framework to democratize Cloud Native Technology."
  imageURL="https://capten.ai/images/banner/homepage/homepage-banner.svg"
  buttonName="Select"
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles    |
| imageURL    | string      | To access images directly with a link instead of downloading them  |
| imageAlt    | string      | Incase the original image does not work you can add a different link or some text in its place  |
| title       | string      | cards title           |
| titleHref   | string      | To add url to the title - to navigate to another page onClick|
| caption     | string      | description/ caption on the card |
| body        | string      | content of the card              | 
| buttonName  | string      | Add button name to specify it's action onClick|

### Create a Stats Card
```js
<StatsCard
  amount="50,000"
  title="Users"
  percentageChange="40%"
  icon= {[<ChartPieIcon color="white" />]}
/>
```

#### Props

| **Name**    |  **Type**   |**Description**       |
| :----:      |    :----:   |    :----:            |
| id          | string      | Unique to each element can be used to lookup an element getElementById( ) |
| className   | string      | To add new or to override the applied styles    |
| amount      | string      | The number or the information main highlighted text |
| title       | string      | Title of the stats card |
| percentageChange | string | The percentage or information- highlighted text on the side |
| icon        | node        | icon on the card    | 
