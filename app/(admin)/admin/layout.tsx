// app/(admin)/layout.tsx

import "@/app/globals.css";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AdminTheme from "@/components/admin/AdminTheme";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, LogOut } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// Můžeme přidat specifická metadata pro admin sekci
export const metadata = {
  title: 'Admin Dashboard | webnamiru.site',
  description: 'Správa obsahu a nastavení webu.',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Komponenta, která vynutí tmavé téma */}
          <AdminTheme />

          <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Postranní lišta pro navigaci v adminu */}
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col">
              <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-gray-900 px-6 shrink-0">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Správa vašeho webu webnamiru.site</p>
                </div>
                <div className="flex items-center gap-4">
                   <Button variant="outline" asChild>
                      <Link href="/" target="_blank">
                         <Globe className="mr-2 h-4 w-4" />
                         Zobrazit web
                      </Link>
                   </Button>
                   <Button variant="destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Odhlásit se
                   </Button>
                </div>
              </header>
              <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                {children}
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}