// components/ReCaptchaProvider.tsx
"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

interface ReCaptchaWrapperProps {
  children: ReactNode;
}

export default function ReCaptchaWrapper({ children }: ReCaptchaWrapperProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY environment variable.");
    // Můžete zobrazit nějakou fallback UI nebo error message
    return <div>Chyba: Chybí reCAPTCHA klíč.</div>;
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
      {children}
    </GoogleReCaptchaProvider>
  );
}