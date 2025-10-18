// components/ReCaptchaProvider.tsx
"use client";

import React, { ReactNode, useEffect, useState } from "react";

// Chyba byla způsobena tím, že se standardní importy pokoušely načíst knihovny,
// které nejsou v tomto prostředí dostupné. Oprava spočívá v manuálním vložení
// skriptu do hlavičky dokumentu, což je spolehlivý způsob v jakémkoliv React prostředí.
// Knihovna 'react-google-recaptcha-v3' a Next.js 'Script' komponenta nejsou pro tento účel potřeba.

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [reCaptchaError, setReCaptchaError] = useState<string | null>(null);

  useEffect(() => {
    // Načtení klíče z environment variables
    const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (key) {
      setSiteKey(key);
    } else {
      const errorMessage = "Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.";
      console.error(errorMessage);
      setReCaptchaError(errorMessage);
    }
  }, []);

  useEffect(() => {
    // Pokud máme klíč a skript ještě není na stránce, vložíme ho
    if (siteKey && !document.querySelector(`script[src*="recaptcha/api.js"]`)) {
      const script = document.createElement("script");
      // Přidán parametr &hl=cs pro vynucení češtiny
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}&hl=cs`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
          const errorMessage = "Chyba při načítání reCAPTCHA skriptu.";
          console.error(errorMessage);
          setReCaptchaError(errorMessage);
      };
      document.head.appendChild(script);
    }
  }, [siteKey]);

  if (reCaptchaError) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500 min-h-screen">
        {reCaptchaError}
      </div>
    );
  }

  // Komponenta nyní pouze obaluje potomky, samotnou logiku řeší useEffect.
  // GoogleReCaptchaProvider není potřeba, protože jeho hlavní funkcí je právě vložení skriptu,
  // což jsme udělali ručně pro lepší kontrolu a opravu chyby.
  return <>{children}</>;
}

