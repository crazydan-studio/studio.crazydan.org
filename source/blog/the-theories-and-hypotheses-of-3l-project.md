---
title: (译文) 3L 项目的理论与假设
author: Thomas Hintz
author_title: Creator of 3L Project
author_url: https://thintz.com/
author_image_url:
tags:
- 外文翻译
- 新操作系统
- 3L
description:
image:
---

> 本译文已得到原文作者的中文翻译许可，并采用与原文相同的许可协议 -
> [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
> 进行授权和传播。
>
> 本译文不会对原文做任何除格式调整和拼写错误以外的调整和修改，以确保原文内容的完整性，保证原文所要阐述的事实和思想不被曲解。

:::note 原文段落
These are the current theories and hypotheses
(in a slightly more scientific meaning of the words)
influencing the design and implementation of the 3L Project's development.
They are just theories and hypotheses and are not set in stone.
Most will probably change and be adjusted
to match newly gained knowledge, viewpoints, and understandings.
Note that many of these hypotheses are built on top of the core system
and do not have to be followed or used.
The system allows developing completely different systems based on completely different ideas.
Hypotheses are generally not proven.
Theories have been proven but solutions will likely change.
There is no particular ordering to the listings.
:::

这些是目前影响 3L 项目开发的设计和实现的理论和假设（一种稍微更科学的说法）。
它们只是理论和假设，并不是一成不变的。大多数可能会改变和调整，以适应新获得的知识、观点和理解。
请注意，许多假设都是建立在核心系统之上的，不必遵循或使用。
该系统允许基于完全不同的想法来开发完全不同的系统。
**假设**通常无法得到证明。**理论**已经被证明，但是解决方案可能会改变。这些清单并没有特别的顺序。

:::note 原文段落
For questions, suggestions, and feedback send an email to the 3L Project
[hackers list](https://lists.3lproject.org/mailman/listinfo/3l-devel).
:::

如有疑问、建议和反馈，请发送电子邮件到 3L 项目的
[Hackers List](https://lists.3lproject.org/mailman/listinfo/3l-devel)。
<!-- more -->

## 人 - People

:::note 原文段落
Theory: people ultimately write code, not computers.
- System should be designed for humans.
- System should take advantage of people's strengths
  and minimize complications from their weaknesses.
- System should fully separate implementation details
  from all levels of application development,
  including core "OS" features development.
  See "Descriptors ...".
:::

**理论**：最终是人来写代码，而不是计算机。
- 系统应该为人类而设计；
- 系统应该利用人们的长处，并最大程度地减少他们的弱点所带来的复杂度；
- 系统应该将实现细节与所有级别的应用程序开发完全分开，包括核心“OS”特性的开发。见“描述符...”一节；

> 译注：**系统**指 3L 操作系统。

## 小核心 - Small Core

:::note 原文段落
Hypothesis: The core system, the part that must be compiled or implemented in hardware,
benefits from being small.
- Makes the system more extensible.
- Easier to experiment.
- Easier to secure.
- Less bugs.
:::

**假设**：核心系统，即必须在硬件中被编译或实现的部分，受益于**小**。
- 使系统更具扩展性；
- 更容易进行实验；
- 更容易做到可靠；
- 更少的缺陷；

> 译注：**核心系统**指 3L 操作系统的核心部分。后续亦为如此。

## 语言混合 - Language Mixing

:::note 原文段落
Hypothesis: Different languages can be mixed together without FFIs.
:::

**假设**：不同的语言可以混合使用，而不需要 [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface)。

> 译注：**FFI**（Foreign Function Interface），即外部函数接口，
> 也即用一种编程语言编写的程序可以调用例程或使用用另一种编程语言编写的服务的机制。

:::note 原文段落
Mixed together in this case means, for example,
a function from one language can invoke a function from another language
or reference a variable from another language, seamlessly.
Given some care in design of the lowest level
all languages can be compiled down to the same base language
which allows for seamless integration.
This is made significantly easier because of Small Core.
:::

混合使用，在这种情况下中意味着，例如，一种语言的函数可以无缝调用另一种语言的函数，或者引用另一种语言的变量。
只要在最底层的设计上稍加注意，所有语言都可以被编译成相同的基础语言，从而实现无缝集成。
由于**小核心**，这大大简化了操作。

:::note 原文段落
This can be further enabled
by providing an environment of readers to each reader
and a separate eval and/or compilation step
for each language.

```lisp
(scheme (+ 1 ((lambda (proc) (proc 2))
  (javascript function(n) { return scheme((+ n 1)); }))))

; returns 4
```
:::

通过为每个读者（译注：后续有解释）提供一个读者环境，以及为每种语言提供单独的 eval 和/或 编译步骤，可以进一步实现这一点。

```lisp
(scheme (+ 1 ((lambda (proc) (proc 2))
  (javascript function(n) { return scheme((+ n 1)); }))))

; returns 4
```

:::note 原文段落
In the example '(scheme ...)', 'scheme(...)', and '(javascript ...)'
denote the reader to be used.
Readers are lexically scoped to a 'reader' environment.
A reader can, of course, also include a compilation/translation step
before returning the underlying lisp code.
:::

在示例中，`(scheme ...)`、`scheme(...)`和`(javascript ...)`表示被使用的读者。
读者在词法上仅限于“读者”环境。在返回底层 Lisp 代码之前，读者当然还可以包括编译/转译步骤。

:::note 原文段落
In the example, a possible compilation of the Javascript portion could be:

```lisp
(lambda (n) (+ n 1))
```

It would also be possible for readers to extend other readers to process "intermediate" forms.
:::

在该示例中，JavaScript 部分可能编译为：

```lisp
(lambda (n) (+ n 1))
```

读者也可以扩展其他读者来处理“中间”形式。

## DSL - DSLs

:::note 原文段落
Hypothesis: domain specific languages lead to better systems
than layers of libraries and frameworks.
- People don't naturally think in terms of APIs but languages do come naturally.
- Layers of libraries are hard to keep congruent.
- DSLs lead to more consistent results.
:::

**假设**：<u>领域特定语言（DSL）会产生比库和框架层更好的系统</u>。
- 人们不会自然地从 API 的角度思考问题，但会自然地以语言进行思考；
- 库的各个层很难保持一致；
- DSL 会产生更一致的结果；

> 译者思考：库和框架使用越多，就越容易产生各种bug，调用的层次也越来越深，系统也会越来越复杂，
> 以 DSL 方式替换各种库和框架，由于其统一和一致特性，能够解决或缓解这样的问题，而且函数的融合性显然会更好。

## 描述符替代数据结构和算法 - Descriptors Instead of Data Structures and Algorithms

:::note 原文段落
Hypothesis: data structures and algorithms are irrelevant details
when describing solutions to problems.
- People don't naturally think in terms of data structures and algorithms.
- Data structures and algorithms are only related to performance and not the solution to problems.
- Data structures and algorithms in system and application code are unnecessary added complexity.
- Describing the output of some input is easier to reason about and specify correctly
  than creating a procedure to process the input.
- It's much easier to change the implementations of the constructs used by a description
  than to rewrite an entire system of procedures.
:::

**假设**：在描述问题的解决方案时，数据结构和算法是无关紧要的细节。
- 人们不会自然地从数据结构和算法的角度进行思考；
- 数据结构和算法只与性能有关，而与问题的解决方案无关；
- 系统和应用代码中的数据结构和算法增加了不必要的复杂性；
- 描述某个输入的输出要比创建一个处理输入的过程更容易推理和正确指定；
- 更改<u>描述所使用</u>的<u>构造的实现</u>要比重写整个处理系统容易得多；

## 性能 - Performance

:::note 原文段落
Hypothesis: performance is an implementation detail and should not influence system design.
- Performance has nothing to do with describing the solution to a problem.
- Performance is entirely dependent on hardware and hardware always changes.
  System or application code written with optimizations is tied to some hardware
  and that makes it more difficult to incorporate innovations in hardware design.
- Hardware should be created for the language and not the other way around.
  Good hardware design is the basis for good performance.
:::

**假设**：性能是一种实现细节，不应该影响系统设计。
- 性能与描述问题的解决方案无关；
- 性能完全依赖于硬件，而硬件总是在变化。通过优化编写的系统或应用程序代码与某些硬件绑定在一起，
  这使得在硬件设计中加入革新变得更加困难；
- 应该**为语言创造硬件**，而不是反过来。良好的硬件设计是良好性能的基础；

> 译者思考：的确应该为语言创造硬件，这样既能充分发挥语言的优势，又能保证性能不再是瓶颈。
> 剩下所要关注的重点就是如何创建更加好的语言了，比如 Lisp。

## 放弃对字符串、数组和其他结构的系统支持 - Dropping System Support for Strings, Arrays, other Structures

:::note 原文段落
Hypothesis: strings, arrays, booleans, and other common programming language data structures and types
are unnecessary in the core system and lead to code bloat which conflicts with "Small Core".
- Extra data structures and types bloats the core system and implementations.
  - Just look at the evolution of Scheme specifications for an example.
    As new types are added duplicate procedures must be created for them.
    i.e. string-ref <-> vector-ref.
  - Polymorphism turns out not to be so clean after all in implementation
    and again conflicts with "Small Core".
:::

**假设**：在核心系统中，字符串、数组、布尔以及其他常见的编程语言数据结构和类型是没有必要的，
这会导致代码膨胀，从而与“小核心”冲突。
- 额外的数据结构和类型会让核心系统和实现膨胀：
  - 以 Scheme 规范的演变为例。在添加新的类型时，就必须为它们创建重复的处理过程。
    例如，`string-ref <-> vector-ref`；
  - 多态性在实现中并不是那么干净，并且再次与“小核心”冲突；

## Lisp

:::note 原文段落
Hypothesis: Lisp is the optimal language for the core system.
As we know it today it is probably not the end game but the best we have now.
More research and experimentation is highly welcome and encouraged.
- Simple language
- Simple, easy, clean implementation.
- Cleanly, intuitively homioconic.
  - Means it's easier to implement DSLs and other languages. See "DSLs".
- Rooted directly in [math](https://en.wikipedia.org/wiki/Lambda_calculus)
  - Computing is ultimately mathematical calculations.
    Acknowledging this and embracing it leads to a more robust and easier to reason about system.
    (Math in a symbolic sense).
- Easily made safe, secure.
:::

**假设**：Lisp 是核心系统的最佳语言。众所周知，这可能不是最终的结果，而是我们目前拥有的最好的结果。
我们欢迎并鼓励进行更多的研究和实验。
- 简单的语言；
- 简单、方便、干净的实现；
- 干净、直观地[同相](https://en.wikipedia.org/wiki/Homoiconicity)
  （译注：原文中的 `homioconic` 应该为 `homoiconic`）：
  - 意为，更容易实现 DSL 和其他语言。见“DSL”一节；
- 直接植根于[数学](https://en.wikipedia.org/wiki/Lambda_calculus)：
  - 计算最终是数学计算。承认并接受这一点，会产生更健壮和更容易推理的系统。（象征意义上的数学）；
- 很容易做到安全、可靠；

> 译注：如果用该语言编写的程序可以使用该语言把它当作数据来操作，那么该语言就是**同相**的，
> 因此只需通过读取程序本身就可以推断出该程序的内部表示。

## 硬件 - Hardware

:::note 原文段落
Theory: hardware architecture can be massively improved.
- The core architecture of popular hardware today is effectively the same as decades ago.
- Better hardware has been developed.
- (Hypothesis) Intel and friends can be beat without a lot of money
  by using a better architecture designed for languages other than assembly and C.
:::

**理论**：硬件架构可以大幅改进。
- 今天流行硬件的核心架构实际上与几十年前相同；
- 更好的硬件已经被开发出来；
- （假设）通过使用针对汇编语言和 C 语言以外的语言而设计的更好的架构，可以在不花很多钱的情况下击败英特尔和它的盟友们；

## 译文-扩展阅读

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin)。
- [Save Our Computing Future](https://thintz.com/essays/save-our-computing-future):
  译文见 [拯救我们计算的未来](./save-our-computing-future)。
- [Why do we need a new OS?](https://3lproject.org/blog/why-do-we-need-a-new-os):
  译文见 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os)。
- [3L Project](https://3lproject.org/):
  The 3L project is building an computing system from the ground up to be secure, private, safe, and extensible.
- [The 3L Project In Depth](https://3lproject.org/in-depth):
  译文见 [深入了解 3L 项目](./the-3l-project-in-depth)。


:::info Copyright
- 原文链接: [https://3lproject.org/theories](https://3lproject.org/theories)
- 原文作者: Thomas Hintz - [t@thintz.com](mailto:t@thintz.com)
- 译文作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本译文采用许可协议 [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
  转载请注明来自 [Crazydan Studio](https://crazydan.org/)！
:::
