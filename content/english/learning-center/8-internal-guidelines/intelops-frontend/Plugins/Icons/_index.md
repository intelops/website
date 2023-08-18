---
title: Icons
date: 2023-07-01
draft: false
# description
description: "Adding Icons to your website"
weight: 3
---

To use icons in our template you need to install Heroicons - svg icons by Tailwind CSS makers. 

### Installation:
```bash
npm install @heroicons/react
```

### Usage
Now to use the icons - you have to import icons individually to use them.

```js
import { ChartPieIcon } from '@heroicons/react/solid';
function MyComponent() {
  return (
    <div>
      <ChartPieIcon className="h-6 w-6 text-black-500" />
      <p>...</p>
    </div>
  )
}
```