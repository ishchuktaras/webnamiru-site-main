// components/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import BlogReadingTime from '@/components/blog-reading-time';
import { Post, Category, User } from '@prisma/client';

// Rozšíříme základní typ Post o načtené relace (autora a kategorii)
type PostWithRelations = Post & {
  author: User;
  category: Category | null;
};

interface BlogPostCardProps {
  post: PostWithRelations;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article key={post.id} className="group flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <Image
          
          src={'/placeholder.svg'}
          alt={`Náhledový obrázek pro článek ${post.title}`}
          width={800}
          height={400}
          className="object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-3 flex items-center gap-3 text-sm">
            {post.category && (
              <Link href={`/blog/kategorie/${post.category.slug}`}>
                <Badge variant="secondary">{post.category.name}</Badge>
              </Link>
            )}
            <BlogReadingTime readingTime={post.readingTime} />
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary">
              {post.title}
            </h3>
          </Link>
          <p className="mt-3 text-base text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
              <span className="sr-only">{post.author.name}</span>
              <Image
                className="h-10 w-10 rounded-full object-cover"
                src={post.author.image || '/placeholder-user.jpg'}
                alt={`Profilový obrázek autora ${post.author.name}`}
                width={40}
                height={40}
              />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">
              {post.author.name}
            </p>
            <div className="flex space-x-1 text-sm text-muted-foreground">
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString("cs-CZ", { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
