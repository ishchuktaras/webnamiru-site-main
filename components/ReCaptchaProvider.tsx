// components/ReCaptchaProvider.tsx
"use client";

import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Definice props pro naši komponentu ReCaptcha
interface ReCaptchaProps {
  onVerify: Dispatch<SetStateAction<string | null>>;
}

export default function ReCaptcha({ onVerify }: ReCaptchaProps) {
  const [recaptchaKey, setRecaptchaKey] = useState<string | null>(null);

  // Získání reCAPTCHA tokenu při prvním renderu nebo při každé potřebě
  // Tuto logiku volá GoogleReCaptchaProvider a předává onVerify funkci.
  const handleRecaptchaChange = (token: string) => {
    onVerify(token);
    setRecaptchaKey(token); // Můžete si token uložit i do lokálního stavu, pokud je potřeba
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.");
    return null; 
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
      language="cs"
    >
      <GoogleReCaptcha onVerify={handleRecaptchaChange} />
    </GoogleReCaptchaProvider>
  );
}