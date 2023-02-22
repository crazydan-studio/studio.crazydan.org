import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function withTranslation(locale, translation) {
  return { locale, translation };
}

export function zh(translation) {
  return withTranslation(zh.code, translation);
}
zh.code = 'zh';

export function en(translation) {
  return withTranslation(en.code, translation);
}
en.code = 'en';

export function currentLocale() {
  const {
    i18n: { currentLocale }
  } = useDocusaurusContext();

  return currentLocale;
}
