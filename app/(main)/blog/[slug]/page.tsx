// app/(main)/blog/[slug]/page.tsx

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
// ZMĚNA: Opravena cesta k importu
import { getAverageRating } from "@/lib/actions/rating.actions"; 

import Footer from "@/components/Footer";
import BlogBreadcrumbs from "@/components/blog-breadcrumbs";
import BlogReadingTime from "@/components/blog-reading-time";
import BlogSocialShare from "@/components/blog-social-share";
import BlogRatingSafe from "@/components/blog-rating-safe";
import RelatedPosts from "@/components/related-posts";
import { Badge } from "@/components/ui/badge";
import CommentForm from "@/components/CommentForm";
import CommentsTable from "@/components/CommentsTable";
import BlogSidebar from "@/components/BlogSidebar"; 

export const revalidate = 0;

async function getPostData(slug: string) {
  const post = await prisma.post.findUnique({
    where: { 
      slug: slug,
      published: true
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });
  return post;
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Error generating static params for blog posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // ZMĚNA: Odstraněno 'await' před params
    const { slug } = params;
    const post = await getPostData(slug);

    if (!post) {
      return { title: "Článek nenalezen" };
    }
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Chyba načítání",
      description: "Při načítání metadat pro tento článek došlo k chybě.",
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug:string } }) {
  // ZMĚNA: Odstraněno 'await' před params
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const initialRatingData = await getAverageRating(post.id);

  return (
    // ZMĚNA: Používáme grid pro rozdělení na hlavní obsah a sidebar
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
      
      {/* Hlavní obsah článku (zabírá 2/3 šířky na desktopu) */}
      <article className="lg:col-span-2">
        <BlogBreadcrumbs postTitle={post.title} />
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
               <Badge variant="secondary" style={{ backgroundColor: post.category.color || 'grey', color: 'white' }}>
                  {post.category.name}
               </Badge>
            )}
            <BlogReadingTime readingTime={post.readingTime} />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span>{post.author.name}</span>
              <span>•</span>
              <time dateTime={post.createdAt.toISOString()}>
                {new Date(post.createdAt).toLocaleDateString("cs-CZ", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </time>
            </div>
            <BlogSocialShare title={post.title} url={`/blog/${post.slug}`} />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">#{tag.name}</Badge>
            ))}
          </div>
        </header>
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

      {/* Postranní panel (zabírá 1/3 šířky na desktopu) */}
      <div className="lg:col-span-1">
          <Suspense fallback={<div>Načítám sidebar...</div>}>
            <BlogSidebar />
          </Suspense>
      </div>

      {/* Související články nyní zobrazíme pod obsahem */}
      <div className="lg:col-span-3 mt-16">
        <Suspense fallback={<div>Načítám související články...</div>}>
          <RelatedPosts currentPostSlug={post.slug} currentPostCategory={post.category?.slug} />
        </Suspense>
      </div>
    </div>
  );
}