import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getAverageRating } from '@/lib/actions/rating.actions';
import BlogBreadcrumbs from '@/components/blog-breadcrumbs';
import BlogReadingTime from '@/components/blog-reading-time';
import BlogSocialShare from '@/components/blog-social-share';
import BlogRatingSafe from '@/components/blog-rating-safe';
import RelatedPosts from '@/components/related-posts';
import { Badge } from '@/components/ui/badge';
import CommentForm from '@/components/CommentForm';
import CommentsTable from '@/components/CommentsTable';
import BlogSidebar from '@/components/BlogSidebar';
import Image from 'next/image';
import { Post, User, Category, Tag } from '@prisma/client';

export const revalidate = 0;

export type PostWithDetails = Post & { 
  author: User;
  category: Category | null;
  tags: Tag[];
  image?: string | null;
};

// Typy pro props, abychom měli jistotu
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Funkce pro načtení dat článku
async function getPostData(slug: string): Promise<PostWithDetails | null> {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });
  return post;
}

// Generování statických stránek pro všechny články
export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
    return [];
  }
}

// Generování SEO metadat
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug); // Použijeme params.slug přímo zde

    if (!post) {
      return { title: 'Článek nenalezen' };
    }
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Chyba načítání',
      description: 'Při načítání metadat pro tento článek došlo k chybě.',
    };
  }
}

// Hlavní komponenta stránky
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostData(params.slug); // Použijeme params.slug přímo zde

  if (!post) {
    notFound();
  }

  const initialRatingData = await getAverageRating(post.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <BlogBreadcrumbs postTitle={post.title} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
        {/* Hlavní obsah článku */}
        <article className="lg:col-span-3">
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <Badge variant="secondary">{post.category.name}</Badge>
              )}
              <BlogReadingTime readingTime={post.readingTime} />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-between flex-wrap gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <span>{post.author.name}</span>
                <span>•</span>
                <time dateTime={post.createdAt.toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString('cs-CZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <BlogSocialShare title={post.title} url={`/blog/${post.slug}`} />
            </div>
          </header>

          {/* Hlavní obrázek článku */}
          {post.image && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={`Náhledový obrázek pro článek ${post.title}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" className="text-xs">
                #{tag.name}
              </Badge>
            ))}
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mb-12">
            <BlogRatingSafe
              postId={post.id}
              initialAverage={initialRatingData.average}
              initialCount={initialRatingData.count}
            />
          </div>

          <CommentForm postId={post.id} />
          <CommentsTable postId={post.id} />
        </article>

        {/* Postranní panel */}
        <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="sticky top-24">
                <Suspense fallback={<div>Načítám...</div>}>
                    <BlogSidebar />
                </Suspense>
            </div>
        </aside>
      </div>

      {/* Související články */}
      <div className="mt-16">
        <Suspense fallback={<div>Načítám související články...</div>}>
          <RelatedPosts
            currentPostSlug={post.slug}
            currentPostCategory={post.category?.slug}
          />
        </Suspense>
      </div>
    </div>
  );
}