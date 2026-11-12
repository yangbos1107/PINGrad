import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {RegionDirectory} from '@site/src/components/ProgramDirectory';

export default function Home(): React.JSX.Element {
  return (
    <Layout title="PIN Grad" description={translate({id: 'home.description', message: '面向 PIN 项目同学的 ECE 升学资料与申请经验。按地区查找学校与项目，参考学长学姐的录取情况。'})}>
      <main className="pin-home">
        <header className="pin-home-intro">
          <h1>PIN Grad</h1>
          <p><Translate id="home.introduction">面向 PIN 项目同学的 ECE 升学资料与申请经验。</Translate></p>
        </header>

        <div className="pin-home-content">
          <section id="schools" aria-labelledby="schools-heading">
            <h2 id="schools-heading"><Translate id="home.schools">查找学校与项目</Translate></h2>
            <p className="pin-home-note"><Translate id="home.order">按地区浏览，地区内按校名排列。</Translate></p>
            <RegionDirectory />
          </section>

          <section className="pin-home-cases" aria-labelledby="cases-heading">
            <h2 id="cases-heading"><Translate id="home.resultsHeading">参考录取情况</Translate></h2>
            <p><Translate id="home.resultsDescription">看看学长学姐的申请背景、项目选择和录取结果。</Translate></p>
            <Link className="pin-primary-link" to="/datapoints"><Translate id="home.resultsLink">查看录取情况</Translate></Link>
            <div className="pin-home-contribute">
              <h3><Translate id="home.shareHeading">也留下你的经历</Translate></h3>
              <p><Translate id="home.shareDescription">收到结果后，欢迎分享一条申请记录。</Translate></p>
              <Link to="/submit-dp"><Translate id="submit.title">分享申请结果</Translate></Link>
            </div>
          </section>
        </div>

        <section className="pin-home-about" aria-label={translate({id: 'intro.title', message: '关于 PIN Grad'})}>
          <p><Translate id="home.community">由 PIN Program 第一届毕业生发起，和后来的同学一起维护。</Translate></p>
          <Link to="/intro"><Translate id="home.aboutLink">了解 PIN Grad 与贡献方式</Translate></Link>
        </section>
      </main>
    </Layout>
  );
}
