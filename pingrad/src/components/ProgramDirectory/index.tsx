import React, {useId, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata, usePluralForm} from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import {usePluginData} from '@docusaurus/useGlobalData';
import {groupPrograms, regions, type Program, type RegionId} from '@site/src/lib/programs';
import {regionLabel, regionTitle} from '@site/src/lib/ui';

export function RegionIntroduction({region}: {region: RegionId}): React.JSX.Element {
  const title = regionTitle(region);
  const description = region === 'cn'
    ? translate({id: 'directory.order.pinyin', message: '按校名拼音排列。具体申请要求与经验见项目页。'})
    : translate({id: 'directory.order.alphabetical', message: '按学校英文名 A–Z 排列。具体申请要求与经验见项目页。'});
  return <><PageMetadata title={title} description={description} /><Heading as="h1">{title}</Heading><p>{description}</p></>;
}

function ProgramCount({schools, programs}: {schools: number; programs: number}): React.JSX.Element {
  const {selectMessage} = usePluralForm();
  return <>{selectMessage(schools, translate({id: 'directory.schools', message: '{count} 所学校'}, {count: schools}))} · {selectMessage(programs, translate({id: 'directory.programs', message: '{count} 个项目'}, {count: programs}))}</>;
}

export function RegionLinks({current}: {current?: RegionId}): React.JSX.Element {
  return (
    <nav className="pin-region-nav" aria-label={translate({id: 'directory.regions', message: '项目地区'})}>
      {regions.map((region) => (
        <Link key={region.id} to={`/docs/${region.id}`} aria-current={current === region.id ? 'page' : undefined}>
          {regionLabel(region.id)}
        </Link>
      ))}
    </nav>
  );
}

export function RegionDirectory(): React.JSX.Element {
  const programs = usePluginData('pin-program-catalog') as Program[];
  return (
    <ul className="pin-region-list">
      {regions.map((region) => {
        const entries = programs.filter((program) => program.region === region.id);
        const schoolCount = new Set(entries.map((program) => program.school)).size;
        return (
          <li key={region.id}>
            <Link to={`/docs/${region.id}`}>
              <span>{regionLabel(region.id)}</span>
              <span className="pin-region-count"><ProgramCount schools={schoolCount} programs={entries.length} /></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function ProgramDirectory({region}: {region: RegionId}): React.JSX.Element {
  const programs = usePluginData('pin-program-catalog') as Program[];
  const [query, setQuery] = useState('');
  const inputId = useId();
  const searchInput = useRef<HTMLInputElement>(null);
  const schools = groupPrograms(programs, region, query);
  const total = schools.reduce((count, school) => count + school.programs.length, 0);

  function clearSearch() {
    setQuery('');
    searchInput.current?.focus();
  }

  return (
    <div className="pin-directory">
      <RegionLinks current={region} />
      <div className="pin-directory-search">
        <label htmlFor={inputId}><Translate id="directory.search">搜索学校或项目</Translate></label>
        <input
          ref={searchInput}
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={region === 'cn'
            ? translate({id: 'directory.placeholder.cn', message: '输入校名或项目名称'})
            : translate({id: 'directory.placeholder', message: '输入校名、简称或项目名称'})}
        />
      </div>
      <div className="pin-directory-status">
        <p role="status"><ProgramCount schools={schools.length} programs={total} /></p>
        {query && <button type="button" onClick={clearSearch}><Translate id="directory.clear">清除搜索</Translate></button>}
      </div>
      {schools.length ? (
        <ul className="pin-school-list">
          {schools.map(({school, programs: entries}) => (
            <li key={school}>
              <span className="pin-school-name">{school}</span>
              <ul className="pin-program-links">
                {entries.map((program) => (
                  <li key={program.id}><Link to={program.path}>{program.label}</Link></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div className="pin-directory-empty">
          <p><Translate id="directory.empty">没有找到匹配的学校或项目。</Translate></p>
          <p><Translate id="directory.emptyHint">试试学校全名、简称，或减少关键词。</Translate></p>
          <button type="button" onClick={clearSearch}><Translate id="directory.reset">查看本地区全部项目</Translate></button>
        </div>
      )}
    </div>
  );
}
