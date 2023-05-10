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

[Tailwind CSS](https://tailwindcss.com/)
将所有 CSS 属性全部封装成了语义化的类，支持响应式设计、暗黑模式，
可定制化程度高，可维护性强，还默认提供一套专业的 UI 属性值（尺寸、边距、颜色等）。
其极大地简化了前端的开发工作，即使没有专业的设计知识，
也可以快速地开发出现代化的应用页面，实为我等 UI 设计能力薄弱的开发人员的福音。

Elm 开发侧重的是业务逻辑，并不提供专业的 UI 库，要想写出一套美观的页面，
需要像写 HTML 一样编写内联样式（或自定义 CSS）。
而将 Tailwind CSS 与 Elm 进行集成，不仅可以充分利用 Elm 的开发优势，
还可以彻底摆脱页面太丑、无法自适应移动设备等 UI 设计问题，
让一个后端 Boy 也能对前端开发游刃有余。

虽然，像 [Elm UI](https://package.elm-lang.org/packages/mdgriffith/elm-ui/1.1.8/)
之类的 Elm 库致力于消除对 CSS 的使用，但其并不能提供一套现成的、专业的、现代化的 UI 库，
而自行从头设计一套 UI，不仅费时费力，还很难达到当下的审美设计要求。
故而，将 Tailwind CSS 与 Elm 集成使用，才是一个后端 Boy 比较实在的选择。

<!-- more -->

## 工程搭建

> 本案例公网演示地址为 https://flytreeleft-elm-tour.netlify.app/tailwindcss-integration 。

从 Github 克隆 [演示项目](https://github.com/flytreeleft/elm-tour) 到本地：

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

> 本方案采用的是在视图函数中通过 `Html.Attribute.class` 属性直接引用
> Tailwind CSS 类名的方式进行集成。虽然有
> [matheus23/elm-default-tailwind-modules](https://package.elm-lang.org/packages/matheus23/elm-default-tailwind-modules/latest/)
> 这类 Elm 的库，但其使用仍不太灵活，而且对 Tailwind CSS 类名做
> Elm 化也没有太大必要，此外，在实际的项目中还是会用到其他
> JS 组件并引用 Tailwind CSS 类名，故而，直接引用其类名反而更便于以一致的方式进行视图样式维护。

与其他 JS 项目一样，要使用 Tailwind CSS，
需要在项目中安装、启用并配置其 PostCSS 插件 `tailwindcss`：

```bash title="安装 tailwindcss 插件"
yarn add --dev tailwindcss
```

```js title="postcss.config.js - 启用 tailwindcss 插件"
// https://github.com/csaltos/elm-tailwindcss
// https://tailwindcss.com/docs/installation/using-postcss
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```js title="tailwind.config.js - 配置 tailwindcss 插件"
// https://tailwindcss.com/docs/installation/using-postcss
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

在 `tailwind.config.js` 中需要首先
[配置 Content](https://tailwindcss.com/docs/content-configuration)，
也就是指定 Tailwind CSS 类名的引用位置。
其插件通过扫描 `content` 列表中的文件，识别出被引用的类名，
进而生成最小化的 CSS 文件，以避免在前端页面中包含无关的 CSS 样式，影响资源加载。

> CSS 文件将使用 `postcss-loader` 加载并处理，
> 所以，在 `content` 中不放置 CSS 文件路径。

由于是在 Elm 源码文件中直接引用其样式，
故而，直接将 `src` 下任意层级的 elm 文件（`./src/**/*.elm`）加入到 `content` 列表中。

而 `darkMode` 用于设置页面暗黑模式的启用方式。
默认是在任意节点的 `class` 属性中添加 `dark` 名称，其子节点便会应用其所设置的暗黑样式。
但本方案设置使用 `[theme="dark"]` 选择器来启用子节点的暗黑模式，
也就是在父节点添加 `theme` 属性并设置其值为 `dark` 或为空，来启用或禁用其子节点的暗黑模式，
该方式在代码层面更加清晰，也更便于通过代码控制暗黑主题的切换。

完成插件配置后，还必须在项目的
CSS 主文件（页面中第一个引入的 CSS 文件，如，`public/index.css`）中通过
`@tailwind` 指令引入 Tailwind CSS 的基础库：

```css title="public/index.css"
/* 引入 tailwindcss 基础库
 * https://tailwindcss.com/docs/functions-and-directives#tailwind
 */
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;
```

由于在 CSS 文件的 `@tailwind`、`@apply` 等
[Tailwind CSS 指令](https://tailwindcss.com/docs/functions-and-directives)
只能通过 PostCSS 处理，
所以，需要在 Webpack 的配置文件中配置对 CSS 文件优先使用 `postcss-loader`
加载（`use` 中的加载器列表为倒序执行，故，`postcss-loader` 需放在最后）：

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

至此，Elm 与 Tailwind CSS 的集成便配置完成了。
接下来，便可以愉快地在 Elm 源码文件中引用 Tailwind CSS 的样式了：

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
        -- 在最外层 div 节点控制启禁视图的暗黑模式
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

> 关系紧密的 Tailwind CSS 类可以作为一组，通过 `class` 集中在一起，
> 多个 `class` 就是多组不同的控制样式。
> 按这种方式组织的代码，在视觉上更加整齐一致，更便于进行样式维护。

## 实践总结

Elm 负责业务逻辑，Tailwind CSS 负责美观，二者各有侧重点，可以互取所长，
对于降低前端开发难度，提升前端开发效率，会起到十分巨大的作用。

## 注意事项

若同时与
[Elm UI](https://package.elm-lang.org/packages/mdgriffith/elm-ui/latest/)
集成，会因为其生成的 CSS 内边距类名（`p-N`）与 Tailwind CSS 的相同，
而出现 Tailwind CSS 的内边距设置不生效的问题。
此时，只能使用 Tailwind CSS 中的 `px-N`、`py-N`、`pt-N`
等指定了边距方向的类名进行重名规避。


## 扩展阅读

- [使用Tailwind CSS，看这个帖子就够了，使用Tailwind CSS的N个感触](https://learnku.com/laravel/t/53827):
  了解 Tailwind CSS 的优缺点
- [Elm with Tailwind CSS](https://github.com/csaltos/elm-tailwindcss):
  Tailwind CSS 集成的样例工程，仅需关注`tailwind.config.js` 和 `postcss.config.js`
  的配置内容

<ReadMore />


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
