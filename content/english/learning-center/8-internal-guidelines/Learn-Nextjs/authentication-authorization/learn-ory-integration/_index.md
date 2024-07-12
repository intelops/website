---
title: "Ory integration in Next.js"
date: 2023-05-25
draft: false
# description
description: "Learn integration of ORY authentication in Next.js"
weight: 2
---

To secure your Next.js application with Ory authentication - basically adding a login page so that only authorized users can view your page or to atleast know who your users are. To get started all you need is a `Next.js application`. So, lets jump right in:


#### Creating a Next.js application 
If you don't already have a Next.js application, you can create one with the help of [Next.js 101 - Introduction and Tutorial blog](https://capten.ai/learning-center/8-internal-guidelines/learn-nextjs/creating-frontend-application-in-nextjs/).

#### Step 1: Installing Ory
Once you have your application ready. Install Ory's SDK - to make API calls to Ory and Ory's integration tools for JavaScript frameworks. Ory provides all the integration tools that you'll need to combine Ory with Next.js 

**1.1: Install Ory SDK**
```js
//This step is the same for both TypeScript and JavaScript appication.
npm i --save @ory/integrations @ory/client
```

**1.2: Create `[...paths].js` in <mark>pages/api/.ory/</mark>**

Add this in [...paths].js to connect your Next.js application with Ory's APIs. This also ensures that all credentials and cookies are set up properly.

```js
//reference: https://www.ory.sh/docs/getting-started/integrate-auth/nextjs
// @ory/integrations offers a package for integrating with Next.js in development which is not required in production.
import { config, createApiHandler } from "@ory/integrations/next-edge"

export { config }

// We need to create the Ory Network API which acts like a bridge.
export default createApiHandler({
  fallbackToPlayground: true,
  dontUseTldForCookieDomain: true
})
```
#### Step 2: Add sign in to access your homepage

This is to add session check to your Next.js application homepage. Add the code snippets to your existing code in <mark>index.js</mark>

---Code snippets that you need to : **#1, #2, #3**---

**Code #1: Below existing import statements**

```js 
// import Router and configurations
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Configuration, FrontendApi } from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"

const ory = new FrontendApi(new Configuration(edgeConfig))

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = identity =>
  identity.traits.email || identity.traits.username
```
**Code #2: Inside export{} statement**

```js
  // To access router, session and URL objects inside function
  const router = useRouter()
  const [session, setSession] = useState()
  const [logoutUrl, setLogoutUrl] = useState()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        // Create a logout URL
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch(() => {
        // Redirect to login page
        return router.push(edgeConfig.basePath + "/ui/login")
      })
  }, [router])

  if (!session) {
    return null
  }
```
**Code #3: Inside return statement**

```js
// Get user identity - it can be username or emailID
   <p>Hello, {getUserName(session?.identity)}</p>
   <a href={logoutUrl}>Log out</a>
```
 If you followed the `Next.js 101 blog` you can directly add the complete code block to your <mark>index.js</mark>

**Complete code**
```js
//Reference for ORY code: https://www.ory.sh/docs/getting-started/integrate-auth/nextjs
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

// Added Code #1 start
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Configuration, FrontendApi } from "@ory/client"
import { edgeConfig } from "@ory/integrations/next"

const ory = new FrontendApi(new Configuration(edgeConfig))

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = identity =>
  identity.traits.email || identity.traits.username
// Added Code #1 end

export default function Home() {

  // Added Code #2 start
  const router = useRouter()
  const [session, setSession] = useState()
  const [logoutUrl, setLogoutUrl] = useState()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data)
        // Create a logout url
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch(() => {
        // Redirect to login page
        return router.push(edgeConfig.basePath + "/ui/login")
      })
  }, [router])

  if (!session) {
    // Still loading
    return null
  }
  // Added Code #2 end

  return (
    <Layout home>
                   {/* Added Code #3 start*/}
                   <p>Hello, {getUserName(session?.identity)}</p>
                   <a href={logoutUrl}>Log out</a>
                   {/* Added Code #3 end*/}
              <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Your Webpage</p>
        <p>
          This is just a sample you can build more websites like this refer to {' '}
          <a href="https://nextjs.org/learn"> 
          Next.js tutorial {''}
          </a>for more clear and detailed explanation on why you have to add certain things.
        </p>
      </section>
    </Layout>
  );
}
```
 #### Run your application
 
 Start server

 ```bash
 npm run dev
 ```
Now open the default browser which is almost always `http://localhost:3000`, you'll be seeing Ory's Sign in page. 

> **NOTE**: Here, we are using a javascript application, if your application is in typescript you'll have to make some changes in the ory code that you added. For typescript code you can follow the official [ORY documentation](https://www.ory.sh/docs/getting-started/integrate-auth/nextjs)

