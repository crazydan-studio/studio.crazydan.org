---
title: 开发背景
authors:
- flytreleft
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';
import DocCardList from '@theme/DocCardList';


<DocCardList />


## 相关阅读

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](/blog/a-new-os-design-by-wangyin)。
- [Programmer's critique of missing structure of operating systems](http://blog.rfox.eu/en/Programming/Programmers_critique_of_missing_structure_of_operating_systems.html): 操作系统所遗留的历史缺陷。
- [Pick Operating System](https://en.wikipedia.org/wiki/Pick_operating_system):
  A demand-paged, multiuser, virtual memory, time-sharing computer operating system
  based around a MultiValue database.
- [DBOS - A Database-oriented Operating System](https://dbos-project.github.io/):
  基于数据库的操作系统，按“一切皆表，一切皆存储过程”进行设计，面向云平台。含数据变更日志。
  - [DBOS: A DBMS-Oriented Operating System (VLDB 2022)](https://vldb.org/pvldb/vol15/p21-skiadopoulos.pdf)
  - [A Progress Report on DBOS: A DBMS-Oriented Operating System (CIDR 2022)](http://cidrdb.org/cidr2022/papers/p26-li.pdf)
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




<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
