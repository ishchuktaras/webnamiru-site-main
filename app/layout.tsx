import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "../components/header"
import { ThemeProvider } from "@/components/theme-provider" // <-- Importuj ThemeProvider
import { Toaster } from "@/components/ui/sonner"
import GdprConsent from "@/components/gdpr-consent";

// 1. Importujte font Inter z Google Fonts.
import { Inter } from "next/font/google"

// 2. Inicializujte font.
const inter = Inter({ subsets: ["latin"] })

// Nahraďte celý objekt metadata tímto:
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
