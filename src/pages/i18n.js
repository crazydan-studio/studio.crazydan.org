import { i18n } from '@site/src/components/I18n';

export default i18n()
  //
  .trans(['首页'])
  .en('Home')
  //
  .trans(['项目'])
  .en('Project')
  //
  .trans(['文档'])
  .en('Document')
  //
  .trans(['博客'])
  .en('Blog')
  //
  .trans(['书籍'])
  .en('Book')
  //
  .trans(['开源代码'])
  .en('Open Source')
  //
  .trans(['让生活：更简单，更美好'])
  .en('Make life easier and happier')
  //
  .trans(['footer.copyright'])
  .zh(
    () =>
      `版权所有 © ${new Date().getFullYear()} Crazydan Studio<br>本站通过<a href="https://v2.docusaurus.io/">Docusaurus 2</a>构建`
  )
  .en(
    () =>
      `Copyright © ${new Date().getFullYear()} Crazydan Studio<br>Build with <a href="https://v2.docusaurus.io/">Docusaurus 2</a>`
  )
  //
  .trans(['我们'])
  .en('Ours')
  //
  .trans(['产品'])
  .en('Product')
  //
  .trans(['更多'])
  .en('More')
  //
  .trans(['Crazydan主站'])
  .en("Crazydan's Site")
  //
  .trans(['flytreeleft的博客'])
  .en("flytreeleft's Blog")
  //
  .done();
