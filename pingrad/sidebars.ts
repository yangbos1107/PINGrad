import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type DifficultyKey = 's' | 'aplus' | 'a' | 'aminus' | 'bplus' | 'b' | 'bminus' | 'cplus';

const difficultyBucket = (label: string, linkId: string, items: string[]) => {
  if (items.length > 0) {
    return {
      type: 'category' as const,
      label,
      collapsible: true,
      collapsed: true,
      items
    };
  }

  return {
    type: 'category' as const,
    label,
    collapsible: true,
    collapsed: true,
    link: {
      type: 'doc' as const,
      id: linkId
    },
    items: []
  };
};

const difficultyBuckets = (itemsByTier: Partial<Record<DifficultyKey, string[]>>) => [
  difficultyBucket('S', 'tiers/s/index', itemsByTier.s ?? []),
  difficultyBucket('A+', 'tiers/aplus/index', itemsByTier.aplus ?? []),
  difficultyBucket('A', 'tiers/a/index', itemsByTier.a ?? []),
  difficultyBucket('A-', 'tiers/aminus/index', itemsByTier.aminus ?? []),
  difficultyBucket('B+', 'tiers/bplus/index', itemsByTier.bplus ?? []),
  difficultyBucket('B', 'tiers/b/index', itemsByTier.b ?? []),
  difficultyBucket('B-', 'tiers/bminus/index', itemsByTier.bminus ?? []),
  difficultyBucket('C+', 'tiers/cplus/index', itemsByTier.cplus ?? [])
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
          items: difficultyBuckets({
            s: [
              'tiers/uk/s/university-of-cambridge',
              'tiers/uk/s/university-of-oxford',
              'tiers/uk/s/imperial-college-london'
            ],
            aplus: [
              'tiers/uk/aplus/university-college-london',
              'tiers/uk/aplus/university-of-manchester'
            ],
            a: [
              'tiers/uk/a/university-of-edinburgh',
              'tiers/uk/a/university-of-southampton'
            ],
            aminus: [
              'tiers/uk/aminus/university-of-warwick',
              'tiers/uk/aminus/university-of-glasgow'
            ],
            bplus: [
              'tiers/uk/bplus/university-of-nottingham',
              'tiers/uk/bplus/university-of-leeds',
              'tiers/uk/bplus/university-of-sheffield',
              'tiers/uk/bplus/university-of-birmingham',
              'tiers/uk/bplus/queen-mary-university-of-london'
            ]
          })
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
