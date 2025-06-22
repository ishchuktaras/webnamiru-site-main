"use client"

import { Badge } from "@/components/ui/badge"
import { getAllTags } from "@/lib/blog-data"

interface BlogTagsProps {
  selectedTags?: string[]
  onTagClick?: (tag: string) => void
  limit?: number
}

export default function BlogTags({ selectedTags = [], onTagClick, limit }: BlogTagsProps) {
  const allTags = getAllTags()
  const displayTags = limit ? allTags.slice(0, limit) : allTags

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "secondary"}
          className={`cursor-pointer transition-colors ${onTagClick ? "hover:bg-blue-100 dark:hover:bg-blue-900" : ""}`}
          onClick={() => onTagClick?.(tag)}
        >
          #{tag}
        </Badge>
      ))}
    </div>
  )
}
