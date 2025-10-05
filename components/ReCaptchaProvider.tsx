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
  const [isReCaptchaReady, setIsReCaptchaReady] = useState(false); // Nový stav pro celkovou připravenost

  useEffect(() => {
    // Načtěte klíč na klientovi
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      console.error("Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
      // Můžete zde přidat logiku pro zobrazení chyby uživateli
    }
  }, []);

  // Vykreslujeme Script komponentu bez ohledu na isReCaptchaReady, ale až po siteKey
  // GoogleReCaptchaProvider by měl být uvnitř, až když je script naceteny.
  // Zkusíme jednodušší strukturu bez podmíněného renderu children uvnitř provideru
  // a místo toho podmíněně renderujeme celou aplikaci.
  if (!siteKey) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500 min-h-screen">
        Chyba: Chybí klíč reCAPTCHA. Kontaktujte prosím administrátora.
      </div>
    );
  }

  return (
    <>
      {/* Script komponenta se načte, jakmile je siteKey k dispozici */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive" // Načte se po hydrataci
        onLoad={() => {
          console.log("reCAPTCHA script has loaded.");
          setIsReCaptchaReady(true); // Nastavíme, že je reCAPTCHA skript načten
        }}
        onError={(e) => {
          console.error("Chyba při načítání reCAPTCHA skriptu:", e);
          // Zde můžete nastavit chybový stav
          // setIsReCaptchaReady(false); // V případě chyby není připraveno
        }}
      />

      {/* Zobrazíme loading zprávu, dokud není reCAPTCHA skript načten */}
      {!isReCaptchaReady ? (
        <div className="flex items-center justify-center p-4 text-gray-500 min-h-screen">
          Načítám zabezpečení formuláře...
        </div>
      ) : (
        // Jakmile je reCAPTCHA skript načten, vykreslíme GoogleReCaptchaProvider
        // a uvnitř něj zbytek aplikace (children).
        <GoogleReCaptchaProvider
          reCaptchaKey={siteKey}
          scriptProps={{
            async: true,
            defer: true,
            appendTo: "head",
            nonce: undefined,
          }}
          // useRecaptchaNet={true} // Tuto možnost prozatím necháme zakomentovanou pro zjednodušení
        >
          {children} {/* Zde se vykreslí zbytek vaší aplikace */}
        </GoogleReCaptchaProvider>
      )}
    </>
  );
}