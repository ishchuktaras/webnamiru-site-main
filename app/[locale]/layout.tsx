// app/[locale]/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "webnamiru.site - Strategické weby, které vydělávají",
    template: "%s | webnamiru.site",
  },
  description: "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem.",
};

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              inter.variable
            )}
          >
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}