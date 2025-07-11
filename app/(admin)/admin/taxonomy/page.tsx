"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tags, FolderOpen, Plus, Edit, Trash2, Hash, Folder } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data - v reálné aplikaci by se načítalo z databáze
const mockCategories = [
  { id: 1, name: "Webový vývoj", slug: "webovy-vyvoj", count: 8, color: "blue" },
  { id: 2, name: "SEO", slug: "seo", count: 5, color: "green" },
  { id: 3, name: "Design", slug: "design", count: 3, color: "purple" },
  { id: 4, name: "Marketing", slug: "marketing", count: 4, color: "orange" },
]

const mockTags = [
  { id: 1, name: "Next.js", slug: "nextjs", count: 6 },
  { id: 2, name: "React", slug: "react", count: 8 },
  { id: 3, name: "TypeScript", slug: "typescript", count: 5 },
  { id: 4, name: "Tailwind CSS", slug: "tailwind", count: 4 },
  { id: 5, name: "Prisma", slug: "prisma", count: 3 },
  { id: 6, name: "Vercel", slug: "vercel", count: 2 },
  { id: 7, name: "PostgreSQL", slug: "postgresql", count: 3 },
  { id: 8, name: "API", slug: "api", count: 4 },
]

export default function TaxonomyPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [tags, setTags] = useState(mockTags)
  const [newCategory, setNewCategory] = useState({ name: "", color: "blue" })
  const [newTag, setNewTag] = useState("")

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const category = {
      id: Date.now(),
      name: newCategory.name,
      slug: newCategory.name.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
      color: newCategory.color,
    }

    setCategories([...categories, category])
    setNewCategory({ name: "", color: "blue" })
    toast({
      title: "Kategorie přidána",
      description: `Kategorie "${category.name}" byla úspěšně vytvořena.`,
    })
  }

  const handleAddTag = () => {
    if (!newTag.trim()) return

    const tag = {
      id: Date.now(),
      name: newTag,
      slug: newTag.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
    }

    setTags([...tags, tag])
    setNewTag("")
    toast({
      title: "Tag přidán",
      description: `Tag "${tag.name}" byl úspěšně vytvořen.`,
    })
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
    toast({
      title: "Kategorie smazána",
      description: "Kategorie byla úspěšně odstraněna.",
    })
  }

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
    toast({
      title: "Tag smazán",
      description: "Tag byl úspěšně odstraněn.",
    })
  }

  const getColorClass = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      red: "bg-red-100 text-red-800 border-red-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Kategorie
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            Tagy
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          {/* Add New Category */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Přidat novou kategorii
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="category-name">Název kategorie</Label>
                  <Input
                    id="category-name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    placeholder="Zadejte název kategorie..."
                  />
                </div>
                <div>
                  <Label htmlFor="category-color">Barva</Label>
                  <select
                    id="category-color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="blue">Modrá</option>
                    <option value="green">Zelená</option>
                    <option value="purple">Fialová</option>
                    <option value="orange">Oranžová</option>
                    <option value="red">Červená</option>
                    <option value="yellow">Žlutá</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleAddCategory} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Přidat kategorii
              </Button>
            </CardContent>
          </Card>

          {/* Categories List */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5" />
                Existující kategorie ({categories.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getColorClass(category.color)}>{category.name}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      Slug: <code className="bg-slate-100 px-1 rounded">{category.slug}</code>
                    </p>
                    <p className="text-sm text-slate-600 mt-1">{category.count} článků</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags Tab */}
        <TabsContent value="tags" className="space-y-6">
          {/* Add New Tag */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Přidat nový tag
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="tag-name">Název tagu</Label>
                  <Input
                    id="tag-name"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Zadejte název tagu..."
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddTag} className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Přidat tag
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags List */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="w-5 h-5" />
                Existující tagy ({tags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 p-2 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {tag.name}
                      <span className="text-xs text-slate-500">({tag.count})</span>
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
