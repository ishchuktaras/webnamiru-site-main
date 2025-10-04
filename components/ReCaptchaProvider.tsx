// components/ReCaptchaProvider.tsx
"use client"; // Důležité: Označuje komponentu jako klientskou

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode, useEffect, useState } from "react";

// Definice props pro naši obalovou komponentu
interface ReCaptchaWrapperProps {
  children: ReactNode;
}

// Exportujeme komponentu ReCaptchaWrapper, která obaluje children
export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  // Stav pro uložení site key, který se načte asynchronně (na klientovi)
  const [siteKey, setSiteKey] = useState<string | null>(null);

  // useEffect pro načtení site key po mountu komponenty na klientovi
  useEffect(() => {
    // Kontrola, zda je proměnná prostředí dostupná
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setSiteKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    } else {
      // Pokud klíč chybí, zalogujeme chybu do konzole
      console.error("Chyba: Chybí proměnná prostředí NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
      // Můžete zde také nastavit nějaký chybový stav nebo toast notifikaci
    }
  }, []); // Prázdné pole závislostí zajišťuje spuštění pouze jednou po mountu

  // Pokud site key ještě není k dispozici (načítá se, nebo chybí),
  // můžeme zobrazit placeholder nebo nic, aby se GoogleReCaptchaProvider
  // nevykreslil s undefined klíčem.
  if (!siteKey) {
    return (
      <div className="flex items-center justify-center p-4 text-gray-500">
        Načítám zabezpečení formuláře...
      </div>
    );
  }

  // Jakmile je siteKey k dispozici, vykreslíme GoogleReCaptchaProvider
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey} // Zde předáváme platný site key
      scriptProps={{
        async: true, // Asynchronní načítání skriptu
        defer: true, // Odložené spuštění skriptu
        appendTo: "head", // Kam se má skript přidat (hlavička je obvyklá)
        nonce: undefined, // Volitelné, pro CSP (Content Security Policy)
      }}
      // Zajišťuje použití recaptcha.net, což může pomoci v některých regionech
      useRecaptchaNet={true} 
      // Důležité pro v3: automaticky vygeneruje token při načtení
      // V ContactForm.tsx pak použijeme useGoogleReCaptcha().executeRecaptcha() pro konkrétní akce
      // Zde můžeme také nastavit language="cs" pro češtinu
      language="cs"
    >
      {children} {/* Zde se vykreslí zbytek vaší aplikace */}
    </GoogleReCaptchaProvider>
  );
}