import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type DifficultyKey = 's' | 'aplus' | 'a' | 'aminus' | 'bplus' | 'b' | 'bminus' | 'cplus';

const difficultyBuckets = (itemsByTier: Partial<Record<DifficultyKey, string[]>>) => [
  {
    type: 'category' as const,
    label: 'S',
    link: {
      type: 'doc' as const,
      id: 'tiers/s/index'
    },
    items: itemsByTier.s ?? []
  },
  {
    type: 'category' as const,
    label: 'A+',
    link: {
      type: 'doc' as const,
      id: 'tiers/aplus/index'
    },
    items: itemsByTier.aplus ?? []
  },
  {
    type: 'category' as const,
    label: 'A',
    link: {
      type: 'doc' as const,
      id: 'tiers/a/index'
    },
    items: itemsByTier.a ?? []
  },
  {
    type: 'category' as const,
    label: 'A-',
    link: {
      type: 'doc' as const,
      id: 'tiers/aminus/index'
    },
    items: itemsByTier.aminus ?? []
  },
  {
    type: 'category' as const,
    label: 'B+',
    link: {
      type: 'doc' as const,
      id: 'tiers/bplus/index'
    },
    items: itemsByTier.bplus ?? []
  },
  {
    type: 'category' as const,
    label: 'B',
    link: {
      type: 'doc' as const,
      id: 'tiers/b/index'
    },
    items: itemsByTier.b ?? []
  },
  {
    type: 'category' as const,
    label: 'B-',
    link: {
      type: 'doc' as const,
      id: 'tiers/bminus/index'
    },
    items: itemsByTier.bminus ?? []
  },
  {
    type: 'category' as const,
    label: 'C+',
    link: {
      type: 'doc' as const,
      id: 'tiers/cplus/index'
    },
    items: itemsByTier.cplus ?? []
  }
];

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '项目地区与难度导航',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: '美国',
          items: difficultyBuckets({
            s: [
              'tiers/us/s/stanford-university',
              'tiers/us/s/california-institute-of-technology',
              'tiers/us/s/university-of-california-berkeley'
            ],
            aplus: [
              'tiers/us/aplus/yale-university',
              'tiers/us/aplus/carnegie-mellon-university',
              'tiers/us/aplus/university-of-california-los-angeles',
              'tiers/us/aplus/university-of-illinois-urbana-champaign',
              'tiers/us/aplus/georgia-institute-of-technology',
              'tiers/us/aplus/university-of-california-berkeley-meng',
              'tiers/us/aplus/cornell-university'
            ],
            a: [
              'tiers/us/a/columbia-university',
              'tiers/us/a/purdue-university-main-campus',
              'tiers/us/a/university-of-washington',
              'tiers/us/a/university-of-texas-austin',
              'tiers/us/a/university-of-pennsylvania',
              'tiers/us/a/johns-hopkins-university',
              'tiers/us/a/duke-university'
            ],
            aminus: [
              'tiers/us/aminus/university-of-southern-california',
              'tiers/us/aminus/northwestern-university',
              'tiers/us/aminus/northwestern-university-msce',
              'tiers/us/aminus/rice-university',
              'tiers/us/aminus/university-of-california-davis',
              'tiers/us/aminus/university-of-wisconsin-madison',
              'tiers/us/aminus/brown-university',
              'tiers/us/aminus/university-of-illinois-urbana-champaign-meng',
              'tiers/us/aminus/the-pennsylvania-state-university',
              'tiers/us/aminus/texas-a-and-m-university-college-station'
            ],
            bplus: [
              'tiers/us/bplus/new-york-university',
              'tiers/us/bplus/new-york-university-msce',
              'tiers/us/bplus/university-of-washington-pmp',
              'tiers/us/bplus/washington-university-in-st-louis',
              'tiers/us/bplus/university-of-maryland-college-park',
              'tiers/us/bplus/ohio-state-university',
              'tiers/us/bplus/university-of-california-santa-barbara',
              'tiers/us/bplus/university-of-southern-california'
            ],
            b: [
              'tiers/us/b/university-of-california-irvine',
              'tiers/us/b/university-of-minnesota-twin-cities',
              'tiers/us/b/northeastern-university',
              'tiers/us/b/rutgers-the-state-university-of-new-jersey',
              'tiers/us/b/university-of-massachusetts-amherst',
              'tiers/us/b/university-of-pittsburgh',
              'tiers/us/b/stony-brook-university-suny',
              'tiers/us/b/george-washington-university'
            ]
          })
        },
        {
          type: 'category',
          label: '英国',
          items: difficultyBuckets({})
        },
        {
          type: 'category',
          label: '香港',
          items: difficultyBuckets({})
        },
        {
          type: 'category',
          label: '新加坡',
          items: difficultyBuckets({})
        },
        {
          type: 'category',
          label: '澳洲',
          items: difficultyBuckets({})
        }
      ]
    }
  ]
};

export default sidebars;
