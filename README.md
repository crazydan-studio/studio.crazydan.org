Crazydan Studio 站点
======================

本项目为构建 Crazydan Studio 站点在线版本的源码，其最终的访问地址为 https://studio.crazydan.org 。

> 注：本站点基于 [Docusaurus 2](https://v2.docusaurus.io/) 构建。

## 站点开发

- 安装依赖

```bash
$ yarn
```

- 启动开发服务

```bash
$ yarn start
```

- 构建静态资源

```bash
$ yarn build
```

> 站点的静态资源最终放在目录 `dist` 中。

## 源码许可协议

本项目对 `docs`、`blog` 目录下的源文件采用许可协议 [LGPL 3.0](./LICENSE)，
对 `src` 目录下的代码采用许可协议 [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt)。

许可协议 LGPL 3.0 的协议要点如下：

- 本项目的源码不能够用于闭源软件，也不能在闭源软件中引入本项目源码，并且对本项目源码的修改部分需开源
  - 若仅仅是将本项目编译构建后的产物作为依赖引入或独立/集成部署，则没有开源要求，可以闭源使用
- 对于新增代码或衍生代码没有开源要求，并可采用其他许可协议发布

## 章节内容许可协议

Crazydan Studio 站点章节内容的许可协议，请见各章节开头的**版权声明**。
