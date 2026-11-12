export const regions = [
  {id: 'us', label: '美国'},
  {id: 'uk', label: '英国'},
  {id: 'hk', label: '香港'},
  {id: 'sg', label: '新加坡'},
  {id: 'au', label: '澳洲'},
  {id: 'cn', label: '国内'}
] as const;

export type RegionId = (typeof regions)[number]['id'];

export type Program = {
  id: string;
  region: RegionId;
  school: string;
  label: string;
  path: string;
};

export function programRegion(id: string): RegionId | undefined {
  if (id.endsWith('/index')) return undefined;
  return regions.find((region) => id.startsWith(`regions/${region.id}/`))?.id;
}

const collator = new Intl.Collator('zh-Hans', {sensitivity: 'base', numeric: true});

export function compareSchoolNames(a: string, b: string): number {
  return collator.compare(a.replace(/^the\s+/i, ''), b.replace(/^the\s+/i, ''));
}

export function groupPrograms(programs: Program[], region: RegionId, query = '') {
  const terms = query.normalize('NFKC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const schools = new Map<string, Program[]>();

  for (const program of programs) {
    if (program.region !== region) continue;
    const searchable = `${program.school} ${program.label}`.normalize('NFKC').toLocaleLowerCase();
    if (!terms.every((term) => searchable.includes(term))) continue;
    const entries = schools.get(program.school) ?? [];
    entries.push(program);
    schools.set(program.school, entries);
  }

  return [...schools.entries()]
    .sort(([a], [b]) => compareSchoolNames(a, b))
    .map(([school, entries]) => ({
      school,
      programs: entries.sort((a, b) => collator.compare(a.label, b.label))
    }));
}
