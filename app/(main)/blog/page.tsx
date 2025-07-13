// app/(main)/blog/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import BlogSidebar from "@/components/BlogSidebar";
import BlogPostCard from "@/components/BlogPostCard"; 

export const metadata: Metadata = {
  title: "Blog | webnamiru.site",
  description: "Přečtěte si nejnovější články o webovém vývoji, marketingu a strategiích, jak uspět online.",
};

// Funkce pro načtení všech publikovaných příspěvků
async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Postřehy, návody a novinky ze světa webů a online marketingu.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          {/* Hlavní obsah s výpisem článků */}
          <main className="lg:col-span-3">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">Zatím zde nejsou žádné články.</p>
              </div>
            )}
            {/* Zde by v budoucnu mohla být paginace */}
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
  );
}
