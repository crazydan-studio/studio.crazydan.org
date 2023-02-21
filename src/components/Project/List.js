import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import {
  HtmlClassNameProvider,
  ThemeClassNames
} from '@docusaurus/theme-common';
import MDXContent from '@theme/MDXContent';
import BlogSidebar from '@theme/BlogSidebar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { BlogPostProvider } from '@docusaurus/theme-common/internal';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

import i18n from './i18n';
import styles from './styles.module.css';

function sortProjectByCategory(projects) {
  const categoryProjects = {};
  const addProjectByCategory = (category, project) => {
    categoryProjects[category] = [
      ...(categoryProjects[category] || []),
      project
    ];
  };

  projects.forEach((project) => {
    const categories = project.content.metadata.frontMatter.categories || [];

    if (categories.length == 0) {
      addProjectByCategory('default', project);
    } else {
      categories.forEach((category) => {
        addProjectByCategory(category, project);
      });
    }
  });

  for (const category in categoryProjects) {
    categoryProjects[category] = categoryProjects[category].sort((a, b) =>
      a.content.metadata.title.localeCompare(b.content.metadata.title)
    );
  }

  return categoryProjects;
}

function Project({ children, frontMatter, title }) {
  const imageUrl = useBaseUrl(frontMatter.image);
  const links = [
    { url: frontMatter.demo, name: i18n('演示') },
    { url: frontMatter.document, name: i18n('文档') }
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

function ProjectList({ category, projects }) {
  return (
    <div>
      <h2 id={category} className={clsx(styles.projectCategory)}>
        <div className={clsx(styles.projectCategorySeparator)}></div>
        <Link className={clsx('hash-link')} to={'#' + category} />
        {category}
        <div style={{ width: '24px' }}></div>
        <div className={clsx(styles.projectCategorySeparator)}></div>
      </h2>
      <div className={clsx(styles.projectList)}>
        {projects.map(({ content: BlogPostContent }, idx) => (
          <BlogPostProvider
            key={category + '-p-' + BlogPostContent.metadata.permalink}
            content={BlogPostContent}
          >
            <Project key={category + '-p-' + idx} {...BlogPostContent.metadata}>
              <BlogPostContent />
            </Project>
          </BlogPostProvider>
        ))}
      </div>
    </div>
  );
}

function Component({ items, metadata }) {
  const context = useDocusaurusContext();
  const { blogTitle } = metadata;
  const { siteConfig = {} } = context;

  const categoryProjects = sortProjectByCategory(items);
  const categoryProjectsKeys = Object.keys(categoryProjects).sort();
  const sidebar = {
    title: i18n('项目分类'),
    items: categoryProjectsKeys.map((key) => ({
      title: key,
      permalink: '#' + key
    }))
  };

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <Layout
        title={i18n(blogTitle)}
        description={`${i18n(siteConfig.title)}: ${i18n(siteConfig.tagline)}`}
      >
        <div className="container margin-vert--lg">
          <div className="row">
            <BlogSidebar sidebar={sidebar} />
            <main className={clsx('col col--7')}>
              {categoryProjectsKeys.map((category) => (
                <ProjectList
                  key={category}
                  category={category}
                  projects={categoryProjects[category]}
                />
              ))}
            </main>
          </div>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}

export default Component;
