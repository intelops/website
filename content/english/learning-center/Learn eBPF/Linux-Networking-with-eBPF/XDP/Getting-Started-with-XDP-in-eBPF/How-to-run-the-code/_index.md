---
title: "How-to-run-the-program"
date: 2023-04-17
draft: false
# description

type : "learning-center"
weight: 9
---

```bash
sudo -s
export BPF_CLANG=clang
go build
```

`ip link` is a command in Linux used to display and manage network interfaces.
When used without any arguments, the `ip link` command displays a list of available network interfaces on the system along with their status, state, and hardware addresses

Here is an example output of the `ip link` command:

![image](https://user-images.githubusercontent.com/128127818/227661937-112cbe58-ae45-457c-b600-a4920b98d169.png)

In this example, `lo` and `wlp0s20f3` are the network interfaces on the system. 

Run the following command, note the network interface in your system

```bash
ip link
```

Execute the program 

```bash
./xdp wlp0s20f3 
```

Expected Output:

![image](https://user-images.githubusercontent.com/128127818/227663038-0701842a-fe0e-4230-a2bc-fcb1880c2c7a.png)

