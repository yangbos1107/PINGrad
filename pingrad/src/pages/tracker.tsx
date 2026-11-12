import React from 'react';
import Head from '@docusaurus/Head';
import LegacyRedirect from '@site/src/components/LegacyRedirect';

export default function TrackerPage(): React.JSX.Element {
  return (
    <>
      <Head><meta name="robots" content="noindex" /></Head>
      <LegacyRedirect to="/" label="返回 PIN Grad 首页" />
    </>
  );
}
