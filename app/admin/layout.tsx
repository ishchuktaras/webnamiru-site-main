// app/admin/layout.tsx

import AdminTheme from "@/components/admin/AdminTheme";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Tato komponenta zapne dark mode */}
      <AdminTheme />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-white dark:bg-gray-900 px-6">
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
          <main className="flex-1 p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}