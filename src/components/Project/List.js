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
      addProjectByCategory(i18n('未分类'), project);
    } else {
      categories.forEach((category) => {
        addProjectByCategory(category, project);
      });
    }
  });

  return categoryProjects;
}

function Project({ children, frontMatter, title }) {
  const coverImageUrl = useBaseUrl(frontMatter.cover_image);
  const links = [
    { url: frontMatter.demo_url, name: i18n('演示') },
    { url: frontMatter.document_url, name: i18n('文档') }
  ];

  return (
    <section className={clsx(styles.card)}>
      <div className={clsx(styles.cardBody)}>
        <div
          className={clsx(
            styles.cardBodyCover,
            !!coverImageUrl || styles.cardBodyCoverNone
          )}
          style={{
            backgroundImage: !!coverImageUrl && 'url(' + coverImageUrl + ')'
          }}
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
        {links.map(({ url, name }) => (
          <Link
            key={title + '-' + url}
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

function Category({ category }) {
  const name = category.title || category.content.frontMatter.title;

  return (
    <div>
      <h2 id={name} className={clsx(styles.projectCategory)}>
        <div className={clsx(styles.projectCategorySeparator)}></div>
        <Link className={clsx('hash-link')} to={'#' + name} />
        {name}
        <div style={{ width: '24px' }}></div>
        <div className={clsx(styles.projectCategorySeparator)}></div>
      </h2>
      {(category.content ? [category] : []).map(
        ({ content: BlogPostContent }) => (
          <BlogPostProvider
            key={name + '-description-' + BlogPostContent.metadata.permalink}
            content={BlogPostContent}
          >
            <blockquote className={clsx(styles.projectCategoryDescription)}>
              <MDXContent>
                <BlogPostContent />
              </MDXContent>
            </blockquote>
          </BlogPostProvider>
        )
      )}
    </div>
  );
}

function ProjectList({ category, projects }) {
  const categoryName = category.title || category.content.frontMatter.title;

  return (
    <div>
      <Category category={category} />
      <div className={clsx(styles.projectList)}>
        {projects.map(({ content: BlogPostContent }, idx) => (
          <BlogPostProvider
            key={
              categoryName + '-project-' + BlogPostContent.metadata.permalink
            }
            content={BlogPostContent}
          >
            <Project
              key={categoryName + '-project-' + idx}
              {...BlogPostContent.metadata}
            >
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

  const categories = items
    .filter((item) => !!item.content.frontMatter.type)
    .sort((a, b) =>
      a.content.metadata.source.localeCompare(b.content.metadata.source)
    );
  const categoryMap = categories.reduce((map, category) => {
    map[category.content.frontMatter.title] = category;
    return map;
  }, {});

  const projects = items
    .filter((item) => !item.content.frontMatter.type)
    .sort((a, b) =>
      a.content.metadata.title.localeCompare(b.content.metadata.title)
    );
  const categoryProjects = sortProjectByCategory(projects);
  const categoryProjectsKeys = Object.keys(categoryProjects).sort((a, b) =>
    a.localeCompare(b)
  );

  const categoryNames = Object.keys(categoryMap);
  for (const name of categoryProjectsKeys) {
    if (!categoryNames.includes(name)) {
      categoryNames.push(name);
    }
  }

  const sidebar = {
    title: i18n('项目分类'),
    items: categoryNames.map((key) => ({
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
              {categoryNames.map((categoryName) => (
                <ProjectList
                  key={categoryName}
                  category={
                    categoryMap[categoryName]
                      ? categoryMap[categoryName]
                      : { title: categoryName }
                  }
                  projects={categoryProjects[categoryName]}
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
