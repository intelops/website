---
title: "Motivation for new ring buffer implementation"
date: 2023-05-15
draft: false
# description
description: "BPF ring buffer better than perfbuf"
weight: 1
---

The BPF (Berkeley Packet Filter) subsystem in the Linux kernel offers powerful capabilities for in-kernel processing of network packets and system events. BPF programs can be used to analyze, filter, and modify data directly within the kernel. One common requirement for BPF programs is to send collected data from the kernel to user-space for post-processing, analysis, or logging.

Traditionally, BPF developers have relied on the BPF perf buffer (perfbuf) as the standard mechanism for this purpose. Perfbuf provides efficient data exchange between the kernel and user-space, but it suffers from two significant limitations: inefficient memory usage and event re-ordering. However, with the introduction of the BPF ring buffer (ringbuf) in Linux 5.8, these limitations have been overcome, offering improved memory efficiency, event ordering guarantees, and enhanced performance.


In this blog, we'll explore the differences between the two data structures and show you how to use the new BPF ring buffer in your applications.

## BPF Ring Buffer vs BPF Perf Buffer

BPF perf buffer is a collection of per-CPU circular buffers that enable efficient data exchange between kernel and user-space. However, its per-CPU design leads to two major issues:

## Inefficient use of memory

Perfbuf allocates a separate buffer for each CPU, which means that BPF developers have to make a tradeoff between allocating big enough per-CPU buffers (to accommodate possible spikes of emitted data) or being memory-efficient (by not wasting unnecessary memory for mostly empty buffers in a steady state, but dropping data during data spikes). This is especially tricky for applications that have big swings between being mostly idle most of the time, but going through periodic big influx of events produced in a short period of time.

## Event re-ordering**

 If a BPF application has to track correlated events (e.g., process start and exit, network connection lifetime events, etc.), proper ordering of events becomes critical. However, this is problematic with BPF perf buffer since events can arrive out of order if they happen in rapid succession on different CPUs.
BPF ring buffer is a multi-producer, single-consumer (MPSC) queue that can be safely shared across multiple CPUs simultaneously. It provides a familiar functionality from BPF perf buffer, including variable-length data records and efficient reading of data from user-space through memory-mapped regions. In addition, it guarantees event ordering and eliminates wasted work and extra data copying.

## Memory Overhead

BPF perf buffer allocates a separate buffer for each CPU, which often means that BPF developers have to make a tradeoff between allocating big enough per-CPU buffers or being memory-efficient. Being shared across all CPUs, BPF ring buffer allows using one big common buffer to deal with this. Bigger buffer can absorb bigger spikes, but also might allow using less RAM overall compared to BPF perf buffer. BPF ring buffer memory usage also scales better with an increased amount of CPUs.

## Event Ordering

BPF ring buffer solves the problem of event re-ordering by emitting events into a shared buffer and guaranteeing that if event A was submitted before event B, then it will be also consumed before event B. This often simplifies handling logic and eliminates the need for complex workarounds that are necessary with BPF perf buffer.

## Wasted Work and Extra Data Copying

When using the BPF perf buffer, BPF programs must prepare the data sample and copy it into the perf buffer before sending it to user-space. This results in redundant data copying, as the data needs to be copied twice: first into a local variable or a per-CPU array (for larger samples), and then into the perf buffer itself. This approach can lead to wasted work if the perf buffer runs out of space.

In contrast, the BPF ring buffer introduces a reservation/submit API to mitigate this issue. With this approach, the BPF program can first reserve the required space within the ring buffer. If the reservation succeeds, the program can then directly use that memory to prepare the data sample. Subsequently, submitting the data to user-space becomes an efficient operation that cannot fail and does not involve any additional memory copies. By employing this reservation/submit mechanism, BPF developers can avoid unnecessary data copying and ensure that their efforts are not wasted if the buffer is full.

## Performance and Applicability

Extensive synthetic benchmarking has shown that the BPF ring buffer outperforms the BPF perf buffer in almost all practical scenarios. While the BPF perf buffer theoretically supports higher data throughput due to its per-CPU buffers, this advantage becomes significant only when dealing with millions of events per second. Real-world experiments with high-throughput applications have confirmed that the BPF ring buffer is a more performant replacement for the BPF perf buffer, especially when used as a per-CPU buffer and employing manual data availability notification.


## Considerations for NMI Context

It is important to note that when a BPF program needs to run from the NMI (non-maskable interrupt) context, caution is advised. BPF ring buffer employs a lightweight spin-lock internally, which means that data reservation might fail if the lock is heavily contested in the NMI context. Consequently, in situations with high CPU contention, there may be some data drops even if the ring buffer itself still has available space.

## Conclusion
___
The introduction of the BPF ring buffer has revolutionized the way BPF programs send data from the kernel to user-space. Its superior memory efficiency, event ordering guarantees, and improved API make it a clear choice over the traditional BPF perf buffer for most use cases. The reservation/submit mechanism reduces wasted work and eliminates redundant data copying, resulting in more efficient data transfer.

With extensive benchmarking results and real-world applications confirming its superior performance





