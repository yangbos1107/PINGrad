import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';

export default function ContactPage(): React.JSX.Element {
  const title = translate({id: 'contact.title', message: '联系'});
  return (
    <Layout title={title} noFooter>
      <main className="pin-blank-page" aria-label={title}>
        <section className="pin-blank-placeholder">
          <h1>{title}</h1>
          <p><Translate id="contact.description">欢迎通过以下入口联系项目维护者。</Translate></p>
          <ul className="pin-contact-links">
            <li>
              <a href="https://github.com/yangbos1107/PINGrad" target="_blank" rel="noopener noreferrer">
                <Translate id="contact.repository">GitHub 仓库</Translate>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yangbos1107/PINGrad/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Discussions
              </a>
            </li>
            <li>
              <a href="https://discord.gg/wJaMwqFRtu" target="_blank" rel="noopener noreferrer">
                <Translate id="contact.discord">Discord 交流群</Translate>
              </a>
            </li>
            <li>
              <Link to="/submit-dp"><Translate id="submit.title">分享申请结果</Translate></Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
