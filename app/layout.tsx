import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "../components/header"

// 1. Importujte font Inter z Google Fonts.
import { Inter } from "next/font/google"

// 2. Inicializujte font.
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* 3. Aplikujte třídu fontu na element `<body>`. */}
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
