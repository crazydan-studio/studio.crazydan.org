---
title: (译文) 为什么我们需要一个新的操作系统？
authors:
- thintz
tags:
- 外文翻译
- 新操作系统
- 3L
---

import Copyright, {Declaration} from '@site/src/components/Copyright/TranslationBlogByFlytreeleft';
import {Translation, Text} from '@site/src/components/Translation';

<Declaration />

<Translation><Text source lang='en'>

Understandably the most frequent question with regards to the 3L Project is
why do we need a new OS?
The answer lies in the history of the mini and micro computer
and the momentum behind supporting legacy software.

</Text><Text lang='zh'>

可以理解，有关 [3L 项目](https://3lproject.org) 的最常见问题是<u>「为什么我们需要一个新的操作系统？」</u>。
其答案存在于迷你和微型计算机的历史，以及<u>支持传统软件的推力</u>之中。

</Text></Translation>

<!-- more -->

<Translation><Text source lang='en'>

When mini and micro computers were built in the 60's, 70's, and 80's
memory was limited to kilobytes or a few megabytes
and processors ran slower than snail speed compared to today.
When the first operating systems were being developed for low resource computers
they had to be as lightweight as possible.
So OSes were written in assembly or C and were more a collection of libraries
than a manager of resources and scheduling of programs, out of necessity.
As computer memory and processor speeds increased OSes grew to handle more common tasks
but budget computers still required a fast, lightweight OS to be practical.
By the time budget computers became powerful enough to handle a more heavy-weight and comprehensive OS
we were locked into old architectures
because of the momentum built over time when computing resources where limited.
Windows, Linux, Mac OS X, and the BSDs we have today are still built using the architecture developed
when computing resources were limited even though it is no longer technically necessary.

</Text><Text lang='zh'>

当迷你和微型计算机在60年代、70年代和80年代被建造出来时，内存被限制在千字节或几兆字节，
并且处理器的运行速度与当下相比简直比蜗牛还慢。在为低资源计算机开发第一个操作系统（OS）时，它们必须尽可能地轻量级。
因此，由于这样的必要性，操作系统都是用汇编语言或 C 语言编写的，这就使其更像是一组库的集合，而不是作为资源和程序调度的管理器。
随着计算机内存和处理器速度的提升，操作系统可以处理更多的常见任务，但经济型计算机仍然需要一个快速、轻便的 OS 才能变得实用。
到经济型计算机变得足够强大，可以应付更繁重和功能更全面的操作系统的时侯，我们却**被禁锢在旧的架构**之中，
因为，当计算资源有限时，这种势头（译注：指，被禁锢在旧的架构中）就会随着时间的推移而建立起来。
尽管<u>在计算资源有限时所开发的</u>架构在技术上已经不再是必需的了，
但我们今天所拥有的 Windows、Linux、Mac OS X 和 BSD 系列的操作系统，依然是采用这样的架构构建的。

</Text></Translation>

<Translation><Text source lang='en'>

Another change since the original OSes were initially being built is the need for security,
both from hostile entities over a network and a separation of programs
running together on the same machine.
As security became more important features were tacked on to the OSes
to combat the problem (along with hardware features like the MMU).
But fundamentally the way in which programs ran and were developed is the same.
The security features that were added still relied heavily on the kernel and application developers
doing the right thing and not making mistakes.

</Text><Text lang='zh'>

自最初的操作系统开始构建以来，另一个变化是对安全的需要，既要防止网络上敌对实体的攻击，也要隔离在同一台机器上运行的程序。
随着安全变得越来越重要，一些特性被添加到了操作系统中以解决这个问题
（包括像 [MMU (Memory Management Unit)](https://en.wikipedia.org/wiki/Memory_management_unit) 这样的硬件特性）。
但是，从根本上说，程序的运行和开发方式还是相同的，所添加的安全特性依然严重依赖于内核和应用程序开发人员**做正确的事情而不犯错误**。

</Text></Translation>

<Translation><Text source lang='en'>

One of the most significant changes in the past couple decades has been the networking of computers.
Whereas before programs were assumed benevolent and trustworthy
we now have to deal with many cases where we must assume programs are not trustworthy.
Unfortunately little power has been given to users to control what a program can and cannot do.

</Text><Text lang='zh'>

在过去的几十年中，最重要的变化之一便是计算机的联网。在这之前程序被认为是善意和值得信任的，而现在我们不得不处理许多情况，
我们必须假设**程序是不值得信任的**。不幸的是，<u>用户</u>只有很少的权力<u>去控制程序该做什么和不该做什么</u>。

</Text></Translation>

<Translation><Text source lang='en'>

Another development has been in Computer Science research done in the last few decades,
notably in this case when it comes to improved security measures.
We now know of many ways to improve computer security
that we didn't know when OSes were first being developed
but the momentum from the past and desire to support legacy software
has prevented much of this research from being incorporated.

</Text><Text lang='zh'>

另一个发展存在于过去几十年所做的**计算机科学研究**里，特别是在<u>涉及到改进的安全措施</u>的情况中。
我们现在知道许多提高计算机安全性的方法，
这些方法在首次开发操作系统时还不知道，但是<u>过去的惯性使然</u>以及<u>支持传统软件的渴望</u>阻止了许多此类研究的进行。

</Text></Translation>

<Translation><Text source lang='en'>

Another area of research has been in the way of compiler design and capabilities.
Compilers initially served as a way of making code more portable
but now they are increasingly used to perform analysis of the code and improve the speed at which it runs.
This enables the usage of languages and paradigms that previously were too slow
to be practical on machines with limited resources.
Rarely though has the OS taken full advantage of these advances
by allowing developers a more friendly environment for OS and application development.

</Text><Text lang='zh'>

另一个研究领域是编译器的设计和性能。编译器最初是用来提高代码的可移植性的，但现在它们越来越多地用于执行代码分析和提升代码运行速度。
这使得以前<u>在资源有限的机器上过于缓慢而不实用</u>的语言和范式<u>被应用了起来</u>。
但是，操作系统很少通过<u>为开发人员提供更友好的 OS 和应用程序开发环境</u>来充分利用这些优势。

</Text></Translation>

<Translation><Text source lang='en'>

Taken together all of these advances allow us to create a significantly better OS
than we now have and an OS designed to address the challenges we face today.
Unfortunately, taken as a whole, they are too far from the way programs have been developed for decades
to make adapting current OSes to take advantage of and address the concerns of today.
Attempting to retro-fit a current OS would result in the requirement
that nearly every program would have to be rewritten.
Since this is the case it makes little sense to spend the time and effort
required to adapt a massive piece of software
when it would take less effort and time to build something from the ground up.

</Text><Text lang='zh'>

综合所有这些优势，我们可以创建比现有更好的操作系统，一个用来解决我们当下所面对的挑战的操作系统。
不幸的是，从整体上看，它们（译注：即，更好的操作系统）与几十年来程序的开发方式相去甚远，
从而无法适配当前的操作系统以利用和解决现今的问题。尝试改造当前的操作系统将使得**几乎所有的程序都必须重写**。
既然是这样的情况，那么在从头开始构建所需的精力和时间更少的情况下，**花时间和精力来适配大量的软件就没有什么意义了**。

</Text></Translation>

<Translation><Text source lang='en'>

In the future do we really want to continue to be tied to the past?
Building an OS is a massive undertaking but it is a worthwhile investment.
As more of our lives and more money moves on to computers and relies on networking
it is only going to become more and more important to develop strong security mechanisms
and it makes little sense to be hampered by the past.
If we can do significantly better we should.
Just like building new infrastructure in a country requires a massive upfront investment
we know it pays off in the long run.

</Text><Text lang='zh'>

在未来，我们真的想继续同过去绑定在一起吗？构建一个操作系统是一项巨大的事业，但这是一笔值得的投资。
随着我们的<u>生活和金钱越来越多地转移到电脑和网络上</u>，开发<u>强大的安全机制只会变得越来越重要</u>，
被过去所束缚是没有意义的。**如果我们明显可以做得更好，我们就应该做到更好**。
就像在一个国家中建设新的基础设施需要大量的前期投资一样，我们知道，从长远来看，这是值得的。

</Text></Translation>

<Translation titled><Text lang='en'>

## Translation: more reading

</Text><Text lang='zh'>

## 译文-扩展阅读

</Text></Translation>

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin.md)。
- [Save Our Computing Future](https://thintz.com/essays/save-our-computing-future):
  译文见 [拯救我们计算的未来](./save-our-computing-future.md)。
- [3L Project](https://3lproject.org/):
  The 3L project is building an computing system from the ground up to be secure, private, safe, and extensible.
- [3L Project: Theories & Hypotheses](https://3lproject.org/theories):
  译文见 [3L 项目的理论与假设](./the-theories-and-hypotheses-of-3l-project.md)。
- [The 3L Project In Depth](https://3lproject.org/in-depth):
  译文见 [深入了解 3L 项目](./the-3l-project-in-depth.md)。
- [Awesome Lisp Machine](https://github.com/ghosthamlet/awesome-lisp-machine):
  A curated list of awesome Lisp Machine and Lisp Operating System stuff.
- [Mezzano](https://github.com/froggey/Mezzano):
  An operating system written in Common Lisp.
- [Oberon System](https://en.wikipedia.org/wiki/Oberon_(operating_system)):
  A modular, single-user, single-process, multitasking operating system written in the programming language of the same name.
  The project home page is [Project Oberon](http://www.projectoberon.com/).


<Copyright
  source={{
    url: 'https://3lproject.org/blog/why-do-we-need-a-new-os',
    author: { name: 'Thomas Hintz', email: 't@thintz.com' }
  }}
  license='CC BY-NC-SA 4.0'
/>
