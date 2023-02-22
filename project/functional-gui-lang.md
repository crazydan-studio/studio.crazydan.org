---
title: 函数化GUI语言
cover_image:
demo_url:
document_url:
authors:
- flytreleft
categories:
- 重建数字基础
---

基于**函数化**、**数据结构化**的图形用户界面（GUI）语言，
其用于构建[DanOS](#DanOS)的用户交互界面。

该语言为**开箱即用**的GUI编程语言，
编程模式类似于[Elm](https://elm-lang.org/)（数据也集中管理和更新），
但运行方式类似于[HTML](https://en.wikipedia.org/wiki/HTML)，
可直接执行，不需要编译，不需要特定的执行器（由DanOS提供运行支持），
也不需要记忆各类复杂的组件，可快速编写并验证用户界面。

同时，为该语言将实现一套标准的可视化设计器和设计流程，方便进行统一、规范化的用户界面开发。
<!-- more -->

架构模式为：底层图形绘制引擎+纯函数GUI语言
