---
title: DanOS 设计
author: flytreleft
author_title: Creator of Crazydan Studio
author_url: https://flytreeleft.org
author_image_url: /img/avatar/flytreeleft.svg
tags:
- DanOS
- 软件基础设施
- 新操作系统
- 数据结构化
- 应用函数化
description:
image:
---

> - DanOS 的设计仍在逐步改进与完善中，本文将随时发生变化，感兴趣的朋友们可以时刻保持关注；
> - 在文末有本文编者的联系方式，有不同意见和建议的朋友可以与其保持联系；

`DanOS`（也称为**蛋OS**）是以**数据结构化**和**应用函数化**为核心设计原则的现代化操作系统。

她期望达成的目标如下：
- 将数据的所有权、使用权和控制权交还给用户，
  并对用户在各个平台上所产生和创造的各类数据进行集中、分布式存取，
  确保用户数据不再依赖于某个平台，并且，使各类应用能够全身心围绕以用户为中心的核心原则上来，
  而无需为用户数据的产生和积累所犯愁
- 用户数据安全（加密），以及应用运行环境隔离、应用权限控制等
- 消除应用隔离，强制共建互利的应用生态
- 开发成果共享，打破技术壁垒，降低社会总体的重复开发、重复躺坑的工作量和心路历程
- 统一且规范的软件开发底层基础设施，
  在操作系统内提供原生的消息收发、数据存取、分布式、并发等基础组件和处理机制，
  让开发更加聚焦于业务，而基础设施能够拿来即用，无需做全新开发或独立部署
- 内置提供一致且便捷的应用开发环境和工具，
  如数据定义、数据引用、数据查询、函数编写、函数管理、应用配置、UI拼装等，
  从而确保开发的流畅，并方便用户自行设计和改造应用
- 生产与测试环境的数据无需克隆，通过数据版本机制，可从任意数据版本衍生数据分支，
  以用于测试，从而避免复制数据所造成的时间浪费
- 操作系统内置支持的断点恢复，以及数据容灾，确保任何异常导致的系统中断，
  均可在恢复后，从中断位置继续执行，从而避免数据丢失或数据损坏

<!--
`DanOS` 试图以**破局者**的身份，对当前的软件开发基础发起挑战，并提出其所认为的行之有效的、富有改革性的改进方案，
以实现从底层彻底（但不一定绝对）优化**软件基础设施**，让软件开发能够摆脱**思想枷锁**、卸下**历史包袱**，
从而向未来加速前进。

这不是一场「你生我灭」的斗争和较量，而是「后浪推前浪」的数字**进化与变革**。

`DanOS` 必然是在基于前辈们大量的工作之上而诞生的，也必然是饱含「敬畏之心」的，
她也不会野心勃勃地去推翻一切以重建一个「乌邦托」的世界，她只是在以自己的行动向世人表明其对数字世界的变革之心，
并期望能够有更多人参与到这场变革之中，贡献出自己的想法与力量，让未来的数字世界变得更加美好。
-->

<!-- more -->

<img src="/img/danos/danos-boot.jpg" alt="DanOS 启动界面"/>

## 系统设计

### 以数据为中心

- 应用开发及使用均以其为第一原则，弱化应用的存在和重要性
- 没有文件等概念存在，文件中的内容才是核心
- 底层存储为具备完整功能的数据库，[该数据库](./the-dan-db-design.md)存储的是结构化的数据

### 数据结构化

- 除内核（含驱动）之外的数据，均为结构化的
  - 内核及其驱动层是硬件相关的，涉及性能、硬件操作以及现有成果复用等问题，
    故不要求所采用的编程语言和数据结构

### 应用函数化

- 除内核（含驱动）之外的代码，均为函数化的
- 使用统一的编程语言进行应用开发
  - 提供便捷、流畅、一致的开发及运行环境，
    并配套提供相应的开发工具（如，应用配置、代码编写、数据定义、数据查询、应用组装等）
  - 所有应用均基于操作系统提供的编程语言（及其衍生语言），按照统一的编码规范进行开发
    - 确保所有代码均可被共享和直接调用，而不是换一种语言就得重写全部代码
- 应用分发必须有可信任的证书：中心化的、可信任的应用商城是有必要的
- 应用之间，应用内函数之间，均互传结构化数据

### 数据版本化

- 也即**数据不可变**，任意变更都将产生新的版本，确保变更不丢失，并可恢复至任意时刻的变更
- 在操作审计严格的场景下，可对用户的一切操作启用版本化控制，以便于跟踪和回溯用户操作

### 函数版本化

- 根据函数内容计算函数版本，函数之间依赖其具体版本，
  应用的升级不会影响依赖方的正常运行，因为其所依赖的函数版本不会因为升级而被覆盖，
  函数的各个安装版本都将保留在系统中
- 保证系统的兼容性，并可在任意时刻由用户决定是否整体升级依赖函数或部分升级依赖函数

### 应用之间能力共享

- 非源码（资产）共享，而是函数能力的共享，共享的是开发成果
- 应用服务于**数据所有者**（个人或组织），而不是其开发者
- 应用之间没有竞争关系，其协同为数据所有者服务，构成一个不可分割的整体
- 应用的能力可做任意组合，以共同完成大型或复杂的任务，同时提供顺畅的、无割裂的使用体验
- 用户可通过各个独立的应用函数，按需自由组装新的应用

### 多设备互联

- 共享数据，共享算力，计算能力在设备间无缝迁移
- 数据可跨设备访问后，仅需要在设备间传递数据处理函数（应用）即可

### 修复方案共享

- 根据具体问题做匹配，并在用户确认的情况下，应用已经验证过的修复方案

## 架构设计

<img src="/img/danos/arch-v1.0.jpg" alt="DanOS 架构 v1.0" height="600px"/>

<!--
- 驱动层与硬件交互硬件所支持的数据格式（非结构化数据），
  而驱动层与操作系统之间交互结构化数据（根据硬件特性所提取出的数据结构）
  - 如，UI 视图将组件的位置、样式、颜色、文本等结构化信息交给显示驱动，
    显示驱动再根据视图信息（包括对多个 UI 的整合）向显示器写入图形绘制数据，
    从而实现 UI 的显示
  - 每类设备的驱动，均为一个独立进程的服务函数，系统的应用通过对驱动数据的更新实现对设备的操作
-->


<!--
UI 组件架构：

<img src="/img/danos/ui-arch-v1.0.jpg" alt="DanOS UI 组件架构 v1.0" height="600px"/>

## 数据结构

```js
{
  os: {
    kernel: {

    }
    , device: {
      netcards: [{

      }, {...}, ...]
      , display: {}
    }
    , users: [{

    }, {...}, ...]
  }
}
```
-->

## 相关阅读

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin.md)。
- [Programmer's critique of missing structure of operating systems](http://blog.rfox.eu/en/Programming/Programmers_critique_of_missing_structure_of_operating_systems.html): 操作系统所遗留的历史缺陷。
- [Pick Operating System](https://en.wikipedia.org/wiki/Pick_operating_system):
  A demand-paged, multiuser, virtual memory, time-sharing computer operating system
  based around a MultiValue database.
- 数据结构
  - [Tagged union](https://en.wikipedia.org/wiki/Tagged_union):
    `type Tree = Empty | Leaf Int | Node Tree Tree`
    - [Algebraic data type](https://en.wikipedia.org/wiki/Algebraic_data_type)
  - [Record (computer science)](https://en.wikipedia.org/wiki/Record_(computer_science)):
    `type alias User = {name: String, age: Int}`
  - [Metadata](https://en.wikipedia.org/wiki/Metadata)
    - 粒度粗细会影响维护成本，故版本控制、属性引用id化能降低数据结构变更的影响
  - [Purely Functional Data Structures](https://doc.lagout.org/programmation/Functional%20Programming/Chris_Okasaki-Purely_Functional_Data_Structures-Cambridge_University_Press%281998%29.pdf)
    - [Git is a purely functional data structure](https://blog.jayway.com/2013/03/03/git-is-a-purely-functional-data-structure/)


:::info Copyright
- 文章作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本文章采用许可协议 [署名 4.0 国际 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)。
  转载请注明来自 [Crazydan Studio](https://studio.crazydan.org/)！
:::
