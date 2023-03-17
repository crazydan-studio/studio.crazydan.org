---
title: 架构设计
description: 了解盘古OS的架构设计
disable_comments: false
authors:
- flytreleft
---

import Header from '../_header.md';

<Header />


<img src="/img/pangu-os/arch-v1.0.png" alt="盘古OS 架构 v1.0"/>

<!--
- 驱动层与硬件交互硬件所支持的数据格式（非结构化数据），
  而驱动层与操作系统之间交互结构化数据（根据硬件特性所提取出的数据结构）
  - 如，UI 视图将组件的位置、样式、颜色、文本等结构化信息交给显示驱动，
    显示驱动再根据视图信息（包括对多个 UI 的整合）向显示器写入图形绘制数据，
    从而实现 UI 的显示
  - 每类设备的驱动，均为一个独立进程的服务函数，系统的应用通过对驱动数据的更新实现对设备的操作
-->
