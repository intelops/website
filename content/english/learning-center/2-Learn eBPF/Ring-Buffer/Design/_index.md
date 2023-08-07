---
title: "Design of the BPF Ring Buffer"
date: 2023-05-15T14:06:09-04:00
draft: false
# description
description: "The BPF ring buffer provides a flexible and efficient mechanism for data exchange between the Linux kernel and user-space programs. In this section, we will dive into the design and implementation details of the BPF ring buffer, exploring its features and underlying principles."
weight: 3
---

The BPF ring buffer provides a flexible and efficient mechanism for data exchange between the Linux kernel and user-space programs. In this section, we will dive into the design and implementation details of the BPF ring buffer, exploring its features and underlying principles.

## Reserve/Commit Schema for Multiple Producers

The BPF ring buffer is designed to accommodate multiple producers, whether they are running on different CPUs or within the same BPF program. The reserve/commit schema allows producers to independently reserve records and work with them without blocking other producers. If a BPF program is interrupted by another program sharing the same ring buffer, both programs can reserve a record (given enough space is available) and process it independently. This also holds true for Non-Maskable Interrupt (NMI) context, although reservation in the NMI context may fail due to spinlock contention even if the ring buffer is not full.

## Circular Buffer with Logical Counters

Internally, the ring buffer is implemented as a circular buffer with a size that is a power of 2. It utilizes two logical counters that continually increase (and may wrap around on 32-bit architectures):

## Consumer Counter

 Indicates the logical position up to which the consumer has consumed the data.

## Producer Counter

 Denotes the amount of data reserved by all producers.

When a record is reserved, the producer responsible for that record successfully advances the producer counter. At this stage, the data is not yet ready for consumption. Each record has an 8-byte header that includes the length of the reserved record and two additional bits: the busy bit, indicating that the record is still being processed, and the discard bit, which can be set at commit time if the record should be discarded. The record header also encodes the relative offset of the record from the beginning of the ring buffer data area in pages. This design choice allows the `bpf_ringbuf_commit()` and `bpf_ringbuf_discard()` functions to accept only the pointer to the record itself, simplifying the verifier and improving the API's usability.

## Serialization and Ordering
___
Producer counter increments are serialized under a spinlock, ensuring strict ordering between reservations. On the other hand, commits are completely lockless and independent. All records become available to the consumer in the order of their reservations but only after all preceding records have been committed. This means that slow producers may temporarily delay the submission of records that were reserved later.

## Contiguous Memory Mapping
___
One notable implementation aspect that simplifies and speeds up both producers and consumers is the double contiguous memory mapping of the data area. The ring buffer's data area is mapped twice back-to-back in virtual memory, enabling samples that wrap around at the end of the circular buffer to appear as completely contiguous in virtual memory. This design eliminates the need for special handling of samples that span the circular buffer's boundary, improving both performance and implementation simplicity.

## Self-Pacing Notifications
___
The BPF ring buffer introduces self-pacing notifications for new data availability. When a record is committed using `bpf_ringbuf_commit()`, a notification is sent only if the consumer has already caught up with the record being committed. If the consumer is not yet up to date, it will eventually catch up and see the new data without requiring an extra poll notification. This self-pacing mechanism allows the BPF ring buffer to achieve high throughput without the need for tricks like "notify only every Nth sample," which are necessary with the perf buffer. For cases where BPF programs require more manual control over notifications, the commit/discard/output helpers accept flags such as `BPF_RB_NO_WAKEUP` and `BPF_RB_FORCE_WAKEUP`. These flags provide full control over data availability notifications but require careful and diligent usage to
