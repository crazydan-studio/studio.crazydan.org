import { en, currentLocale } from '@site/src/i18n/locale';
import { use, trans } from '@site/src/i18n/translator';

const translators = use([
  trans(['项目'], en('Project')),
  trans(['项目分类'], en('Project categories')),
  trans(['演示'], en('Demo')),
  trans(['文档'], en('Document')),
  trans(['让生活：更简单，更美好'], en('Make life easier and happier'))
]);

export default function translate(...texts) {
  const locale = currentLocale();
  return translators.translate(locale, texts);
}
