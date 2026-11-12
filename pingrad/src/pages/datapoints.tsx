import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';

const DATAPOINTS_EMBED_BASE =
  'https://teable-production-9c69.up.railway.app/share/shrLvLRxwFouulwLo37/view';

export default function DatapointsPage(): React.JSX.Element {
  const title = translate({id: 'results.title', message: '录取情况'});
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const syncThemeMode = (): void => {
      const nextMode = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setThemeMode(nextMode);
    };

    syncThemeMode();
    const observer = new MutationObserver(syncThemeMode);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const embedUrl = new URL(DATAPOINTS_EMBED_BASE);
  embedUrl.searchParams.set('embed', 'true');
  embedUrl.searchParams.set('theme', themeMode);

  return (
    <Layout title={title}>
      <main className="pin-submit-page" aria-label={title}>
        <section className={`pin-submit-card pin-submit-card--wide pin-submit-card--${themeMode}`}>
          <h1>{title}</h1>
          <iframe
            key={themeMode}
            className="pin-datapoints-embed"
            src={embedUrl.toString()}
            title={title}
            width="100%"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </section>
      </main>
    </Layout>
  );
}
