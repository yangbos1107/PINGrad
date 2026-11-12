import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import programCatalog, {regionSidebarItems} from './plugins/programCatalog';
import defaultSsrTemplate from '@docusaurus/core/lib/ssg/ssgTemplate.html';

// React 18 streaming SSR can insert NUL bytes into CJK text and anchor URLs.
// Remove them before HTML minification and search indexing, without rewriting content.
// https://github.com/facebook/docusaurus/issues/9985
const appHtmlSlot = '<%~ it.appHtml %>';
if (!defaultSsrTemplate.includes(appHtmlSlot)) {
  throw new Error('Recheck the React 18 SSR compatibility fix against the updated Docusaurus template.');
}
const ssrTemplate = defaultSsrTemplate.replace(appHtmlSlot, "<%~ it.appHtml.replace(/\\0/g, '') %>");

const githubRepoUrl = 'https://github.com/yangbos1107/PINGrad';
const siteUrl = process.env.DOCUSAURUS_URL ?? 'https://pingrad.app';
const baseUrl = process.env.DOCUSAURUS_BASE_URL ?? '/';
const favicon32Path = 'favicon-32x32.png?v=20260223';
const favicon16Path = 'favicon-16x16.png?v=20260223';
const appleTouchIconPath = 'apple-touch-icon.png?v=20260223';
// TODO: set TURNSTILE_SITE_KEY
const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? 'YOUR_TURNSTILE_SITE_KEY';

const config: Config = {
  title: 'PIN Grad – The PIN Graduate Network',
  tagline: 'Built by PIN students. Focused on outcomes & practical guides.',
  favicon: favicon32Path,
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `${baseUrl}${favicon16Path}`
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${baseUrl}${appleTouchIconPath}`
      }
    }
  ],

  url: siteUrl,
  baseUrl,
  ssrTemplate,
  storage: {type: 'localStorage', namespace: true},
  future: {
    faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: true,
      rspackPersistentCache: true,
      gitEagerVcs: true
    }
  },
  customFields: {
    turnstileSiteKey: '0x4AAAAAACg_m2RmfRjOjQBX'
  },

  organizationName: 'yangbos1107',
  projectName: 'PINGrad',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    }
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        htmlLang: 'zh-CN'
      },
      en: {
        label: 'English',
        htmlLang: 'en'
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
        language: ['en', 'zh'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true
      }
    ]
  ],

  plugins: [programCatalog],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator: regionSidebarItems,
          editUrl: `${githubRepoUrl}/edit/main/pingrad/`,
          showLastUpdateAuthor: false,
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
          to: '/',
          label: '选校导航',
          activeBaseRegex: '^/(?:en/)?(?:docs/(?:us|uk|hk|sg|au|cn)(?:/|$)|$)',
          position: 'left'
        },
        {
          to: '/datapoints',
          label: '录取情况',
          position: 'left'
        },
        {
          to: '/submit-dp',
          label: '分享申请结果',
          position: 'left'
        },
        {
          to: '/intro',
          label: '关于',
          position: 'left'
        },
        {
          type: 'search',
          position: 'right'
        },
        {
          href: githubRepoUrl,
          label: 'GitHub',
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
          title: '浏览',
          items: [
            {
              label: '选校导航',
              to: '/'
            },
            {
              label: '录取情况',
              to: '/datapoints'
            },
            {
              label: '分享申请结果',
              to: '/submit-dp'
            }
          ]
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: githubRepoUrl
            },
            {
              label: '贡献指南',
              to: '/intro#如何贡献'
            },
            {
              label: 'Discord 交流群',
              href: 'https://discord.gg/wJaMwqFRtu'
            }
          ]
        },
        {
          title: '更多',
          items: [
            {
              label: '资源',
              to: '/resources'
            },
            {
              label: '项目合集',
              to: '/projects'
            },
            {
              label: '联系',
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
