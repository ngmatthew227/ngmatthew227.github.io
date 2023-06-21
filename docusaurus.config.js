// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Matt's Wiki",
  tagline: 'Dinosaurs are cool',
  favicon: 'img/otter_icon.ico',

  // Set the production url of your site here
  url: 'https://ngmatthew227.github.io/',
  baseUrl: '/',
  deploymentBranch: 'gh-pages',

  // GitHub Pages settings
  organizationName: 'ngmatthew227',
  projectName: 'ngmatthew227.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/space-otter.css')],
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getting-started',
        path: 'wiki/getting-started',
        routeBasePath: 'getting-started',
        sidebarPath: require.resolve('./sidebars.js'),
        // editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'java',
        path: 'wiki/java',
        routeBasePath: 'java',
        sidebarPath: require.resolve('./sidebars.js'),
        // editUrl: "https://git.7wate.com/zhouzhongping/wiki/src/branch/master",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        breadcrumbs: true,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/otter_icon.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/otter_icon.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/otter_icon.svg',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/otter_icon.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: "Matt's Wiki",
        hideOnScroll: false,
        logo: {
          alt: "Matt's Wiki Logo",
          src: 'img/otter_icon.svg',
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "right",
          //   label: "Tutorial",
          // },
          {
            position: 'right',
            label: '👨🏻‍🎓 WiKi',
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
              {
                label: 'Java',
                to: '/java',
              },
            ],
          },
          {
            label: '🛠Resources',
            position: 'right',
            to: '/resources',
          },
          { to: '/blog', label: 'Blog', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Matt's Wiki, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // defaultLanguage: "markdown",
        // additionalLanguages: ["java", "git", "nginx", "http"],
      },
      colorMode: {
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
