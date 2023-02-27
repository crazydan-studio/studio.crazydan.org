---
title: (译文) 深入了解 3L 项目
authors:
- thintz
tags:
- 外文翻译
- 新操作系统
- 3L
---

import Copyright, {Declaration} from '@site/src/components/Copyright/TranslationBlogByFlytreeleft';
import Video from '@site/src/components/Video';
import {Translation, Text} from '@site/src/components/Translation';

<Declaration />

<Video
  src="/medias/3l-project/demo.mp4"
  type="mp4"
  source={{
    url: 'https://3lproject.org',
    title: '3L Project'
  }}
/>

<Translation titled><Text source lang='en'>

## Technical Details

</Text><Text lang='zh'>

## 技术细节

</Text></Translation>

<Translation><Text source lang='en'>

3L is really just a single Lisp program.
There is only one address space and one runtime that everything else runs inside of.
We can do this securely because the language runtime provides and enforces "first class environments".
An environment is an object containing references to resources available in the system.
It's like running a program but the program doesn't choose
what libraries or hardware resources it has access to.
Instead programs are run inside their own environment that provides bindings to
things it is allowed to use.
If you don't want a program to access the network then run it inside of
an environment that has no network bindings.
If the program calls a function that interacts with the network
that function won't be defined in its environment and an exception will be triggered.
This mechanism provides for a very robust, fine-grained, comprehensive, and simple security system.

</Text><Text lang='zh'>

3L 实际上只是一个 Lisp 程序。只有一个地址空间和一个运行时，其他所有的东西都在其中运行。
我们可以安全地做到这一点，因为语言运行时提供并施行“**头等环境**”。环境是一个对象，它<u>包含对系统中可用资源的引用</u>。
就像运行一个程序，但是该<u>程序并不选择它可以访问的库或硬件资源</u>。相反的是，程序运行在属于自己的环境之中，
该<u>环境提供了对允许使用的东西的绑定</u>。如果你不想让程序访问网络，那就在一个没有网络绑定的环境中运行它。
若是程序调用一个与网络交互的函数，该函数将不会在其环境中定义，并且会触发一个异常。
该机制提供了一个非常健壮、细粒度、全面和简单的安全系统。

> 译注：**头等环境**，即将环境作为操作系统的*头等公民*，
> 与之对等的概念是编程语言中的[头等函数](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)。

</Text></Translation>

<!-- more -->

<Translation><Text source lang='en'>

At its core 3L is a Lisp runtime.
Beyond the standard lisp features
the runtime also provides facilities
for hardware and memory access, debugging, introspection, first class environments,
and first class source code and documentation manipulation.

</Text><Text lang='zh'>

3L 的核心是一个 Lisp 运行时。
除了标准的 Lisp 特性之外，运行时还提供了对硬件和内存的访问、调试、**内省**、<u>头等环境</u>以及<u>头等源代码和文档</u>操作的工具。

> 译注：**内省**是指计算机程序在运行时（Runtime）检查对象（Object）类型的一种能力，通常也可以称作*运行时类型检查*。
> 见 [内省 (计算机科学)](<https://zh.wikipedia.org/wiki/%E5%86%85%E7%9C%81_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)>)。

</Text></Translation>

<Translation titled><Text source lang='en'>

## In Summary, why rewrite the OS?

</Text><Text lang='zh'>

## 总之，为什么要重写操作系统

</Text></Translation>

<Translation><Text source lang='en'>

The structure and interface of OSes in use today
are based mostly on the state of computer science 45 years ago
and much more research has been done
since then that improves dramatically upon our knowledge at that time.
Hardware is also not as limiting of a factor now and is likely to continue improving.
The concepts behind this OS is the result of decades of research and development.
While implementations of OSes has improved considerably
since the first Unix systems were created
the fundamental design has changed little.
This is not limited to Unix based systems either.
All major OSes are built with the same underlying model of an OS kernel
being separate from a language runtime and user programs.
And they generally use the same tacked-on security measures
like user privileges and access-control-lists.

</Text><Text lang='zh'>

今天使用的操作系统的结构和接口大多是基于 45 年前的计算机科学状况，自那以后，人们做了更多的研究，极大地提高了我们当时的认知。
现在硬件也不再是一个限制因素，而且很可能会继续改善。操作系统背后的概念是数十年研究和开发的结果。
虽然自创建第一个 Unix 系统以来，操作系统的实现有了很大的改进，但基础设计却改变不大。这不仅限于基于 Unix 的系统。
所有主流的操作系统均是使用相同的、<u>与语言运行时和用户程序分离的</u>操作系统内核底层模型而构建的。
而且，它们通常使用相同的附加安全措施，例如用户权限和访问控制列表（ACL）。

</Text></Translation>

<Translation><Text source lang='en'>

The OSes of today aren't going away for a long, long time
but that doesn't mean they are the end-all-and-be-all of the OS.
Instead we need to look to the future and build a system
based on our new knowledge and understanding.

</Text><Text lang='zh'>

当今的操作系统不会在很长一段时间内消失，但这并不意味着它们是所有操作系统的最终归宿。
相反，我们需要放眼未来，建立一个基于我们新的知识和理解的系统。

</Text></Translation>

<Translation><Text source lang='en'>

Why not just improve the OSes we have now?
That would be ideal
but they are so fundamentally far away from where we need to go
that it would have the same net result as starting from scratch, except take longer.
That being said, not all is lost.
It is still possible to port programs over
but how easy that is will depend greatly on
how high level they are
and how well the language they are written in
can deal with the module system and security model.
Emulation layers can also be created but should be avoided
since they will require an almost unrestricted access to all hardware and system libraries
which would completely ruin the improved security infrastructure.

</Text><Text lang='zh'>

为什么不改进我们现有的操作系统呢？那会是理想化的，它们离我们需要达到的目标太远了，而这也会与<u>从头开始做</u>得到相同的最终结果，
只不过需要花费更长的时间。话虽如此，但也不是所有的东西都丢失了。移植程序依然是可行的，但是，
移植的难易程度将在很大程度上取决于<u>它们的高级程度</u>以及<u>编写它们的语言</u>对<u>模块系统和安全模型</u>的处理能力。
也可以创建**仿真层**，但应该避免这么做，因为它们需要几乎不受限制地访问所有硬件和系统库，这将会完全破坏改进后的安全基础设施。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Languages besides lisp

</Text><Text lang='zh'>

## Lisp 以外的语言

</Text></Translation>

<Translation><Text source lang='en'>

Even though the core of 3L is written in lisp
that does not mean other languages won't be available.
Transpilers, byte code compilers, and interpreters will be provided for many languages,
including popular ones like Javascript, Python, and Ruby.
In fact, every language can be support in a safe way
and with all or most of the debugging features and introspection available to lisp programs.
Even languages like C can be supported via memory access emulation
(although those programs will necessarily run slowly).

</Text><Text lang='zh'>

尽管 3L 是用 Lisp 编写的，但并不意味着其他语言就不能使用了。
转译器、字节码编译器和解释器将提供给多种语言，包括流行的语言，如 Javascript、Python 和 Ruby。
实际上，每种语言都可以以安全的方式得到支持，并且可为 Lisp 程序提供全部或大部分的调试特性和内省功能。
甚至像 C 这样的语言也可以通过<u>内存访问模拟技术</u>得到支持（尽管这些程序运行起来一定会很慢）。

> 译注：**转译器**是将一种语言的代码转换为另一种语言代码的工具，参考
> [关于转译器 JavaScript 程序员需要知道的事](https://yyzl.github.io/2016/javascript-transpilers-need-know/)。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Dropping the filesystem

</Text><Text lang='zh'>

## 放弃文件系统

</Text></Translation>

<Translation><Text source lang='en'>

The filesystem is not the best way to store every type of data.
3L instead just provides a simple key-value storage mapping.
A key is a label that maps to a set of blocks on a storage device.
Traditional filesystems can be built on top of this mechanism as simple libraries.
Security is provided via libraries and the first class environments.
If you want to only allow a program access to a specific set of blocks
you can create a function that will only read and write to those blocks
and pass that function in to the program you want to utilize it.
(A more flexible abstraction is provided in practice.)
This means you have 100% control of the storage available.
Dropping OS level filesystem control also makes it much easier
for things like databases
to optimize their read and write operations.

</Text><Text lang='zh'>

文件系统并不是存储每种类型数据的最佳方式。3L 只是提供了一个简单的**键-值**存储映射。
**键**是映射到存储设备上一组块的标签。传统的文件系统可以作为简单的库构建在这种机制之上。
安全是通过库和**头等环境**提供的。如果你希望只允许程序访问一组特定的块，
则可以创建一个只对这些块进行读写的函数，并将该函数传递给<u>你想要使用它</u>（译注：指创建的函数）的程序。
（在实践中提供了更灵活的抽象。）这意味着你可以 100%地控制可用的存储。
放弃操作系统级别的文件系统控制还可以使数据库之类的事物更容易优化它们的读写操作。

</Text></Translation>

<Translation titled><Text source lang='en'>

## PreScheme

</Text></Translation>

<Translation><Text source lang='en'>

Lisp itself needs runtime support, like a garbage collector,
to manage things like anonymous functions.
This means that
before the full Lisp can be used
something else has to set it up.
3L uses "PreScheme" which is a restricted subset of Scheme
that provides low-level memory access.
Aside from a few things that must be written in assembly
the entire Lisp runtime and OS is written in at least a subset of Scheme.
The advantage of this,
aside from being easier to develop and more concise,
is that a full Scheme system can be used for development, including a debugger and profiler.
Of course some things, like drivers, must be emulated
but much of the code, like standalone functions and libraries,
can still be developed on a full Scheme runtime.
This greatly speeds up development.

</Text><Text lang='zh'>

Lisp 本身需要运行时支持，比如垃圾收集器，来管理匿名函数之类的东西。
这意味着在使用完整的 Lisp 之前，必须先进行其他设置。
3L 使用 [PreScheme](https://en.wikipedia.org/wiki/PreScheme)，
它是 Scheme 的一个受限子集，提供低级内存访问。
除了一些必须用汇编语言编写的内容外，整个 Lisp 运行时和操作系统至少是用 Scheme 的一个子集编写的。
这样做的好处，除了更容易开发和更简洁之外，还在于可以使用完整的 Scheme 系统进行开发，包括调试器和分析器。
当然，有些东西，如驱动程序，必须被模拟，但是许多代码，如独立的函数和库，仍然可以在一个完整的 Scheme 运行时上开发。
这大大加快了开发速度。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Performance

</Text><Text lang='zh'>

## 性能

</Text></Translation>

<Translation><Text source lang='en'>

The safety and programmer facilities come a cost
but mechanisms will be provided to over come much of these limitations.
You can choose to block compile parts
or all of the OS and programs and functions can be integrated and inlined
along with many other optimizations enabled by block compilation.
One major performance issue that current OSes deal with
is interrupt handling
which requires a lot of memory manipulation and processing power;
3L does not have to deal with that issue.
With those performance enhancements
3L could likely achieve 80-90% the speed of current OSes.
(Also, see note on 'unsafe operations' below for another performance improvement possibility.)

</Text><Text lang='zh'>

安全和程序员配套设施是有成本的，但是一些机制将会被用来克服这些限制。
你可以选择**块编译**部件，或者，整个操作系统、程序和函数也能够被集成和内联起来，并利用<u>块编译</u>所支持的许多其他优化。
当前操作系统处理的一个主要性能问题是**中断处理**，这需要大量的内存操作和处理能力，3L 不需要处理这个问题。
有了这些性能增强，3L 可能会达到当前操作系统的 80~90%的速度。
（另外，请参阅下面关于“不安全操作”的说明，以了解其他性能改进的可能性。）

</Text></Translation>

<Translation titled><Text source lang='en'>

## Unsafe Operations

</Text><Text lang='zh'>

## 不安全操作

</Text></Translation>

<Translation><Text source lang='en'>

The mainline version of 3L does not provide any support for running native code
as a part of increasing security and development features.

</Text><Text lang='zh'>

作为提高安全性和开发特性的一部分，3L 的主线版本不提供对运行原生代码的任何支持。

</Text></Translation>

<Translation><Text source lang='en'>

However, 3L does not architecturally prevent an extension
that would allow programs to directly access the memory or run "native" code.
It could even be extended to allow programs to run in their own address space.
This extension won't be in the default installation
but could be provided as a separate version of 3L.
This is an option if you want the maximum performance.

</Text><Text lang='zh'>

然而，3L 并没有在架构上阻止<u>允许程序直接访问内存或运行“原生”代码的</u>扩展。
它甚至可以扩展到<u>允许程序在它们自己的地址空间中运行</u>。
这类扩展不会在默认安装中，但是可以作为一个单独的 3L 版本提供。
如果你想要获得最大的性能，这是一个可选项。

</Text></Translation>

<Translation titled><Text lang='en'>

## Translation: more reading

</Text><Text lang='zh'>

## 译文-扩展阅读

</Text></Translation>

- [Why do we need a new OS?](https://3lproject.org/blog/why-do-we-need-a-new-os):
  译文见 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os.md)。
- [Save Our Computing Future](https://thintz.com/essays/save-our-computing-future):
  译文见 [拯救我们计算的未来](./save-our-computing-future.md)。
- [3L Project](https://3lproject.org/):
  The 3L project is building an computing system from the ground up to be secure, private, safe, and extensible.
- [3L Project: Theories & Hypotheses](https://3lproject.org/theories):
  译文见 [3L 项目的理论与假设](./the-theories-and-hypotheses-of-3l-project.md)。
- [Awesome Lisp Machine](https://github.com/ghosthamlet/awesome-lisp-machine):
  A curated list of awesome Lisp Machine and Lisp Operating System stuff.
- [Mezzano](https://github.com/froggey/Mezzano):
  An operating system written in Common Lisp.
- [Oberon System](https://en.wikipedia.org/wiki/Oberon_(operating_system)):
  A modular, single-user, single-process, multitasking operating system written in the programming language of the same name.
  The project home page is [Project Oberon](http://www.projectoberon.com/).
- [A minimal boot sector tutorial](https://yinwang0.wordpress.com/2011/09/04/boot-sector/): 21行bootloader启动代码。


<Copyright
  source={{
    url: 'https://3lproject.org/in-depth',
    author: { name: 'Thomas Hintz', email: 't@thintz.com' }
  }}
  license='CC BY-NC-SA 4.0'
/>
