import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type DifficultyKey = 's' | 'aplus' | 'a' | 'aminus' | 'bplus' | 'b' | 'bminus' | 'cplus';
type RegionKey = 'us' | 'uk' | 'hk' | 'sg' | 'au';

const difficultyBucket = (region: RegionKey, label: string, tier: DifficultyKey, items: string[]) => {
  return {
    type: 'category' as const,
    label,
    collapsible: true,
    collapsed: true,
    link: {
      type: 'doc' as const,
      id: `tiers/${region}/${tier}/index`
    },
    items
  };
};

const difficultyBuckets = (region: RegionKey, itemsByTier: Partial<Record<DifficultyKey, string[]>>) => [
  difficultyBucket(region, 'S', 's', itemsByTier.s ?? []),
  difficultyBucket(region, 'A+', 'aplus', itemsByTier.aplus ?? []),
  difficultyBucket(region, 'A', 'a', itemsByTier.a ?? []),
  difficultyBucket(region, 'A-', 'aminus', itemsByTier.aminus ?? []),
  difficultyBucket(region, 'B+', 'bplus', itemsByTier.bplus ?? []),
  difficultyBucket(region, 'B', 'b', itemsByTier.b ?? []),
  difficultyBucket(region, 'B-', 'bminus', itemsByTier.bminus ?? []),
  difficultyBucket(region, 'C+', 'cplus', itemsByTier.cplus ?? [])
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
          link: {
            type: 'doc',
            id: 'tiers/us/index'
          },
          items: difficultyBuckets('us', {
            s: [
              'tiers/us/s/massachusetts-institute-of-technology',
              'tiers/us/s/stanford-university',
              'tiers/us/s/california-institute-of-technology',
              'tiers/us/s/university-of-california-berkeley'
            ],
            aplus: [
              'tiers/us/aplus/princeton-university',
              'tiers/us/aplus/yale-university',
              'tiers/us/aplus/carnegie-mellon-university',
              'tiers/us/aplus/university-of-california-los-angeles',
              'tiers/us/aplus/university-of-illinois-urbana-champaign',
              'tiers/us/aplus/georgia-institute-of-technology',
              'tiers/us/aplus/university-of-california-berkeley-meng',
              'tiers/us/aplus/cornell-university'
            ],
            a: [
              'tiers/us/a/university-of-michigan-ann-arbor',
              'tiers/us/a/columbia-university',
              'tiers/us/a/purdue-university-main-campus',
              'tiers/us/a/university-of-washington',
              'tiers/us/a/university-of-texas-austin',
              'tiers/us/a/university-of-pennsylvania',
              'tiers/us/a/johns-hopkins-university',
              'tiers/us/a/duke-university'
            ],
            aminus: [
              'tiers/us/aminus/harvard-university',
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
          link: {
            type: 'doc',
            id: 'tiers/uk/index'
          },
          items: difficultyBuckets('uk', {
            s: [
              'tiers/uk/s/university-of-cambridge',
              'tiers/uk/s/university-of-oxford',
            ],
            a: [
              'tiers/uk/a/imperial-college-london'
            ],
            aminus: [
              'tiers/uk/aminus/university-college-london',
              'tiers/uk/aminus/university-of-edinburgh'
            ],
            bplus: [
              'tiers/uk/bplus/university-of-warwick',
              'tiers/uk/bplus/university-of-manchester',
              'tiers/uk/bplus/university-of-southampton'
            ],
            b: [
              'tiers/uk/b/university-of-glasgow',
              'tiers/uk/b/university-of-nottingham',
              'tiers/uk/b/university-of-leeds',
              'tiers/uk/b/university-of-birmingham',
            ],
            bminus: [
              'tiers/uk/bminus/university-of-sheffield',
              'tiers/uk/bminus/queen-mary-university-of-london'
            ]
          })
        },
        {
          type: 'category',
          label: '香港',
          link: {
            type: 'doc',
            id: 'tiers/hk/index'
          },
          items: difficultyBuckets('hk', {
            a: [
              'tiers/hk/a/hong-kong-university-of-science-and-technology'
            ],
            aminus: [
              'tiers/hk/aminus/university-of-hong-kong'
            ],
            bplus: [
              'tiers/hk/bplus/chinese-university-of-hong-kong'
            ],
            b: [
              'tiers/hk/b/city-university-of-hong-kong',
              'tiers/hk/b/hong-kong-polytechnic-university'
            ]
          })
        },
        {
          type: 'category',
          label: '新加坡',
          link: {
            type: 'doc',
            id: 'tiers/sg/index'
          },
          items: difficultyBuckets('sg', {
            a: [
              'tiers/sg/a/national-university-of-singapore'
            ],
            aminus: [
              'tiers/sg/aminus/nanyang-technological-university'
            ]
          })
        },
        {
          type: 'category',
          label: '澳洲',
          link: {
            type: 'doc',
            id: 'tiers/au/index'
          },
          items: difficultyBuckets('au', {
            bminus: [
              'tiers/au/bminus/university-of-new-south-wales'
            ],
            cplus: [
              'tiers/au/cplus/university-of-melbourne',
              'tiers/au/cplus/university-of-sydney',
              'tiers/au/cplus/australian-national-university'
            ]
          })
        }
      ]
    }
  ]
};

export default sidebars;
