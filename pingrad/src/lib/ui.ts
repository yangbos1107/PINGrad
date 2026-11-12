import {translate} from '@docusaurus/Translate';
import type {RegionId} from './programs';

export function regionLabel(region: RegionId): string {
  const labels: Record<RegionId, string> = {
    us: translate({id: 'region.us', message: '美国'}),
    uk: translate({id: 'region.uk', message: '英国'}),
    hk: translate({id: 'region.hk', message: '香港'}),
    sg: translate({id: 'region.sg', message: '新加坡'}),
    au: translate({id: 'region.au', message: '澳洲'}),
    cn: translate({id: 'region.cn', message: '国内'})
  };
  return labels[region];
}

export function regionTitle(region: RegionId): string {
  return translate({id: 'directory.title', message: '{region}项目'}, {region: regionLabel(region)});
}
