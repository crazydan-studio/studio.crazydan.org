---
title: 本地化
description: TODO
---

import Header from '../_header.md';

<Header />

本地化（I18n，国际化）采用原文到译文的形式，避免Key值意义不明确的问题：

```js
i18n('这是一段本地化文本。');
// en
// > 'This is a locale text.'
// zh
// > '这是一段本地化文本。'
```
