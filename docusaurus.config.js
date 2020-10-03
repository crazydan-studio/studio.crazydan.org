module.exports = {
  title: 'Crazydan Studio',
  tagline: 'Make life easier and happier.',
  url: 'https://crazydan.org',
  baseUrl: '/',
  favicon: 'img/logo.png',
  organizationName: 'crazydan-studio',
  projectName: 'crazydan.org',
  themeConfig: {
    navbar: {
      title: 'Crazydan Studio',
      logo: {
        alt: 'Crazydan Studio',
        src: 'img/logo.png',
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
          href: 'https://git.crazydan.org/explore/repos',
          label: 'Open Source',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     // {
        //     //   label: 'Style Guide',
        //     //   to: 'docs/',
        //     // },
        //     // {
        //     //   label: 'Second Doc',
        //     //   to: 'docs/doc2/',
        //     // },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     // {
        //     //   label: 'Stack Overflow',
        //     //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     // },
        //     // {
        //     //   label: 'Discord',
        //     //   href: 'https://discordapp.com/invite/docusaurus',
        //     // },
        //     // {
        //     //   label: 'Twitter',
        //     //   href: 'https://twitter.com/docusaurus',
        //     // },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     // {
        //     //   label: 'Blog',
        //     //   to: 'blog',
        //     // },
        //     // {
        //     //   label: 'GitHub',
        //     //   href: 'https://github.com/facebook/docusaurus',
        //     // },
        //   ],
        // },
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
