// app/(admin)/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"; // Důležitý import pro načtení stylů
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AdminLayout from "@/components/admin/AdminLayout"; // Importujeme náš vizuální layout
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: 'Admin Dashboard | webnamiru.site',
  description: 'Správa obsahu a nastavení webu.',
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Zde nepoužíváme AdminTheme, protože dark mode je vynucen v ThemeProvideru */}
            <AdminLayout>{children}</AdminLayout>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}