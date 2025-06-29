// app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css";
import Header from "../../components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import GdprConsent from "@/components/gdpr-consent";
import Script from "next/script"; // ZMĚNA: Přidán import pro Script
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "webnamiru.site - Strategické weby, které vydělávají | Vysočina",
  description:
    "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem.",
  
  keywords: "tvorba webů, webové stránky, Vysočina, web na míru, ekonom, strategické weby",
  authors: [{ name: "webnamiru.site" }],
  openGraph: {
    title: "webnamiru.site - Strategické weby, které vydělávají",
    description: "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem. Váš web od ekonoma.",
    type: "website",
    locale: "cs_CZ",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" suppressHydrationWarning={true}>
      <head>
        {/* ZMĚNA: Přidán Google Tag Manager a konfigurační skript */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-NZYNFSN0J0`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NZYNFSN0J0', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
          <GdprConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}