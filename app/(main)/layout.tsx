// app/(main)/layout.tsx

import Header from "@/components/header";
import Footer from "@/components/Footer";
import GdprConsent from "@/components/gdpr-consent";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReCaptchaProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <GdprConsent />
    </ReCaptchaProvider>
  );
}