import { en, currentLocale } from '@site/src/i18n/locale';
import { use, trans } from '@site/src/i18n/translator';

const translators = use([
  trans(['首页'], en('Home')),
  trans(['让生活：更简单，更美好'], en('Make life easier and happier'))
]);

export default function translate(...texts) {
  const locale = currentLocale();
  return translators.translate(locale, texts);
}
