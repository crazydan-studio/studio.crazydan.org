---
title: (译) 程序牢笼：重新思考计算接口的基础构建模块
authors:
- name: Robert Lechte
  url: https://robertlechte.com/
tags:
- 外文翻译
- 重建数字基础
---

import Copyright, {Declaration} from '@site/src/components/Copyright/TranslationBlogByFlytreeleft';
import {Translation, Text} from '@site/src/components/Translation';


# Programs are a prison: Rethinking the fundamental building blocks of computing interfaces


<Declaration />


<Translation><Text source lang='en'>

We often hear that Apple's ecosystem of apps (or Microsoft's, or Google's) are "walled gardens".
But what about the individual applications themselves?

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

In fact, individual programs are even more harmful walled gardens -
a stifling barrier to true expressiveness, productivity, freedom
and consistency of computing experience.

</Text><Text lang='zh'>


</Text></Translation>

<!-- more -->



<Translation titled><Text source lang='en'>

## Imagining software beyond apps or webpages or programs

</Text><Text lang='zh'>

## 想象一种超越 App、Web 页面或应用程序的软件

</Text></Translation>


<Translation><Text source lang='en'>

Think about adding up some numbers in a tabular structure.
That's straightforward with most programming languages.
But what if that same table is in a web page, or a mobile app, or a PDF?
It's right there on the screen, it's probably encoded as a table in the markup.
So the data is there. And yet, we can't query it.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Maybe if we copy-and-paste it we can query it.
Or maybe we can download the page, save it to disk, write code to load the page,
parse the table, and dump the data into a database.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

But why should we need to do any of those things? Why can't we just query it directly?

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

There's a wall around each app preventing this sort of thing.
A program is in the way, blocking our path to expressiveness and computing freedom.
Much like great nations, great software should build bridges, not walls.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

What would software look like, beyond standalone applications?
What would software look like without walls?

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## A new kind of object-orientation

</Text><Text lang='zh'>

## 一种新的面向对象机制

</Text></Translation>


<Translation><Text source lang='en'>

Notions of object-oriented programming are long-established and familiar.
In the OO heyday there were high hopes
that OO would allow much higher levels of expressiveness and encapsulation,
and along with it, greater reuse and recombination of code.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

This absolutely hasn't eventuated - once again, applications are the problem.
Photoshop's codebase and Instagram's codebase no doubt have sophisticated `Image` objects defined,
but each only exists within its gated prison.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

A truly expressive system would let us seamlessly apply any filter to any image,
but this isn't currently possible.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Each has an entirely separate notion of what `Image` means and can do -
each app essentially rebuilds an object's meaning from the ground up.
If we're interested in inter-operability, re-use, and consistency,
this is a terrible situation.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

We need computing environments
where the building blocks are inherently interoperable _objects_ -
to interact with directly, without the concept of applications appearing at all.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Currently the most compelling software is that which locks the most functionality within it -
in an environment of objects, the most compelling software
would be that which exposes the most inter-operable re-combinable functionality
to the objects around it.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

This is in no way a new or original idea -
Alan Kay and friends in the Smalltalk scene have been playing around with such concepts
for decades with things like [Squeak](https://en.wikipedia.org/wiki/Squeak).
And similar ideas have been used quite effectively in business system implementations
with [naked objects](https://en.wikipedia.org/wiki/Naked_objects),
the notion that a user interface should be directly generated from the objects it represents.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Perhaps the most well-known effort to build richer,
consistent meaning into the software experience
is the [semantic web](https://en.wikipedia.org/wiki/Semantic_Web),
however its adoption has been limited.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Whatever the success of these systems,
it hasn't led to more general purpose systems being developed around these concepts.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Why not? What are the obstacles and how can we overcome them?

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Conway's law

</Text><Text lang='zh'>

## Conway 法则

</Text></Translation>


<Translation><Text source lang='en'>

Conway's law has been getting a lot of airing recently - and for good reason.
It has a lot of explanatory power for the contemporary state of software.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Conway's law postulates
that the structure of software reflects the social structure the software exists within -
readily observed in typical corporate websites
where the structure mirrors that of the corporate hierarchy
rather than around the needs of the users.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

But it is at the application and operating system level
that Conway's law is most engrained, and most pathological.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

The components of the operating system - the core OS itself,
its applications, and its websites -
are a manifestation of the economic entities that create them.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

The boundaries have to be drawn somewhere -
Mozilla creates a browser but can't create all the websites you need.
Microsoft wants to let you use Windows for 3d modelling
but doesn't create that software itself.
Same story with the iPhone -
even an enormous corporation like Apple needs external app developers
to enable the iPhone's range of capabilities.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

The solution is sandboxing - processes and containers, browser tabs, phone apps.
The code we need for day-to-day computing sits within these sandboxes,
and in doing so, imprisons that code,
preventing the expressive power and consistency we've mentioned.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Often these apps will have features to integrate with other apps
and the wider operating system - but not so much that they become invisible.
Instagram still wants you to see its logo,
consume its specific content and stay within its ecosystem.
Once again, the implementation and architecture are driven by economic imperatives.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

We'd like all our conversations to be in one place -
but the imperatives have them split between several different protocols (often proprietary)
and tens of different software clients.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

The hardest technical problems to solve are political problems.

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Principles for empowered computing

</Text><Text lang='zh'>

## 增强计算力的原则


</Text></Translation>


<Translation><Text source lang='en'>

Better systems must be built along the following principles (for starters):

- **Widely reusable meaning:** Right now our shared "primitives" are very primitive indeed:
  basics like bytes and sockets.
  We must build much higher level shared meaning -
  `Images`, `Tables`, `Conversations` and beyond,
  building a common implementation and understanding used by everybody.
  This must not be limited to an optional sprinkling of additional meaning a la the semantic web -
  shared meaning and interoperability must be baked into the OS as fundamental.
- **Data without borders:** The "things" of computing should be able to talk directly
  without anything in the way.
  For instance, any two tables of data available to the user through the OS
  should be joinable or otherwise combinable as easily as if they were in the same database.
- **Inherent, ubiquitous programmability:**
  Currently, "doing programming" is a segregated activity from mainstream computing -
  separate software, command lines, specialist knowledge, clunky text-driven interfaces.
  This must end.
  Real expressiveness demands that every entity in the interface is inherently programmable -
  a table of data shouldn't just be a rendered picture of a table of data -
  it should _be a table_. Programming shouldn't be _separate_ at all.

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Building something different

</Text><Text lang='zh'>

## 构建一些不一样的东西

</Text></Translation>


<Translation><Text source lang='en'>

There's no doubt these concepts are very broad and open-ended.
Beyond the political problem of challenging status quo computing
and pushing for an alternative,
there are complex design and technical challenges in the specifics.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

How do you build ubiquitous programmability into interfaces
without adding clutter or reducing usability?
How do you remove barriers between programs and more tightly integrate data
without compromising security?

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Conway's law tells us that to build something different,
we need to build upon different social and political structures.

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Open-ended research

</Text><Text lang='zh'>

## 开放式的研究

</Text></Translation>


<Translation><Text source lang='en'>

Short-term commercial realities mean packaging things up in sellable units -
escaping the application prison requires the opposite approach.
Developing a fresh approach is going to require isolation
from the short-term imperatives of the market.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Academia used to offer this.
But the relentless march of neoliberalism
has seen the open-ended possibilities of research constrained by "business logic",
funding processes that demand narrow parameters of investigation,
and a creativity-crushing increase in busywork.
[Peter Higgs of Higgs boson fame famously commented that he wouldn't be productive enough in today's academic environment](https://www.theguardian.com/science/2013/dec/06/peter-higgs-boson-academic-system).

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

[The other bastion of open-ended research was government](https://en.wikipedia.org/wiki/The_Entrepreneurial_State) -
the internet itself came from US military research.
Here too funding for long term open-ended research has dried up,
and even the military money has been more tightly constrained to projects with more obvious,
shorter term military application -
our amoral powerful would rather spend a trillion building new fighter jet systems than new software systems.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Rare-but-notable efforts
like [Xerox PARC](https://en.wikipedia.org/wiki/PARC_(company)) suffered similar fates,
able to fend off the bean-counters for a while but not indefinitely.

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Rebooting

</Text><Text lang='zh'>

## 重建基础


</Text></Translation>


<Translation><Text source lang='en'>

The realization that the software experience
is still built on artifacts of computing from the 80s like text-based command lines
is a lot less surprising considered within the context of this ongoing decline.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Climate change has shown us that
mere awareness of the situation we are in
isn't enough.
Actual liberation from disaster
requires a bold change of direction and a acknowledgement of shared,
public goals beyond the financial.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

Liberation from the constraints of today's limiting computing concepts
will require similar boldness -
large scale open-ended research, long term timeframes,
but most fundamentally, a willingness to change path.

</Text><Text lang='zh'>


</Text></Translation>



<Translation titled><Text source lang='en'>

## Next steps

</Text><Text lang='zh'>

## 下一步


</Text></Translation>


<Translation><Text source lang='en'>

If you have thoughts on these ideas or how to make them happen,
I'd love to hear from you. Tweet at me.

</Text><Text lang='zh'>


</Text></Translation>

<Translation><Text source lang='en'>

If you liked this you might also be interested in my talk:
[Instant feedback, instant debugging Python coding](https://robertlechte.com/talks/instant-feedback-instant-debugging-python-coding).

</Text><Text lang='zh'>


</Text></Translation>



<Copyright
  source={{
    url: 'https://robertlechte.com/posts/programs-are-a-prison',
    author: { name: 'Robert Lechte', email: '' },
    notLicensed: true
  }}
  license='CC BY 4.0'
/>
