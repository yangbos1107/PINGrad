import React from 'react';
import Link from '@docusaurus/Link';
import {Redirect, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';

export default function LegacyRedirect({to}: {to: string; label?: string}): React.JSX.Element {
  const {search, hash} = useLocation();
  const target = `${useBaseUrl(to)}${search}${hash}`;
  return <><Redirect to={target} /><p><Link to={target}>{translate({id: 'navigation.continue', message: '继续浏览'})}</Link></p></>;
}
