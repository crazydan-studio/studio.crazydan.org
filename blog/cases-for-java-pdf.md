---
title: Java PDF 处理案例
authors:
  - flytreleft
tags:
  - PDFBox
  - PDF 处理
---

import Copyright from '@site/src/components/Copyright/OwnBlogByAuthor';

本文主要收集在 Java 生态环境中对 PDF 文件的相关处理方案。

<!-- more -->

## 缩放页面至固定尺寸

> 注意，当前方案针对的是 pdfbox-3.0.2 版本。

在合并多个外部 PDF 时，往往会出现页面的尺寸不是标准 A4 大小的问题，
因此，为了确保整体的一致性，便会需要将所有的页面都统一为 A4 尺寸。

通过 PDFBox 可以很方便地实现 PDF 文件的合并，以及对页面的缩放：

```java {75-78}
public static void mergePdfs(
        File tmpDir, OutputStream pdfOutput,
        List<File> pdfFileList, String fileName
) throws Exception {
  PDDocumentInformation info = new PDDocumentInformation();
  info.setTitle(fileName);
  info.setAuthor("Anonymous");

  // Note: 由于无法干预合并过程，故而，需要通过临时文件暂存合并结果
  File tmpPdfFile = File.createTempFile("merged-", ".pdf", tmpDir);
  PDFMergerUtility merger = new PDFMergerUtility();

  merger.setDestinationDocumentInformation(info);
  merger.setDestinationStream(new FileOutputStream(tmpPdfFile));

  for (File file : pdfFileList) {
    merger.addSource(file);
  }
  merger.mergeDocuments(
    MemoryUsageSetting
      .setupTempFileOnly()
      .setTempDir(tmpDir).streamCache
  );

  // 调整 pdf 页尺寸为 A4
  try (PDDocument pdf = Loader.loadPDF(tmpPdfFile)) {
    int pages = pdf.getNumberOfPages();
    for (int i = 0; i < pages; i++) {
      PDPage page = pdf.getPage(i);

      scalePdfPage(pdf, page, PDRectangle.A4);
    }

    pdf.save(pdfOutput);
  }
}

public static void scalePdfPage(
        PDDocument pdf, PDPage page, PDRectangle targetSize
) throws IOException {
  // 实现参考：https://github.com/DEXPRO-Solutions-GmbH/pdftools/blob/main/src/main/java/one/squeeze/pdftools/cli/cmds/FixPDFCommand.java
  PDRectangle originalSize = page.getMediaBox();
  boolean isPortrait = originalSize.getWidth() < originalSize.getHeight();

  targetSize = isPortrait
                ? targetSize
                : new PDImmutableRectangle(
                    targetSize.getHeight(), targetSize.getWidth()
                  );

  // 对于精确匹配的尺寸和误差范围（10mm）以外的尺寸，均不做处理
  if (PdfUtils.isSizeMatched(targetSize, originalSize, 0.1f) //
      || !PdfUtils.isSizeMatched(targetSize, originalSize, 10)) {
    return;
  }

  float scaleX = targetSize.getWidth() / originalSize.getWidth();
  float scaleY = targetSize.getHeight() / originalSize.getHeight();
  // 按页面的原始比例进行缩放
  float scale = Math.min(scaleX, scaleY);
  // 将缩放后的页面居中放置
  float translateX = (targetSize.getWidth() - originalSize.getWidth() * scale) / 2;
  float translateY = (targetSize.getHeight() - originalSize.getHeight() * scale) / 2;

  Matrix matrix = Matrix.getScaleInstance(scale, scale);
  matrix.translate(translateX, translateY);

  PDPageContentStream content = new PDPageContentStream(
    pdf, page, PDPageContentStream.AppendMode.PREPEND, false
  );
  content.transform(matrix);
  content.close();

  // Note: 边界和内容大小必须同时设置才能达到预期效果
  // 设置页面边界大小
  page.setCropBox(targetSize);
  // 设置页面内容大小
  page.setMediaBox(targetSize);
}
```

这里需要特别注意的是，必须同时调用 `PDPage#setCropBox` 和 `PDPage#setMediaBox`
将 PDF 页面边界和内容设置为相同尺寸，若是遗漏前者，则最终页面只有内容会被缩放，而其尺寸则不会发生变化。

## 参考资料

- [Apache PDFBox](https://pdfbox.apache.org/)

<Copyright
owner={{
    name: 'flytreeleft', email: 'flytreeleft@crazydan.org'
  }}
/>
