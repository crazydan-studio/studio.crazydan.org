module.exports = {
  title: 'Crazydan Studio',
  tagline: '让生活：更简单，更美好',
  url: 'https://studio.crazydan.org',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  organizationName: 'crazydan-studio',
  projectName: 'studio.crazydan.org',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en']
  },
  themeConfig: {
    navbar: {
      title: 'Crazydan Studio',
      logo: {
        alt: 'Crazydan Studio',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: 'project/',
          activeBasePath: 'project',
          label: '项目',
          position: 'right'
        },
        {
          to: 'blog/',
          activeBasePath: 'blog',
          label: '博客',
          position: 'right'
        },
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '文档',
          position: 'right'
        },
        {
          href: 'https://book.crazydan.org',
          label: '书籍',
          position: 'right'
        },
        {
          href: 'https://code.studio.crazydan.org/explore/repos',
          label: '开源代码',
          position: 'right'
        },
        {
          type: 'localeDropdown',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '我们',
          items: [
            {
              label: 'Crazydan主站',
              href: 'https://crazydan.org'
            }
          ]
        },
        {
          title: '产品',
          items: [
            {
              label: '百家•辩',
              href: 'https://baijia.link'
            }
          ]
        },
        {
          title: '更多',
          items: [
            {
              label: 'flytreeleft的博客',
              href: 'https://flytreeleft.org'
            }
          ]
        }
      ],
      copyright: 'footer.copyright'
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'project',
        path: 'project',
        routeBasePath: 'project',
        include: ['*.md', '*.mdx', 'category/*.md'],
        postsPerPage: 'ALL',
        blogTitle: '项目',
        blogDescription: '',
        blogListComponent: '@site/src/components/Project/List.js',
        blogPostComponent: '@theme/BlogPostPage',
        blogTagsListComponent: '@theme/BlogTagsListPage',
        blogTagsPostsComponent: '@theme/BlogTagsPostsPage',
        showReadingTime: true,
        truncateMarker: /<!--\s*(more)\s*-->/,
        feedOptions: {
          type: null
        }
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dandb-doc',
        path: 'docs/dandb',
        routeBasePath: 'docs/dandb'
        // sidebarPath: require.resolve('./docs/dandb/sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'danos-doc',
        path: 'docs/danos',
        routeBasePath: 'docs/danos'
        // sidebarPath: require.resolve('./docs/danos/sidebars.js')
      }
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        },
        blog: {
          id: 'blog',
          path: 'blog',
          routeBasePath: 'blog',
          include: ['*.md', '*.mdx'],
          postsPerPage: 10,
          showReadingTime: true,
          truncateMarker: /<!--\s*(more)\s*-->/,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Crazydan Studio.`
          }
        },
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./docs/sidebars.js')
        }
      }
    ]
  ]
};
