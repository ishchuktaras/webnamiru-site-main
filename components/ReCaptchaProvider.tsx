// components/ReCaptchaProvider.tsx
"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode, useEffect, useState } from "react";
import Script from "next/script"; // Importujeme komponentu Script z Next.js

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false); // Nový stav pro sledování načtení skriptu

  useEffect(() => {
    // Načtěte klíč na klientovi
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      console.error("Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
    }
  }, []);

  // Vykreslujeme GoogleReCaptchaProvider až poté, co je klíč k dispozici A skript je načten
  if (!siteKey || !scriptLoaded) {
    // Můžete zobrazit loading spinner nebo placeholder
    return (
      <>
        {/* Použijeme Next.js Script pro explicitní načtení reCAPTCHA */}
        {siteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy="afterInteractive" // Načte se po hydrataci, ale předtím, než se stránka stane interaktivní
            onLoad={() => {
              console.log("reCAPTCHA script has loaded.");
              setScriptLoaded(true); // Označí, že skript byl načten
            }}
            onError={(e) => {
              console.error("Chyba při načítání reCAPTCHA skriptu:", e);
              // Zde můžete nastavit chybový stav nebo zobrazit zprávu uživateli
            }}
          />
        )}
        <div className="flex items-center justify-center p-4 text-gray-500">
          Načítám zabezpečení formuláře...
        </div>
      </>
    );
  }

  // Až když je klíč a skript načten, vykreslíme GoogleReCaptchaProvider a zbytek aplikace
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
      // Zde můžeme volitelně zkusit useRecaptchaNet={true} pokud problém přetrvá
      useRecaptchaNet={true} 
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}