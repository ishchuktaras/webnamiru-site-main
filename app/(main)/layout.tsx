// app/[locale]/(main)/layout.tsx

import { NextIntlClientProvider, useMessages } from 'next-intl';
import Header from "@/components/header";
import { Suspense } from "react";

export default function MainLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<div>Načítání hlavičky...</div>}>
          <Header />
        </Suspense>
        <main className="flex-grow">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}