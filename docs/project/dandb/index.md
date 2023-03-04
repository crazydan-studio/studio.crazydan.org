---
title: 概述
authors:
- flytreleft
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';

> - DanDB 的设计仍在逐步改进与完善中，本文将随时发生变化，感兴趣的朋友们可以时刻保持关注；
> - 在文末有本文编者的联系方式，有不同意见和建议的朋友可以与其保持联系；

`DanDB`（也称为**蛋DB**）是面向**结构化**、**不可变**、**版本化**数据的数据库，
用于维护数据自身的结构以及数据之间的关联关系，
为[DanOS](/docs/danos)与[DanBot](/docs/danbot)提供底层的数据存储支撑。

其支持任意层级的数据关联查询，深入挖掘数据之间的联系，发现埋藏在地底深处的**数据价值**；
支持对数据做历史**变更分析**，掌握数据随时间的变化情况和规律，也可以对数据做审计和误操作修复；
支持在任意时刻打**数据分支**，可用于程序缺陷验证和功能测试等，也可以实现_生产与测试共库_，
从而无需在测试与生产之间来回复制数据。


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
