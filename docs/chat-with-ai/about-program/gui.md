---
title: GUI 开发
description: GUI 实现方式
authors:
- flytreleft
---

import {Conversation, Ask, Reply, Note} from '@site/src/components/Conversation';
import Header from '../_header.md';

<Header />


<Conversation
  asker={{ img: '/img/avatar/flytreeleft.svg', name: '我' }}
  replier={{ img: '/img/avatar/chatgpt.svg', name: 'ChatGPT' }}
>

<Ask>

## Linux中发送图形数据到显示设备的过程？

</Ask>

<Reply>

在Linux中，发送图形数据到显示设备主要是通过图形驱动程序实现的。驱动程序会将图形数据按照显示方式转换成显卡可接受的格式，然后将其发送到显卡。具体来说，Linux中发送图形数据到显示设备的过程如下：

1. 生成图形数据：图形数据包括应用程序生成的图像、窗口、菜单、图标等内容。

2. 转换图形数据：由于不同显卡使用不同的显示方式和格式，因此需要将图形数据转换成用于显示设备的格式。这个转换过程通常由显卡制造商提供的驱动程序完成。

3. 发送图形数据：将转换后的图形数据以硬件支持的方式发送到显卡，由显卡显示在输出屏幕上。

4. 刷新显示：如果用户调整了显示区域，或更新了图形数据，则需要刷新显示。这一步通常通过窗口管理器或图形驱动程序来完成。

需要注意的是，如果使用的是X Window系统，Linux还需要额外的X服务器的支持，它会将转换后的图形数据发送到客户端或多个客户端之间共享的内存区域，然后在客户端的电脑上显示。而在使用Wayland的情况下，由于它直接与GPU交互，并避免了X服务器的额外开销，因此发送图形数据的工作更为高效。

</Reply>

<Ask>

## Linux中直接写图形数据到显示设备的代码？

</Ask>

<Reply>

Linux中直接写图形数据到显示设备的代码要细节很多，需要了解硬件相关的知识。下面是一个简单的示例，仅供参考：

```c
#include <fcntl.h>
#include <linux/fb.h>
#include <sys/mman.h>
#include <sys/ioctl.h>

int main()
{
   struct fb_var_screeninfo var_info;
   struct fb_fix_screeninfo fix_info;
   char *fb_map;
   int fb_fd;

   fb_fd = open("/dev/fb0", O_RDWR);

   ioctl(fb_fd, FBIOGET_FSCREENINFO, &fix_info);
   ioctl(fb_fd, FBIOGET_VSCREENINFO, &var_info);

   fb_map = mmap(0, fix_info.smem_len, PROT_READ | PROT_WRITE, MAP_SHARED, fb_fd, 0);

   for(int y = 0; y < var_info.yres; y++) {
        for(int x = 0; x < var_info.xres; x++) {
            long location = (x+var_info.xoffset) * (var_info.bits_per_pixel/8) +
                            (y+var_info.yoffset) * fix_info.line_length;
            *((unsigned int*)(fb_map + location)) = 0x00FF0000;
        }
    }

   munmap(fb_map, fix_info.smem_len);
   close(fb_fd);
   
   return 0;
}
```

代码中使用了Linux内核中提供的/dev/fb0设备来访问显示设备，《fb.h》中定义了相关的数据结构。首先打开fb设备，然后通过ioctl函数获取fb设备的大小和信息，接下来通过mmap函数将显存映射到进程空间，然后直接修改映射的内存来绘制一个红色的矩形。最后，使用munmap函数解除映射并关闭fb设备。

需要强调的是，这仅仅是一个简单的示例，实际情况下需要根据实际的设备和需求进行更复杂的操作。因此，直接编写图形数据的代码需要开发人员对硬件和操作系统内部的工作原理有一定的了解。

</Reply>

<Ask>

## Linux中直接写图形数据到gpu的代码？

</Ask>

<Reply>

在Linux中，直接将图形数据写入GPU需要使用图形库或API，例如OpenGL或Vulkan，并编写相应的代码。

下面是使用OpenGL将一个简单的三角形渲染到屏幕上的示例代码。该例子假设操作系统上安装有OpenGL环境，需要首先安装OpenGL和对应的头文件和库文件。

```c
#include <GL/gl.h>
#include <GL/glut.h>

void display() {
    glClear(GL_COLOR_BUFFER_BIT);
    glBegin(GL_TRIANGLES);
    glColor3f(1.0f, 0.0f, 0.0f);
    glVertex3f(-0.6f, -0.4f, 0.0f);
    glColor3f(0.0f, 1.0f, 0.0f);
    glVertex3f(0.6f, -0.4f, 0.0f);
    glColor3f(0.0f, 0.0f, 1.0f);
    glVertex3f(0.0f, 0.6f, 0.0f);
    glEnd();
    glFlush();
}

int main(int argc, char** argv) {
    glutInit(&argc, argv);
    glutCreateWindow("Hello OpenGL");
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
```

该程序使用OpenGL绘制了一个简单的三角形，并在窗口中展示它。具体实现步骤如下：

1. 在 `display` 函数中，首先调用 `glClear` 函数清除颜色缓冲区（Color Buffer），接着使用 `glBegin` 函数开始绘制几何图元，即三角形；

2. 在三角形的每个顶点处调用 `glVertex3f` 函数，并使用 `glColor3f` 函数设置颜色；

3. `glEnd` 函数用于结束几何图元的绘制过程；

4. `glFlush` 函数会将图像数据刷新到帧缓存（Frame Buffer），然后将其输出到屏幕上。

5. 在 `main` 函数中，使用 OpenGL 工具箱（GLUT）创建了一个窗口，并注册窗口显示函数 `display`，然后启动主循环（即 `glutMainLoop` 函数）。

需要注意的是，该例子仅仅是一个简单的OpenGL程序，较为复杂的图形绘制和渲染需要更加深入的图形学知识和编程技能。

</Reply>

<Ask>

## Linux中Framebuffer与drm的区别？

</Ask>

<Reply>

Framebuffer (FB) 和 DRM (Direct Rendering Manager) 是 Linux 内核中用于管理显示设备的两种不同的机制。

Framebuffer 是一种不完整的、过时的显示驱动模块，用于管理显示设备并在屏幕上绘制基本的图形界面。它具有比较简单的编码、容易实现和较小的内存占用等优点，但在处理高性能图形和视频等复杂任务时的性能较差。

DRM 是一种完整的、先进的图形处理机制，可直接访问显卡硬件，并更好地支持3D加速、视频解码和其他高级图形功能。它也可以通过内核模块扩展来支持不同类型的显示设备。相比 Framebuffer，DRM 具有更高的性能、更高的功能和更好的可维护性。

因此，相对于 Framebuffer，DRM 更适合处理高级和复杂的图形任务，而在一些比较简单的场景（如嵌入式系统）中，Framebuffer 也可以提供足够的性能和可靠性。

</Reply>

<Ask>

## Linux中通过drm绘图的代码？

</Ask>

<Reply>

以下是通过 DRM 绘图的示例代码：

```c
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cmath>
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>
#include <linux/fb.h>
#include <sys/ioctl.h>
#include <drm/drm.h>
#include <drm/drm_mode.h>
#include <drm/drm_fourcc.h>
#include <drm/drm_mode.h>
#include <errno.h>

#define BUFFER_SIZE 64

static int fb_fd;
static int drm_fd;
static struct fb_fix_screeninfo fb_fix;
static struct fb_var_screeninfo fb_var;
static struct drm_mode_create_dumb creat_args;
static struct drm_mode_map_dumb map_arg;
static struct drm_mode_destroy_dumb destroy_arg;
struct drm_mode_fb_cmd fcmd;
struct drm_mode_modeinfo mode_info;
unsigned char *framebuffer;
unsigned char *dumb_buffer;

int main(int argc, char **argv) {
    // open the framebuffer device
    fb_fd = open("/dev/fb0", O_RDWR);
    if (fb_fd < 0) {
        printf("Unable to open /dev/fb0: %s", strerror(errno));
        return -1;
    }

    // get the fixed and variable screen info
    if (ioctl(fb_fd, FBIOGET_FSCREENINFO, &fb_fix) < 0) {
        printf("Unable to get FBIOGET_FSCREENINFO: %s", strerror(errno));
        close(fb_fd);
        return -1;
    }
    if (ioctl(fb_fd, FBIOGET_VSCREENINFO, &fb_var) < 0) {
        printf("Unable to get FBIOGET_VSCREENINFO: %s", strerror(errno));
        close(fb_fd);
        return -1;
    }

    // get resolution
    uint32_t fb_width = fb_var.xres_virtual;
    uint32_t fb_height = fb_var.yres_virtual;

    printf("Resolution: %ux%u (virtual %ux%u)", fb_var.xres, fb_var.yres, fb_var.xres_virtual, fb_var.yres_virtual);

    // set the display to the specified mode
    memset(&mode_info, 0, sizeof(mode_info));
    mode_info.hdisplay = fb_var.xres;
    mode_info.vdisplay = fb_var.yres;
    mode_info.clock = fb_var.pixclock ? 1000000000000000 / fb_var.pixclock : 0;
    mode_info.vrefresh = fb_var.yres ? fb_var.upper_margin + fb_var.lower_margin + fb_var.yres + fb_var.vsync_len : 60;
    mode_info.flags |= fb_var.pixclock ? DRM_MODE_FLAG_PHSYNC : DRM_MODE_FLAG_NVSYNC;
    mode_info.flags |= fb_var.pixclock ? DRM_MODE_FLAG_NHSYNC : DRM_MODE_FLAG_PVSYNC;
    mode_info.flags |= fb_var.green.msb_right ? DRM_MODE_FLAG_6BPC : DRM_MODE_FLAG_8BPC;
    mode_info.flags |= fb_var.green.msb_right ? DRM_MODE_FLAG_8BPC : DRM_MODE_FLAG_16BPC;
    mode_info.hsync_start = mode_info.hdisplay + fb_var.right_margin;
    mode_info.hsync_end = mode_info.hsync_start + fb_var.hsync_len;
    mode_info.htotal = mode_info.hsync_end + fb_var.left_margin;
    mode_info.vsync_start = mode_info.vdisplay + fb_var.lower_margin;
    mode_info.vsync_end = mode_info.vsync_start + fb_var.vsync_len;
    mode_info.vtotal = mode_info.vsync_end + fb_var.upper_margin;
    mode_info.hskew = fb_var.sync ? fb_var.sync : 0;
    strncpy(mode_info.name, fb_var.name, drm_mode_text_len);

    if (ioctl(fb_fd, FBIOPUT_VSCREENINFO, &fb_var) < 0) {
        printf("Unable to set FBIOPUT_VSCREENINFO: %s", strerror(errno));
        close(fb_fd);
        return -1;
    }

    // open the DRM device
    drm_fd = open("/dev/dri/card0", O_RDWR);
    if (drm_fd < 0) {
        printf("Unable to open /dev/dri/card0: %s", strerror(errno));
        close(fb_fd);
        return -1;
    }

    // set the mode
    if (drmModeSetCrtc(drm_fd, 0, 0, 0, 0, NULL, 1, &mode_info) < 0) {
        printf("Unable to set DRM mode: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }

    // create a dumb buffer
    memset(&creat_args, 0, sizeof(creat_args));
    creat_args.width = fb_width;
    creat_args.height = fb_height;
    creat_args.bpp = 32;
    if (ioctl(drm_fd, DRM_IOCTL_MODE_CREATE_DUMB, &creat_args) < 0) {
        printf("Unable to create dumb buffer: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }

    // mmap the buffer
    memset(&map_arg, 0, sizeof(map_arg));
    map_arg.handle = creat_args.handle;
    if (ioctl(drm_fd, DRM_IOCTL_MODE_MAP_DUMB, &map_arg) < 0) {
        printf("Unable to map dumb buffer: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }

    // create an FB object for the dumb buffer
    memset(&fcmd, 0, sizeof(fcmd));
    fcmd.fb_id = 0;
    fcmd.width = fb_width;
    fcmd.height = fb_height;
    fcmd.pitch = creat_args.pitch;
    fcmd.bpp = creat_args.bpp;
    fcmd.depth = 24;
    fcmd.handle = creat_args.handle;
    if (drmIoctl(drm_fd, DRM_IOCTL_MODE_ADDFB, &fcmd) < 0) {
        printf("Unable to add FB object: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }

    // map the framebuffer memory
    size_t buffer_size = fb_var.yres_virtual * fb_fix.line_length;
    framebuffer = (unsigned char*) mmap(0, buffer_size, PROT_READ | PROT_WRITE, MAP_SHARED, fb_fd, 0);
    dumb_buffer = (unsigned char*) mmap(0, buffer_size, PROT_READ | PROT_WRITE, MAP_SHARED, drm_fd, map_arg.offset);
    printf("Framebuffer mmap: %p (size %zu)", framebuffer, buffer_size);
    printf("Dumb buffer mmap: %p (size %u)", dumb_buffer, creat_args.size);

    // draw
    uint8_t color[BUFFER_SIZE][BUFFER_SIZE][4];
    size_t buffer_offset = 0;
    for (uint32_t y = 0; y < fb_height; y++) {
        for (uint32_t x = 0; x < fb_width; x++) {
            uint8_t red = x * 255 / fb_width;
            uint8_t green = y * 255 / fb_height;
            uint8_t blue = 128;
            color[x / BUFFER_SIZE][y / BUFFER_SIZE][0] = red;
            color[x / BUFFER_SIZE][y / BUFFER_SIZE][1] = green;
            color[x / BUFFER_SIZE][y / BUFFER_SIZE][2] = blue;
            color[x / BUFFER_SIZE][y / BUFFER_SIZE][3] = 0;
            memcpy(dumb_buffer + buffer_offset, &color[x / BUFFER_SIZE][y / BUFFER_SIZE], 4);
            buffer_offset += 4;
        }
    }

    // copy the dumb buffer to the FB
    memcpy(framebuffer, dumb_buffer, buffer_size);

    // cleanup
    if (ioctl(drm_fd, DRM_IOCTL_MODE_RMFB, &fcmd.fb_id) < 0) {
        printf("Unable to remove FB object: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }
    buffer_offset = 0;
    destroy_arg.handle = creat_args.handle;
    if (ioctl(drm_fd, DRM_IOCTL_MODE_DESTROY_DUMB, &destroy_arg) < 0) {
        printf("Unable to destroy dumb buffer: %s", strerror(errno));
        close(drm_fd);
        close(fb_fd);
        return -1;
    }
    munmap(framebuffer, buffer_size);
    munmap(dumb_buffer, creat_args.size);
    close(drm_fd);
    close(fb_fd);
    return 0;
}
```

此代码将创建一个大小为 64x64 的颜色数组，然后将它复制到一个 DRM 的 dumb buffer 中。最后，这个 dumb buffer 将被复制到 /dev/fb0，显示在屏幕上。在此示例中，fb0 是图形设备的主节点，而 /dev/dri/card0 是 DRM 设备的主节点。

</Reply>

</Conversation>
