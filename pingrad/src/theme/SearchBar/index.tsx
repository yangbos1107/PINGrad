import React, {useEffect, useRef} from 'react';
import SearchBar from '@theme-original/SearchBar';
import {translate} from '@docusaurus/Translate';

export default function LocalizedSearchBar(props: React.ComponentProps<typeof SearchBar>): React.JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const label = translate({id: 'theme.SearchBar.label', message: 'Search'});
  useEffect(() => {
    // The search plugin translates its placeholder but hardcodes its input's ARIA label.
    container.current?.querySelector('input')?.setAttribute('aria-label', label);
  }, [label]);
  return <div ref={container} style={{display: 'contents'}}><SearchBar {...props} /></div>;
}
