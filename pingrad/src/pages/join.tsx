import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

export default function JoinPage(): React.JSX.Element {
  const title = translate({id: 'join.title', message: '贡献指南'});
  return (
    <Layout title={title} noFooter>
      <main className="pin-blank-page" aria-label={title}>
        <section className="pin-blank-placeholder">
          <h1>{title}</h1>
          <p><Translate id="page.comingSoon">页面占位中，内容即将上线。</Translate></p>
          <p>
            <Link to="/contact"><Translate id="contact.title">联系</Translate></Link>
          </p>
        </section>
      </main>
    </Layout>
  );
}
