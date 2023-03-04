---
title: 技术选型
authors:
- flytreleft
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';

> - DanOS 的设计仍在逐步改进与完善中，本文将随时发生变化，感兴趣的朋友们可以时刻保持关注；
> - 在文末有本文编者的联系方式，有不同意见和建议的朋友可以与其保持联系；

PS: 对各种特性的实现方案的验证。

## 以Erlang为系统开发语言

- 利用Erlang原生的消息机制、状态不可变、分布式、高并发、模式匹配、函数迁移等特性
- 以Erlang及其衍生语言（如，Elixir）作为操作系统和应用的开发语言，不支持其他备选语言

## 以Linux为内核驱动层

- 通过Linux内核实现对硬件资源的控制和分配，降低对硬件层的开发工作量，
  复用当下的开发成果，降低硬件层面的不稳定性和安全风险
- 核心层只读，并支持滚动升级和降级恢复等
- 仅使用其资源控制和调度能力，无文件系统等层面的调用




<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
