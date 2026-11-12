import React from 'react';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

export default function ResourcesPage(): React.JSX.Element {
  const title = translate({id: 'resources.title', message: '资源'});
  return (
    <Layout title={title} noFooter>
      <main className="pin-blank-page" aria-label={title}>
        <section className="pin-blank-placeholder">
          <h1>{title}</h1>
          <p><Translate id="page.comingSoon">页面占位中，内容即将上线。</Translate></p>
        </section>
      </main>
    </Layout>
  );
}
