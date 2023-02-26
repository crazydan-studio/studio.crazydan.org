import React from 'react';

import Link from '@docusaurus/Link';

export default function ({ src, source }) {
  const type = src.replaceAll(/^.+\.([^.]+)$/g, '$1');

  return (
    <div style={{ textAlign: 'center' }}>
      <video controls width="100%" height="100%">
        <source src={src} type={`video/${type}`} />
      </video>
      <span style={{ color: 'var(--ifm-blockquote-color)' }}>
        注：该视频来自 <Link to={source.url}>{source.title}</Link>
      </span>
    </div>
  );
}
