import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '项目难度梯度导航',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'S',
          link: {
            type: 'doc',
            id: 'tiers/s/index'
          },
          items: [
            'tiers/s/stanford-university',
            'tiers/s/california-institute-of-technology',
            'tiers/s/university-of-california-berkeley'
          ]
        },
        {
          type: 'category',
          label: 'A+',
          link: {
            type: 'doc',
            id: 'tiers/aplus/index'
          },
          items: [
            'tiers/aplus/yale-university',
            'tiers/aplus/carnegie-mellon-university',
            'tiers/aplus/university-of-california-los-angeles',
            'tiers/aplus/university-of-illinois-urbana-champaign',
            'tiers/aplus/georgia-institute-of-technology',
            'tiers/aplus/university-of-california-berkeley-meng',
            'tiers/aplus/cornell-university'
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
            'tiers/a/columbia-university',
            'tiers/a/purdue-university-main-campus',
            'tiers/a/university-of-washington',
            'tiers/a/university-of-texas-austin',
            'tiers/a/university-of-pennsylvania',
            'tiers/a/johns-hopkins-university',
            'tiers/a/duke-university'
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
            'tiers/aminus/northwestern-university',
            'tiers/aminus/northwestern-university-msce',
            'tiers/aminus/rice-university',
            'tiers/aminus/university-of-california-davis',
            'tiers/aminus/university-of-wisconsin-madison',
            'tiers/aminus/brown-university',
            'tiers/aminus/university-of-illinois-urbana-champaign-meng',
            'tiers/aminus/the-pennsylvania-state-university',
            'tiers/aminus/texas-a-and-m-university-college-station'
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
            'tiers/bplus/university-of-washington-pmp',
            'tiers/bplus/washington-university-in-st-louis',
            'tiers/bplus/university-of-maryland-college-park',
            'tiers/bplus/ohio-state-university',
            'tiers/bplus/university-of-california-santa-barbara',
            'tiers/bplus/university-of-southern-california'
          ]
        },
        {
          type: 'category',
          label: 'B',
          link: {
            type: 'doc',
            id: 'tiers/b/index'
          },
          items: [
            'tiers/b/university-of-california-irvine',
            'tiers/b/university-of-minnesota-twin-cities',
            'tiers/b/northeastern-university',
            'tiers/b/rutgers-the-state-university-of-new-jersey',
            'tiers/b/university-of-massachusetts-amherst',
            'tiers/b/university-of-pittsburgh',
            'tiers/b/stony-brook-university-suny',
            'tiers/b/george-washington-university'
          ]
        },
        {
          type: 'category',
          label: 'B-',
          link: {
            type: 'doc',
            id: 'tiers/bminus/index'
          },
          items: []
        },
        {
          type: 'category',
          label: 'C+',
          link: {
            type: 'doc',
            id: 'tiers/cplus/index'
          },
          items: []
        }
      ]
    }
  ]
};

export default sidebars;
