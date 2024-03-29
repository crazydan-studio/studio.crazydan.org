---
title: 软件开发的基础
authors:
- flytreleft
tags:
- 软件开发
- 重建数字基础
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';

- 原生支持并发、分布式、集群的开发语言
- 应用接口性能监控及分析：调用路径、逻辑关系、CPU消耗、内存使用、执行时间、随应用生命周期全程记录和保存并可复查、对应用影响极小、
- 日志记录及分析：高性能、高压缩比、易于读写、文件接口、
<!-- more -->
- 数据存储：高性能、主动优化、分布式扩展、无模式、关系图化；主动构建物化视图，固化查询，主动优化查询性能；先存储（原始数据？）再通过其他中间件做数据查询和数据分析，高实时性和强一致性要求的数据则临时放在内存中，待冷却后再存储并做冷查询；更新时由客户端提供对象数据修订号，存储端检查修订号是否已递进（已被修改过），若已递进，则更新失败；
- 应用之间的无缝连接，并能透明地交换和处理数据模型
- 存储层自动处理模型的关联关系、部分更新、冗余等，自动进行最优化处理，应用端只需要提供要存储的对象即可，无需关心存储机制、优化策略等存储和查询问题
- 前端针对数据模型做校验，视图再统一读取校验结果并回显，不再单独为输入设置校验逻辑
- 文本内容结构化输出和存储：日志等，以增强语义性，降低内容解析开销
- 对于通用型的产品开发，仅需搭建技术骨架，再根据具体的业务需求添加血肉
- 架构设计为可替换可组合，而不是可扩展，避免引入新的概念，减少代码调用层次，简化实现流程
- 机器关注的是指令，而不是函数本身；人类关注的是数据及数据结构，而不是代码本身；人类只是通过代码告诉机器要做什么以得到人类所需的数据，但机器并不理解为什么或者怎么做；
- 算法优化就是对数据去粗取精的过程，通过降低计算规模和计算次数实现提升计算速度的目的；


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
