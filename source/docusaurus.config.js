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
      links: [
        // {
        //   to: 'docs/',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        // {to: 'blog', label: 'Blog', position: 'left'},
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
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // docs: {
        //   // It is recommended to set document id as docs home page (`docs/` path).
        //   homePageId: 'doc1',
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/',
        // },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
