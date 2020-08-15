---
title: (译文) 拯救我们计算的未来
author: Thomas Hintz
author_title: Creator of 3L Project
author_url: https://thintz.com/
author_image_url:
tags:
- 外文翻译
- 计算的未来
- 3L
- 软件基础设施
description:
image:
---

> 本译文已得到原文作者的中文翻译许可，并采用与原文相同的许可协议 -
> [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
> 进行授权和传播。
>
> 本译文不会对原文做任何除格式调整和拼写错误以外的调整和修改，以确保原文内容的完整性，保证原文所要阐述的事实和思想不被曲解。

:::note 原文段落
[Stagefright](https://en.wikipedia.org/wiki/Stagefright_%28bug%29), [heartbleed](https://en.wikipedia.org/wiki/Heartbleed), [GHOST](https://access.redhat.com/articles/1332213), [VENOM](http://venom.crowdstrike.com/). What do these have in common? They are recent serious security vulnerabilities that could have easily been prevented.
:::

:::note 原文段落
As more computers are connected to the internet and more personal information and money moves online security becomes ever more important. Vulnerabilities are going to become more and more costly. We must start investing in the future now before things get out of hand. As programmers, do we want to spend our time playing catch-up with the crackers or building new and better software? We must start using the tools we have and invest in new tools that enable us to continue building the things we want and the world needs and stop wasting time playing whack-a-mole.
:::
<!-- more -->

:::note 原文段落
When it comes to security there are many attack vectors that must be addressed. Some are social and some are technical. There are many things we can do to prevent the technical attack vectors that we don't do. And there are tools we can use that will limit the damage caused by more sophisticated technical and social attacks.
:::

## Programming Language

:::note 原文段落
Some very common, and often very serious, vulnerabilities are easy to prevent. Arithmetic overflows can be prevented by using a language that checks for overflow after each operation and raising an exception or uses seamless upgrades to [bignums](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic). Memory safety vulnerabilities such as buffer overflows and buffer over-reads can be prevented by using a language that does bounds checking. Just doing those two things alone would have prevented many serious high-profile incidents including stagefright (integer overflow), heartbleed (buffer over-read), [KCodes NetUSB](https://www.sec-consult.com/fxdata/seccons/prod/temedia/advisories_txt/20150519-0_KCodes_NetUSB_Kernel_Stack_Buffer_Overflow_v10.txt) (buffer overflow), GHOST (buffer overflow), VENOM (buffer overflow) and some [Shellshock](https://lcamtuf.blogspot.com/2014/10/bash-bug-how-we-finally-cracked.html) (memory safety related) vulnerabilities as well as countless others.
:::

:::note 原文段落
Arithmetic overflows and unsafe memory access as well as other technical vulnerabilities are easy to perfectly prevent just by using a different programming language or language runtime but there will always be other vulnerabilities like the primary Shellshock exploit that will not be prevented so easily. Still a lot can be done to at least limit the damage of other vulnerabilities. The simplest defense for limiting the damage of an exploit is sandboxing but we don't use it near enough or effectively.
:::

## Sandboxing

:::note 原文段落
There are many different types and levels of sandboxing. There are very blunt and heavy forms such as full virtual machines, there are mid-level solutions like OS level virtualization such as LXC for Linux and jails for FreeBSD, user-space system services like in micro-kernels, access control lists, capability systems, and many more. Some sandboxing is better than none. But the more secure forms, such as full virtualization, are often more difficult to maintain and use significantly more resources so often compromises are made to save on maintenance and configuration costs. In fact full separation of components is very rarely done because it is so costly. Instead the most common "sandboxes" we have are a very ad-hoc system of partial solutions. Most systems are simply secured by separation of root and user accounts, user groups, file permissions, system-wide firewalls, and other blunt and often conflicting methods of sandboxing. In the end we have a massive clusterfuck of competing, complex, and often incompatible sandboxing methods. This discourages system administrators and users from learning about all the options and how to implement them successfully. And even if you do know the options and how to effectively use them they are so complex when you do get them working together it is virtually impossible to get it fully correct.
:::

:::note 原文段落
If we are going to continue digitizing our lives we need to do better and we can. The best solution would be system wide, simple, very fine grained, and generally secure-by-default. Within the [3L Project](https://3lproject.org/) we address those goals by utilizing [first class environments](http://metamodular.com/environments.pdf) for sandboxing; system wide, simple configuration of process environments; capping per process [resource usage](http://wiki.call-cc.org/eggref/4/sandbox#current-fuel); type, bounds, and arithmetic overflow checking from the kernel through applications; memory addressing bounds checking in hardware drivers; forbidding direct memory access for allocated memory; cryptographic module and application code signing with runtime checking; as well as compilation with a [verified compiler](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.3.5101). While a thorough, holistic approach like that taken by the 3L Project is more ideal there are other options as well.
:::

:::note 原文段落
A more common approach when it comes to sandboxing, although generally less comprehensive but more compatible with legacy applications, is micro kernels. There are more well known traditional style versions such as [Minix](http://www.infoq.com/news/2009/05/MINIX) but also proof-of-correctness versions such as [SEL4](https://wiki.sel4.systems/FrequentlyAskedQuestions#What_is_formal_verification.3F). While they add more sandboxing to basic OS functions they still generally suffer from the same complex configuration issues inherent with a Unix style architecture and present no unified security mechanism across the kernel and applications.
:::

:::note 原文段落
Another approach at an OS level is uni-kernels. Uni-kernels compile the minimal set of operating system components and system libraries an application needs and runs as a single image. This greatly limits the attack surface and sandboxes components quite effectively. Unfortunately they are usually written in C and other static languages which makes it difficult to compile with only the minimal set of code needed to run the application, instead compiling in whole libraries even when most of the library may not be used which greatly increases the attack surface relative to what it should be. A more secure approach would be writing the libraries in a more fine-grained fashion and with a language that doesn't suffer from the vulnerabilities the C language usually introduces. (An interesting experiment may be building a system to compile the 3L Project into a uni-kernel based on the first-class environment mechanism since it would be as fine grained as possible.)
:::

:::note 原文段落
A more common exploit may occur at the application level such as injection and XSS exploits but OS and system level vulnerabilities affect a much larger number of users per exploit and because systems are often updated at a much slower rate than many web applications updating vulnerable systems make take a very long time leaving many people exposed. System level security measures can also limit the affects of application level exploits without the programmer needing to do or have any special system level knowledge.
:::

## Misconfiguration

:::note 原文段落
Another major issue today is misconfiguring systems. Setting up a secure server, for instance, requires configuring many components and getting something wrong is easy. Anyone that's setup anything more than trivial knows what it is like to try to figure out why some program isn't starting or is doing something unexpected when it turns out some file permission was wrong that was set that way in an attempt to make the system more secure. Eventually people get frustrated and just abandon security efforts or open up big holes just trying to get things working.
:::

:::note 原文段落
Having a sandboxing system that reduces the amount of required configuration would greatly improve the situation. The 3L project combats this with a system wide, uniform configuration mechanism for configuring the sandbox for each application. A similar approach could be developed with legacy systems. When an application is started the system could consult a user-specified permissions config that the system uses to grant permissions to the new process. Although not as fine-grained as the ideal it would be have a much greater short term affect since it would apply to a lot more software.
:::

## On Performance

:::note 原文段落
Yes, yes, yes, yes I know, security often comes with a performance penalty. I know a lot of you will insist that every other application absolutely must be written in C because every single CPU cycle and register must be optimally utilized to maximize performance (wait, why aren't you writing in assembly again?). That is a terrible argument considering what is at stake, in the general case but there are obviously some cases and fields where that is generally true. All is not lost though. We can have our cake and eat half of it too.
:::

:::note 原文段落
A number of compilers for languages with more safety features provide compiler flags or language directives allowing safety features to be disabled if performance is more important. Maybe you want most of your system to be more secure but you just have to maximize the frame rates for the latest game you could compile it (or use a precompiled binary) with the safety features disabled. Scoped declarations can also be used, similar to the [optimize](http://www.lispworks.com/documentation/lw50/CLHS/Body/d_optimi.htm) form in Common Lisp, to have very fine grained control over desired safety and performance. (This is the approach the 3L Project is taking.) It still won't be as fast as your hand-tuned-for-the-intel-compiler code but maybe it really doesn't have to be.
:::

## What does it cost?

:::note 原文段落
Of course security has a cost but there is also the unforeseen cost of having poor security when the security is breached. There is always a trade-off between application speed (or person-hours) and safety. Choose your priorities carefully and consider the hidden cost of not paying for security both in the present and in the future. And be a decent human being too and not only the bottom line. Your users are also people, just like you.
:::

## What do we need to do now?

:::note 原文段落
While a good long term solution will not be available tomorrow there are some things we can start doing now. Principally, always aim for some level of separation whether it is in applications or data. Try to put things in at least a partial sandbox.
:::

:::note 原文段落
And first, for the love of god, stop writing code in C. You are not a god and you will make mistakes. When starting your next project ask yourself, does it really need to be written in C? Does it really, really need to be written in C? Can you at least limit it to 5%, 2%, 1% C? (If as programmers we really were god-like enough to write code securely in C wouldn't that have happened by now?)
:::

:::note 原文段落
And if you are doing web development spend at least a little bit of time learning about common exploits and how to prevent or mitigate them. If you are running servers learn how to do some level of sandboxing whether via virtual machines, containers, or even just user groups. If you are writing web applications learn about common exploits and always use libraries that prevent [cross-contamination](http://www.more-magic.net/posts/structurally-fixing-injection-bugs.html) of user input and code; effectively putting user data in its own sandbox. And do not ever manually call escape procedures. Use a library for [hashing and managing](https://en.wikipedia.org/wiki/Crypt_%28C%29) passwords. Even spending a day or two doing some basic research will be a big help for everyone.
:::

:::note 原文段落
Don't invoke the shell to run another process. Use something like [exec](http://pubs.opengroup.org/onlinepubs/9699919799/functions/exec.html) instead that directly runs the program with its arguments passed as a separate argument to the function used to start the new process.
:::

:::note 原文段落
Use libraries for security stuff like hashing and parsing.
:::

:::note 原文段落
While those are not holistic and we need to do a lot better long term at least it is something we can do right now.
:::

:::note 原文段落
And even better, invest time or money contributing to projects that provide better long term solutions. In the end we all, programmers and non-programmers alike, will be better off if we start combating the problem now instead of kicking the can down the road.
:::

## 译文-扩展阅读

- [一种新的操作系统设计](http://www.yinwang.org/blog-cn/2013/04/14/os-design):
  转载文章在[这里](./a-new-os-design-by-wangyin)。
- [Why do we need a new OS?](https://3lproject.org/blog/why-do-we-need-a-new-os):
  译文见 [为什么我们需要一个新的操作系统？](./why-do-we-need-a-new-os)。
- [3L Project: Theories & Hypotheses](https://3lproject.org/theories):
  译文见 [3L 项目的理论与假设](./the-theories-and-hypotheses-of-3l-project)。
- [The 3L Project In Depth](https://3lproject.org/in-depth):
  译文见 [深入了解 3L 项目](./the-3l-project-in-depth)。


:::info Copyright
- 原文链接: [https://thintz.com/essays/save-our-computing-future](https://thintz.com/essays/save-our-computing-future)
- 原文作者: Thomas Hintz - [t@thintz.com](mailto:t@thintz.com)
- 译文作者: flytreeleft - [flytreeleft@crazydan.org](mailto:flytreeleft@crazydan.org)
- 版权声明: 本译文采用许可协议 [署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
  转载请注明来自 [Crazydan Studio](https://crazydan.org/)！
:::
