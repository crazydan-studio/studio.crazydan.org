import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Component({ items, metadata }) {
  console.log(items, arguments);
  const context = useDocusaurusContext();
  const { blogTitle } = metadata;
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={blogTitle}
      description={`${siteConfig.title}: ${siteConfig.tagline}`}
    >
      <main>
      </main>
    </Layout>
  );
}

export default Component;
