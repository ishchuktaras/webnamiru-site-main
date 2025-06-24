// app/admin/layout.tsx

"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ověření proběhne pouze na klientovi
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setLoading(false);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  // Během ověřování na klientovi můžeme zobrazit načítací stav
  if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
            Načítání...
        </div>
      );
  }

  // Pokud uživatel není ověřen, zobrazíme přihlašovací formulář
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  // Pokud je ověřen, zobrazíme layout administrace a v něm danou stránku (children)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Toto je společná hlavička pro celou administraci */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Správa vašeho webu webnamiru.site</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
                <Button variant="outline" size="lg" className="gap-2">
                    <Globe className="w-4 h-4" />
                    Zobrazit web
                </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive" size="lg">
              Odhlásit se
            </Button>
          </div>
        </div>
        
        {/* Zde se bude renderovat obsah konkrétní stránky (page.tsx) */}
        <main>{children}</main>

      </div>
    </div>
  )
}