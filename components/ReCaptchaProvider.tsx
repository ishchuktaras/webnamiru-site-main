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
  const [isReCaptchaReady, setIsReCaptchaReady] = useState(false); // Sledujeme připravenost celé reCAPTCHA
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Načtěte klíč na klientovi
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      const errorMessage = "Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.";
      console.error(errorMessage);
      setError(errorMessage);
    }
  }, []);

  // Vykreslíme Script komponentu bez ohledu na isReCaptchaReady, ale až po siteKey
  // Tím se zajistí, že se reCAPTCHA skript začne stahovat co nejdříve
  const reCaptchaScript = siteKey ? (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="lazyOnload" // Změna strategie na lazyOnload pro pozadí
      onLoad={() => {
        console.log("reCAPTCHA script has loaded and is ready.");
        setIsReCaptchaReady(true);
      }}
      onError={(e) => {
        const errorMessage = "Chyba při načítání reCAPTCHA skriptu.";
        console.error(errorMessage, e);
        setError(errorMessage);
        // Pokud skript selže, stále můžeme zkusit vykreslit zbytek aplikace
        // Nicméně, formulář bez reCAPTCHA nebude fungovat.
        setIsReCaptchaReady(false); // Označíme jako nepřipravené
      }}
    />
  ) : null;

  // Pokud nastala chyba s klíčem nebo skriptem, zobrazíme ji prominentně
  if (error) {
    return (
      <>
        {reCaptchaScript} {/* Stále se pokusíme načíst skript pro debug */}
        <div className="flex items-center justify-center p-4 text-red-500 min-h-screen">
          {error}
        </div>
        {/* Můžeme sem podmíněně přidat i children, pokud chceme, aby zbytek webu fungoval */}
        {/* Bez reCAPTCHA by ale kontaktní formulář neprošel. */}
        {/* {children} */}
      </>
    );
  }

  // Pokud je klíč k dispozici a skript se ještě načítá, vykreslíme children.
  // ReCAPTCHA Provider se obalí až po dokončení načítání skriptu.
  return (
    <>
      {reCaptchaScript} {/* Vždy vložíme skript, pokud je siteKey k dispozici */}

      {isReCaptchaReady ? (
        // Pokud je reCAPTCHA skript načten, obalíme children GoogleReCaptchaProviderem
        <GoogleReCaptchaProvider
          reCaptchaKey={siteKey as string} // Assert as string, protože jsme již zkontrolovali `siteKey`
          scriptProps={{
            async: true,
            defer: true,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      ) : (
        // Pokud reCAPTCHA skript ještě není načten (nebo se načítá),
        // vykreslíme children bez provideru. To znamená, že web se zobrazí,
        // ale formulář zatím nebude mít plnou funkčnost reCAPTCHA.
        // Loading zpráva už nebude viditelná.
        children
      )}
    </>
  );
}