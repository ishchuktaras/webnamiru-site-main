// app/(main)/blog/page.tsx

import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogReadingTime from "@/components/blog-reading-time";
// ZMĚNA: Opraven název souboru v importu

import BlogSidebar from "@/components/BlogSidebar";
import { Post, Category, Tag } from "@prisma/client";
import prisma from "@/lib/prisma";

// Typ pro článek s propojenými daty
type PostWithRelations = Post & {
  author: { name: string | null };
  category: Category | null;
  tags: Tag[];
};

// Funkce pro načtení všech článků
async function getPosts(): Promise<PostWithRelations[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { name: true } },
        category: true,
        tags: true,
      },
    });
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPosts = posts.filter((post) => post.featured);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
          Blog o webdevelopmentu
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Praktické tipy, návody a poznatky ze světa tvorby webů. Od strategie po technickou realizaci.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        <div className="lg:col-span-2 space-y-12">
          {featuredPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Doporučené články</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow border-2 border-blue-200">
                    <CardHeader className="pb-3">
                       <div className="flex items-center gap-2 mb-2">
                          <Badge variant="default" className="bg-blue-600">Doporučeno</Badge>
                          <BlogReadingTime readingTime={post.readingTime} />
                        </div>
                      <CardTitle className="text-xl leading-tight">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{post.title}</Link>
                      </CardTitle>
                       <CardDescription className="text-sm">
                          {post.author.name} • {new Date(post.createdAt).toLocaleDateString("cs-CZ", { year: 'numeric', month: 'long', day: 'numeric' })}
                       </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Číst více →</Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-6">Všechny články</h2>
            {posts.length === 0 ? (
              <p className="text-center py-12 text-gray-500">Zatím nebyly publikovány žádné články.</p>
            ) : (
               <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                   <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                     <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          {post.category && <Badge variant="secondary" style={{ backgroundColor: post.category.color || 'grey', color: 'white' }}>{post.category.name}</Badge>}
                          <BlogReadingTime readingTime={post.readingTime} />
                        </div>
                      <CardTitle className="text-lg leading-tight">
                         <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{post.title}</Link>
                      </CardTitle>
                       <CardDescription className="text-sm">
                         {post.author.name} • {new Date(post.createdAt).toLocaleDateString("cs-CZ", { year: 'numeric', month: 'long', day: 'numeric' })}
                       </CardDescription>
                     </CardHeader>
                     <CardContent>
                       <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
                       <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Číst více →
                       </Link>
                     </CardContent>
                   </Card>
                ))}
               </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
            <Suspense fallback={<div>Načítám...</div>}>
                <BlogSidebar />
            </Suspense>
        </div>
      </div>    
      
    </div>
  );
}