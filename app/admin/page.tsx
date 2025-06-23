"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Settings,
  BarChart3,
  FileText,
  Tags,
  Mail,
  TrendingUp,
  Eye,
  Heart,
  Calendar,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalPosts: 6,
    totalComments: 12,
    pendingComments: 3,
    totalViews: 1247,
    totalSubscribers: 89,
    avgRating: 4.2,
  })

  useEffect(() => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Správa vašeho webu webnamiru.site</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <Globe className="w-4 h-4 mr-2" />
              Online
            </Badge>
            <Button onClick={handleLogout} variant="outline" size="lg">
              Odhlásit se
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Články</p>
                  <p className="text-2xl font-bold">{stats.totalPosts}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Komentáře</p>
                  <p className="text-2xl font-bold">{stats.totalComments}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Čeká</p>
                  <p className="text-2xl font-bold">{stats.pendingComments}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Zobrazení</p>
                  <p className="text-2xl font-bold">{stats.totalViews}</p>
                </div>
                <Eye className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Odběratelé</p>
                  <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
                </div>
                <Mail className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Hodnocení</p>
                  <p className="text-2xl font-bold">{stats.avgRating}</p>
                </div>
                <Heart className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Blog Management */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Správa článků</CardTitle>
                  <CardDescription>Vytvářejte a upravujte blogové příspěvky</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Kompletní správa blogového obsahu včetně vytváření, editace a publikování článků.
              </p>
              <div className="flex gap-2">
                <Link href="/admin/posts" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Spravovat články</Button>
                </Link>
                <Link href="/admin/posts/new">
                  <Button variant="outline" size="icon">
                    <FileText className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Comment Management */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Správa komentářů</CardTitle>
                  <CardDescription>Moderujte a spravujte diskuze</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Schvalujte komentáře, spravujte diskuze a udržujte kvalitní komunikaci s návštěvníky.
              </p>
              <div className="flex gap-2">
                <Link href="/admin/comments" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Spravovat komentáře</Button>
                </Link>
                {stats.pendingComments > 0 && (
                  <Badge variant="destructive" className="px-2 py-1">
                    {stats.pendingComments}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Analytika</CardTitle>
                  <CardDescription>Sledujte výkon vašeho webu</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Detailní statistiky návštěvnosti, hodnocení článků a engagement uživatelů.
              </p>
              <Link href="/admin/analytics">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Zobrazit analytiku</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Categories & Tags */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Tags className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Kategorie & Tagy</CardTitle>
                  <CardDescription>Organizujte obsah webu</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Spravujte kategorie a tagy pro lepší organizaci a vyhledávání obsahu.
              </p>
              <Link href="/admin/taxonomy">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Spravovat taxonomii</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Newsletter</CardTitle>
                  <CardDescription>Správa odběratelů a kampaní</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Spravujte seznam odběratelů a odesílejte newslettery s nejnovějším obsahem.
              </p>
              <Link href="/admin/newsletter">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Spravovat newsletter</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-100 rounded-xl">
                  <Settings className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Nastavení</CardTitle>
                  <CardDescription>Konfigurace webu a bezpečnost</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">Obecné nastavení webu, SEO konfigurace a bezpečnostní nastavení.</p>
              <Link href="/admin/settings">
                <Button className="w-full bg-slate-600 hover:bg-slate-700">Otevřít nastavení</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Rychlé akce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/posts/new">
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Nový článek
                </Button>
              </Link>
              <Link href="/admin/comments?filter=pending">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Čekající komentáře
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Zobrazit blog
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Hlavní stránka
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Statistiky
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
