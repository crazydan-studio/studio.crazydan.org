import { i18n, arg } from '@site/src/components/I18n';

export default i18n()
  //
  .trans(['中文'])
  .en('Chinese')
  //
  .trans(['英文'])
  .en('English')
  //
  .trans([arg(), '原文'])
  .en((name) => `Source (${name})`)
  .zh((name) => `原文 (${name})`)
  //
  .done();
