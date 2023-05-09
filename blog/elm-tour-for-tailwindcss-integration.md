---
title: Elm 开发实践 - 与 Tailwind CSS 的集成
authors:
- flytreleft
tags:
- Elm 开发实践
- Elm & Tailwind CSS
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';
import Preface from './elm-tour/_preface.md';
import ReadMore from './elm-tour/_read_more.md';


![](./elm-tour/tailwindcss-integration.png)

## 写在开始

<Preface />

## 场景描述

[Tailwind CSS](https://tailwindcss.com/) 对 CSS 样式进行命名，
支持响应式页面、暗黑模式、按需构建静态 CSS 等特性，
极大地简化了前端样式的设计，提供了样式的复用性，
可以不需要太多的设计相关的知识并可编写出现代化的前端页面，
实为我等没什么审美感的开发人员的福音。

而将其与 Elm 结合，不仅可以快速开发出美观的页面，也能够直接自适应移动端等设备，
避免在 Elm 中根据设备屏幕大小编写不同的视图函数，
从而有效降低视图函数代码的编写量，提高代码整体质量。

虽然，像 [Elm UI](https://package.elm-lang.org/packages/mdgriffith/elm-ui/1.1.8/)
之类的库致力于消除 CSS 的使用，但其并不能提供一套简单、现成、美观的 UI 库，
而自行从头设计一套 UI，不仅费时费力，还很难达到当下的审美设计要求。
故而，将 Tailwind CSS 与 Elm 集成使用，才是比较实在的选择。

<!-- more -->

## 工程搭建

> 本案例公网演示地址为 https://flytreeleft-elm-tour.netlify.app/tailwindcss-integration 。

从 Github 克隆 [演示项目](https://github.com/flytreeleft/elm-tour.git) 到本地：

```bash
git clone https://github.com/flytreeleft/elm-tour.git
```

进入本案例所在的工程目录 `tailwindcss-integration` 并安装项目依赖：

```bash
yarn install
```

> 从零开始初始化该 NodeJS/Elm 项目的步骤详见
> [项目创建](https://github.com/flytreeleft/elm-tour/tree/master/tailwindcss-integration#%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA)。

待依赖安装完毕后，启动本地演示服务：

```bash
yarn dev
```

浏览器访问该演示服务地址 [http://localhost:4201/](http://localhost:4201/)，
刷新页面以查看开屏动画效果。

## 方案实现

> 针对本方案的实现，采用的是与 Tailwind CSS 直接集成，
> 并在视图函数中通过 `Html.Attribute.class` 属性引用其类名称的方式，
> 以及时采用 Tailwind CSS 的最新版本，并能灵活使用其特殊用法。

首先，在项目根目录中创建配置文件 `tailwind.config.js`：

```js title="tailwind.config.js"
module.exports = {
  // https://github.com/csaltos/elm-tailwindcss
  content: ["./src/**/*.elm"],
  // Note: 在任意父节点加上 [theme="dark"]，即可对其子节点启用暗黑模式。
  // 但 class 是必须指定的，否则，主题模式切换不会起作用
  // https://tailwindcss.com/docs/dark-mode#customizing-the-class-name
  darkMode: ["class", '[theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

其中，`content` 指定在哪些文件中引用 Tailwind CSS 的类名，
以便于其 PostCSS 插件能够扫描并识别出被引用的类名，从而准确生成 CSS 文件。
这里配置扫描 `src` 目录下任意层级的 Elm 源码文件。
该项的配置规则请详见
[Content Configuration](https://tailwindcss.com/docs/content-configuration)。

而 `darkMode` 用于设置暗黑模式的启用方式，
默认是在任意节点的 `class` 属性中添加 `dark`，其子节点便会采用所设置的暗黑样式，
但本方案使用 `[theme="dark"]` 选择器的方式启用子节点的暗黑模式，
也就是在父节点添加 `theme` 属性并设置其值为 `dark`，
这样更便于控制页面的暗黑主题切换。

接着，在 `postcss.config.js` 中启用插件 `tailwindcss`：

```js title="postcss.config.js"
// https://github.com/csaltos/elm-tailwindcss
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

然后，需要创建一个 CSS 文件用于导入 Tailwind CSS 的基础库，
以使样式能够生效：

```css title="public/index.css"
/* 导入 tailwindcss 基础库
 * https://tailwindcss.com/docs/installation/using-postcss
 */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

该 CSS 文件需要在入口页面中被引用，或者在入口 JS 中显式导入：

```js title="public/index.js"
"use strict";

import { Elm } from "../src/Main";

import "./index.css";

const app = Elm.Main.init({
  // ...
});
```

最后，需要在 Webpack 配置文件 `webpack.config.js`
中对 CSS 文件使用 `postcss-loader` 加载器加载，
从而能够处理 CSS 文件中的 `@tailwind`、`@apply` 等
[Tailwind CSS 指令](https://tailwindcss.com/docs/functions-and-directives)：

```js title="webpack.config.js"
const common = {
  // ...
};

// 开发模式下的配置
if (MODE === "development") {
  module.exports = merge(common, {
    module: {
      // ...
      rules: [
        {
          test: /\.css$/,
          exclude: [/elm-stuff/],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
            "postcss-loader",
          ],
        },
        // ...
      ],
    },
  });
}

// 生产模式下的配置
if (MODE === "production") {
  module.exports = merge(common, {
    // ...
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: [/elm-stuff/],
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
            "postcss-loader",
          ],
        },
        // ...
      ],
    },
  });
}
```

现在，便可以愉快地在 Elm 源码文件中引用 Tailwind CSS 的类了：

```elm title="src/Main.elm"
type alias Model =
    { theme : Theme
    -- 其他状态 ...
    }


type Msg
    = NoOp
    | ChangeTheme Theme


type Theme
    = Light
    | Dark

view : Model -> Html Msg
view ({ theme } as model) =
    div
        -- 在最外层 div 节点控制启禁页面的暗黑模式
        [ attribute "theme"
            (case theme of
                Dark ->
                    "dark"

                Light ->
                    ""
            )
        , class "w-full h-full"
        ]
        [ welcome model
        -- 其他视图函数 ...
        ]


welcome : Model -> Html Msg
welcome { theme } =
    div
        [ class "text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
        , class "w-full h-full px-8"
        ]
        [ -- 视图内容 ...
        ]
```

> 这里采用多个 `class` 属性，将关系紧密的类放在一起，
> 代码既直观，又便于维护样式设置。

## 实践总结

Tailwind CSS 插件是根据在被扫描文件中类名引用的情况来生成最终的 CSS 文件的，
所以，其与 Elm 等任意框架的代码均能很好集成，让 Elm 更好地融入现代优秀的开发框架之中。

使用 Tailwind CSS 可以有效降低页面设计难度，极大提升页面美感，
并轻松实现对各类设备的自适应。值得大家好好学习和广泛使用。

## 注意事项

与 [Elm UI](https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/)
集成会因为其生成的 CSS 内边距类名（`p-N`）相同而出现 Tailwind CSS 样式不生效的问题，
此时，只能使用 Tailwind CSS 中的 `px-N`、`py-N`、`pt-N`
等指定了方向的类名进行规避。


## 扩展阅读

- [Elm with Tailwind CSS](https://github.com/csaltos/elm-tailwindcss):
  Tailwind CSS 集成的样例工程，仅需关注`tailwind.config.js` 和 `postcss.config.js`
  的配置内容

<ReadMore />


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
