---
title: (转) 王垠：一种新的操作系统设计
authors:
- yinwang
tags:
- 好文推荐
- 新操作系统
- 数据结构化
- 程序函数化
---

import Copyright from '@site/src/components/Copyright/TransferBlogByFlytreeleft';

由于较长时间未能得到原文作者的转载许可，故而，仅在这里提供原文访问地址：

一种新的操作系统设计 - [http://www.yinwang.org/blog-cn/2013/04/14/os-design](http://www.yinwang.org/blog-cn/2013/04/14/os-design)

<!-- more -->

<!--
> 本转载文章已得到原文作者的转载许可，其权益归原文作者所有，若需转载，请先征得原文作者许可。
>
> 本转载文章不会对原文做任何除格式调整和拼写错误以外的调整和修改，以确保原文内容的完整性，
> 保证原文所要阐述的事实和思想不被曲解。
>
> 转载文章的主要目的是传播有价值的、面向未来的、能够产生积极意义的思想。阅读和思考时，
> 需摒弃旧有的成见和现有的认知，以开放包容的心态去对待和思索文章中的内容，去粗取精，以微薄之力逐步推动人类社会的进步。

我一直在试图利用程序语言的设计原理，设计一种超越“Unix 哲学”的操作系统。这里是我的设想：
- 这种系统里面的**程序间通信不使用无结构的字符串**，而是**使用带有类型和结构的数据**。在这样的系统里面，
  Unix 和其它类似操作系统（比如 Windows）里的所谓“应用程序”的概念基本上完全消失。
  系统由一个个很小的“函数”组成，每个函数都可以调用另外一个函数，通过参数传递数据。
  每个函数都可以手动或者自动并发执行。用现在的系统术语打个比方，这就像是所有代码都是“库”代码，
  而不存在独立的“可执行文件”。
- 由于**参数是数据结构而不是字符串**，这<u>避免了程序间通信繁琐的编码和解码过程</u>。使得“进程间通信”变得轻而易举。
  任何函数都可以调用另一个函数来处理特定类型的数据，这使得像 “OLE 嵌入”这样的机制变得极其简单。
- 所有**函数由同一种先进的高级程序语言写成**，所以函数间的调用完全不需要“翻译”。
  不存在 SQL injection 之类由于把程序当成字符串而产生的错误。
- 由于这种语言**不允许应用程序使用“指针运算”**，应用程序不可能产生 segfault 一类的错误。
  为了防止不良用户手动在机器码里面加入指针运算，系统的执行的代码不是完全的机器代码，
  而必须通过进一步的验证和转换之后才会被硬件执行。这有点像 JVM，但它直接运行在硬件之上，
  所以必须有一些 JVM 没有的功能，比如把内存里的数据结构自动换出到硬盘上，需要的时候再换进内存。
- 由于没有指针运算，系统可以直接使用“实地址”模式进行内存管理，从而不再需要现代处理器提供的内存映射机制以及 TLB。
  **内存的管理粒度是数据结构**，而不是页面。这使得内存访问和管理效率大幅提高，而且简化了处理器的设计。
  据 Kent Dybvig 的经验，这样的系统的内存使用效率要比 Unix 类的系统高一个数量级。
- 系统使用与应用程序相同的高级语言写成，至于**“系统调用”，不过是调用另外一个函数**。
  由于只有这些“系统驱动函数”才有对设备的“引用”，又因为系统没有指针运算，所以用户函数不可能绕过系统函数而非法访问硬件。
- 系统没有 Unix 式的“命令行”，它的**“shell”其实就是这种高级语言的 REPL**。
  用户可以在终端用可视化的结构编辑方式输入各种函数调用，从而启动进程的运行。
  所以你不需要像 Unix 一样另外设计一种毛病语言来“粘接”应用程序。
- 所有的数据都作为“结构”，保存在一个分布式的数据共享空间。同样的那个**系统语言可以被轻松地发送到远程机器，
  调用远程机器上的库代码，执行任意复杂的查询索引等动作，取回结果**。这种方式可以高效的完成数据库的功能，
  然而却比数据库简单很多。所谓的“查询语言”（比如 SQL，Datalog，Gremlin，Cypher）其实是多此一举，
  它们远远不如普通的程序语言强大。说是可以让用户“不需要编程，只提出问题”，然而它们所谓的“优化”是非常局限甚至不可能实现的，
  带来的麻烦远比直接编程还要多。逻辑式编程语言（比如 Prolog）其实跟 SQL 是一样的问题，一旦遇到复杂点的查询就效率低下。
  所以系统不使用关系式数据库，不需要 SQL，不需要 NoSQL，不需要 Datalog。
- 由于数据全都是结构化的，所以没有普通操作系统的无结构“文件系统”。**数据结构可能通过路径来访问，
  然而路径不是一个字符串或者字符串模式**。系统不使用正则表达式，而是一种类似 NFA 的数据结构，
  对它们的拆分和组合操作不会出现像字符串那样的问题，比如把 /a/b/ 和 /c/d 串接在一起就变成错误的 /a/b//c/d。
- <u>所有的数据在合适的时候被自动同步到磁盘，并且进行容错处理</u>，所以即使在机器掉电的情况，
  绝大部分的数据和进程能够在电源恢复后继续运行。
- <u>程序员和用户几乎完全不需要知道“数据库”或者“文件系统”的存在</u>。程序假设自己拥有无穷大的空间，可以任意的构造数据。
  根据硬件的能力，一些手动的存盘操作也可能是有必要的。
- 为了减少数据的移动，系统或者用户可以根据数据的位置，选择： 1）迁移数据，或者 2）**迁移处理数据的“进程”**。
  程序员不需要使用 MapReduce，Hadoop 等就能进行大规模并行计算，然而表达能力却比它们强大很多，
  因为它们全都使用同一种程序语言写成。

我曾经以为我是第一个想到这个做法的人。可是调查之后发现，很多人早就已经做出了类似的系统。Lisp Machine 似乎是其中最接近的一个。
[Oberon](http://www.yinwang.org/blog-cn/2013/03/07/oberon) 是另外一个。IBM System/38 是类似系统里面最老的一个。
最近一些年出现的还有微软的 [Singularity](http://research.microsoft.com/en-us/projects/Singularity)，
另外还有人试图把 JVM 和 Erlang VM 直接放到硬件上执行。

所以这篇文章的标题其实是错的，这不是一种“新的操作系统设计”。它看起来是新的，只不过因为我们现在用的操作系统忘记了它们本该是什么样子。
我也不该说它“超越了 Unix 哲学”，而应该说，所谓的 Unix 哲学其实是历史的倒退。
-->

## 转载文章-编者思考

> 以下为本文编者的观点，与原文作者无关，也不针对原文作者本人或其他任何个体。

编者认为，作者所期望的操作系统的核心设计理念应该是指**数据结构化**和**程序函数化**。

将数据以结构化方式存储和传递，可以减少对数据的编码与反编码操作，因为结构化的数据，其类型和意义都是明确的，
在代码中可以直接处理，而不需要经过多层的数据转换，可以降低程序复杂度，也可以提升代码执行速度。

程序函数化，则是数据结构化所导致的必然要求和结果。将程序函数化，则避免了进程调用的开销，
而且更有利于结构化的数据的交换。最终，操作系统就不再是进程的调度器，而是函数的执行器。
应用程序也不再是一个个二进制文件，而是一个个函数，函数可以直接调用函数，操作系统也就成为一个大的函数。

由于数据已经结构化，对数据的查询可以直接用查询函数即可完成，而不再需要数据库等应用服务，
更不需要为不同的查询模式定制不同的处理代码，这使得程序开发变得更加灵活和轻松。

数据的迁移也会变少，我们不再需要先将数据上传到某个中心，再从该中心拿到数据处理结果，
因为，我们可以直接**Share Functions**，在本地设备执行某个问题的解决方案的函数，即可得到所需要的结果。

当然，以上只是对当下操作系统和开发困境的一种探索和思考，无论其是否是操作系统的最优形态，
又能否从根本上解决所有问题，这些都是无法预知的，但编者相信，我们是极为有必要重新审视当前的软件开发的设计理念和规则的。

我们不应该继续「抱残守缺」，继续日复一日年复一年地干着「挖坑」和「填坑」的事情，或者，反复重复实现已经存在了的解决方案。
我们应该跳出当前的困境和视野，在当前的认知和已知的问题之上，面向未来，重新构建一个新的操作系统、一个全新的软件世界。

> 为什么是重建而不是完善现有的，可以继续阅读 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os.md)。

作为软件开发者，编者认为，软件的基础设施（包括操作系统）应该提供更加完备的和统一的数据存储和处理机制，
让开发者从「泥潭」中脱身，以更加关注功能需求的开发。什么高并发、分布式、数据查询优化、应用监控、日志处理等等问题，
都应该对开发者透明，而不是日日夜夜纠缠于 各种无法预知的 内外软件系统的 缺陷和不完善之中。

最令编者头疼的就是，引入外部系统或外部库，就会引入大量新的概念和未知的坑，而各种概念又往往是相当复杂的，
各种接口调用也是环环相扣，从来没有可以一步到位的，需要查阅很多资料，并**从无数前人趟过的坑中吸取经验教训**。
另外就是，很多应该由外部系统做的事情，往往由于设计和历史问题，其会将这些问题抛给开发人员去处理，比如，
[数据库查询优化](http://www.yinwang.org/blog-cn/2014/04/24/relational#%E5%85%B3%E7%B3%BB%E5%BC%8F%E6%A8%A1%E5%9E%8B%E7%9A%84%E5%B1%80%E9%99%90%E6%80%A7)
等问题，这又进一步加重了软件开发者的负担。

肯定有人会说「自己技艺不精，就不要去怪别人做得不好」。而对于这群「抱残守缺」者，编者的建议是，
不要以为掌握了一些复杂且高深的技艺和技巧就觉得可以「自命不凡」，将问题复杂化并不是一件可以让自己获得优越感并感到光彩的事情。
最困难和最值得去做的事情，应该是**如何让事物变得更简单**，以及**如何节省劳力、脑力和计算资源**。

当然，编者也不会无知地认为这些问题是开发者造成的，相反，有责任感的开发者必然也同样期望能够开发出更好的应用，
但是，因为「历史包袱」和「基础设施」自身的缺陷所致，这种期望往往成为一种奢望和无可奈何。
这也是为什么编者要在这里强调从头开始设计软件基础设施的重要性和必要性的原因。

目前看起来，在这条路上走的人还是太少了。

## 转载文章-扩展阅读

- [Why do we need a new OS?](https://3lproject.org/blog/why-do-we-need-a-new-os):
  译文见 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os.md)。
- [Save Our Computing Future](https://thintz.com/essays/save-our-computing-future):
  译文见 [拯救我们计算的未来](./save-our-computing-future.md)。
- [谈 Linux，Windows 和 Mac](http://www.yinwang.org/blog-cn/2013/03/07/linux-windows-mac):
  多质疑、多反思，不应被权威或固有思想和规则所禁锢，认真理智对待和评判事物的优缺点。
- [几个超炫的专业词汇](http://www.yinwang.org/blog-cn/2013/04/15/terminology):
  文章中所提到的几个词汇很形象地展示了软件世界的一些恼人的问题。
- [Awesome Lisp Machine](https://github.com/ghosthamlet/awesome-lisp-machine):
  A curated list of awesome Lisp Machine and Lisp Operating System stuff.
- [Oberon System](https://en.wikipedia.org/wiki/Oberon_(operating_system)):
  A modular, single-user, single-process, multitasking operating system written in the programming language of the same name.
  The project home page is [Project Oberon](http://www.projectoberon.com/).
- [Oberon - The Overlooked Jewel](https://pdfs.semanticscholar.org/d48b/ecdaf5c3d962e2778f804e8c64d292de408b.pdf)
- [关系式模型的实质](http://www.yinwang.org/blog-cn/2014/04/24/relational):
  - `许多宝贵的人力，耗费在构造，释放，连接这些“中间表格”的工作中。`
  - `只要你有一个程序语言，几乎任何程序语言，你就可以发送这语言的代码到一个“数据服务器”。服务器接受并执行这代码，对数据进行索引，查询和重构，最后返回结果给客户端。`
  - `在我的脑子里，只有更通用而简单的数据结构，以及针对它们的高效存储处理方式。`


<Copyright
  source={{
    url: 'http://www.yinwang.org/blog-cn/2013/04/14/os-design',
    author: { name: '王垠', email: 'yinwang0@gmail.com' }
  }}
/>
