---
title: (译文) 3L Project的理论与假说
author: Thomas Hintz
author_title: Creator of 3L Project
author_url: https://thintz.com/
author_image_url:
draft: true
tags:
- 外文翻译
- 新操作系统
- 3L Project
description:
image:
---

> 本译文已得到原文作者的中文翻译许可，并采用与原文相同的许可协议 -
> [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
> 进行授权和传播。
>
> 本译文不会对原文做任何除格式调整和拼写错误以外的调整和修改，以确保原文内容的完整性，保证原文所要阐述的事实和思想不被曲解。

:::note 原文段落
These are the current theories and hypotheses (in a slightly more scientific meaning of the words) influencing the design and implementation of the 3L Project's development. They are just theories and hypotheses and are not set in stone. Most will probably change and be adjusted to match newly gained knowledge, viewpoints, and understandings. Note that many of these hypotheses are built on top of the core system and do not have to be followed or used. The system allows developing completely different systems based on completely different ideas. Hypotheses are generally not proven. Theories have been proven but solutions will likely change. There is no particular ordering to the listings.
:::
<!-- more -->

:::note 原文段落
For questions, suggestions, and feedback send an email to the 3L Project [hackers list](https://lists.3lproject.org/mailman/listinfo/3l-devel).
:::

## People

:::note 原文段落
Theory: people ultimately write code, not computers.
- System should be designed for humans.
- System should take advantage of people's strengths and minimize complications from their weaknesses.
- System should fully separate implementation details from all levels of application development, including core "OS" features development. See "Descriptors ...".
:::

## Small Core

:::note 原文段落
Hypothesis: The core system, the part that must be compiled or implemented in hardware, benefits from being small.
- Makes the system more extensible.
- Easier to experiment.
- Easier to secure.
- Less bugs.
:::

## Language Mixing

:::note 原文段落
Hypothesis: Different languages can be mixed together without FFIs.
:::

:::note 原文段落
Mixed together in this case means, for example, a function from one language can invoke a function from another language or reference a variable from another language, seamlessly. Given some care in design of the lowest level all languages can be compiled down to the same base language which allows for seamless integration. This is made significantly easier because of Small Core.
:::

:::note 原文段落
This can be further enabled by providing an environment of readers to each reader and a separate eval and/or compilation step for each language.

```lisp
(scheme (+ 1 ((lambda (proc) (proc 2))
  (javascript function(n) { return scheme((+ n 1)); }))))

; returns 4
```
:::

:::note 原文段落
In the example '(scheme ...)', 'scheme(...)', and '(javascript ...)' denote the reader to be used. Readers are lexically scoped to a 'reader' environment. A reader can, of course, also include a compilation/translation step before returning the underlying lisp code.
:::

:::note 原文段落
In the example, a possible compilation of the Javascript portion could be:

```lisp
(lambda (n) (+ n 1))
```
:::

:::note 原文段落
It would also be possible for readers to extend other readers to process "intermediate" forms.
:::

## DSLs

:::note 原文段落
Hypothesis: domain specific languages lead to better systems than layers of libraries and frameworks.
- People don't naturally think in terms of APIs but languages do come naturally.
- Layers of libraries are hard to keep congruent.
- DSLs lead to more consistent results.
:::

## Descriptors Instead of Data Structures and Algorithms

:::note 原文段落
Hypothesis: data structures and algorithms are irrelevant details when describing solutions to problems.
- People don't naturally think in terms of data structures and algorithms.
- Data structures and algorithms are only related to performance and not the solution to problems.
- Data structures and algorithms in system and application code are unnecessary added complexity.
- Describing the output of some input is easier to reason about and specify correctly than creating a procedure to process the input.
- It's much easier to change the implementations of the constructs used by a description than to rewrite an entire system of procedures.
:::

## Performance

:::note 原文段落
Hypothesis: performance is an implementation detail and should not influence system design.
- Performance has nothing to do with describing the solution to a problem.
- Performance is entirely dependent on hardware and hardware always changes. System or application code written with optimizations is tied to some hardware and that makes it more difficult to incorporate innovations in hardware design.
- Hardware should be created for the language and not the other way around. Good hardware design is the basis for good performance.
:::

## Dropping System Support for Strings, Arrays, other Structures

:::note 原文段落
Hypothesis: strings, arrays, booleans, and other common programming language data structures and types are unnecessary in the core system and lead to code bloat which conflicts with "Small Core".
- Extra data structures and types bloats the core system and implementations.
  - Just look at the evolution of Scheme specifications for an example. As new types are added duplicate procedures must be created for them. i.e. string-ref <-> vector-ref.
  - Polymorphism turns out not to be so clean after all in implementation and again conflicts with "Small Core".
:::

## Lisp

:::note 原文段落
Hypothesis: Lisp is the optimal language for the core system. As we know it today it is probably not the end game but the best we have now. More research and experimentation is highly welcome and encouraged.
- Simple language
- Simple, easy, clean implementation.
- Cleanly, intuitively homioconic.
  - Means it's easier to implement DSLs and other languages. See "DSLs".
- Rooted directly in [math](https://en.wikipedia.org/wiki/Lambda_calculus)
  - Computing is ultimately mathematical calculations. Acknowledging this and embracing it leads to a more robust and easier to reason about system. (Math in a symbolic sense).
- Easily made safe, secure.
:::

## Hardware

:::note 原文段落
Theory: hardware architecture can be massively improved.
- The core architecture of popular hardware today is effectively the same as decades ago.
- Better hardware has been developed.
- (Hypothesis) Intel and friends can be beat without a lot of money by using a better architecture designed for languages other than assembly and C.
:::

## 译文-扩展阅读


:::info Copyright
- 原文链接: [https://3lproject.org/theories](https://3lproject.org/theories)
- 原文作者: Thomas Hintz - [t@thintz.com](mailto:t@thintz.com)
- 译文作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本译文采用许可协议 [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
  转载请注明来自 [Crazydan Studio](https://crazydan.org/)！
:::
