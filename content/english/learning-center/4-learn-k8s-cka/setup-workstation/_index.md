---
title: "Setup workstation"
date: 2022-11-12T11:02:05+06:00
description: "How to prepare your local workstation to learn K8s"
searchKeyword: "workstation"
weight: 1
draft: false
---

Kubrnetes
> Note:- Used Ubuntu as playground workstation. 
1. Master Node / Control Plane

2. Worker Node / Minion / Data Plane


>  **VIM Setup**: Vim is a highly configurable text editor built to make creating and changing any kind of text very efficiently. It is included as "vi" with most UNIX systems and with Apple OS X. 
>  Whenever you open Vim as the current user, these settings will be used. If you ssh onto a different server, these settings will not be transferred.

> **expandtab**: use spaces for tab

> **tabstop**: amount of spaces used for tab

> **shiftwidth**: amount of spaces used during indentation
```
validation commands: 
$hostname

$date

$more /etc/lsb-release
```

Note:- **Install VIM package using “apt-get” package manager (for RedHat/CentOS you need to use DNF/YUM)**
```
sudo apt-get update
sudo apt-get install -y vim
``` 


**Change to Home Directory using the following command:**
```
$cd ~
```

**Create a file “.vimrc” inside your home directory and update with the following parameters**
```
$vi .vimrc
set ts=2 sw=2 ai et
set cursorline cursorcolumn

Note:- Make sure the “.vimrc” file is properly updated

$cat .vimrc
set ts=2 sw=2 ai et
set cursorline cursorcolumn
```

**Execute the following command to make the changes made in “.vimrc” reflects in the current session**
```
$. .vimrc
```

