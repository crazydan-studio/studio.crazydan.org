---
title: GUI相关
description: 与 GUI 相关的现行可参考技术和框架实现
authors:
- flytreleft
---

import Header from '../_header.md';

<Header />


## Elm

Elm is a functional language that compiles to JavaScript.
It helps you make websites and web apps.
It has a strong emphasis on simplicity and quality tooling.

### 相关资源

- [站点](https://elm-lang.org/)
- [开发文档](https://guide.elm-lang.org/)
- [在线演示](https://elm-lang.org/try)

### 优缺点

优点：
- 数据不可变
- 视图函数化
- 视图与数据做单向绑定：视图依据数据做变化，视图只能通过消息影响数据的更新
- 编译期检查错误，无运行时错误
- 统一的代码格式化规范，以及自动化的版本递增

缺点：
- 本质上不支持局部更新，数据每次变化都会重新运行视图函数以生成新的视图结构，
  在将新结构与上一次的做 diff 并对有变化的部分通过 js 做视图更新
- 不支持组件维护自身的状态，必须与应用状态一起维护，可扩展性受限

## Elixir Scenic

Scenic is a client application library written directly on the Elixir/Erlang/OTP stack.
With it you can build applications that operate identically
across all supported operating systems,
including MacOS, Ubuntu, Nerves/Linux, and more.

Scenic is primarily aimed at fixed screen connected devices (IoT),
but can also be used to build portable applications.

### 相关资源

- [开发文档](https://hexdocs.pm/scenic/welcome.html)
- [源码](https://github.com/ScenicFramework/scenic)
- [讲解视频](https://www.youtube.com/watch?v=1QNxLNMq3Uw)
- 图形驱动
  - [Scenic.Driver.Local](https://github.com/ScenicFramework/scenic_driver_local):
    基于 [GLFW](https://www.glfw.org/) 的 Scenic 驱动，
    从而支持 [OpenGL](https://www.opengl.org)、[Vulkan](https://www.vulkan.org/) 图形引擎
    - [开发文档](https://hexdocs.pm/scenic_driver_local)
- [打包](https://github.com/ScenicFramework/scenic_new#build-a-basic-nerves-application)
  - [Nerves](https://nerves-project.org/):
    Raspberry Pi 镜像打包，用于将 Scenic 应用打包为可启动的单应用镜像
    - [安装指南](https://hexdocs.pm/nerves/installation.html)
- 实战项目
  - [Getting started with Scenic in Elixir — Crafting a simple snake game](https://medium.com/@giandr/elixir-scenic-snake-game-b8616b1d7ee0):
    贪吃蛇开发过程详解
  - [Scenic running Shadow of the beast](https://gitlab.com/wstucco/scenic-sotb):
    一只怪兽在奔跑
  - [Color Cycling Desktop App running on Scenic](https://gitlab.com/wstucco/scenic-color-cycling):
    色彩循环
  - [Scenic Asteroids](https://github.com/axelson/scenic_asteroids):
    行星射击游戏

### 优缺点

优点：
- 原生的 Elixir GUI 框架
- 架构清晰、简洁，代码简单，容易掌握和按需定制
- 组件较少，可定制性强，适合在其基础上做全新的开发
- 组件均为 Scene，可维护自身的状态，且数据结构是任意的
- 状态可以是任意类型和结构，不需要强制声明数据类型

缺点：
- 仅包含很基础的原子组件，适合做游戏界面，对于普通的应用界面，还需要开发更多组件和交互
- Scene 的局部更新只能通过组件 id 拿到组件再调用组件函数绘制新的组件
  - 多个组件可共用相同 id，可支持根据该 id 同时修改这些组件
- 不能实现数据与组件的绑定，数据变化、事件/消息产生后，需要显式更新组件
- 不支持自动布局，只能采用绝对定位（而非组件层级关系）方案放置组件
- 不支持中文

### 改造方向

-

### 安装注意事项

> 详细安装过程见对应工具的说明。

通过 [asdf](https://asdf-vm.com/guide/getting-started.html) 安装最新的 Elixir 和 Erlang：
- `asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git`
- `asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git`
- `asdf install erlang latest && asdf global erlang latest`
- `asdf install elixir latest && asdf global elixir latest`

通过 Nerves 打包 Scenic 应用为可安装的系统镜像：
- 手工安装 [fwup](https://github.com/fwup-home/fwup#installing): Nerves 打包镜像所必须的依赖
- 创建 SSH 密钥: `ssh-keygen -t rsa -b 4096 -N '' -f "$HOME/.ssh/id_rsa`
- 创建 Nerves 应用: `mix nerves.new hello_nerves`
- 执行`scenic.setup`: `mix scenic.setup`，再按提示操作
  - 注，在更新`hex`（`mix local.hex`）和`rebar`（`mix local.rebar`）后，
    需重新安装`scenic_new`: `mix archive.install hex scenic_new`
- 按照[提示](https://github.com/ScenicFramework/scenic_new/blob/master/lib/mix/tasks/setup.ex#L214)
  插入 Scenic 配置代码
  - Scenic 的 Supervisor 设置放在`mix.exs`中的 application 函数返回的
    `mod` 中指定的 supervisor 启动函数中
- 下载依赖: `rm mix.lock && mix deps.get`
- 在本地运行: `mix scenic.run`
- 准备虚拟机环境
  - 本地安装并配置 KVM: https://wiki.archlinux.org/title/KVM
  - 本地安装 Qemu Arm 支持:
    `sudo pacman -S qemu-system-arm qemu-system-arm-firmware qemu-system-aarch64`
- 打包`x86_64`镜像文件: 需要[定制](https://hexdocs.pm/nerves/customizing-systems.html)目标系统
  - `git clone https://github.com/nerves-project/nerves_system_x86_64 -b v1.22.1 && cd nerves_system_x86_64`
  - `mix deps.get`
  - `mix nerves.system.shell`
    - 执行`make menuconfig`
    - 选中`Target packages -> Graphic libraries and applications -> mesa3d -> Gallium nouveau driver, OpenGL GLX`
    - 选中`Target packages -> Graphic libraries and applications -> X.org X Window System -> X11R7 Servers -> xorg-server`
    - 选中`Target packages -> Graphic libraries and applications -> X.org X Window System -> X11R7 X protocols`
    - 选中`Target packages -> Libraries -> Graphics -> libglew, libglfw, libglu`
    - 执行`make savedefconfig`
    - 退出`exit`
  - 进入`hello_nerves`项目
  - 在`mix.exs`中添加以主动构建`nerves_system_x86_64`:
    - `{:nerves_system_x86_64, "~> 1.22.1", path: "/path/to/nerves_system_x86_64", nerves: [compile: true]},`
  - `mix deps.get`
  - 将`deps/scenic_driver_local/Makefile`中
    `SCENIC_LOCAL_TARGET`为`glfw`的`LDFLAGS`、`CFLAGS`编译参数`--static`去掉，以改为动态链接
  - `MIX_TARGET=x86_64 SCENIC_LOCAL_TARGET=glfw mix do firmware, firmware.image ./scenic-boot.img`
  - 将生成的镜像文件`scenic-boot.img`通过`virt-manager`启动
    - 创建虚拟机时，选择已存在的磁盘镜像

<!--
- 打补丁？
  - Buildroot 补丁放在`nerves_system_x86_64/deps/nerves_system_br/patches`
  - 包的补丁放在`nerves_system_x86_64/deps/nerves_system_br/buildroot/package/xxxx`
  - 包的构建放在`nerves_system_x86_64/.nerves/artifacts/nerves_system_x86_64-portable-1.22.1/build/xxxx-x.x.x/`
  - 包HASH校验`nerves_system_x86_64/deps/nerves_system_br/buildroot/package/xxxx/xxxx.hash`
    - 另一处`hello_nerves/deps/nerves_system_br/buildroot/package/xxxx/xxxx.hash`
- 使用 Wayland
-->
