import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const githubRepoUrl = 'https://github.com/YOUR_GITHUB/pingrad';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'pingrad';

const config: Config = {
  title: 'PIN Grad – The PIN Graduate Network',
  tagline: 'Built by PIN students. Focused on outcomes & practical guides.',
  favicon: 'img/pin-grad.ico',

  url: process.env.DOCUSAURUS_URL ?? 'https://example.com',
  baseUrl: process.env.DOCUSAURUS_BASE_URL ?? (isGitHubActions ? `/${repoName}/` : '/'),

  organizationName: 'YOUR_GITHUB',
  projectName: 'pingrad',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文',
        htmlLang: 'zh-CN'
      }
    }
  },

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        language: ['zh'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true
      }
    ]
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `${githubRepoUrl}/edit/main/`,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  themeConfig: {
    image: 'img/pin-social-card.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },
    navbar: {
      title: 'PIN Grad',
      logo: {
        alt: 'PIN Grad Logo',
        src: 'img/pin-grad.png'
      },
      hideOnScroll: false,
      items: [
        {
          to: '/docs/intro',
          label: '项目介绍',
          position: 'left'
        },
        {
          to: '/datapoints',
          label: 'DataPoints',
          position: 'left'
        },
        {
          to: '/tracker',
          label: '申请跟踪',
          position: 'left'
        },
        {
          href: githubRepoUrl,
          label: 'GitHub',
          position: 'right'
        },
        {
          type: 'search',
          position: 'right'
        }
      ]
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false
      }
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '项目介绍',
              to: '/docs/intro'
            },
            {
              label: 'DataPoints',
              to: '/docs/datapoints/intro'
            },
            {
              label: '申请跟踪',
              to: '/docs/tracking/intro'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: githubRepoUrl
            },
            {
              label: '贡献指南',
              to: '/docs/join'
            },
            {
              label: 'Discord 交流群',
              href: 'https://discord.gg/sYRnn3JvWm'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: '资源',
              to: '/resources'
            },
            {
              label: '项目合集',
              to: '/docs/projects'
            },
            {
              label: 'Contact',
              to: '/contact'
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PIN Grad.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml']
    }
  } satisfies Preset.ThemeConfig
};

export default config;
