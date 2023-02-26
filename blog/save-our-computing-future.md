---
title: (译文) 拯救我们计算的未来
authors:
- thintz
tags:
- 外文翻译
- 计算的未来
- 3L
- 软件基础设施
---

import Copyright, {Declaration} from '@site/src/components/Copyright/TranslationBlogByFlytreeleft';
import {Translation, Text} from '@site/src/components/Translation';

<Declaration />

<Translation><Text source lang='en'>

[Stagefright](https://en.wikipedia.org/wiki/Stagefright_%28bug%29),
[heartbleed](https://en.wikipedia.org/wiki/Heartbleed),
[GHOST](https://access.redhat.com/articles/1332213),
[VENOM](http://venom.crowdstrike.com/).
What do these have in common?
They are recent serious security vulnerabilities that could have easily been prevented.

</Text><Text lang='zh'>

[Stagefright](https://en.wikipedia.org/wiki/Stagefright_%28bug%29)、
[Heartbleed](https://en.wikipedia.org/wiki/Heartbleed)、
[GHOST](https://access.redhat.com/articles/1332213)、
[VENOM](http://venom.crowdstrike.com/)，这些有何共同点？
它们是最近出现的严重的安全漏洞，这些本来都是可以很容易地加以预防的。

</Text></Translation>

<Translation><Text source lang='en'>

As more computers are connected to the internet
and more personal information and money moves online
security becomes ever more important.
Vulnerabilities are going to become more and more costly.
We must start investing in the future now
before things get out of hand.
As programmers, do we want to spend our time playing catch-up with the crackers
or building new and better software?
We must start using the tools we have
and invest in new tools that enable us to continue building the things we want and the world needs
and stop wasting time playing whack-a-mole.

</Text><Text lang='zh'>

随着更多的计算机连入互联网，更多的个人信息和金钱转到线上，安全也就变得愈发重要。
漏洞会变得越来越昂贵。我们必须从现在开始对未来进行投资，以免事情失去控制。
作为程序员，我们是想将时间花在与黑客<u>玩猫捉老鼠</u>上，还是去构建新的更好的软件呢？
我们必须开始使用我们已有的工具，并投身于新的工具，以使我们能够持续构建我们想要的以及世界所需要的东西，
不要浪费时间在玩[打地鼠](https://zh.wikipedia.org/wiki/%E6%89%93%E5%9C%B0%E9%BC%A0)上面了。

</Text></Translation>

<!-- more -->

<Translation><Text source lang='en'>

When it comes to security
there are many attack vectors that must be addressed.
Some are social and some are technical.
There are many things we can do to prevent the technical attack vectors that we don't do.
And there are tools we can use
that will limit the damage caused by more sophisticated technical and social attacks.

</Text><Text lang='zh'>

在涉及到安全时，有许多攻击手段必须被解决掉。一些是社会性的，一些是技术性的。
我们可以做很多我们没有做过的事情来阻止技术性攻击手段。
也有很多我们能够使用的工具，用来限制由更加复杂的技术性和社会性攻击所造成的损害。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Programming Language

</Text><Text lang='zh'>

## 编程语言

</Text></Translation>

<Translation><Text source lang='en'>

Some very common, and often very serious, vulnerabilities are easy to prevent.
Arithmetic overflows can be prevented
by using a language that checks for overflow after each operation and raising an exception
or uses seamless upgrades to [bignums](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic).
Memory safety vulnerabilities such as buffer overflows and buffer over-reads can be prevented
by using a language that does bounds checking.
Just doing those two things alone would have prevented many serious high-profile incidents
including stagefright (integer overflow), heartbleed (buffer over-read),
[KCodes NetUSB](https://www.sec-consult.com/fxdata/seccons/prod/temedia/advisories_txt/20150519-0_KCodes_NetUSB_Kernel_Stack_Buffer_Overflow_v10.txt)
(buffer overflow), GHOST (buffer overflow), VENOM (buffer overflow)
and some [Shellshock](https://lcamtuf.blogspot.com/2014/10/bash-bug-how-we-finally-cracked.html)
(memory safety related) vulnerabilities as well as countless others.

</Text><Text lang='zh'>

一些非常常见的、通常非常严重的漏洞是很容易预防的。
可以通过使用一种语言来防止算术溢出，这种语言可以在每个操作后检查溢出并引发异常，或者采用无缝升级到
[大数运算](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic)（译注：也称**高精度运算**）的方式。
通过使用进行边界检查的语言，可以防止缓冲区溢出和缓冲区超读等内存安全漏洞。
仅仅做这两件事就可以防止许多严重的备受瞩目的事件，包括 Stagefright（整数溢出）、Heartbleed（缓冲区超读）、
[KCodes NetUSB](https://www.sec-consult.com/fxdata/seccons/prod/temedia/advisories_txt/20150519-0_KCodes_NetUSB_Kernel_Stack_Buffer_Overflow_v10.txt)
（缓冲区溢出）、GHOST（缓冲区溢出）、VENOM（缓冲区溢出）和一些
[Shellshock](https://lcamtuf.blogspot.com/2014/10/bash-bug-how-we-finally-cracked.html)
（与内存安全相关的）漏洞，以及其他无以计数的漏洞。

</Text></Translation>

<Translation><Text source lang='en'>

Arithmetic overflows and unsafe memory access as well as other technical vulnerabilities
are easy to perfectly prevent
just by using a different programming language or language runtime
but there will always be other vulnerabilities like the primary Shellshock exploit
that will not be prevented so easily.
Still a lot can be done to at least limit the damage of other vulnerabilities.
The simplest defense for limiting the damage of an exploit
is sandboxing
but we don't use it near enough or effectively.

</Text><Text lang='zh'>

算术溢出和不安全内存访问以及其他技术漏洞，很容易通过使用不同的编程语言或语言运行时来完美地阻止掉，
但是总会有其他漏洞，主要像 Shellshock 这样的漏洞，它们不会那么容易地被阻止。
还是有很多工作可以做的，至少是可以用于限制其他漏洞造成的损害。
限制漏洞损害最简单的防御方式是**沙盒**，但是我们并没有充分或有效地使用它。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Sandboxing

</Text><Text lang='zh'>

## 沙盒

</Text></Translation>

<Translation><Text source lang='en'>

There are many different types and levels of sandboxing.
There are very blunt and heavy forms such as full virtual machines,
there are mid-level solutions like OS level virtualization
such as LXC for Linux and jails for FreeBSD,
user-space system services like in micro-kernels,
access control lists, capability systems, and many more.
Some sandboxing is better than none.
But the more secure forms, such as full virtualization,
are often more difficult to maintain
and use significantly more resources
so often compromises are made to save on maintenance and configuration costs.
In fact full separation of components is very rarely done because it is so costly.
Instead the most common "sandboxes" we have
are a very ad-hoc system of partial solutions.
Most systems are simply secured
by separation of root and user accounts, user groups,
file permissions, system-wide firewalls, and other blunt
and often conflicting methods of sandboxing.
In the end we have a massive clusterfuck of competing, complex,
and often incompatible sandboxing methods.
This discourages system administrators and users
from learning about all the options and how to implement them successfully.
And even if you do know the options and how to effectively use them
they are so complex when you do get them working together
it is virtually impossible to get it fully correct.

</Text><Text lang='zh'>

**沙盒**有许多不同的类型和级别。
有一些非常生硬和笨重的形式，比如全虚拟化机；有一些中级的解决方案，像操作系统级的虚拟化，
比如用于 Linux 的 [LXC](https://linuxcontainers.org/)（译注：即，Linux 容器技术）
和用于 FreeBSD 的 [Jails](https://en.wikipedia.org/wiki/FreeBSD_jail)
（译注：即，FreeBSD 平台上的一种基于容器的虚拟化技术，其早于 LXC 但没有流行起来）；
还有用户空间系统服务，如微内核、访问控制列表（ACL）、容量系统等等。有一些沙箱总比没有的好。
但是，更安全的形式，比如全虚拟化，通常更难以维护，并且会使用极其多的资源，
所以，经常得作出妥协以节约维护和配置成本。
事实上，由于成本太高，几乎不进行组件的完全隔离。
相反，我们拥有的最常见的“沙盒”是非常临时性的部分解决方案系统。
大多数系统仅通过隔离 root 和用户帐户、用户组、文件权限、系统范围的防火墙
以及其他生硬而又经常相互冲突的沙盒方法来进行保护。
最终，我们拥有了一大堆相互竞争、复杂且常常不兼容的沙盒方法。
这就阻碍了系统管理员和用户了解所有选项以及如何成功地实现它们。
而且，即使你确切地知道这些选项以及如何有效地使用它们，当你将它们一起使用时，它们也是如此复杂，
以至于几乎不可能完全正确地做到点上。

</Text></Translation>

<Translation><Text source lang='en'>

If we are going to continue digitizing our lives
we need to do better and we can.
The best solution would be system wide, simple, very fine grained, and generally secure-by-default.
Within the [3L Project](https://3lproject.org/) we address those goals
by utilizing [first class environments](http://metamodular.com/environments.pdf) for sandboxing;
system wide, simple configuration of process environments;
capping per process [resource usage](http://wiki.call-cc.org/eggref/4/sandbox#current-fuel);
type, bounds, and arithmetic overflow checking from the kernel through applications;
memory addressing bounds checking in hardware drivers;
forbidding direct memory access for allocated memory;
cryptographic module and application code signing with runtime checking;
as well as compilation with a [verified compiler](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.3.5101).
While a thorough, holistic approach like that taken by the 3L Project
is more ideal there are other options as well.

</Text><Text lang='zh'>

如果我们要继续数字化我们的生活，我们需要做得更好，而且我们能够做得到。
最好的解决方案会是系统范围的、简单的、非常细粒度的并且通常默认情况下是安全的。
在 [3L 项目](https://3lproject.org/)中，我们为沙箱采用[头等环境](http://metamodular.com/environments.pdf)来实现这些目标；
系统范围内的、简单的进程环境配置；限制每个进程的[资源使用](http://wiki.call-cc.org/eggref/4/sandbox#current-fuel)；
从内核到应用程序的类型、边界和算术溢出的检查；硬件驱动程序中的内存寻址边界检查；禁止对已分配内存进行直接内存访问；
带运行时检查的加密模块和应用程序代码签名；
以及使用[已验证的编译器](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.3.5101)进行编译。
尽管像 3L 项目所采取的那样彻底的、全面的方法更为理想，但也还有其他选择。

> 译注：**头等环境**，即将环境作为操作系统的*头等公民*，
> 与之对等的概念是编程语言中的[头等函数](https://zh.wikipedia.org/wiki/%E5%A4%B4%E7%AD%89%E5%87%BD%E6%95%B0)。

</Text></Translation>

<Translation><Text source lang='en'>

A more common approach when it comes to sandboxing,
although generally less comprehensive but more compatible with legacy applications,
is micro kernels.
There are more well known traditional style versions such as [Minix](http://www.infoq.com/news/2009/05/MINIX)
but also proof-of-correctness versions
such as [SEL4](https://wiki.sel4.systems/FrequentlyAskedQuestions#What_is_formal_verification.3F).
While they add more sandboxing to basic OS functions
they still generally suffer from the same complex configuration issues inherent with a Unix style architecture
and present no unified security mechanism across the kernel and applications.

</Text><Text lang='zh'>

对于沙箱，一种更常见的方法是**微内核**，尽管通常不太全面，但与传统应用程序更兼容。
还有一些更广为人知的传统风格的版本，比如 [Minix](http://www.infoq.com/news/2009/05/MINIX)，
也有一些<u>正确性验证</u>的版本，如
[SEL4](https://wiki.sel4.systems/FrequentlyAskedQuestions#What_is_formal_verification.3F)。
尽管它们在基本的操作系统功能中添加了更多的沙箱，但它们通常仍会遭遇 Unix 风格架构所固有的同样复杂的配置问题，
并且在内核和应用程序之间也不存在统一的安全机制。

</Text></Translation>

<Translation><Text source lang='en'>

Another approach at an OS level is uni-kernels.
Uni-kernels compile the minimal set of operating system components and system libraries
an application needs
and runs as a single image.
This greatly limits the attack surface and sandboxes components quite effectively.
Unfortunately they are usually written in C and other static languages
which makes it difficult to compile
with only the minimal set of code needed to run the application,
instead compiling in whole libraries
even when most of the library may not be used
which greatly increases the attack surface relative to what it should be.
A more secure approach would be writing the libraries in a more fine-grained fashion
and with a language that doesn't suffer from the vulnerabilities the C language usually introduces.
(An interesting experiment may be
building a system to compile the 3L Project into a uni-kernel
based on the first-class environment mechanism
since it would be as fine grained as possible.)

</Text><Text lang='zh'>

操作系统级别的另一种方法是[单体内核](https://en.wikipedia.org/wiki/Unikernel)
（译注：即，在一大块代码中实际包含了所有操作系统功能，并作为一个单一进程运行，具有唯一地址空间）。
**单体内核**编译<u>应用程序所需要的操作系统组件和系统库的</u>最小集合，并作为单个映像运行。
这极大地限制了攻击面，沙箱组件也相当有效。
不幸的是，它们通常是用 C 和其他静态语言编写的，这使得仅使用<u>运行应用程序所需的</u>最小代码集进行编译变得很困难，
而即使在大部分库可能都不会被使用的情况下，也要在全部库中进行编译，这极大地增大了它本来应该有的攻击面。
一种更安全的方法是以更细粒度的方式编写库，并且使用不会<u>受到 C 语言通常会引入的漏洞的</u>影响的语言。
（一个有趣的实验可能是，基于<u>头等环境</u>机制，构建一个将 3L 项目编译为单体内核的系统，因为它会尽可能地做到细粒度。）

</Text></Translation>

<Translation><Text source lang='en'>

A more common exploit may occur at the application level
such as injection and XSS exploits
but OS and system level vulnerabilities affect a much larger number of users per exploit
and because systems are often updated at a much slower rate than many web applications
updating vulnerable systems make take a very long time leaving many people exposed.
System level security measures can also limit the affects of application level exploits
without the programmer needing to do or have any special system level knowledge.

</Text><Text lang='zh'>

在应用程序级别可能会发生更常见的漏洞利用，例如注入和 XSS 漏洞利用，
但是每次漏洞利用，操作系统和系统级漏洞都会影响更大数量的用户，
并且因为系统更新的速度通常比许多 Web 应用程序慢得多，更新有漏洞的系统需要花非常长的时间才能使许多人免于暴露在外。
系统级安全措施还可以限制应用程序级漏洞的影响，而无需程序员进行操作或拥有任何特殊的系统级知识。

</Text></Translation>

<Translation titled><Text source lang='en'>

## Misconfiguration

</Text><Text lang='zh'>

## 配置错误

</Text></Translation>

<Translation><Text source lang='en'>

Another major issue today is misconfiguring systems.
Setting up a secure server, for instance,
requires configuring many components and getting something wrong is easy.
Anyone that's setup anything more than trivial
knows what it is like to try to figure out
why some program isn't starting
or is doing something unexpected
when it turns out some file permission was wrong
that was set that way in an attempt to make the system more secure.
Eventually people get frustrated
and just abandon security efforts
or open up big holes just trying to get things working.

</Text><Text lang='zh'>

如今另一个主要的问题是**系统配置错误**。
例如，设置一台安全的服务器需要配置许多组件，并且很容易出错。
任何做过琐碎设置的人都知道，试图弄清楚为什么某些程序没有启动或正在做一些意外的事情，
结果却发现设置<u>用于试图使系统更安全的</u>某些文件权限是错误的，是一种怎样的感觉。
最终，人们会感到沮丧，从而放弃安全方面的努力，或者只是为了使事情正常工作而打开了大坑。

</Text></Translation>

<Translation><Text source lang='en'>

Having a sandboxing system that reduces the amount of required configuration
would greatly improve the situation.
The 3L project combats this
with a system wide, uniform configuration mechanism
for configuring the sandbox for each application.
A similar approach could be developed with legacy systems.
When an application is started
the system could consult a user-specified permissions config
that the system uses to grant permissions to the new process.
Although not as fine-grained as the ideal
it would be have a much greater short term affect
since it would apply to a lot more software.

</Text><Text lang='zh'>

拥有一个减少了<u>必需配置的数量</u>的沙盒系统，将极大地改善这种情况。
3L 项目通过一个系统范围的、统一的配置机制来解决这个问题，用于为每个应用程序配置沙盒。
可以为传统系统开发类似的方法。
启动应用程序时，系统可以查询用户指定的权限配置，系统使用该配置为新进程授予权限。
尽管没有理想的那么细粒度，但它在短期内的影响要大得多，因为它可以应用到更多的软件上。

</Text></Translation>

<Translation titled><Text source lang='en'>

## On Performance

</Text><Text lang='zh'>

## 论性能

</Text></Translation>

<Translation><Text source lang='en'>

Yes, yes, yes, yes I know, security often comes with a performance penalty.
I know a lot of you will insist
that every other application absolutely must be written in C
because every single CPU cycle and register must be optimally utilized to maximize performance
(wait, why aren't you writing in assembly again?).
That is a terrible argument considering what is at stake, in the general case
but there are obviously some cases and fields where that is generally true.
All is not lost though.
We can have our cake and eat half of it too.

</Text><Text lang='zh'>

是的，是的，是的，是的，我知道，安全性通常伴随着性能损失。
我知道你们中的很多人会坚持认为其他所有应用程序都必须用 C 编写，因为每个 CPU 周期和寄存器都必须被最优化地利用以最大化性能。
（等等，那你为什么不用汇编写呢？）
在一般情况下，考虑什么是有风险的，会是一个可怕的争论，但显然在某些情况和领域中，这又是普遍正确的。
然而，并不是一切都失去了。我们可以有我们的蛋糕，也可以吃掉一半。

</Text></Translation>

<Translation><Text source lang='en'>

A number of compilers for languages with more safety features
provide compiler flags or language directives
allowing safety features to be disabled if performance is more important.
Maybe you want most of your system to be more secure
but you just have to maximize the frame rates for the latest game
you could compile it (or use a precompiled binary) with the safety features disabled.
Scoped declarations can also be used,
similar to the [optimize](http://www.lispworks.com/documentation/lw50/CLHS/Body/d_optimi.htm) form
in Common Lisp,
to have very fine grained control over desired safety and performance.
(This is the approach the 3L Project is taking.)
It still won't be as fast as your hand-tuned-for-the-intel-compiler code
but maybe it really doesn't have to be.

</Text><Text lang='zh'>

许多具有更多安全特性的语言的编译器都提供了编译器标志或语言指令，允许在性能更重要的情况下禁用安全特性。
也许你希望你的系统的大部分是更加安全的，但是，你又不得不最大化最新游戏的帧率，
你可以在禁用安全特性的情况下编译它（或者使用预编译的二进制文件）。还可以使用**作用域声明**，
类似于 Common Lisp 中的[优化](http://www.lispworks.com/documentation/lw50/CLHS/Body/d_optimi.htm)形式，
对期望的安全性和性能进行非常细粒度的控制。（这就是 3L 项目所采用的方法。）
它仍然不会像你为 Intel 编译器手工调优的代码那样快，但可能真的没有必要这么快。

</Text></Translation>

<Translation titled><Text source lang='en'>

## What does it cost?

</Text><Text lang='zh'>

## 代价是什么？

</Text></Translation>

<Translation><Text source lang='en'>

Of course security has a cost
but there is also the unforeseen cost of having poor security
when the security is breached.
There is always a trade-off between application speed (or person-hours) and safety.
Choose your priorities carefully
and consider the hidden cost of not paying for security
both in the present and in the future.
And be a decent human being too and not only the bottom line.
Your users are also people, just like you.

</Text><Text lang='zh'>

当然，安全是有成本的，但是当安全性被破坏时，安全性差也会带来不可预见的成本。
在应用程序速度（或人的工作时间）和安全性之间总是存在权衡。
仔细选择你的优先级，并考虑现在和将来不为安全买单的隐性成本。
也要做一个体面的人，这不仅仅是底线。你的用户也是人，就像你一样。

</Text></Translation>

<Translation titled><Text source lang='en'>

## What do we need to do now?

</Text><Text lang='zh'>

## 现在我们需要做什么？

</Text></Translation>

<Translation><Text source lang='en'>

While a good long term solution will not be available tomorrow
there are some things we can start doing now.
Principally, always aim for some level of separation
whether it is in applications or data.
Try to put things in at least a partial sandbox.

</Text><Text lang='zh'>

虽然不会在明天就出现一个好的长期的解决方案，但我们现在可以开始做一些事情了。
原则上，无论是在应用程序中还是在数据中，始终要以某种程度的**隔离**作为目标。
至少要尝试将东西放在一部分沙盒中。

</Text></Translation>

<Translation><Text source lang='en'>

And first, for the love of god, stop writing code in C.
You are not a god and you will make mistakes.
When starting your next project ask yourself,
does it really need to be written in C?
Does it really, really need to be written in C?
Can you at least limit it to 5%, 2%, 1% C?
(If as programmers we really were god-like enough
to write code securely in C
wouldn't that have happened by now?)

</Text><Text lang='zh'>

首先，看在上帝的份上，<u>不要再用 C 写代码了</u>。
你不是上帝，你会犯错误的。
当开始你的下一个项目时，问问你自己，它真的需要用 C 写吗？
它真的，真的需要用 C 写吗？
你能不能至少把它限制在用 5%、2%、1% 的 C ？
（如果作为程序员，我们真的像上帝一样，可以安全地用 C 编写代码，那现在还不会发生吗？）

</Text></Translation>

<Translation><Text source lang='en'>

And if you are doing web development
spend at least a little bit of time
learning about common exploits and how to prevent or mitigate them.
If you are running servers
learn how to do some level of sandboxing
whether via virtual machines, containers, or even just user groups.
If you are writing web applications
learn about common exploits
and always use libraries that prevent
[cross-contamination](http://www.more-magic.net/posts/structurally-fixing-injection-bugs.html)
of user input and code;
effectively putting user data in its own sandbox.
And do not ever manually call escape procedures.
Use a library for [hashing and managing](https://en.wikipedia.org/wiki/Crypt_%28C%29) passwords.
Even spending a day or two doing some basic research
will be a big help for everyone.

</Text><Text lang='zh'>

如果你正在进行 Web 开发，那么至少要花一点时间了解常见的漏洞以及如何防止或减弱它们。
如果你正在运行服务器，请学习如何通过虚拟机、容器甚至用户组进行某种程度的沙盒操作。
如果你正在编写 Web 应用程序，请了解常见的漏洞，并始终使用防止用户输入和代码
[交叉污染](http://www.more-magic.net/posts/structurally-fixing-injection-bugs.html)的库，
有效地将用户数据放到它自己的沙盒中。
永远不要手动调用转义程序。
使用一个库来[哈希和管理](https://en.wikipedia.org/wiki/Crypt_%28C%29)密码。
即使花一两天的时间做一些基础研究，也将对每个人都有很大帮助。

</Text></Translation>

<Translation><Text source lang='en'>

Don't invoke the shell to run another process.
Use something like [exec](http://pubs.opengroup.org/onlinepubs/9699919799/functions/exec.html) instead
that directly runs the program
with its arguments passed as a separate argument
to the function used to start the new process.

</Text><Text lang='zh'>

不要调用 Shell 来运行另一个进程。
使用类似于 [exec](http://pubs.opengroup.org/onlinepubs/9699919799/functions/exec.html) 的方法直接运行程序，
并将其参数作为单独的参数传递给用于启动新进程的函数。

</Text></Translation>

<Translation><Text source lang='en'>

Use libraries for security stuff like hashing and parsing.

While those are not holistic
and we need to do a lot better
long term at least
it is something we can do right now.

</Text><Text lang='zh'>

使用库来处理诸如哈希和解析之类的安全性工作。

虽然这些并不全面，并且我们还需要做得更好，但从长期来看，至少这是我们现在可以做的。

</Text></Translation>

<Translation><Text source lang='en'>

And even better, invest time or money contributing to projects that provide better long term solutions.
In the end we all, programmers and non-programmers alike,
will be better off if we start combating the problem now
instead of kicking the can down the road.

</Text><Text lang='zh'>

更好的做法是，投入时间或金钱，为能提供更好的长期解决方案的项目做出贡献。
最终，我们所有人，无论是程序员还是非程序员，都会好起来的，
只要我们现在就开始解决这个问题，而不是把问题踢到马路上。

</Text></Translation>

<Translation titled><Text lang='en'>

## Translation: more reading

</Text><Text lang='zh'>

## 译文-扩展阅读

</Text></Translation>

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin.md)。
- [Why do we need a new OS?](https://3lproject.org/blog/why-do-we-need-a-new-os):
  译文见 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os.md)。
- [3L Project: Theories & Hypotheses](https://3lproject.org/theories):
  译文见 [3L 项目的理论与假设](./the-theories-and-hypotheses-of-3l-project.md)。
- [The 3L Project In Depth](https://3lproject.org/in-depth):
  译文见 [深入了解 3L 项目](./the-3l-project-in-depth.md)。


<Copyright
  source={{
    url: 'https://thintz.com/essays/save-our-computing-future',
    author: { name: 'Thomas Hintz', email: 't@thintz.com' }
  }}
/>
