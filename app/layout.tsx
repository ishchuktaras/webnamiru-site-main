// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/sonner";
import { SessionProvider } from "next-auth/react"; 
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ReCaptchaWrapper from "../components/ReCaptchaProvider"; 
import { getSettings } from "../lib/actions/settings.actions";
import GoogleAnalytics from "../components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Definujte si základní URL pro dynamické generování v meta datech
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://webnamiru.site';

// === SEO METADATA ===
export const metadata: Metadata = {
  // Základní SEO
  metadataBase: new URL(BASE_URL), 
  title: {
    default: "webnamiru.site - Profesionální tvorba webových stránek a SEO optimalizace v Praze",
    template: "%s | webnamiru.site",
  },
  description: "Potřebujete web na míru, e-shop nebo zlepšit SEO? webnamiru.site tvoří strategické weby, které přinášejí výsledky a rostou s vaším podnikáním. Kontaktujte nás pro konzultaci.",
  keywords: [
    "tvorba webových stránek",
    "web na míru",
    "e-shop",
    "SEO optimalizace",
    "webdesign Praha",
    "Next.js vývoj",
    "strategický web",
    "online marketing",
    "webové aplikace",
    "Taras Ishchuk" 
  ],
  authors: [{ name: "Taras Ishchuk" }],
  creator: "Taras Ishchuk",
  publisher: "webnamiru.site", 
  
  // Otevřený graf (Open Graph) pro sociální sítě (Facebook, LinkedIn atd.)
  openGraph: {
    title: "webnamiru.site - Profesionální tvorba webových stránek a SEO",
    description: "Tvoříme strategické weby na míru, e-shopy a provádíme SEO optimalizaci. Získejte funkční web, který vám pomůže růst.",
    url: BASE_URL,
    siteName: "webnamiru.site",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // Předpokládá se, že máte og-image.jpg v public/
        width: 1200,
        height: 630,
        alt: "webnamiru.site - Tvorba webových stránek a SEO",
      },
      // Můžete přidat další obrázky, např. pro konkrétní stránky
    ],
    locale: "cs_CZ",
    type: "website",
  },
  
  

  // Roboty
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Kanonická URL (pokud je potřeba explicitně nastavit pro celý web, jinak to Next.js řeší)
  // Většinou se explicitně nenastavuje v root layoutu, ale Next.js si to řeší sám.
  // Pokud byste chtěl pevnou kanonickou URL pro domovskou stránku:
  // alternates: {
  //   canonical: BASE_URL,
  // },

  // RSS/Atom feed (pokud máte blog a generujete feed)
  // alternates: {
  //   types: {
  //     'application/rss+xml': `${BASE_URL}/rss`, // Pokud generujete RSS
  //     'application/atom+xml': `${BASE_URL}/atom`, // Pokud generujete Atom
  //   },
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="cs" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {settings.googleAnalyticsId && <GoogleAnalytics gaId={settings.googleAnalyticsId} />}
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReCaptchaWrapper>
              {children}
            </ReCaptchaWrapper>
            <Toaster richColors position="top-right" className="z-[9999]" />
          </ThemeProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

