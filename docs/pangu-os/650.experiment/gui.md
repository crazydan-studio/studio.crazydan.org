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
- 不支持组件内部状态，必须与应用状态一起维护，可扩展性受限
  - 组件自身**缺乏独立性**，需要统一协调行为和状态管理
  - 组件可复用性极弱，需要全局管理组件状态，对于相同组件多处使用，管理很不方便，
    在组件状态很多时，会使得注意力很难聚焦在业务状态之上
- 无原生的动画支持
- 页面基础元素状态(长宽与位置等)不能与 elm 同步

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

Nervers 项目内的配置：

```elixir title="config/target.exs"
config :nerves, :erlinit, update_clock: true,
  # env: "XDG_RUNTIME_DIR=/tmp",
  pre_run_exec: "/bin/sh /usr/bin/run-weston",
  # alternate_exec: "/usr/bin/cage",
  run_on_exit: "/bin/sh",
  verbose: false
```

```bash title="rootfs_overlay/usr/bin/run-weston"
#!/bin/sh

if test -z "${XDG_RUNTIME_DIR}"; then
    export XDG_RUNTIME_DIR=/root/.weston
fi

/usr/bin/seatd &

# 使用了 --continue-without-input 可以启动 weston，
# 但没有鼠标和键盘输入，去掉该选项，则会出现 input 设备不存在的错误，
# 且 libinput list-devices 无输出结果
# /usr/bin/weston \
#     --log=/tmp/log \
#     --no-config \
#     --use-pixman \
#     --continue-without-input \
#     $@

/usr/bin/weston \
    --log=/tmp/log \
    --use-pixman \
    --no-config \
    $@
```

`nerves_system_x86_64`的`make menuconfig`配置结果：

```diff title="nerves_system_x86_64/nerves_defconfig"
diff --git a/nerves_defconfig b/nerves_defconfig
index 05efbcf..810974a 100644
--- a/nerves_defconfig
+++ b/nerves_defconfig
@@ -17,6 +17,7 @@ BR2_REPRODUCIBLE=y
 BR2_ROOTFS_SKELETON_CUSTOM=y
 BR2_ROOTFS_SKELETON_CUSTOM_PATH="${BR2_EXTERNAL_NERVES_PATH}/board/nerves-common/skeleton"
 BR2_INIT_NONE=y
+BR2_ROOTFS_DEVICE_CREATION_DYNAMIC_EUDEV=y
 BR2_ENABLE_LOCALE_WHITELIST="locale-archive"
 BR2_ROOTFS_OVERLAY="${BR2_EXTERNAL_NERVES_PATH}/board/nerves-common/rootfs_overlay ${NERVES_DEFCONFIG_DIR}/rootfs_overlay"
 BR2_ROOTFS_POST_BUILD_SCRIPT="${NERVES_DEFCONFIG_DIR}/post-build.sh ${BR2_EXTERNAL_NERVES_PATH}/board/nerves-common/post-build.sh"
@@ -30,12 +31,71 @@ BR2_LINUX_KERNEL_XZ=y
 BR2_LINUX_KERNEL_INSTALL_TARGET=y
 BR2_LINUX_KERNEL_NEEDS_HOST_LIBELF=y
 BR2_PACKAGE_BUSYBOX_CONFIG="${BR2_EXTERNAL_NERVES_PATH}/board/nerves-common/busybox.config"
+BR2_PACKAGE_BUSYBOX_SHOW_OTHERS=y
+BR2_PACKAGE_ALSA_UTILS=y
+BR2_PACKAGE_PIPEWIRE=y
+BR2_PACKAGE_PIPEWIRE_V4L2=y
+BR2_PACKAGE_PIPEWIRE_MEDIA_SESSION=y
+BR2_PACKAGE_PULSEAUDIO=y
+BR2_PACKAGE_PULSEAUDIO_DAEMON=y
 BR2_PACKAGE_E2FSPROGS=y
 # BR2_PACKAGE_E2FSPROGS_FSCK is not set
+BR2_PACKAGE_CAGE=y
+BR2_PACKAGE_MESA3D_DEMOS=y
+BR2_PACKAGE_FBTERM=y
+BR2_PACKAGE_MESA3D=y
+BR2_PACKAGE_MESA3D_GALLIUM_DRIVER_CROCUS=y
+BR2_PACKAGE_MESA3D_GALLIUM_DRIVER_NOUVEAU=y
+BR2_PACKAGE_MESA3D_GALLIUM_DRIVER_SVGA=y
+BR2_PACKAGE_MESA3D_GALLIUM_DRIVER_SWRAST=y
+BR2_PACKAGE_MESA3D_GALLIUM_DRIVER_VIRGL=y
+BR2_PACKAGE_MESA3D_OPENGL_GLX=y
+BR2_PACKAGE_MESA3D_OPENGL_ES=y
+BR2_PACKAGE_WESTON=y
+BR2_PACKAGE_WESTON_WAYLAND=y
+BR2_PACKAGE_WESTON_DEMO_CLIENTS=y
+BR2_PACKAGE_XORG7=y
+BR2_PACKAGE_XSERVER_XORG_SERVER=y
+BR2_PACKAGE_XLIB_LIBXCOMPOSITE=y
+BR2_PACKAGE_LINUX_FIRMWARE=y
+BR2_PACKAGE_EUDEV_RULES_GEN=y
+BR2_PACKAGE_INPUT_EVENT_DAEMON=y
+BR2_PACKAGE_INTEL_MICROCODE=y
+BR2_PACKAGE_KBD=y
 BR2_PACKAGE_LIBP11=y
 BR2_PACKAGE_UNIXODBC=y
+BR2_PACKAGE_KMSXX=y
+BR2_PACKAGE_LIBDRM_RADEON=y
+BR2_PACKAGE_LIBDRM_ETNAVIV=y
+BR2_PACKAGE_LIBDRM_INSTALL_TESTS=y
+BR2_PACKAGE_LIBEPOXY=y
+BR2_PACKAGE_LIBGLFW=y
+BR2_PACKAGE_WAYLAND_UTILS=y
+BR2_PACKAGE_LIBGUDEV=y
 BR2_PACKAGE_LIBMNL=y
 BR2_PACKAGE_LIBNL=y
+BR2_PACKAGE_NCURSES_WCHAR=y
+BR2_PACKAGE_BASH=y
+BR2_PACKAGE_SEATD_BUILTIN=y
+BR2_PACKAGE_SEATD_DAEMON=y
+BR2_PACKAGE_UTIL_LINUX_MORE=y
+BR2_PACKAGE_LESS=y
+BR2_PACKAGE_VIM=y
 # BR2_TARGET_ROOTFS_TAR is not set
 BR2_TARGET_GRUB2=y
 BR2_TARGET_GRUB2_BUILTIN_MODULES_PC="boot linux ext2 squash4 fat part_msdos normal biosdisk loadenv echo true test sleep"
```

## SDL

- [ ] 编写简单的 SDL 绘图程序，并将其打包到 Linux 内核中，验证初始化图形界面的能力

## Slint

Slint is a toolkit to efficiently develop fluid graphical user interfaces
for any display: embedded devices and desktop applications.
It supports multiple programming languages, such as Rust, C++, and JavaScript.

### 相关资源

- [站点](https://slint-ui.com)
- [开发文档](https://slint-ui.com/releases/1.0.0/docs/slint/index.html)
- [语法结构](https://slint-ui.com/releases/1.0.0/docs/slint/src/concepts/file.html)

### 优缺点

优点：

缺点：
