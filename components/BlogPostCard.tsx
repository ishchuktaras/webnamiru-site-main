// components/BlogPostCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate'; // Předpokládám existenci této funkce
import { Post, User, Category } from '@prisma/client';

// Váš typ, který již pravděpodobně máte
export type PostWithRelations = Post & {
  author: User;
  category: Category | null;
};

interface BlogPostCardProps {
  post: PostWithRelations;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Odhadovaná doba čtení, pokud ji nemáte v DB
  const readingTime = Math.ceil((post.content?.split(' ').length || 200) / 200);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">{post.title}</span>
      </Link>
      
      <div className="relative h-52 w-full">
        <Image
          src={post.imageUrl || '/placeholder.svg'} // Použije placeholder, pokud obrázek není
          alt={`Náhledový obrázek pro článek ${post.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          {post.category && (
            <Badge variant="secondary" className="mb-3">{post.category.name}</Badge>
          )}
          <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        
        <div className="mt-auto border-t pt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
             <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
             </div>
             <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min čtení</span>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}