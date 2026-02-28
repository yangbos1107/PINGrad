import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type ZoneKey = 'zone-v' | 'zone-iv' | 'zone-iii' | 'zone-ii' | 'zone-i';
type RankedRegionKey = 'us' | 'uk';

const zoneBucket = (region: RankedRegionKey, label: string, zone: ZoneKey, items: string[]) => {
  return {
    type: 'category' as const,
    label,
    collapsible: true,
    collapsed: true,
    link: {
      type: 'doc' as const,
      id: `regions/${region}/${zone}/index`
    },
    items
  };
};

const zoneBuckets = (region: RankedRegionKey, itemsByZone: Partial<Record<ZoneKey, string[]>>) => [
  zoneBucket(region, 'Zone V', 'zone-v', itemsByZone['zone-v'] ?? []),
  zoneBucket(region, 'Zone IV', 'zone-iv', itemsByZone['zone-iv'] ?? []),
  zoneBucket(region, 'Zone III', 'zone-iii', itemsByZone['zone-iii'] ?? []),
  zoneBucket(region, 'Zone II', 'zone-ii', itemsByZone['zone-ii'] ?? []),
  zoneBucket(region, 'Zone I', 'zone-i', itemsByZone['zone-i'] ?? [])
];

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '项目地区与录取难度导航',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: '美国',
          link: {
            type: 'doc',
            id: 'regions/us/index'
          },
          items: zoneBuckets('us', {
            'zone-v': [
              'regions/us/zone-v/massachusetts-institute-of-technology',
              'regions/us/zone-v/stanford-university',
              'regions/us/zone-v/california-institute-of-technology',
              'regions/us/zone-v/university-of-california-berkeley',
              'regions/us/zone-v/princeton-university',
              'regions/us/zone-v/yale-university',
              'regions/us/zone-v/carnegie-mellon-university',
              'regions/us/zone-v/university-of-california-los-angeles',
              'regions/us/zone-v/university-of-illinois-urbana-champaign',
              'regions/us/zone-v/georgia-institute-of-technology',
              'regions/us/zone-v/university-of-california-berkeley-meng',
              'regions/us/zone-v/cornell-university'
            ],
            'zone-iv': [
              'regions/us/zone-iv/university-of-michigan-ann-arbor',
              'regions/us/zone-iv/columbia-university',
              'regions/us/zone-iv/purdue-university-main-campus',
              'regions/us/zone-iv/university-of-washington',
              'regions/us/zone-iv/university-of-texas-austin',
              'regions/us/zone-iv/university-of-pennsylvania',
              'regions/us/zone-iv/johns-hopkins-university',
              'regions/us/zone-iv/duke-university',
              'regions/us/zone-iv/harvard-university',
              'regions/us/zone-iv/university-of-southern-california',
              'regions/us/zone-iv/northwestern-university',
              'regions/us/zone-iv/northwestern-university-msce',
              'regions/us/zone-iv/rice-university',
              'regions/us/zone-iv/university-of-california-davis',
              'regions/us/zone-iv/university-of-wisconsin-madison',
              'regions/us/zone-iv/brown-university',
              'regions/us/zone-iv/university-of-illinois-urbana-champaign-meng',
              'regions/us/zone-iv/the-pennsylvania-state-university',
              'regions/us/zone-iv/texas-a-and-m-university-college-station'
            ],
            'zone-iii': [
              'regions/us/zone-iii/new-york-university',
              'regions/us/zone-iii/new-york-university-msce',
              'regions/us/zone-iii/university-of-washington-pmp',
              'regions/us/zone-iii/washington-university-in-st-louis',
              'regions/us/zone-iii/university-of-maryland-college-park',
              'regions/us/zone-iii/ohio-state-university',
              'regions/us/zone-iii/university-of-california-santa-barbara',
              'regions/us/zone-iii/university-of-southern-california'
            ],
            'zone-ii': [
              'regions/us/zone-ii/university-of-california-irvine',
              'regions/us/zone-ii/university-of-minnesota-twin-cities',
              'regions/us/zone-ii/northeastern-university',
              'regions/us/zone-ii/rutgers-the-state-university-of-new-jersey',
              'regions/us/zone-ii/university-of-massachusetts-amherst',
              'regions/us/zone-ii/university-of-pittsburgh',
              'regions/us/zone-ii/stony-brook-university-suny',
              'regions/us/zone-ii/george-washington-university'
            ],
            'zone-i': []
          })
        },
        {
          type: 'category',
          label: '英国',
          link: {
            type: 'doc',
            id: 'regions/uk/index'
          },
          items: zoneBuckets('uk', {
            'zone-v': [
              'regions/uk/zone-v/university-of-cambridge',
              'regions/uk/zone-v/university-of-oxford'
            ],
            'zone-iv': [
              'regions/uk/zone-iv/imperial-college-london',
              'regions/uk/zone-iv/university-college-london',
              'regions/uk/zone-iv/university-of-edinburgh'
            ],
            'zone-iii': [
              'regions/uk/zone-iii/university-of-warwick',
              'regions/uk/zone-iii/university-of-manchester',
              'regions/uk/zone-iii/university-of-southampton'
            ],
            'zone-ii': [
              'regions/uk/zone-ii/university-of-glasgow',
              'regions/uk/zone-ii/university-of-nottingham',
              'regions/uk/zone-ii/university-of-leeds',
              'regions/uk/zone-ii/university-of-birmingham'
            ],
            'zone-i': [
              'regions/uk/zone-i/university-of-sheffield',
              'regions/uk/zone-i/queen-mary-university-of-london'
            ]
          })
        },
        {
          type: 'category',
          label: '香港',
          link: {
            type: 'doc',
            id: 'regions/hk/index'
          },
          items: [
            'regions/hk/schools/hong-kong-university-of-science-and-technology',
            'regions/hk/schools/university-of-hong-kong',
            'regions/hk/schools/chinese-university-of-hong-kong',
            'regions/hk/schools/city-university-of-hong-kong',
            'regions/hk/schools/hong-kong-polytechnic-university'
          ]
        },
        {
          type: 'category',
          label: '新加坡',
          link: {
            type: 'doc',
            id: 'regions/sg/index'
          },
          items: [
            'regions/sg/schools/national-university-of-singapore',
            'regions/sg/schools/nanyang-technological-university'
          ]
        },
        {
          type: 'category',
          label: '澳洲',
          link: {
            type: 'doc',
            id: 'regions/au/index'
          },
          items: [
            'regions/au/schools/university-of-new-south-wales',
            'regions/au/schools/university-of-melbourne',
            'regions/au/schools/university-of-sydney',
            'regions/au/schools/australian-national-university'
          ]
        }
      ]
    }
  ]
};

export default sidebars;
