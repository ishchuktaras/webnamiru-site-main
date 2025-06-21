"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface BlogSearchInputProps {
  onSearch: (query: string) => void
  initialQuery?: string
}

export default function BlogSearchInput({ onSearch, initialQuery = "" }: BlogSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchQuery)
    }, 300) // Debounce search to avoid too many updates

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery, onSearch])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
      <Input
        type="text"
        placeholder="Hledat v článcích..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background shadow-sm focus:ring-1 focus:ring-black dark:focus:ring-gray-50"
      />
    </div>
  )
}
