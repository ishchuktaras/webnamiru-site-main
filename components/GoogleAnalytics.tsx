'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookieConsent } from '../lib/cookies';

interface GoogleAnalyticsProps {
  gaId?: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const consentData = getCookieConsent();
    if (consentData?.analytics) {
      setConsent(true);
    }
  }, []);

  if (!gaId || !consent) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

