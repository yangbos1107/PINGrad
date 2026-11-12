import type {Plugin} from '@docusaurus/types';
import type {LoadedContent, PluginOptions} from '@docusaurus/plugin-content-docs';
import {compareSchoolNames, programRegion, type Program} from '../src/lib/programs';

export const regionSidebarItems: PluginOptions['sidebarItemsGenerator'] = ({item, docs}) =>
  docs
    .filter((doc) => doc.id.startsWith(`${item.dirName}/`) && programRegion(doc.id))
    .sort((a, b) => compareSchoolNames(a.title, b.title)
      || compareSchoolNames(a.frontMatter.sidebar_label ?? a.title, b.frontMatter.sidebar_label ?? b.title))
    .map((doc) => ({type: 'doc', id: doc.id}));

export default function programCatalog(): Plugin {
  return {
    name: 'pin-program-catalog',
    allContentLoaded({allContent, actions}) {
      const content = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent;
      const version = content?.loadedVersions.find((entry) => entry.versionName === 'current');
      if (!version) throw new Error('PIN Grad requires the current docs version to build its project directory.');

      const programs: Program[] = version.docs.flatMap((doc) => {
        const region = programRegion(doc.id);
        if (!region || doc.unlisted) return [];
        return [{
          id: doc.id,
          region,
          school: doc.title,
          label: doc.frontMatter.sidebar_label ?? doc.title,
          path: doc.permalink
        }];
      });
      actions.setGlobalData(programs);
    }
  };
}
