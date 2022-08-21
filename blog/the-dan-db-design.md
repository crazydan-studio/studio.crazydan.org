---
title: DanDB 设计
author: flytreleft
author_title: Founder of Crazydan Studio
author_url: https://flytreeleft.org
author_image_url: /img/avatar/flytreeleft.svg
tags:
- DanDB
- 数据结构化
- 数据不可变
- 数据版本化
description:
image:
---

> - DanDB 的设计仍在逐步改进与完善中，本文将随时发生变化，感兴趣的朋友们可以时刻保持关注；
> - 在文末有本文编者的联系方式，有不同意见和建议的朋友可以与其保持联系；

`DanDB`（也称为**蛋DB**）是一款存取**结构化**、**不可变**和**版本化**数据的数据库，
其为[DanOS](./the-dan-os-design.md)与[DanBot](./the-dan-bot-design.md)的数据存储层。

<!-- more -->

## 架构设计

![主体关系图](/img/dandb/arch-subject-relation-graph.svg)
<details>
<summary>Show graph description</summary>
<p>

```js
@startuml

<style>
agent {
  BackGroundColor pink
  LineColor red
  TextColor red
}
storage {
  BackGroundColor palegreen
  LineColor green
  TextColor green
}
cloud {
  BackGroundColor aliceblue
  LineColor blue
  TextColor blue
}
</style>

circle Root #black;line:black [
]

agent e1
agent e2
agent e3
agent e4

storage e1_id [
  ab51b
]
cloud e1_id_type [
  string
]
cloud e1_id_size [
  5
]
cloud e1_id_other [
  ...
]
storage e1_type [
  Org
]
cloud e1_type_type [
  string
]
cloud e1_type_size [
  3
]
cloud e1_type_other [
  ...
]
storage e1_name [
  技术研发部
]
cloud e1_name_type [
  string
]
cloud e1_name_other [
  ...
]
storage e1_other [
  ...
]

storage e2_id [
  cfe78
]
cloud e2_id_type [
  string
]
cloud e2_id_size [
  5
]
cloud e2_id_other [
  ...
]
storage e2_type [
  Org
]
cloud e2_type_type [
  string
]
cloud e2_type_other [
  ...
]
storage e2_name [
  成都分部
]
cloud e2_name_type [
  string
]
cloud e2_name_other [
  ...
]
storage e2_other [
  ...
]

storage e3_id [
  8bda1
]
cloud e3_id_type [
  string
]
cloud e3_id_other [
  ...
]
storage e3_type [
  User
]
cloud e3_type_other [
  ...
]
storage e3_name [
  张三
]
storage e3_other [
  ...
]

storage e4_id [
  a28dc
]
cloud e4_id_type [
  string
]
cloud e4_id_other [
  ...
]
storage e4_type [
  User
]
cloud e4_type_other [
  ...
]
storage e4_name [
  李四
]
storage e4_other [
  ...
]

Root ~~ e1 : entity
Root ~~ e2 : entity
Root ~~ e3 : entity
Root ~~ e4 : entity

e1 --> e2 : parent
e2 --> e3 : leader
e1 --> e4 : staff
e3 --> e4 : friend

e1 .. e1_id : id
e1_id -- e1_id_type : type
e1_id -- e1_id_size : size
e1_id -- e1_id_other : ...
e1 .. e1_name : name
e1_name -- e1_name_type : type
e1_name -- e1_name_other : ...
e1 .. e1_type : type
e1_type -- e1_type_type : type
e1_type -- e1_type_size : size
e1_type -- e1_type_other : ...
e1 .. e1_other : ...

e2 .. e2_id : id
e2_id -- e2_id_type : type
e2_id -- e2_id_size : size
e2_id -- e2_id_other : ...
e2 .. e2_name : name
e2_name -- e2_name_type : type
e2_name -- e2_name_other : ...
e2 .. e2_type : type
e2_type -- e2_type_type : type
e2_type -- e2_type_other : ...
e2 .. e2_other : ...

e3 .. e3_id : id
e3_id -- e3_id_type : type
e3_id -- e3_id_other : ...
e3 .. e3_type : type
e3_type -- e3_type_other : ...
e3 .. e3_name : name
e3 .. e3_other : ...

e4 .. e4_id : id
e4_id -- e4_id_type : type
e4_id -- e4_id_other : ...
e4 .. e4_type : type
e4_type -- e4_type_other : ...
e4 .. e4_name : name
e4 .. e4_other : ...

@enduml
```

</p>
</details>

术语：
- 模型（`Model`）：对主体结构的描述
- 主体（`Subject`）：
- 属性（`Attribute`）：
- 关系（`Relation`）：
- 数据（`Data`）：
- 元数据（`MetaData`）：
- 事件（`Event`）：

规则：
- 数据库记录的是主体、主体之间的关系，以及发生在主体上的事件
- 主体的属性，是`主体`与`数据`的**关系**，或者，主体与主体的关系
- 关系是主体与主体、主体与数据之间的连接情况
- 关系是双向的，即，从关系的任意一方出发，均可以找到另一方
- 数据是关系的终点，即，从数据出发不再有向外延伸的关联关系
- 元数据是数据的属性，该属性不是关系，而是对数据自身的固有信息的描述，
  如：`长度`、`类型`（数字、字符串、二进制等）、`创建时间`等
- 主体具有一个全局唯一的标识`identifier`，该标识为创建时自动生成
- 每个主体都有自己的结构（即，关系集合），可随时向主体增减和修改关系。
  主体只有关系，没有类型
- 主体之间的关系集合重叠越多，越可以将其视为同一类型的模型，
  但可能某一特性或差异的存在，便会让主体之间产生鸿沟
- 可通过主体的某个关系（比如，`type`）将不同主体归为同类型的模型，以便于分类查询和管理
- 函数也是主体，其参数列表和函数体，都是其与数据的关系
- 对数据的约束条件仅作用于关系，而不是作用于数据，即，限定某种关系只能连接符合条件的数据或其他主体
- 事件必须有接受主体，即，事件一定是作用于已知的目标受体，但事件的发送主体却可能是未知的。
  事件的发送主体可以有多个，即，由多个主体才能导致目标主体的状态（关系）发生变化；
  事件也可以有多个受体，即，某事件可同时作用于多个主体并导致其均发生状态变化
- 变更仅针对对主体的变更，事件、数据、元数据不存在变更
- 对主体的变更，是对其关系的增删改，增删改可作用于关系集合，也可以是对某关系的目标端的值的修改
  - 变更版本即为主体关系的修订版本
- 对主体的一次变更，就是对数据库的一次变更，数据库自身是一个变更体。
  变更历史、变更分支均以数据库为变更实体
  - 可从某个变更开始，在新的衍生分支上做不同于源分支的变更
- 数据库是一个标识为`0`的主体——**元初主体**，其他所有主体均通过关系`subject`与元初主体建立连接，
  也就是元初主体是整个数据库树的**根**
- 不存在绝对的中心主体，可以从任何主体出发，不断丰富和完善主体间的关系，
  将新的主体与已存在主体或其他新主体关联起来。
  在开发应用时，从应用需管理和维护的核心主体出发，对其模型结构不断进行改进和调整即可，
  不需要过早、特意地先确定核心主体与其他主体的关系

## 相关阅读


:::info Copyright
- 文章作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本文章采用许可协议 [署名 4.0 国际 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)。
  转载请注明来自 [Crazydan Studio](https://studio.crazydan.org/)！
:::
