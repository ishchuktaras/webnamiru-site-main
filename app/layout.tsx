import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "../components/header"

// 1. Importujte font Inter z Google Fonts.
import { Inter } from "next/font/google"

// 2. Inicializujte font.
const inter = Inter({ subsets: ["latin"] })

// Nahraďte celý objekt metadata tímto:
export const metadata: Metadata = {
  title: "webnamiru.site - Strategické weby, které vydělávají | Vysočina",
  description:
    "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem. Váš web od ekonoma na Vysočině.",
  generator: "v0.dev",
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
    <html lang="cs">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  )
}
