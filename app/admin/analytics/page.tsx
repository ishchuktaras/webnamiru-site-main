"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  Eye,
  MessageSquare,
  Heart,
  Users,
  Calendar,
  ArrowLeft,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [timeRange, setTimeRange] = useState("30d")
  const [loading, setLoading] = useState(false)

  // Mock data - v reálné aplikaci by se načítala z databáze
  const [analytics] = useState({
    totalViews: 12847,
    totalComments: 156,
    totalRatings: 89,
    avgRating: 4.2,
    uniqueVisitors: 8934,
    bounceRate: 32.5,
    avgTimeOnPage: "3:24",
    topPosts: [
      { slug: "strategie-pro-uspesny-web", title: "Strategie pro úspěšný web", views: 2341, comments: 23, rating: 4.5 },
      {
        slug: "seo-optimalizace-pro-male-firmy",
        title: "SEO optimalizace pro malé firmy",
        views: 1987,
        comments: 18,
        rating: 4.3,
      },
      { slug: "nextjs-vs-wordpress-co-vybrat", title: "Next.js vs WordPress", views: 1654, comments: 15, rating: 4.1 },
      {
        slug: "responzivni-design-proc-je-dulezity",
        title: "Responzivní design",
        views: 1432,
        comments: 12,
        rating: 4.4,
      },
      { slug: "webove-trendy-2025", title: "Webové trendy 2025", views: 1289, comments: 9, rating: 4.0 },
    ],
    viewsOverTime: [
      { date: "2025-01-01", views: 234 },
      { date: "2025-01-02", views: 456 },
      { date: "2025-01-03", views: 321 },
      { date: "2025-01-04", views: 567 },
      { date: "2025-01-05", views: 432 },
      { date: "2025-01-06", views: 678 },
      { date: "2025-01-07", views: 543 },
    ],
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

  const handleRefresh = () => {
    setLoading(true)
    // Simulace načítání dat
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Analytika
              </h1>
              <p className="text-slate-600 mt-2 text-lg">Sledujte výkon vašeho webu a obsahu</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 dní</SelectItem>
                <SelectItem value="30d">30 dní</SelectItem>
                <SelectItem value="90d">90 dní</SelectItem>
                <SelectItem value="1y">1 rok</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRefresh} variant="outline" size="icon" disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Odhlásit se
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                  <p className="text-sm text-blue-100">Zobrazení</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</p>
                  <p className="text-sm text-green-100">Návštěvníci</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-purple-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.totalComments}</p>
                  <p className="text-sm text-purple-100">Komentáře</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.avgRating}</p>
                  <p className="text-sm text-pink-100">Hodnocení</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.bounceRate}%</p>
                  <p className="text-sm text-orange-100">Bounce Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-yellow-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.avgTimeOnPage}</p>
                  <p className="text-sm text-yellow-100">Čas na stránce</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-indigo-200" />
                <div>
                  <p className="text-2xl font-bold">{analytics.totalRatings}</p>
                  <p className="text-sm text-indigo-100">Hodnocení</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Nejpopulárnější články
              </CardTitle>
              <CardDescription>
                Články s nejvyšší návštěvností za posledních{" "}
                {timeRange === "7d" ? "7 dní" : timeRange === "30d" ? "30 dní" : timeRange === "90d" ? "90 dní" : "rok"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPosts.map((post, index) => (
                  <div key={post.slug} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{((post.views / analytics.totalViews) * 100).toFixed(1)}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Overview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Přehled návštěvnosti
              </CardTitle>
              <CardDescription>Denní návštěvnost za posledních 7 dní</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.viewsOverTime.map((day, index) => {
                  const maxViews = Math.max(...analytics.viewsOverTime.map((d) => d.views))
                  const percentage = (day.views / maxViews) * 100

                  return (
                    <div key={day.date} className="flex items-center gap-4">
                      <div className="w-20 text-sm text-slate-600">
                        {new Date(day.date).toLocaleDateString("cs-CZ", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="h-6 bg-blue-100 rounded-full overflow-hidden flex-1 mr-3">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 w-16 text-right">
                            {day.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {((analytics.totalComments / analytics.totalViews) * 100).toFixed(2)}%
              </div>
              <p className="text-sm text-slate-600">Poměr komentářů k zobrazením</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Průměrné hodnocení</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{analytics.avgRating}/5</div>
              <p className="text-sm text-slate-600">Na základě {analytics.totalRatings} hodnocení</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Růst návštěvnosti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">+23.5%</div>
              <p className="text-sm text-slate-600">Oproti předchozímu období</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
