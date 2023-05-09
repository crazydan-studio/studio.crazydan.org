---
title: Elm 开发实践 - 应用开屏动画
authors:
- flytreleft
tags:
- Elm 开发实践
- Elm 开屏动画
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';
import Preface from './elm-tour/_preface.md';
import ReadMore from './elm-tour/_read_more.md';


## 写在开始

<Preface />

## 场景描述

单页面应用首次加载资源的过程可能会比较耗时，进入应用会出现较长时间的空白，
为了提升用户感知体验，往往需要添加开屏动画，让等待变得不再那么漫长。

本方案主要解决开屏动画的以下问题：
- 如何在进入应用时**立即显示**开屏动画：缩短页面加载的白屏时间
- 如何在页面**渲染完毕**后去掉开屏动画：确切掌握页面的就绪时间

<!-- more -->

## 工程搭建

> 本案例公网演示地址为 https://flytreeleft-elm-tour.netlify.app/first-page-animation 。

从 Github 克隆演示项目到本地：

```bash
git clone https://github.com/flytreeleft/elm-tour.git
```

进入本案例所在的工程目录 `first-page-animation` 并安装项目依赖：

```bash
yarn install
```

> 从零开始初始化项目的步骤详见
> [项目创建](https://github.com/flytreeleft/elm-tour/tree/master/first-page-animation#%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA)。

依赖安装完毕后，启动本地演示服务：

```bash
yarn dev
```

浏览器访问该演示服务地址 [http://localhost:4200/](http://localhost:4200/)，
刷新页面以查看开屏动画效果。

## 实现方案

在入口页面模板 `public/index.html` 的 `<head/>` 标签中，
优先放置与开屏动画相关的内部样式，
再将其他外部 CSS 和 JS 资源放在靠后的位置，
同时，开屏动画自身采用 SVG 或 GIF 等支持动画的图片资源，
并以 Base64 编码方式将其嵌入到内部样式中。
这样，便可以最大限度地减少应用的白屏时间。

```html title="public/index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- 内部样式，避免单独请求 css 资源 -->
    <style>
      html,
      body,
      [data-elm-hot="true"] {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      * {
        margin: 0;
        padding: 0;
        min-width: 0;
        min-height: 0;
      }

      body {
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      /** Start: 通过 ::after 显示开屏动画，再在 elm 渲染结束后隐藏动画，从而确保开屏动画可以渐进消失 */
      body::after {
        z-index: 100;
        opacity: 1;
        transition: opacity 0.5s ease-out;
        transition-delay: 0.2s;

        pointer-events: none; /* 禁用鼠标事件 */

        /* 配置开屏动画 */
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: absolute;

        content: "";
        background-image: url("data:image/svg+xml;base64,<%= htmlWebpackPlugin.options.loading %>");
        background-color: white; /* 遮挡底部元素 */
        background-position: center;
        background-size: 15em;
        background-repeat: no-repeat;
      }

      body > * {
        opacity: 0;
        transition: opacity 0.5s ease-in;
      }
      /** End: 在 elm 渲染结束前，都以透明方式隐藏元素 */
    </style>

    <!-- head 位置仅放置 css 等非 js 脚本资源 -->
    <%= // https://github.com/jantimon/html-webpack-plugin/tree/main/examples/custom-insertion-position
      htmlWebpackPlugin
        .tags
        .headTags
        .filter((tag)=> {
          return tag.tagName !== 'script'
        })
      .join('')
    %>
  </head>

  <body>
    <!-- 将 js 资源放在 body 中加载 -->
    <%= htmlWebpackPlugin
          .tags
          .headTags
          .filter((tag)=> {
            return tag.tagName === 'script'
          })
          .join('')
    %>
    <%= htmlWebpackPlugin.tags.bodyTags %>
  </body>
</html>
```

由于本案例实际使用的是
[Browser.document](https://guide.elm-lang.org/webapps/#control-the-document)
方式构建的应用，其创建的应用视图会直接覆盖 `<body/>` 节点，
所以，不能在 `<body/>` 元素内放置 `<img/>` 来显示开屏动画，
只能通过 CSS 伪元素 `body::after` 在 `<body/>` 的最上层显示一个遮罩层，
并在该层中以背景图形式显示开屏动画。

此外，应用视图的渲染过程是逐步进行的，
所以，在渲染期间会出现部分元素提前显示的情况，
为了避免这些元素跑到开屏动画的上层显示，
需要在应用视图完全就绪之前隐藏除开屏动画以外的其他元素：

```css
body > * {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
```

然后，在应用视图就绪后，将开屏动画遮罩层设置为透明并取消 `<body/>` 下的元素透明，
以此实现页面加载与就绪的无缝过渡（淡入淡出效果通过 `transition` 控制）：

```elm title="src/Main.elm"
import Html
    exposing
        ( Html
        , div
        , node
        , text
        )


view : Model -> List (Html Msg)
view _ =
    [ welcome

    -- 最后一个视图函数，表示整个应用视图已处于就绪状态
    , hideLoadingAnimation
    ]



-- ------------------------------------------------


welcome : Html msg
welcome =
    div
        [ -- 内联样式 ...
        ]
        [ text "Welcome to the Elm world!"
        ]


hideLoadingAnimation : Html msg
hideLoadingAnimation =
    node "style"
        []
        [ -- 隐藏开屏动画，并显示 body 下的元素
          text """
body::after { opacity: 0; }
body > * { opacity: 1; }
"""
        ]
```

> 注意，伪元素无法通过 Elm 删除，故而，
> 必须通过 `pointer-events: none;` 禁用开屏动画遮罩层的鼠标事件，
> 以防止其变为透明后仍拦截鼠标事件而无法操作下层视图。

在 Elm 中，需要在视图函数 `view`
的最后位置添加一个用于隐藏开屏动画的函数 `hideLoadingAnimation`。
因为函数是顺序执行的，所以，当最后一个函数被执行时，
在它前面的视图函数 `welcome` 也必然已经执行完毕，
这也就代表着应用视图已全部就绪。

所以在 `hideLoadingAnimation` 函数中，
我们向文档追加了新的内部样式来隐藏（设置为透明）开屏动画并显示（取消透明）应用视图：

```css
body::after { opacity: 0; }
body > * { opacity: 1; }
```

开屏动画图片的 Base64 编码字符串可以通过 Webpack 插件
[HTMLWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#usage)
以 `<%= htmlWebpackPlugin.options.loading %>` 方式向模板页面注入：

```js title="webpack.config.js"
const fs = require("fs");
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicDir = "public";
// 定义根目录下资源文件的绝对路径获取函数
const __ROOT_DIR__ = __dirname;
function filepath(...paths) {
  return path.join(__ROOT_DIR__, ...paths);
}

// 读取开屏动画文件
const loadingSvg = fs.readFileSync(
  filepath(publicDir, "assets/img/loading.svg"),
  "utf-8"
);

module.exports = {
  // ...
  plugins: [
    new HTMLWebpackPlugin({
      // 自定义的扩展配置，可在模板文件中通过
      // <%= htmlWebpackPlugin.options.xxxx %> 引用配置数据
      loading: Buffer.from(loadingSvg, "utf-8").toString("base64"),

      // 指定 html 模板文件位置
      template: filepath(publicDir, "index.html"),
      publicPath: "/",

      // 禁用 css 与 js 自动注入机制，以便于在模板内控制资源的注入位置，
      // 确保 js 始终在 body 标签内加载，降低 js 加载对首页开屏动画的影响
      inject: false,

      // 其他配置 ...
    }),
  ],
  // ...
}
```

> 我们可以从 [loading.io](https://loading.io/spinner/) 中选择喜欢的 SVG 动画，
> 并将其保存到 `public/assets/img/loading.svg` 文件中。
> 注：在浏览器控制台中，通过以下 JS 脚本可以过滤出该站点的免费动画：
>
> ```js
> document.querySelectorAll('.item').forEach(function(item) {
>   var license = item.querySelector('.license').innerText;
>
>   if (license !== 'FREE') { item.remove(); }
> });
> ```

至此，Elm 应用开屏动画便成功实现了。

## 实践总结

我们首先将 Base64 编码后的开屏动画放在 HTML 文档的最开始位置的内部样式中，
以确保尽早显示开屏动画。

再通过 CSS 伪元素，并控制元素透明的方式让开屏动画始终显示在应用视图最上层：

```css
body::after {
  z-index: 100;
  opacity: 1;
  transition: opacity 0.5s ease-out;
  transition-delay: 0.2s;

  pointer-events: none; /* 禁用鼠标事件 */

  /* 配置开屏动画 ... */
}

body > * {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}
```

最后，在应用视图全部就绪后，通过反转开屏动画和应用视图的透明性，
实现页面加载与就绪的平滑过渡：

```css
body::after { opacity: 0; }
body > * { opacity: 1; }
```

当然，该方案不仅适用于 Elm 应用，也同样适用于其他 JS 应用，
大家可以按需取用、按需改进。

## 扩展阅读

- [simonh1000/elm-webpack-starter/webpack.config.js](https://github.com/simonh1000/elm-webpack-starter/blob/b07c0c53a5/webpack.config.js):
  通过 Webpack 构建 Elm 项目的参考配置

<ReadMore />


<Copyright
  owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
