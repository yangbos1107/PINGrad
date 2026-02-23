import React from 'react';
import Layout from '@theme/Layout';

export default function ContactPage(): React.JSX.Element {
  return (
    <Layout title="Contact" noFooter>
      <main className="pin-blank-page" aria-label="Contact 页面">
        <section className="pin-blank-placeholder">
          <h1>Contact</h1>
          <p>欢迎通过以下入口联系项目维护者。</p>
          <ul className="pin-contact-links">
            <li>
              <a href="https://github.com/yangbos1107/PINGrad" target="_blank" rel="noopener noreferrer">
                GitHub 仓库
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
                Discord 交流群
              </a>
            </li>
            <li>
              <a href="/submit-dp">Submit DP 投稿入口</a>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
