import React from 'react';
import {Redirect, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocsRootOriginal from '@theme-original/DocsRoot';

export default function DocsRoot(props: Record<string, unknown>) {
  const {pathname} = useLocation();
  const introPath = useBaseUrl('/docs/intro');

  if (/\/docs\/?$/.test(pathname)) {
    return <Redirect to={introPath} />;
  }

  return <DocsRootOriginal {...props} />;
}
