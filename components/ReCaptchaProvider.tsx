// components/ReCaptchaProvider.tsx
"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode, useEffect, useState } from "react";
import Script from "next/script";

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [isReCaptchaScriptLoaded, setIsReCaptchaScriptLoaded] = useState(false);
  const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      const errorMessage = "Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.";
      console.error(errorMessage);
      setReCaptchaError(errorMessage);
    }
  }, []);

  // Pokud je chyba v klíči, zobrazíme ji prominentně
  if (reCaptchaError) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500 min-h-screen">
        {reCaptchaError}
      </div>
    );
  }

  // Pokud klíč ještě není načten, zobrazíme (neviditelný) loading a čekáme
  if (!siteKey) {
    return (
      <div className="sr-only">Načítám konfiguraci zabezpečení...</div> // sr-only pro skrytí vizuálně
    );
  }

  const reCaptchaScript = (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="afterInteractive"
      onLoad={() => {
        console.log("reCAPTCHA script has loaded.");
        setIsReCaptchaScriptLoaded(true);
      }}
      onError={(e) => {
        const errorMessage = "Chyba při načítání reCAPTCHA skriptu.";
        console.error(errorMessage, e);
        setReCaptchaError(errorMessage);
      }}
    />
  );

  // Pokud reCAPTCHA skript ještě není načten, vykreslíme children obalené neviditelným divem.
  // Loading zpráva je nyní vizuálně skrytá.
  if (!isReCaptchaScriptLoaded) {
    return (
      <>
        {reCaptchaScript}
        <div className="sr-only">Načítám zabezpečení formuláře... (Skript se načítá)</div>
        {children} {/* Děti se vykreslí ihned, což je správné chování pro většinu stránek */}
      </>
    );
  }

  // Pokud je vše načteno a bez chyb, obalíme children providerem
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {reCaptchaScript} {/* Udržujeme Script komponentu uvnitř Provideru */}
      {children}
    </GoogleReCaptchaProvider>
  );
}