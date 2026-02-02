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
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

import PayPalButton from '@site/src/components/PayPal/SingleButton';

import i18n from './i18n';
import styles from './styles.module.css';

function sort(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}

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

function Category({ category }) {
  const categoryName = category.title || category.content.frontMatter.title;

  return (
    <div>
      <h2 id={categoryName} className={clsx(styles.projectCategory)}>
        <div className={clsx(styles.projectCategorySeparator)}></div>
        <Link className={clsx('hash-link')} to={'#' + categoryName} />
        {categoryName}
        <div style={{ width: '24px' }}></div>
        <div className={clsx(styles.projectCategorySeparator)}></div>
      </h2>
      {(category.content ? [category] : []).map(
        ({ content: BlogPostContent }, idx) => (
          <blockquote
            key={idx}
            className={clsx(styles.projectCategoryDescription)}
          >
            <MDXContent>
              <BlogPostContent />
            </MDXContent>
          </blockquote>
        )
      )}
    </div>
  );
}

function Project({ project }) {
  const {
    content: {
      frontMatter,
      metadata: { title }
    }
  } = project;
  const coverImageUrl = useBaseUrl(frontMatter.cover_image);
  const iconUrl = useBaseUrl(frontMatter.icon);
  const slogan = frontMatter.slogan;
  const links = [
    { url: frontMatter.links.site, name: i18n('站点') },
    { url: frontMatter.links.demo, name: i18n('演示') },
    { url: frontMatter.links.document, name: i18n('文档') }
  ];

  return (
    <div className={clsx('project', styles.card)}>
      <div className={clsx(styles.cardBody)}>
        <div
          className={clsx(
            styles.cardBodyCover,
            !!coverImageUrl || styles.cardBodyCoverNone
          )}
        >
          {coverImageUrl && <img src={coverImageUrl} />}
        </div>
        <div className={clsx(styles.cardBodyContent)}>
          <div className={clsx(styles.cardTitle)}>
            <div
              className={clsx(
                styles.cardTitleIcon,
                !!iconUrl || styles.cardTitleIconNone
              )}
              style={{
                backgroundImage: !!iconUrl && 'url(' + iconUrl + ')'
              }}
            >
              {/* 避免图片在小尺寸屏幕中被压缩 */}
              <div className={clsx(styles.cardTitleIconPlaceholder)}></div>
            </div>
            <div className={clsx(styles.cardTitleText)}>
              <h3>{title}</h3>
              <h5>{slogan}</h5>
            </div>
          </div>
          <div>
            {[project].map(({ content: BlogPostContent }, idx) => (
              <MDXContent key={idx}>
                <BlogPostContent />
              </MDXContent>
            ))}
          </div>
        </div>
        <span className={clsx(styles.cardBodyFocusHighlight)}></span>
      </div>
      <div className={clsx(styles.cardFooter)}>
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
      </div>
    </div>
  );
}

function ProjectList({ category, projects }) {
  return (
    <div className={clsx(styles.projectListByCategory)}>
      <Category category={category} />
      <div className={clsx(styles.projectList)}>
        {projects.map((project, idx) => (
          <Project key={idx} project={project} />
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
    .sort((a, b) => sort(a.content.metadata.source, b.content.metadata.source));
  const categoryMap = categories.reduce((map, category) => {
    map[category.content.frontMatter.title] = category;
    return map;
  }, {});

  const projects = items
    .filter((item) => !item.content.frontMatter.type)
    .sort((a, b) => sort(a.content.metadata.title, b.content.metadata.title));
  const categoryProjects = sortProjectByCategory(projects);
  const categoryProjectsKeys = Object.keys(categoryProjects).sort(sort);

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
        description={`${siteConfig.title}: ${siteConfig.tagline}`}
      >
        <div className="container margin-vert--lg">
          <div className="row">
            <BlogSidebar sidebar={sidebar} />
            <main className={clsx('col col--7')}>
              <PayPalButton
                style={{ display: 'flex', justifyContent: 'center' }}
              />

              {categoryNames.map((categoryName, idx) => (
                <ProjectList
                  key={idx}
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
