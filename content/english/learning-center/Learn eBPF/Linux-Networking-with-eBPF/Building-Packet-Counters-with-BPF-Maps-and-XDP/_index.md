---
title: "Building Packet Counters With BPF Maps and XDP"
date: 2023-04-21T
draft: false
# description
description: "A Practical Tutorial"
type : "learning-center"
weight: 4
---

The program is designed to be attached to an XDP (eXpress Data Path) hook, which is a high-performance data path in the Linux kernel for fast packet processing. 

The **goal** of this program is to **count the number of packets that pass through the XDP hook and store the statistics in a BPF hash map.**

