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

`DanOS`（也称为**蛋OS**）是一款面向**结构化数据**和**函数化应用**的操作系统。

`DanOS` 试图以**破局者**的身份，对当前的软件开发基础发起挑战，并提出其所认为的行之有效的、富有改革性的改进方案，
以实现从底层彻底（但不一定绝对）优化**软件基础设施**，让软件开发能够摆脱**思想枷锁**、卸下**历史包袱**，
从而向未来加速前进。

这不是一场「你生我灭」的斗争和较量，而是「后浪推前浪」的数字**进化与变革**。

`DanOS` 必然是在基于前辈们大量的工作之上而诞生的，也必然是饱含「敬畏之心」的，
她也不会野心勃勃地去推翻一切以重建一个「乌邦托」的世界，她只是在以自己的行动向世人表明其对数字世界的变革之心，
并期望能够有更多人参与到这场变革之中，贡献出自己的想法与力量，让未来的数字世界变得更加美好。

<!-- more -->

<img src="/img/danos/danos-boot.jpg" alt="DanOS 启动界面"/>

## 架构设计

OS 系统架构：

<img src="/img/danos/arch-v1.0.jpg" alt="DanOS 架构 v1.0" height="600px"/>

- 驱动层与硬件交互硬件所支持的数据格式（非结构化数据），
  而驱动层与操作系统之间交互结构化数据（根据硬件特性所提取出的数据结构）
  - 如，UI 视图将组件的位置、样式、颜色、文本等结构化信息交给显示驱动，
    显示驱动再根据视图信息（包括对多个 UI 的整合）向显示器写入图形绘制数据，
    从而实现 UI 的显示
  - 每类设备的驱动，均为一个独立进程的服务函数，系统的应用通过对驱动数据的更新实现对设备的操作

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

## 相关阅读

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin)。
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
