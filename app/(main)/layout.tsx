// app/(main)/layout.tsx

import { Header } from "@/components/Header"; 

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      
      <GdprConsent />
    </ReCaptchaProvider>
  );
}