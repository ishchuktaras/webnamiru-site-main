// components/blog-tags.tsx

"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Očekáváme pole objektů, ne jen stringů
interface Tag {
  slug: string;
  name: string;
}

interface BlogTagsProps {
  tags: Tag[]; // Změněno z getAllTags() na props
  selectedTags?: string[]
  limit?: number
}

export default function BlogTags({ tags, selectedTags = [], limit }: BlogTagsProps) {
  // Zobrazíme buď všechny tagy, nebo jen omezený počet
  const displayTags = limit ? tags.slice(0, limit) : tags

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <Link key={tag.slug} href={`/blog/tagy/${tag.slug}`}>
          <Badge
            variant={selectedTags.includes(tag.name) ? "default" : "secondary"}
            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            #{tag.name}
          </Badge>
        </Link>
      ))}
    </div>
  )
}