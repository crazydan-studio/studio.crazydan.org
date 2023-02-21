import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import {
  HtmlClassNameProvider,
  ThemeClassNames
} from '@docusaurus/theme-common';
import MDXContent from '@theme/MDXContent';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BlogPostProvider } from '@docusaurus/theme-common/internal';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function Project({ children, frontMatter, title }) {
  const imageUrl = useBaseUrl(frontMatter.image);
  const links = [
    { url: frontMatter.demo, name: '演示' },
    { url: frontMatter.document, name: '文档' }
  ];

  return (
    <section className={clsx(styles.card)}>
      <div className={clsx(styles.cardBody)}>
        <div
          className={clsx(
            styles.cardBodyCover,
            !!imageUrl || styles.cardBodyCoverNone
          )}
          style={{ backgroundImage: !!imageUrl && 'url(' + imageUrl + ')' }}
        ></div>
        <div className={clsx(styles.cardBodyContent)}>
          <h3>{title}</h3>
          <div>
            <MDXContent>{children}</MDXContent>
          </div>
        </div>
        <span className={clsx(styles.cardBodyFocusHighlight)}></span>
      </div>
      <footer className={clsx(styles.cardFooter)}>
        {links.map(({ url, name }, idx) => (
          <Link
            key={idx}
            className={clsx(
              styles.cardFooterButton,
              !!url || styles.cardFooterButtonDisabled
            )}
            to={url}
            {...{ target: '_blank' }}
          >
            {name}
          </Link>
        ))}
      </footer>
    </section>
  );
}

function Component({ items, metadata }) {
  console.log(items, arguments);
  const context = useDocusaurusContext();
  const { blogTitle } = metadata;
  const { siteConfig = {} } = context;

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <Layout
        title={blogTitle}
        description={`${siteConfig.title}: ${siteConfig.tagline}`}
      >
        <div className="container margin-vert--lg">
          <div className="row">
            <aside className={clsx('col col--3')}></aside>
            <main className={clsx('col col--7')}>
              {items.map(({ content: BlogPostContent }, idx) => (
                <BlogPostProvider
                  key={BlogPostContent.metadata.permalink}
                  content={BlogPostContent}
                >
                  <Project key={idx} {...BlogPostContent.metadata}>
                    <BlogPostContent />
                  </Project>
                </BlogPostProvider>
              ))}
            </main>
          </div>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}

export default Component;
