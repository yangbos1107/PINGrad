import React from 'react';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import {translate} from '@docusaurus/Translate';
import IntroContent from '@site/src/content/intro.mdx';

export default function IntroPage(): React.JSX.Element {
  const title = translate({id: 'intro.title', message: '关于 PIN Grad'});
  return (
    <Layout title={title} description={translate({id: 'intro.description', message: 'PIN Grad 的缘起、资料使用方式与贡献入口。'})}>
      <main className="pin-intro">
        <h1>{title}</h1>
        <article className="markdown" lang="zh-CN">
          <MDXContent><IntroContent /></MDXContent>
        </article>
      </main>
    </Layout>
  );
}
