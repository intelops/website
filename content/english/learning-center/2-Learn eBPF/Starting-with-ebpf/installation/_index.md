---
title: "Installation Guide"
date: 2023-04-13T14:06:36-06:00
draft: false
weight: 2
# description
description: "The purpose of this document is to provide a guide for installing the necessary software to develop eBPF programs on Ubuntu."
---

The following commands can be used on any `Debian-based Linux operating system`. Below is the guide on `ubuntu 22.04`.
### Ubuntu 22.04
Use this command to update local package collection database. 
```bash
sudo apt update
```

Go
```bash
sudo apt install golang
```

Clang and LLVM
```bash
sudo apt install clang llvm
```

libbpf
```bash
sudo apt install libelf-dev
```

bpftool and perf
```bash
sudo apt install linux-tools-$(uname -r)
```