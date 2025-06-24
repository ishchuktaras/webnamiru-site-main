"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Plus, Edit, Eye, Calendar, Tag, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"
import { blogPosts, blogCategories } from "@/lib/blog-data"

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const getCategoryColor = (categorySlug: string) => {
    const category = blogCategories.find((cat) => cat.slug === categorySlug)
    return category?.color || "gray"
  }

  const getCategoryName = (categorySlug: string) => {
    const category = blogCategories.find((cat) => cat.slug === categorySlug)
    return category?.name || categorySlug
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-200" />
              <div>
                <p className="text-2xl font-bold">{blogPosts.length}</p>
                <p className="text-sm text-blue-100">Celkem článků</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-200" />
              <div>
                <p className="text-2xl font-bold">{blogPosts.filter((p) => p.featured).length}</p>
                <p className="text-sm text-green-100">Doporučené</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Tag className="w-6 h-6 text-purple-200" />
              <div>
                <p className="text-2xl font-bold">{blogCategories.length}</p>
                <p className="text-sm text-purple-100">Kategorií</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-200" />
              <div>
                <p className="text-2xl font-bold">
                  {
                    blogPosts.filter((p) => {
                      const postDate = new Date(p.date)
                      const thirtyDaysAgo = new Date()
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                      return postDate >= thirtyDaysAgo
                    }).length
                  }
                </p>
                <p className="text-sm text-orange-100">Za 30 dní</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header with New Post Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Všechny články</h2>
          <p className="text-slate-600">Spravujte a editujte blogové příspěvky</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Nový článek
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtry a vyhledávání
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Hledat podle názvu, obsahu nebo tagů..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrovat podle kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny kategorie</SelectItem>
                {blogCategories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Řadit podle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Nejnovější</SelectItem>
                <SelectItem value="oldest">Nejstarší</SelectItem>
                <SelectItem value="title">Podle názvu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <p className="text-xl font-medium text-slate-700">
                {searchTerm || categoryFilter !== "all" ? "Žádné výsledky" : "Žádné články"}
              </p>
              <p className="text-slate-500 mt-2">
                {searchTerm || categoryFilter !== "all"
                  ? "Zkuste změnit vyhledávací kritéria"
                  : "Začněte vytvořením prvního článku"}
              </p>
              {!searchTerm && categoryFilter === "all" && (
                <Link href="/admin/posts/new" className="mt-4 inline-block">
                  <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <Plus className="w-4 h-4" />
                    Vytvořit první článek
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.slug} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          {post.title}
                        </Link>
                      </h3>
                      {post.featured && (
                        <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                          Doporučené
                        </Badge>
                      )}
                    </div>

                    <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString("cs-CZ")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.readingTime} min čtení
                      </div>
                      <Badge
                        variant="outline"
                        className={`border-${getCategoryColor(post.category)}-200 text-${getCategoryColor(post.category)}-700 bg-${getCategoryColor(post.category)}-50`}
                      >
                        {getCategoryName(post.category)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3} dalších
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Zobrazit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="gap-2" disabled>
                      <Edit className="w-4 h-4" />
                      Upravit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
