const localPlantUML = require('@mstroppel/remark-local-plantuml');
const math = require('remark-math');
const katex = require('rehype-katex');

const mdxPlugins = {
  // https://github.com/mstroppel/remark-local-plantuml/#integration
  remarkPlugins: [localPlantUML, math],
  // https://docusaurus.io/docs/2.x/markdown-features/math-equations#configuration
  rehypePlugins: [katex]
};
const docsCommonConfig = {
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
  ...mdxPlugins
};

module.exports = {
  title: 'Crazydan Studio',
  tagline: '让生活：更简单，更美好',
  url: 'https://studio.crazydan.org',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  organizationName: 'Crazydan Studio',
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
          to: 'docs/home/',
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
          type: 'dropdown',
          label: '开源代码',
          position: 'right',
          items: [
            {
              href: 'https://github.com/crazydan-studio',
              label: 'Github'
            },
            {
              href: 'https://code.studio.crazydan.org/explore/repos',
              label: 'Crazydan Studio Code'
            }
          ]
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
              label: 'Crazydan 主站',
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
              label: 'flytreeleft 的博客',
              href: 'https://flytreeleft.org'
            }
          ]
        }
      ],
      copyright: 'footer.copyright'
    },
    // https://github.com/flexanalytics/plugin-image-zoom
    imageZoom: {
      // CSS selector to apply the plugin to, defaults to '.markdown img'
      selector: '.markdown img, .project img',
      // Optional medium-zoom options
      // see: https://www.npmjs.com/package/medium-zoom#options
      options: {
        background: 'rgba(0, 0, 0, 0.5)',
        margin: 32,
        scrollOffset: 1000000
      }
    },
    // https://giscus.app/zh-CN
    // https://www.alanwang.site/posts/blog-guides/docusaurus-comment
    giscus: {
      repo: 'crazydan-studio/studio.crazydan.org',
      repoId: 'MDEwOlJlcG9zaXRvcnkzMDA3NzM1MTc=',
      category: 'Announcements',
      categoryId: 'DIC_kwDOEe1wjc4CU6If'
    },
    prism: {
      theme: require('./src/theme/prism/prismLight'),
      darkTheme: require('./src/theme/prism/prismDark'),
      // https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages
      // https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
      additionalLanguages: ['elm', 'elixir', 'erlang', 'bash', 'yaml', 'java']
    }
  },
  clientModules: [require.resolve('./src/clientModules/routeModules.ts')],
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css'
    }
  ],
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
        ...mdxPlugins,
        truncateMarker: /<!--\s*(more)\s*-->/,
        feedOptions: {
          type: null
        }
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        path: 'docs/home',
        routeBasePath: 'docs/home',
        sidebarPath: require.resolve('./docs/home/sidebars.js')
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-pangu-os',
        path: 'docs/pangu-os',
        routeBasePath: 'docs/pangu-os',
        sidebarPath: require.resolve('./docs/pangu-os/sidebars.js'),
        editUrl:
          'https://github.com/crazydan-studio/studio.crazydan.org/edit/master',
        ...docsCommonConfig
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-panshi-db',
        path: 'docs/panshi-db',
        routeBasePath: 'docs/panshi-db',
        sidebarPath: require.resolve('./docs/panshi-db/sidebars.js'),
        editUrl:
          'https://github.com/crazydan-studio/studio.crazydan.org/edit/master',
        ...docsCommonConfig
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-jingwei-store',
        path: 'docs/jingwei-store',
        routeBasePath: 'docs/jingwei-store',
        sidebarPath: require.resolve('./docs/jingwei-store/sidebars.js'),
        editUrl:
          'https://github.com/crazydan-studio/studio.crazydan.org/edit/master',
        ...docsCommonConfig
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-easy-ops',
        path: 'docs/easy-ops',
        routeBasePath: 'docs/easy-ops',
        sidebarPath: require.resolve('./docs/easy-ops/sidebars.js'),
        editUrl:
          'https://github.com/crazydan-studio/studio.crazydan.org/edit/master',
        ...docsCommonConfig
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-chat-with-ai',
        path: 'docs/chat-with-ai',
        routeBasePath: 'docs/chat-with-ai',
        sidebarPath: require.resolve('./docs/chat-with-ai/sidebars.js'),
        editUrl:
          'https://github.com/crazydan-studio/studio.crazydan.org/edit/master',
        ...docsCommonConfig
      }
    ],
    'plugin-image-zoom'
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
          ...mdxPlugins,
          truncateMarker: /<!--\s*(more)\s*-->/,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © 2014-${new Date().getFullYear()} Crazydan Studio.`
          }
        },
        docs: false
      }
    ]
  ]
};
