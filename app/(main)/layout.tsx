// app/(main)/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css";
import Header from "@/components/header"; // Používáme absolutní cestu
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import GdprConsent from "@/components/gdpr-consent";
import Script from "next/script"; 
import { Inter } from "next/font/google"
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "webnamiru.site - Strategické weby, které vydělávají | Vysočina",
  description:
    "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem.",
  
  keywords: "tvorba webů, webové stránky, Vysočina, web na míru, ekonom, strategické weby",
  authors: [{ name: "webnamiru.site" }],
  openGraph: {
    title: "webnamiru.site - Strategické weby, které vydělávají",
    description: "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem.",
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
    // Tento layout se vztahuje pouze na veřejnou část webu
    <html lang="cs" suppressHydrationWarning={true}>
      <head>
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
          <ReCaptchaProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
            <GdprConsent />
          </ReCaptchaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}