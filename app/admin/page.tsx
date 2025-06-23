"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Settings, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Zkontroluj autentizaci
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Správa vašeho webu webnamiru.site</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Odhlásit se
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Správa komentářů */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Správa komentářů</CardTitle>
                  <CardDescription>Schvalujte a spravujte komentáře</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Zobrazte všechny komentáře, schvalujte nové příspěvky a spravujte diskuze na vašem blogu.
              </p>
              <Link href="/admin/comments">
                <Button className="w-full">Otevřít správu komentářů</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Statistiky */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Statistiky</CardTitle>
                  <CardDescription>Přehled výkonu webu</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Sledujte návštěvnost, hodnocení článků a další klíčové metriky vašeho webu.
              </p>
              <Button className="w-full" variant="outline" disabled>
                Připravuje se
              </Button>
            </CardContent>
          </Card>

          {/* Uživatelé */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Uživatelé</CardTitle>
                  <CardDescription>Správa uživatelských účtů</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Spravujte registrované uživatele, jejich oprávnění a aktivitu na webu.
              </p>
              <Button className="w-full" variant="outline" disabled>
                Připravuje se
              </Button>
            </CardContent>
          </Card>

          {/* Nastavení */}
          <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Nastavení webu</CardTitle>
                  <CardDescription>Konfigurace a správa webu</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Obecné nastavení</h4>
                  <p className="text-sm text-muted-foreground">
                    Základní konfigurace webu, SEO nastavení a kontaktní informace.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Blog nastavení</h4>
                  <p className="text-sm text-muted-foreground">
                    Správa kategorií, tagů a nastavení komentářů pro blog.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Bezpečnost</h4>
                  <p className="text-sm text-muted-foreground">Nastavení zabezpečení, zálohování a monitoring webu.</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" disabled>
                  Otevřít nastavení (připravuje se)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rychlé akce */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Rychlé akce</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/comments">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Nové komentáře
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="sm">
                Zobrazit blog
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                Hlavní stránka
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
