import React from 'react';

import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';

import i18n from './i18n';

export default function ({ source, translator }) {
  return (
    <Admonition type="info" title={i18n('版权声明')}>
      <ul>
        <li>
          {i18n('原文链接')}: <Link to={source.url}>{source.url}</Link>
        </li>
        <li>
          {i18n('原文作者')}: {source.author.name}
          {' - '}
          <Link to={`mailto:${source.author.email}`}>
            {source.author.email}
          </Link>
        </li>
        <li>
          {i18n('译文作者')}: {translator.name}
          {' - '}
          <Link to={`mailto:${translator.email}`}>{translator.email}</Link>
        </li>
        <li>
          {i18n('版权声明')}: {i18n('本译文采用许可协议')}{' '}
          <Link to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">
            {i18n('署名-非商业性使用-相同方式共享 4.0 国际 (CC BY-NC-SA 4.0)')}
          </Link>
          {i18n('。')} {i18n('转载请注明来自')}{' '}
          <Link to="https://studio.crazydan.org/">Crazydan Studio</Link>
          {i18n('！')}
        </li>
      </ul>
    </Admonition>
  );
}
