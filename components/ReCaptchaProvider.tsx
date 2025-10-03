// components/ReCaptchaProvider.tsx

"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function ReCaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    console.error(
      "reCAPTCHA site key not found. Please check your .env.local file."
    );
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head"
      }}
      language="cs"
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
