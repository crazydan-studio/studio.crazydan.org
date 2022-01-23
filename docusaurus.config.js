module.exports = {
  title: 'Crazydan Studio',
  tagline: 'Make life easier and happier.',
  url: 'https://studio.crazydan.org',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  organizationName: 'crazydan-studio',
  projectName: 'studio.crazydan.org',
  themeConfig: {
    navbar: {
      title: 'Crazydan Studio',
      logo: {
        alt: 'Crazydan Studio',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'projects/',
          activeBasePath: 'projects',
          label: 'Projects',
          position: 'right',
        },
        {
          to: 'blog/',
          activeBasePath: 'blog',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://book.crazydan.org',
          label: 'Book',
          position: 'right',
        },
        {
          href: 'https://code.studio.crazydan.org/explore/repos',
          label: 'Open Source',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Our',
          items: [
            {
              label: 'Crazydan\'s Home',
              href: 'https://crazydan.org',
            },
            {
              label: 'Crazydan\'s Book',
              href: 'https://book.crazydan.org',
            },
          ],
        },
        {
          title: 'Site',
          items: [
            {
              label: '百家',
              href: 'https://baijia.link',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'flytreeleft\'s Blog',
              href: 'https://flytreeleft.org',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Crazydan Studio.<br>Built with <a href="https://v2.docusaurus.io/">Docusaurus 2</a>.`,
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'projects',
        path: 'projects',
        routeBasePath: 'projects',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
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
            copyright: `Copyright © ${new Date().getFullYear()} Crazydan Studio.`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
