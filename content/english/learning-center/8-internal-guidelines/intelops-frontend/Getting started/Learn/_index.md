---
title: Learn
date: 2023-06-28
draft: false
# description
description: "Setting up and creating your SASS website using IntelOps templates"
weight: 5
---

New to IntelOps UI? You can get started with the help of this video tutorial.

Create your own sample with the help of IntelOps UI components. Once you install the UI template, you can start using its components by importing each into your main file.

> **NOTE:**  All the components and the required code in available in the components section.

**Step 1:** Since this is a sample page, let us first import all 18 components that we are going to use first.

```js
import React, { useState } from "react";
import Alert from "@intelops/intelops_ui/packages/react/components/Alert/src"; 
import Avatar from "@intelops/intelops_ui/packages/react/components/Avatar/src";
import Button from "@intelops/intelops_ui/packages/react/components/Button/src";
import Card, {StatsCard,} from "@intelops/intelops_ui/packages/react/components/Card/src";
import Checkbox from "@intelops/intelops_ui/packages/react/components/Checkbox/src";
import Chip from "@intelops/intelops_ui/packages/react/components/Chip/src";
import Collapse from "@intelops/intelops_ui/packages/react/components/Collapse/src";
import Dropdown from "@intelops/intelops_ui/packages/react/components/Dropdown/src";
import Modal from "@intelops/intelops_ui/packages/react/components/Modal/src";
import Navbar from "@intelops/intelops_ui/packages/react/components/Navbar/src";
import Progress from "@intelops/intelops_ui/packages/react/components/Progress/src";
import SwitchButton from "@intelops/intelops_ui/packages/react/components/Switch/src";
import Tab from "@intelops/intelops_ui/packages/react/components/Tab/src";
import Table from "@intelops/intelops_ui/packages/react/components/Table/src";
import Textarea from "@intelops/intelops_ui/packages/react/components/Textarea/src";
import TextField from "@intelops/intelops_ui/packages/react/components/TextField/src";
import Tooltip from "@intelops/intelops_ui/packages/react/components/Tooltip/src";
import Typography from "@intelops/intelops_ui/packages/react/components/Typography/src";
```

**Step 2:** Now add your code - render each component
```js
import {
  ChartPieIcon,
  UserGroupIcon,
  ServerIcon,
} from "@heroicons/react/solid";

export default function IntelopsUI() {
  const handleButtonClick = () => {
    alert("button clicked");
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const [tableData, setTableData] = useState(tableDetails);
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">

    {/* Avatar Component */}

      <Avatar
        src="https://avatars.githubusercontent.com/u/91454231?s=280&v=4"
        alt="intelops logo"
        variant="circle"
        className="avatar"
        size="xlarge"
      >
        Intelops
      </Avatar>

      {/* Typography Component */}

      <Typography 
        variant="h3"
      >
        Sample Application
      </Typography>

      <main className="relative flex min-h-screen flex-col items-center justify-between p-24">

      {/* Navbar Component */}

        <Navbar 
            className="navbar" />

        {/* Alert Component */}

        <Alert 
            variant="fuchsia" 
            className="alert"
        >
          This is a Sample Page
        </Alert>

        {/* Tab Component */}

        <Tab
          tabDetails={[
            {
              id: 1,
              label: "App",
              url: "#",
              icon: <ChartPieIcon className="w-6 h-6" color="slate" />,
            },
            {
              id: 2,
              label: "Messages",
              url: "#",
              icon: <UserGroupIcon className="w-6 h-6" color="slate" />,
            },
            {
              id: 3,
              label: "Settings",
              url: "#",
              icon: <ServerIcon className="w-6 h-6" color="slate" />,
            },
          ]}
        />

        <div class="w-full flex flex-wrap p-6 mx-auto">
          <div class="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-6/12">

          {/* Chip Component */}

        <Chip 
            title="chip" 
            variant="fuchsia"
        >
            Form Testing
        </Chip>

        {/* Progress Component */}

        <Progress
            className="progress"
            variant="orange"
            progressPercentage="50"
        />
        <form
            action="https://getform.io/f/328f984c-0601-4562-9e10-eb209ee508f3"
            method="POST"
            encType="multipart/form-data"
        >
        <div className="grid md:grid-cols-2 gap-4 w-full py-2">
        <div className="flex flex-col">
        <label className="uppercase text-sm py-2">Name</label>

        {/* TextField Component */}

        <TextField
            variant="default"
            placeholder="Enter Name"
            name="textarea name"
            required="true"
        />
        </div>
        </div>
        <div className="flex flex-col py-2">
        <label className="uppercase text-sm py-2">Email</label>

        {/* TextField Component */}

        <TextField
            variant="default"
            placeholder="Enter Email"
            name="textarea email"
            required="true"
        />
        </div>
        <div className="flex flex-col py-2">
        <label className="uppercase text-sm py-2">Message</label>

        {/* Textarea Component */}

        <Textarea
            rows="6"
            placeholder="Type in your message"
            name="textarea name"
        />
        </div>
        <div className="flex flex-col py-2">

        {/* Checkbox Component */}

        <Checkbox 
            type="checkbox" 
            onChange={handleChange}
        >
            Do you want to select
        </Checkbox>
        
        {/* Switch Component */}

        <SwitchButton 
            className="switch"
            disabled 
        >
            Select
        </SwitchButton>
        </div>

        {/* Button Component */}

        <Button
            variant="outlined"
            className="mybutton"
            size="medium"
            color="orange"
            onClick={handleButtonClick}
        >
            Send Message
        </Button>

        </form>
        </div>
        <div class="w-full max-w-full px-3 shrink-0 md:flex-0 md:w-6/12">

        {/* Card Component */}

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
        </div>

        <StatsCard
            amount="50,000"
            title="Users"
            percentageChange="40%"
            icon={[<ChartPieIcon color="white" />]}
        />
        </div>

        {/* Dropdown Component */}

        <Dropdown
          title="Dropdown"
          content={[
            {
              id: 1,
              option: "Action",
              value: "",
              href: "",
            },
            {
              id: 2,
              option: "Another action",
              value: "",
              href: "",
            },
            {
              id: 3,
              option: "Something else here",
              value: "",
              href: "",
            },
          ]}
          onChange={handleChange}
        />
        {/* Modal Component */}

        <Modal
          header="Modal Testing"
          modalExit={true}
          content="Conent Here"
          footer={true}
        />

        {/* Table Component */}

        <Table
          columns={[
            { Header: "Author", accessor: "autorName" },
            { Header: "Role", accessor: "rolename" },
            { Header: "Status", accessor: "status" },
            { Header: "Employed", accessor: "employed" },
            { Header: "Actions", accessor: "actions" },
          ]}
          tableData={[
            {
              autorName: "Austin",
              rolename: "Manager",
              status: "Online",
              employed: "23/04/18",
              actions: "Edit", 
            },
            {
              autorName: "Max",
              rolename: "Developer",
              status: "Offline",
              employed: "23/04/18",
              actions: "Edit",
            },
            {
              autorName: "TJ",
              rolename: "Developer",
              status: "Online",
              employed: "23/04/18",
              actions: "Edit",
            },
            {
              autorName: "Stuart",
              rolename: "Developer",
              status: "Online",
              employed: "23/04/18",
              actions: "Edit",
            },
          ]}
        />
      </main>
    </div>
  );
}

```

**Step 3:** Now run the application

```js
npm run dev
```