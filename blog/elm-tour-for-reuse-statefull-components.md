---
title: Elm 开发实践 - 有状态组件复用方案
authors:
- flytreleft
tags:
- Elm 开发实践
- Elm 状态组件复用
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';
import Preface from './elm-tour/_preface.md';
import ReadMore from './elm-tour/_read_more.md';


![](./elm-tour/reuse-statefull-components.png)

## 写在开始

<Preface />

## 场景描述

Elm 为函数化编程语言，所以，通过 Elm 开发的组件也只能是一个个函数，
而函数是无状态的，无法编写和使用**有状态**的组件，
若组件内部有自己的状态数据，则必须将其状态挂载到业务模型上，与业务状态一起维护。
但该方式也面临以下问题：
- 组件类型可能过多，需要在业务模型上维护多种不同结构的组件状态数据
- 同类型的组件实例可能有多个，无法简单有效地将组件函数与某个组件的状态数据关联起来，
  也就无法更新某个具体组件的状态
- 需要独立维护组件状态更新函数和消息，使得业务代码变得十分复杂
- 有状态的 Elm 组件难以复用，几乎要求每个项目都重写代码，严重阻碍应用的开发速度

有状态组件在 Elm 中难以实现和维护，导致其复用度极低，严重影响 Elm 的应用范围，
这也是很多开发人员不愿使用 Elm，以及 Elm 生态难以发展的原因之一。

不过，通过 Web Components 机制，便可以彻底解决有状态组件无法在 Elm 中复用的问题，
也不会破坏 Elm 的使用原则，并且这也是 Elm 推荐的一种与 JS 生态互操作的方式 -
[Custom Elements](https://guide.elm-lang.org/interop/custom_elements.html)。

<!-- more -->

## 工程搭建

> 本案例公网演示地址为 https://flytreeleft-elm-tour.netlify.app/reuse-statefull-components 。

从 Github 克隆 [演示项目](https://github.com/flytreeleft/elm-tour) 到本地：

```bash
git clone https://github.com/flytreeleft/elm-tour.git
```

进入本案例所在的工程目录 `reuse-statefull-components` 并安装项目依赖：

```bash
yarn install
```

> 从零开始初始化该 NodeJS/Elm 项目的步骤详见
> [项目创建](https://github.com/flytreeleft/elm-tour/tree/master/reuse-statefull-components#%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA)。

待依赖安装完毕后，启动本地演示服务：

```bash
yarn dev
```

浏览器访问该演示服务地址 [http://localhost:4202/](http://localhost:4202/)，
并查看演示效果。

## 方案实现

> 本方案以 [ByteMD](https://github.com/bytedance/bytemd)
> 为例说明如何在 Elm 中通过 Web Components 机制实现与有状态组件的集成。

首先，在项目中安装 Web Components 开发框架 [Lit](https://lit.dev/docs/)：

```bash
yarn add lit
```

接着，安装 Markdown 编辑器
[ByteMD](https://github.com/bytedance/bytemd)：

```bash
yarn add bytemd

## 可以按需安装 ByteMD 的相关插件
yarn add \
  @bytemd/plugin-breaks \
  @bytemd/plugin-gemoji \
  @bytemd/plugin-gfm \
  @bytemd/plugin-highlight \
  @bytemd/plugin-math \
  @bytemd/plugin-mermaid

yarn add \
  github-markdown-css \
  rehype-minify-whitespace
```

然后，新建文件 `src/Native/webcomponents/bytemd/index.js`，
并在其中创建 ByteMD 的 Web Components 组件：

```js
import { LitElement } from "lit";

// https://github.com/bytedance/bytemd
import { Editor } from "bytemd";

// 导入 bytemd 插件及相关 css ...

// Note: lit 框架的 css 机制在不使用 shadow dom 时不可用，
// 只能以 import 方式全局引入样式
import "./index.css";

// https://lit.dev/docs/components/properties/#when-properties-change
const commonProperties = {
  bytemd: { state: true },
  // attributes
  value: { attribute: true },
  // 可选值: split, tab, auto
  mode: { attribute: true },
  placeholder: { attribute: true },
};

export class ByteMDEditor extends LitElement {
  static properties = commonProperties;

  // 不使用 shadow dom 以支持全局样式设置
  // https://lit.dev/docs/components/shadow-dom/#implementing-createrenderroot
  createRenderRoot() {
    return this;
  }

  // Note: 首次初始化已完成，此刻，render() 模板中的节点均已就绪
  firstUpdated() {
    this.bytemd = new Editor({
      target: this.renderRoot,
      props: {
        value: this.value,
        mode: this.mode,
        placeholder: this.placeholder,
        // https://codemirror.net/5/doc/manual.html#config
        editorConfig: {
          autofocus: true,
          lineNumbers: true,
        },
      },
    });

    this.bytemd.$on("change", (e) => {
      const value = e.detail.value;
      this.value = value;
      this.bytemd.$set({ value });

      // https://lit.dev/docs/components/events/#dispatching-events
      // Note: 需将 value 放在新的结构体中，
      // 否则，在监听端会在最后一次仅收到最后输入的内容
      const detail = { value };
      const event = new CustomEvent("change", {
        detail,
        bubbles: true,
        composed: true,
        cancelable: true,
      });
      this.dispatchEvent(event);
    });
  }

  updated(changedProperties) {
    updateProperties(this, changedProperties);
  }
}

// Note: 组件名称中必须包含连字符
customElements.define("bytemd-editor", ByteMDEditor);

function updateProperties(scope, changedProperties) {
  Object.keys(commonProperties).forEach((prop) => {
    if (!changedProperties.has(prop)) {
      return;
    }

    const value = scope[prop];
    scope.bytemd.$set({ [prop]: value });
  });
}
```

> 本方案中仅截取了与 Web Components 相关的代码，完整的代码请见
> https://github.com/flytreeleft/elm-tour/blob/master/reuse-statefull-components/src/Native/webcomponents/bytemd/index.js 。

> 有关 Lit 的使用，请自行阅读其 [在线文档](https://lit.dev/docs/)。这里主要解释以下几个问题：
> - 组件内部状态通过 `{ state: true }` 声明，
>   其仅在组件内部可见，用于保持组件的内部状态数据
> - 组件外部属性通过 `{ attribute: true }` 声明，
>   在组件外部通过属性名称为对其状态数据进行更新
> - `createRenderRoot` 在不使用 Shadow Dom 创建组件时，
>   该函数需返回 `this`，最终组件将在当前文档内直接挂载，
>   进而，可以在其上直接使用全局样式
> - `firstUpdated` 是组件渲染节点 `this.renderRoot` 就绪后的更新函数，
>   可以在该函数内将 bytemd 挂载到渲染节点上并进行初始化和绑定事件监听
> - `updated` 为组件定义的属性值发生变化时所调用的函数，
>   在该函数内可以根据 `changedProperties.has(prop)` 是否为 `true`
>   确认属性 `prop` 是否发生了更新，进而判断是否需要更新视图等

再在 `public/index.js` 中导入前面创建的 ByteMD 组件：

```js
"use strict";

import { Elm } from "../src/Main";
import "../src/Native/webcomponents/bytemd";

// Note: 采用 Browser.document 方式初始化，无需挂载到dom节点
const app = Elm.Main.init({
  // ...
});
```

最后，便可以在 Elm 中通过 `node` 函数引入 ByteMD 组件了：

```elm
module Main exposing (main)

import Json.Decode as Decode


type alias Model =
    { markdown : String
    }


type Msg
    = NoOp
    | EditorValueChange String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( case msg of
        EditorValueChange val ->
            { model | markdown = val }

        NoOp ->
            model
    , Cmd.none
    )


view : Model -> Html Msg
view model =
    div
        [ class "w-full h-full"
        , class "px-8 md:px-32 py-8"
        , class "flex flex-col items-center"
        ]
        [ playground model
        ]


playground : Model -> Html Msg
playground { markdown } =
    node "bytemd-editor"
        [ value markdown
        , placeholder "现在就用 Markdown 来写点什么吧 :)"
        , class "w-full lg:w-3/4"
        , class "grow flex flex-col"
        , on "change"
            (Decode.at
                [ "detail", "value" ]
                Decode.string
                |> Decode.andThen
                    (\val ->
                        Decode.succeed
                            (EditorValueChange val)
                    )
            )
        ]
        []
```

在我们编写的 ByteMD 的 Web Components 组件中，
对外提供 `value` 和 `placeholder` 等属性，分别用于设置编辑器的初始文本和占位提示信息。

而对于用户输入内容，在 Elm 侧则通过监听组件的 `change` 事件，
从事件对象的 `detail.value` 中获取该内容，
再将获取到的内容通过消息 `EditorValueChange` 发送给 Elm 应用，
并由其调用 `update` 函数更新模型 `Model`。

至此，便实现了 Elm 与有状态组件的集成。Elm 通过对组件做属性赋值来控制组件内部状态，
再通过监听组件的事件得知组件的状态变更，从而完成从内到外的与组件数据互通的过程，
而不用关心组件内部的数据结构和数据变化情况，彻底简化了 Elm 应用的开发过程。

## 实践总结

通过 Web Components 机制，Elm 仅需记录组件中与业务数据相关的状态，
而不再需要同时记录组件的内部状态数据，使得 Elm 代码更加简洁，
避免在业务模型中维护复杂的组件状态数据。

而且，该方案也可以实现 Elm 与现有 JS 组件生态的集成，
让 Elm 应用能够直接使用其他框架开发的各种组件，
不用再费心费力地重头开发纯粹的 Elm 组件了。

## 扩展阅读

- [Interacting with Web Components](https://elmprogramming.com/interacting-with-web-components.html):
  以截图组件 [@github/image-crop-element](https://github.com/github/image-crop-element)
  为例，讲解 Elm 与 Web Components 集成的流程，
  同时提出以组件事件监听方式实时获取组件更新状态的方案
- [A Guide to Using Elm With Webcomponents](https://github.com/elm-community/js-integration-examples/blob/master/more/webcomponents/README.md):
  Elm 社区给出的与 Web Components 集成的开发指南
- [Lit](https://lit.dev/docs/):
  Web Components 开发框架，提供灵活且简便的开放方案，并支持 Shadow DOM 和内嵌到当前文档的两种实现方式
- [带你走进 Web Components 新世界](https://juejin.cn/post/7086682965371486216)
- [Material Components for Elm](https://github.com/aforemny/material-components-web-elm):
  基于 Web Components 实现的 Material 组件库。注意，需同时执行
  `yarn add material-components-web-elm`、`elm install aforemny/material-components-web-elm`
  - [在线演示](https://aforemny.github.io/material-components-web-elm/)

<ReadMore />


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
