"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogCategories } from "@/lib/blog-data"

interface BlogCategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  postCounts?: Record<string, number>
}

export default function BlogCategoryFilter({
  selectedCategory,
  onCategoryChange,
  postCounts = {},
}: BlogCategoryFilterProps) {
  const getCategoryColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
      green: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
      purple: "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
      orange: "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300",
      red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="h-8"
      >
        Všechny kategorie
      </Button>

      {blogCategories.map((category) => (
        <Badge
          key={category.slug}
          variant="secondary"
          className={`cursor-pointer transition-colors h-8 px-3 flex items-center gap-2 ${
            selectedCategory === category.slug ? "ring-2 ring-blue-500 ring-offset-2" : getCategoryColor(category.color)
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
          {postCounts[category.slug] && <span className="text-xs opacity-75">({postCounts[category.slug]})</span>}
        </Badge>
      ))}
    </div>
  )
}
