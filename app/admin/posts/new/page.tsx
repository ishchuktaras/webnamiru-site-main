"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Eye, FileText, Tag, Calendar, ImageIcon, Settings } from "lucide-react"
import Link from "next/link"
import { blogCategories } from "@/lib/blog-data"
import { toast } from "@/hooks/use-toast"

export default function NewPostPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    image: "",
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: title,
    }))
  }

  const handleSave = () => {
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím všechna povinná pole.",
        variant: "destructive",
      })
      return
    }

    // Zde by byla logika pro uložení článku
    toast({
      title: "Úspěch",
      description: "Článek byl uložen jako koncept.",
    })
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
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
            <Link href="/admin/posts">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nový článek
              </h1>
              <p className="text-slate-600 mt-2 text-lg">Vytvořte nový blogový příspěvek</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Náhled
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Save className="w-4 h-4" />
              Uložit koncept
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Odhlásit se
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Základní informace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Název článku *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Zadejte název článku..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-slug-clanku"
                    className="mt-1"
                  />
                  <p className="text-sm text-slate-500 mt-1">URL: /blog/{formData.slug || "url-slug-clanku"}</p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Krátký popis *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Krátký popis článku pro náhled..."
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-sm text-slate-500 mt-1">{formData.excerpt.length}/200 znaků</p>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Obsah článku *</CardTitle>
                <CardDescription>Můžete použít HTML tagy pro formátování</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Napište obsah vašeho článku..."
                  className="min-h-96"
                />
                <div className="flex items-center justify-between mt-2 text-sm text-slate-500">
                  <span>{formData.content.length} znaků</span>
                  <span>~{calculateReadingTime(formData.content)} min čtení</span>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  SEO nastavení
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO název</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimalizovaný název..."
                    className="mt-1"
                  />
                  <p className="text-sm text-slate-500 mt-1">{formData.seoTitle.length}/60 znaků</p>
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO popis</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="SEO popis pro vyhledávače..."
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-sm text-slate-500 mt-1">{formData.seoDescription.length}/160 znaků</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Publikování
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Doporučený článek</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                  />
                </div>

                <div>
                  <Label>Stav</Label>
                  <p className="text-sm text-slate-600 mt-1">Koncept</p>
                </div>

                <div>
                  <Label>Datum vytvoření</Label>
                  <p className="text-sm text-slate-600 mt-1">{new Date().toLocaleDateString("cs-CZ")}</p>
                </div>
              </CardContent>
            </Card>

            {/* Category & Tags */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Kategorie a tagy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Kategorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Vyberte kategorii" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tagy</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3..."
                    className="mt-1"
                  />
                  <p className="text-sm text-slate-500 mt-1">Oddělte tagy čárkami</p>
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.split(",").map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Hlavní obrázek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-600 mb-2">Přetáhněte obrázek nebo</p>
                  <Button variant="outline" size="sm">
                    Vybrat soubor
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2">Doporučená velikost: 1200x630px</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                <Save className="w-4 h-4" />
                Uložit koncept
              </Button>
              <Button variant="outline" className="w-full gap-2" disabled>
                <Eye className="w-4 h-4" />
                Publikovat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
