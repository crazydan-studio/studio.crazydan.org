/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import siteConfig from '@generated/docusaurus.config';
import globalData from '@generated/globalData';
import i18n from '@generated/i18n';
import codeTranslations from '@generated/codeTranslations';
import siteMetadata from '@generated/site-metadata';
import translate from '@site/src/pages/i18n';

const isInBrowser = typeof window !== 'undefined';
const localeInLocalStorage = !isInBrowser
  ? null
  : window.localStorage.getItem('locale');
localeInLocalStorage && (i18n.currentLocale = localeInLocalStorage);

if (!siteConfig.__translated__ && isInBrowser) {
  translate.locale = i18n.currentLocale;
  siteConfig.__translated__ = true;

  const title = siteConfig.title;
  const tagline = siteConfig.tagline;
  Object.defineProperties(siteConfig, {
    title: {
      get() {
        return translate(title);
      }
    },
    tagline: {
      get() {
        return translate(tagline);
      }
    }
  });

  const navBar = siteConfig.themeConfig.navbar;
  const items = navBar.items;
  Object.defineProperties(navBar, {
    items: {
      get() {
        return items.map(({ label, ...props }) => {
          return { label: translate(label), ...props };
        });
      }
    }
  });

  const footer = siteConfig.themeConfig.footer;
  const links = footer.links;
  const copyright = footer.copyright;
  Object.defineProperties(footer, {
    links: {
      get() {
        return links.map(({ title, items, ...props }) => {
          return {
            title: translate(title),
            items: items.map(({ label, ...props }) => {
              return { label: translate(label), ...props };
            }),
            ...props
          };
        });
      }
    },
    copyright: {
      get() {
        return translate(copyright);
      }
    }
  });

  // 强制更新 copyright 的内容
  document.querySelector('footer__copyright').innerHTML = null;
}

// Static value on purpose: don't make it dynamic!
// Using context is still useful for testability reasons.
const contextValue = {
    siteConfig,
    siteMetadata,
    globalData,
    i18n,
    codeTranslations,
};

export const Context = React.createContext(contextValue);
export function DocusaurusContextProvider({ children, }) {
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
