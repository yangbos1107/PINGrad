import React from 'react';
import Layout from '@theme/Layout';

export default function JoinPage(): React.JSX.Element {
  return (
    <Layout title="贡献指南" noFooter>
      <main className="pin-blank-page" aria-label="贡献指南占位页面">
        <section className="pin-blank-placeholder">
          <h1>贡献指南</h1>
          <p>页面占位中，内容即将上线。</p>
          <p>
            当前可先前往 <a href="/contact">Contact 页面</a> 获取入口。
          </p>
        </section>
      </main>
    </Layout>
  );
}
