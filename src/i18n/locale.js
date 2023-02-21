import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

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
    i18n: { defaultLocale }
  } = useDocusaurusContext();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const localeInSearchParams = searchParams.get('lang');

  return localeInSearchParams || defaultLocale;
}
