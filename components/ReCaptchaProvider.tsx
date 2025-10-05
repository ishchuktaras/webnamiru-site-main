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
  const [isReCaptchaScriptLoaded, setIsReCaptchaScriptLoaded] = useState(false); // Sledujeme pouze načtení skriptu
  const [reCaptchaError, setReCaptchaError] = useState<string | null>(null); // Nový stav pro chyby

  useEffect(() => {
    // Načtěte klíč na klientovi
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      const errorMessage = "Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.";
      console.error(errorMessage);
      setReCaptchaError(errorMessage);
    }
  }, []);

  // Pokud je chyba v klíči, zobrazíme ji a nic víc
  if (reCaptchaError) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500 min-h-screen">
        {reCaptchaError}
      </div>
    );
  }

  // Pokud klíč ještě není načten, zobrazíme loading a čekáme
  if (!siteKey) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500 min-h-screen">
        Načítám konfiguraci zabezpečení...
      </div>
    );
  }

  // Vždy vykreslíme Script komponentu, když je siteKey k dispozici
  // (to spustí načítání reCAPTCHA skriptu)
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

  // Pokud reCAPTCHA skript ještě není načten, zobrazíme loading zprávu PŘED dětmi
  // a vykreslíme samotné děti uvnitř placeholderu, abychom zjistili, zda děti fungují.
  if (!isReCaptchaScriptLoaded) {
    return (
      <>
        {reCaptchaScript}
        <div className="flex items-center justify-center p-4 text-gray-500 min-h-screen">
          Načítám zabezpečení formuláře... (Skript se načítá)
        </div>
        {/* Zde prozatím vykreslíme children bez provideru, abychom viděli, zda se vůbec zobrazí */}
        {/* Pokud se děti vykreslí, problém je s providerem. Pokud ne, problém je v dětech. */}
        {children} 
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
      // useRecaptchaNet={true} // Prozatím nechejme zakomentované
    >
      {reCaptchaScript} {/* I provider potřebuje tento skript */}
      {children}
    </GoogleReCaptchaProvider>
  );
}