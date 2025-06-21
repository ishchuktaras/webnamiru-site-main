import type { BlogPost } from "@/lib/blog-data"

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 max-w-3xl mx-auto">
      <header className="space-y-4 mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight">{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {post.author} |{" "}
          {new Date(post.date).toLocaleDateString("cs-CZ", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>
      <div className="prose prose-lg dark:prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
