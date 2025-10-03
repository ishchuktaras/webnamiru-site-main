// components/blog-post-content.tsx

// Import the type, not the value
import type { PostWithDetails } from "@/lib/types";

interface BlogPostContentProps {
  post: PostWithDetails;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article>
      {/* Hlavní obrázek článku */}
      {/* {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={post.imageUrl}
            alt={`Náhledový obrázek pro článek ${post.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      )} */}

      {/* Tělo článku */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}