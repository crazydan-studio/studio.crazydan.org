/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import styles from './styles.module.css';
export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const {
    i18n: {defaultLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const {pathname, search, hash} = useLocation();
  const searchParams = new URLSearchParams(search);
  const localeInSearchParams = searchParams.get('lang');
  const currentLocale = localeInSearchParams || defaultLocale;

  const localeItems = locales.map((locale) => {
    searchParams.delete('lang');
    if (locale !== defaultLocale) {
      searchParams.append('lang', locale);
    }

    const baseTo = `pathname://${pathname}`;
    const newSearch = searchParams.toString();
    // preserve ?search#hash suffix on locale switches
    const to = `${baseTo}${newSearch ? '?' + newSearch : ''}${hash}`;
    return {
      label: localeConfigs[locale].label,
      lang: localeConfigs[locale].htmlLang,
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className:
        // eslint-disable-next-line no-nested-ternary
        locale === currentLocale
          ? // Similar idea as DefaultNavbarItem: select the right Infima active
            // class name. This cannot be substituted with isActive, because the
            // target URLs contain `pathname://` and therefore are not NavLinks!
            mobile
            ? 'menu__link--active'
            : 'dropdown__link--active'
          : '',
    };
  });
  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];
  // Mobile is handled a bit differently
  const dropdownLabel = mobile
    ? translate({
        message: 'Languages',
        id: 'theme.navbar.mobileLanguageDropdown.label',
        description: 'The label for the mobile language switcher dropdown',
      })
    : localeConfigs[currentLocale].label;
  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={
        <>
          <IconLanguage className={styles.iconLanguage} />
          {dropdownLabel}
        </>
      }
      items={items}
    />
  );
}
