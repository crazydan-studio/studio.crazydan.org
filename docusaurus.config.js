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
          title: '站点',
          items: [
            {
              label: '百家',
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
      copyright: `版权所有 © ${new Date().getFullYear()} Crazydan Studio<br>本站通过<a href="https://v2.docusaurus.io/">Docusaurus 2</a>构建`
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'project',
        path: 'project',
        routeBasePath: 'project',
        include: ['*.md', '*.mdx'],
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
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
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
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
