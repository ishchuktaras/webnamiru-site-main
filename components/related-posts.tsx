import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/lib/blog-data"

interface RelatedPostsProps {
  currentPostSlug: string
  limit?: number
}

export default function RelatedPosts({ currentPostSlug, limit = 3 }: RelatedPostsProps) {
  // Filter out current post and get random related posts
  const relatedPosts = blogPosts
    .filter((post) => post.slug !== currentPostSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Související články</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg leading-tight">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-sm">
                {post.author} •{" "}
                {new Date(post.date).toLocaleDateString("cs-CZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mt-3"
              >
                Číst více →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
