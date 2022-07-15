---
title: DanBot 设计
author: flytreleft
author_title: Creator of Crazydan Studio
author_url: https://flytreeleft.org
author_image_url: /img/avatar/flytreeleft.svg
tags:
- DanBot
- 结构化语义
- 语义分析
- 机器智能
- 聊天机器人
description:
image:
---

> - DanBot 的设计仍在逐步改进与完善中，本文将随时发生变化，感兴趣的朋友们可以时刻保持关注；
> - 在文末有本文编者的联系方式，有不同意见和建议的朋友可以与其保持联系；

`DanBot`（也称为**蛋Bot**）是基于**结构化语义分析**的智能机器人大脑，
其通过对语义进行结构化分析以及对**已有经验**的整合，
实现对人类语言所要表达的事物和目的进行**识别**（结构分析）和**理解**（经验整合）。
随着经验的增加与知识的储备，有望让机器能够与人类进行正常交流，
并对人类发出的命令和意图作出正确的反应。

<!-- more -->

## 理论基础

- 人类语言的作用在于**表达意图**和**陈述事实**
  - 事实代表**已经产生**了的事物之间的**作用**、**影响**与**关系**
  - 意图则是将要发生但不一定会发生的「事实」
- 人类语义具有结构性，最基本的结构就是**主谓宾**
- 基于事实，可以实现**推理**，即，根据已知的事物之间的关系，
  预测和推断将要产生的新的关系
- 机器需要的不是学习，而是**认知能力**
  - 后者是一种对底层基础结构的建立，再在此基础上，不断积累和更新事实
  - 不是基于现有的大量数据，依靠运算能力做无穷尝试，从而得到某种想要的或看似合理的结果
  - 事实就是事实，而结果则往往是受情感和利益支配和驱动的

## 架构设计

## 相关阅读


:::info Copyright
- 文章作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本文章采用许可协议 [署名 4.0 国际 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)。
  转载请注明来自 [Crazydan Studio](https://studio.crazydan.org/)！
:::