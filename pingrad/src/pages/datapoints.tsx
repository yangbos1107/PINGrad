import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';

const DATAPOINTS_EMBED_BASE =
  'https://teable-production-9c69.up.railway.app/share/shrLvLRxwFouulwLo37/view';

export default function DatapointsPage(): React.JSX.Element {
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
    <Layout title="DataPoints">
      <main className="pin-submit-page" aria-label="DataPoints 页面">
        <section className={`pin-submit-card pin-submit-card--wide pin-submit-card--${themeMode}`}>
          <h1>DataPoints</h1>
          <iframe
            key={themeMode}
            className="pin-datapoints-embed"
            src={embedUrl.toString()}
            title="PIN Grad DataPoints"
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
