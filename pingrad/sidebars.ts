import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'DataPoints',
      link: {
        type: 'doc',
        id: 'datapoints/intro'
      },
      items: ['datapoints/outcomes', 'datapoints/admission']
    },
    {
      type: 'category',
      label: '申请跟踪',
      link: {
        type: 'doc',
        id: 'tracking/intro'
      },
      items: ['tracking/timeline', 'tracking/checklist']
    },
    {
      type: 'category',
      label: '资源（Resources）',
      link: {
        type: 'doc',
        id: 'resources/index'
      },
      items: ['resources/docs', 'resources/templates']
    },
    {
      type: 'category',
      label: '项目合集（Projects）',
      link: {
        type: 'doc',
        id: 'projects/index'
      },
      items: ['projects/project-list']
    },
    {
      type: 'category',
      label: '找我 / 加入（Contact / Join）',
      link: {
        type: 'doc',
        id: 'join/index'
      },
      items: ['join/contact']
    },
    {
      type: 'category',
      label: 'PIN 梯度导航',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'S',
          link: {
            type: 'doc',
            id: 'tiers/s/index'
          },
          items: ['tiers/s/stanford-university', 'tiers/s/california-institute-of-technology']
        },
        {
          type: 'category',
          label: 'A+',
          link: {
            type: 'doc',
            id: 'tiers/aplus/index'
          },
          items: [
            'tiers/aplus/carnegie-mellon-university',
            'tiers/aplus/university-of-pennsylvania',
            'tiers/aplus/columbia-university',
            'tiers/aplus/university-of-california-berkeley',
            'tiers/aplus/yale-university',
            'tiers/aplus/johns-hopkins-university',
            'tiers/aplus/duke-university'
          ]
        },
        {
          type: 'category',
          label: 'A',
          link: {
            type: 'doc',
            id: 'tiers/a/index'
          },
          items: [
            'tiers/a/university-of-california-los-angeles',
            'tiers/a/northwestern-university',
            'tiers/a/northwestern-university-msce',
            'tiers/a/university-of-illinois-urbana-champaign',
            'tiers/a/georgia-institute-of-technology',
            'tiers/a/rice-university',
            'tiers/a/university-of-texas-austin',
            'tiers/aplus/cornell-university',
            'tiers/a/university-of-california-berkeley-meng'
          ]
        },
        {
          type: 'category',
          label: 'A-',
          link: {
            type: 'doc',
            id: 'tiers/aminus/index'
          },
          items: [
            'tiers/aminus/university-of-southern-california',
            'tiers/aminus/university-of-washington',
            'tiers/aminus/purdue-university-main-campus',
            'tiers/aminus/university-of-california-davis',
            'tiers/aminus/university-of-wisconsin-madison',
            'tiers/aminus/brown-university',
            'tiers/aminus/university-of-illinois-urbana-champaign-meng'
          ]
        },
        {
          type: 'category',
          label: 'B+',
          link: {
            type: 'doc',
            id: 'tiers/bplus/index'
          },
          items: [
            'tiers/bplus/new-york-university',
            'tiers/bplus/new-york-university-msce',
            'tiers/bplus/washington-university-in-st-louis',
            'tiers/bplus/university-of-maryland-college-park',
            'tiers/bplus/the-pennsylvania-state-university',
            'tiers/bplus/texas-a-and-m-university-college-station',
            'tiers/bplus/ohio-state-university',
            'tiers/bplus/university-of-california-santa-barbara'
          ]
        },
        {
          type: 'category',
          label: 'B',
          link: {
            type: 'doc',
            id: 'tiers/b/index'
          },
          items: ['tiers/b/university-of-california-irvine', 'tiers/b/university-of-minnesota-twin-cities']
        },
        {
          type: 'category',
          label: 'B-',
          link: {
            type: 'doc',
            id: 'tiers/bminus/index'
          },
          items: [
            'tiers/bminus/northeastern-university',
            'tiers/bminus/rutgers-the-state-university-of-new-jersey',
            'tiers/bminus/university-of-massachusetts-amherst'
          ]
        },
        {
          type: 'category',
          label: 'C+',
          link: {
            type: 'doc',
            id: 'tiers/cplus/index'
          },
          items: [
            'tiers/cplus/university-of-pittsburgh',
            'tiers/cplus/stony-brook-university-suny',
            'tiers/cplus/george-washington-university'
          ]
        }
      ]
    }
  ]
};

export default sidebars;
