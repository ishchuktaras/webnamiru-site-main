import { getPostBySlug, getPostSlugs } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Footer from "@/components/Footer"
import BlogBreadcrumbs from "@/components/blog-breadcrumbs"
import BlogReadingTime from "@/components/blog-reading-time"
import BlogSocialShare from "@/components/blog-social-share"
import BlogRatingSafe from "@/components/blog-rating-safe"
import RelatedPosts from "@/components/related-posts"
import { Badge } from "@/components/ui/badge"
import { blogCategories } from "@/lib/blog-data"

// Generování statických cest pro blogové příspěvky
export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

// Metadata pro SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      return {
        title: "Článek nenalezen",
        description: "Požadovaný článek nebyl nalezen.",
      }
    }

    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Chyba při načítání článku",
      description: "Došlo k chybě při načítání článku.",
    }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
      notFound()
    }

    const categoryInfo = blogCategories.find((c) => c.slug === post.category)

    return (
      <main className="min-h-screen">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <BlogBreadcrumbs postTitle={post.title} />

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className={`${
                  categoryInfo?.color === "blue"
                    ? "bg-blue-100 text-blue-800"
                    : categoryInfo?.color === "green"
                      ? "bg-green-100 text-green-800"
                      : categoryInfo?.color === "purple"
                        ? "bg-purple-100 text-purple-800"
                        : categoryInfo?.color === "orange"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                }`}
              >
                {categoryInfo?.name}
              </Badge>
              <BlogReadingTime readingTime={post.readingTime} />
            </div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("cs-CZ", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <BlogSocialShare title={post.title} url={`/blog/${post.slug}`} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Safe Rating Component */}
          <div className="mb-12">
            <BlogRatingSafe postId={post.slug} />
          </div>

          {/* Related Posts */}
          <Suspense fallback={<div>Načítám související články...</div>}>
            <RelatedPosts currentPostSlug={post.slug} />
          </Suspense>
        </article>

        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Error rendering blog post page:", error)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Došlo k chybě</h1>
          <p className="text-gray-600">Omlouváme se, došlo k chybě při načítání článku.</p>
        </div>
      </main>
    )
  }
}
