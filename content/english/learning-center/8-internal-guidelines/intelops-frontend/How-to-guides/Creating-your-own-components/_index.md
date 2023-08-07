---
title: Creating your own UI components
date: 2023-07-01
draft: false
# description
description: "Creating components that are not already in the UI template"
weight: 3
---

Don't see the components you need, or the styling you want? You can always just create your own component.

Let's create a custom Header component:

**Step 1:**  Create a `Header.js` file in components folder.

```js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './header.module.css';
import Button from '../../Button/src/Button';

const Header = (props) => {
    const [headerRecord, setHeaderRecord] = useState(props.headerDetails);

    return (
        <div
            id="input sizing"
            className="flex place-items-center w-full min-h-[140px] bg-[#f8fafc] p-6 border border-blue-grey-50 rounded-lg scroll-mt-48 overflow-x-scroll lg:overflow-visible"
        >
            <div class="relative">
            <nav className={styles.navigation}>
                <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl">
                    {/* {renderHeaderDetails} */}

                    {headerRecord &&
                        headerRecord.length > 0 &&
                        headerRecord.map((iteration, index) => {
                            //Parent elements

                            return (
                                <li class="z-30 flex-auto text-center">
                                    <a
                                        href={iteration.href}
                                        class="z-30 block w-full px-0 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out bg-inherit text-slate-700"
                                        active
                                        role="tab"
                                        aria-selected="true"
                                    >
                                        <span>{iteration.icon}</span>
                                        <span class="ml-1">{iteration.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                </ul>
                </nav>
            </div>
            <div class="flex items-center md:ml-auto md:pr-4">
              {props.search ? (
                <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    class="pl-9 text-sm focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-slate/80 dark:text-white/80 ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-slate-600 focus:outline-slate-600 focus:transition-shadow"
                    placeholder="Type here..."
                  />
                </div>
              ) :(
                ""
              ) }
        {/* <button type="submit">Search</button> */}
        <Button
                variant="text"
                className="mybutton"
                size="small"
                color="orange"
              >
                Search
              </Button>
      </div>
        </div>
    );
};

Header.propTypes = {
    headetDetails: PropTypes.array
};

export default Header;

```
**Step 2:** Now add a css file for the Header.js file `Header.css` 

```css
/* Header.css */
.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  /* Add more styling as desired */
}

.logo img {
  height: 40px;
  /* Add more logo styling as desired */
}

.navigation ul {
  list-style: none;
  display: flex;
  /* Add more navigation styling as desired */
}

.navigation li {
  margin-right: 10px;
}

.search-bar input {
  /* Add styling for the search input */
}

.search-bar button {
  /* Add styling for the search button */
}

```
**Step 3:** We have the component but now we have to integrate it your main component file like- `Intelops.js`
```js
import React from 'react';
import Header from './Header';

const Intelops = () => {
  return (
    <div>
      <Header />
      {/* Other content of your application */}
    </div>
  );
};

export default Intelops;

```
**Step 4:** Finally you need to render the Intelops in the root file like- `index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Intelops from './Intelops';

ReactDOM.render(
  <React.StrictMode>
    <Intelops />
  </React.StrictMode>,
  document.getElementById('root')
);
```