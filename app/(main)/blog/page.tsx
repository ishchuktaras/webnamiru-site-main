// app/(main)/blog/page.tsx

import Link from "next/link";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlogReadingTime from "@/components/blog-reading-time";
import BlogNewsletter from "@/components/blog-newsletter";
import BlogSidebar from "@/components/BlogSidebar"; // Importujeme náš nový sidebar
import { Post, Category } from "@prisma/client"; // Importujeme typy

// Typ pro článek s propojenými daty
type PostWithRelations = Post & {
  author: { name: string | null };
  category: Category | null;
};

// Funkce pro načtení všech článků z našeho API
async function getPosts(): Promise<PostWithRelations[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/posts`, { 
        cache: 'no-store' // Zajistí, že data budou vždy čerstvá
    });
    if (!res.ok) {
      console.error("Failed to fetch posts:", res.status, res.statusText);
      return [];
    }
    return res.json();
  } catch (error) {
      console.error("Error fetching posts:", error);
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

      {/* ZMĚNA: Grid layout pro obsah a sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
        
        {/* Hlavní obsah (zabírá 2/3 šířky) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Doporučené články */}
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

          {/* Všechny články */}
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
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Číst více →</Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Postranní panel (zabírá 1/3 šířky) */}
        <div className="lg:col-span-1">
          <Suspense fallback={<div>Načítám...</div>}>
            <BlogSidebar />
          </Suspense>
        </div>
      </div>

      <section className="mt-16"><BlogNewsletter /></section>
    </div>
  );
}