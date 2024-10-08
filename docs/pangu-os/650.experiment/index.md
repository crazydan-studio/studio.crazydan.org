---
title: 技术选型
description: 了解盘古 OS 实现过程中所验证和采纳的方案
authors:
- flytreleft
---

import Header from '@site/docs/pangu-os/_header.md';

<Header />


PS: 对各种特性的实现方案的验证。

## 以 Erlang 为系统开发语言

- 利用 Erlang 原生的消息机制、状态不可变、分布式、高并发、模式匹配、函数迁移等特性
- 以 Erlang 及其衍生语言（如，Elixir）作为操作系统和应用的开发语言，不支持其他备选语言

## 以 Linux 为内核驱动层

- 通过 Linux 内核实现对硬件资源的控制和分配，降低对硬件层的开发工作量，
  复用当下的开发成果，降低硬件层面的不稳定性和安全风险
- 核心层只读，并支持滚动升级和降级恢复等
- 仅使用其资源控制和调度能力，无文件系统等层面的调用
