import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BlogBreadcrumbsProps {
  postTitle?: string
}

export default function BlogBreadcrumbs({ postTitle }: BlogBreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
      <Link href="/" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Domů
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        Blog
      </Link>
      {postTitle && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-xs">{postTitle}</span>
        </>
      )}
    </nav>
  )
}
