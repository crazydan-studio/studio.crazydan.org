---
title: 用户界面
description: TODO
authors:
- flytreleft
---

import Header from '../_header.md';

<Header />


## 架构图

![界面架构图](/img/pangu-os/ui-arch-three-interfaces.svg)
<details>
<summary>Show graph description</summary>
<p>

```js showLineNumbers
@startuml

object "数据界面" as data_inf {
  *结构树
}

object "用户界面" as user_inf {
  *显示器
  *外设反馈
  *...
}

object "交互界面" as interact_inf {
  *鼠标
  *键盘
  *语音
  *网络
  *...
}

user_inf -left-> interact_inf : 引导
interact_inf -down-> data_inf : 变更
data_inf -up-> user_inf : 呈现

@enduml
```

</p>
</details>

<!--
UI 组件架构：

<img src="/img/pangu-os/ui-arch-v1.0.jpg" alt="盘古 OS UI 组件架构 v1.0" height="600px"/>

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

## 界面原型

<div style={{ textAlign: 'center' }}>
  <img src="/img/pangu-os/prototype-user-interface.svg" alt="盘古 OS 用户界面原型图"/>
  <figcaption>
    <em>注：</em>
    <a target="_blank" href="https://web-payments.org/slides/2013/cc-linked-data/images/facebook-open-graph.jpg">
      <em>图片来源</em>
    </a>
  </figcaption>
</div>
<details>
<summary>Show graph description</summary>
<p>

```js showLineNumbers
@startsalt

{
--
<img:https://web-payments.org/slides/2013/cc-linked-data/images/facebook-open-graph.jpg>
--
>> (get [firend, listen, like, cook, watch] of mine) to link_graph _
--
}

@endsalt
```

</p>
</details>

## 设计原则

- 若无需用户操作，则不提供**用户界面**，但提供用户可实施干预的用户界面
- 围绕数据变更提供**交互界面**，根据用户操作自动将数据变更交给对应的应用
  - 应用除配置界面以外，无其他用户界面，并且，配置界面也由 OS 统一提供
- 用户仅需确定数据之间的关系以及可展示的属性，剩下的视图布局、组件样式等，由 OS 统一处理和绘制
  - 比如，[PlantUML](https://pdf.plantuml.net/PlantUML_Language_Reference_Guide_en.pdf#section.14) 做声明式便可绘制出**用户界面**
- 交互界面的目的是对目标数据**实施变更**，可以在用户界面展示数据的变化过程，也可以仅展示变更结果
  - 变更动效不是必须的，其主要目的是吸引用户的注意，但在有历史记录以及更高效和直接的反馈方式时，
    是不需要动效的，不必要的动效反而会使用户分心
  - 输入设备是用户下达操作指令的外部途径
- 用户界面只是对数据变更结果的展示，通过视觉上的反馈，让用户知晓变更情况，
  以进一步确认变更是否有效、是否正确等
