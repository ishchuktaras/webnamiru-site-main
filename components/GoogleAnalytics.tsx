// components/GoogleAnalytics.tsx
"use client"; 

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Deklarace globální funkce gtag, aby TypeScript nerozčiloval
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  gaId: string; // Očekáváme Google Analytics Measurement ID (např. G-XXXXXXXXXX)
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Tuto logiku pro sledování změn URL potřebujete pouze, pokud používáte App Router a chcete
    // ručně posílat Page Views při změnách URL v klientovi.
    // Pro gtag.js s Next.js 13/14 je to často automaticky řešeno, ale je to bezpečnější mít.
    if (window.gtag && pathname) {
      window.gtag("config", gaId, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams, gaId]);

  return (
    <>
      {/* První Script pro načtení knihovny gtag.js z Google */}
      <Script
        strategy="afterInteractive" // Načte skript po interakci uživatele, aby neblokoval rendering
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />

      {/* Druhý Script pro inicializaci a konfiguraci Google Analytics */}
      <Script
        id="google-analytics-init" // Unikátní ID pro tento skript
        strategy="afterInteractive" // Stejná strategie jako pro načítání knihovny
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            send_page_view: false // Zabrání automatickému odesílání page_view při načtení skriptu,
                                  // protože to řešíme ručně v useEffect výše pro správné sledování v App Routeru
          });
        `}
      </Script>
    </>
  );
}
