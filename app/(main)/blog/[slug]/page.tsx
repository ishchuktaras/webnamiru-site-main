// app/(main)/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Calendar, Clock, UserCircle, Tag } from 'lucide-react';

import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/formatDate';

import BlogSidebar from '@/components/BlogSidebar';
import BlogPostContent from '@/components/blog-post-content';
import BlogSocialShare from '@/components/blog-social-share';
import RelatedPosts from '@/components/related-posts';
import Comments from '@/components/CommentsTable';
import CommentForm from '@/components/CommentForm';
import BlogBreadcrumbs from '@/components/blog-breadcrumbs';
import { Badge } from '@/components/ui/badge';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

// Funkce pro načtení dat článku
async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });
  return post;
}

// Funkce pro generování dynamických SEO metadat
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: 'Článek nenalezen' };
  }
  return {
    title: `${post.title} | webnamiru.site`,
    description: post.excerpt,
  };
}

// Komponenta stránky
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  const readingTime = Math.ceil((post.content?.split(' ').length || 200) / 200);

  return (
    <article>
      {/* === Nová Hlavička Článku === */}
      <header className="relative h-[60vh] min-h-[400px] w-full text-white">
        <div className="absolute inset-0">
          <Image
            src={post.imageUrl || '/placeholder.svg'}
            alt={`Obrázek k článku ${post.title}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-end container mx-auto px-4 py-12 sm:py-16">
           <div className="max-w-4xl">
              {post.category && (
                <Link href={`/blog/kategorie/${post.category.slug}`} className="text-sm font-semibold uppercase tracking-wider hover:underline">{post.category.name}</Link>
              )}
              <h1 className="mt-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm opacity-90">
                 <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span>{post.author.name}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <time dateTime={post.createdAt.toISOString()}>
                        {formatDate(post.createdAt)}
                    </time>
                 </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{readingTime} min čtení</span>
                 </div>
              </div>
           </div>
        </div>
      </header>

      {/* === Tělo článku se sidebarem === */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="mb-8">
            <BlogBreadcrumbs postTitle={post.title} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
            
            {/* Hlavní obsah článku */}
            <main className="lg:col-span-3">
              <BlogPostContent post={post} />

              {/* Tagy a Sdílení */}
              <div className="mt-12 border-t pt-8">
                {post.tags && post.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                        {post.tags.map(tag => (
                            <Link key={tag.id} href={`/blog/tagy/${tag.slug}`}>
                                <Badge variant="secondary">#{tag.name}</Badge>
                            </Link>
                        ))}
                    </div>
                )}
                {/* OPRAVA: Předáváme props 'title' a 'slug' samostatně */}
                <BlogSocialShare title={post.title} slug={post.slug} />
              </div>

              {/* Související články */}
              {post.category && (
                <Suspense fallback={<div>Načítám související články...</div>}>
                    {/* OPRAVA: Předáváme props 'category' (slug) a 'excludePostId' */}
                    <RelatedPosts category={post.category.slug} excludePostId={post.id} />
                </Suspense>
              )}

              {/* Sekce komentářů */}
              <div id="komentare" className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Komentáře</h2>
                  <CommentForm postId={post.id} />
                  <div className="mt-8">
                     <Suspense fallback={<div>Načítám komentáře...</div>}>
                        <Comments postId={post.id} />
                     </Suspense>
                  </div>
              </div>

            </main>
            
            {/* Postranní panel */}
            <aside className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="sticky top-24 space-y-8">
                <Suspense fallback={<div>Načítám...</div>}>
                  <BlogSidebar />
                </Suspense>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}