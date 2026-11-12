import React from 'react';
import {Redirect, useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocsRootOriginal from '@theme-original/DocsRoot';

export default function DocsRoot(props: Record<string, unknown>) {
  const {pathname} = useLocation();
  const homePath = useBaseUrl('/');

  if (/\/docs\/?$/.test(pathname)) {
    return <Redirect to={homePath} />;
  }

  return <DocsRootOriginal {...props} />;
}
