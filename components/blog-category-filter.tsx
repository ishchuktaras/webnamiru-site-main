// components/blog-category-filter.tsx

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Definujeme si typ pro kategorii, abychom měli jistotu, jaká data očekáváme
interface Category {
  slug: string;
  name: string;
  color: string;
  _count?: {
    posts: number;
  };
}

interface BlogCategoryFilterProps {
  categories: Category[]; // Kategorie nyní přichází jako prop
  selectedCategory?: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function BlogCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogCategoryFilterProps) {
  
  // Tato funkce zůstává beze změny
  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
      green: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
      purple: "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
      orange: "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300",
      red: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
    }
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange(null)}
      >
        Všechny
      </Button>

      {categories.map((category) => (
        <Badge
          key={category.slug}
          variant={selectedCategory === category.slug ? "default" : "secondary"}
          className={`cursor-pointer transition-all h-8 px-3 text-sm ${
            selectedCategory === category.slug 
              ? 'bg-primary text-primary-foreground' 
              : getCategoryColor(category.color)
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
          {category._count && <span className="ml-1.5 text-xs opacity-75">({category._count.posts})</span>}
        </Badge>
      ))}
    </div>
  )
}