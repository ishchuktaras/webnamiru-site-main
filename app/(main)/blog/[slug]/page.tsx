import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getAverageRating } from '@/lib/actions/rating.actions';
import BlogBreadcrumbs from '@/components/blog-breadcrumbs';
import BlogReadingTime from '@/components/blog-reading-time';
import BlogSocialShare from '@/components/blog-social-share';
import BlogRating from '@/components/blog-rating'; // Použijeme opravený BlogRating
import RelatedPosts from '@/components/related-posts';
import { Badge } from '@/components/ui/badge';
import CommentForm from '@/components/CommentForm';
import CommentsTable from '@/components/CommentsTable';
import BlogSidebar from '@/components/BlogSidebar';
import Image from 'next/image';
import { Post, User, Category, Tag } from '@prisma/client';

export const revalidate = 0;

// Typ pro článek se všemi detaily
export type PostWithDetails = Post & {
  author: User;
  category: Category | null;
  tags: Tag[];
};

// Typ pro props stránky
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Funkce pro načtení dat článku
async function getPostData(slug: string): Promise<PostWithDetails | null> {
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
    include: { author: true, category: true, tags: true },
  });
  return post;
}

// Generování SEO metadat
export async function generateMetadata({ params: { slug } }: BlogPostPageProps): Promise<Metadata> {
  // ZÍSKÁME SLUG PŘÍMO ZDE
  try {
    const post = await getPostData(slug); // Nyní používáme přímo `slug`

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
export default async function BlogPostPage({ params: { slug } }: BlogPostPageProps) {
  // A ZÍSKÁME SLUG PŘÍMO I ZDE
  const post = await getPostData(slug); // Nyní používáme přímo `slug`

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
        <article className="lg:col-span-3">
          <header className="mb-8">
            {/* ... obsah headeru ... */}
             <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight mb-4">
              {post.title}
            </h1>
          </header>

          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={`Náhledový obrázek pro článek ${post.title}`}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}
          
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mb-12">
            <BlogRating
              postId={post.id}
              slug={post.slug}
              average={initialRatingData.average}
              count={initialRatingData.count}
            />
          </div>

          <CommentForm postId={post.id} />
          <CommentsTable postId={post.id} />
        </article>

        <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="sticky top-24">
                <Suspense fallback={<div>Načítám...</div>}>
                    <BlogSidebar />
                </Suspense>
            </div>
        </aside>
      </div>

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