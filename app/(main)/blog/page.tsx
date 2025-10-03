// app/(main)/blog/page.tsx
import { Suspense } from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import BlogSidebar from "@/components/BlogSidebar";
import BlogPostCard, { type PostWithRelations } from "@/components/BlogPostCard"; 

export const metadata: Metadata = {
  title: "Blog | webnamiru.site",
  description: "Tipy, novinky a postřehy ze světa moderního webdevelopmentu, byznysu a technologií. Zůstaňte v obraze s nejnovějšími trendy.",
};

async function getPosts(): Promise<PostWithRelations[]> {
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
    <div className="bg-gray-50 dark:bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">

        {/* Úvodní sekce blogu */}
        <header className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">
            Náš Blog
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-white">
            Postřehy ze světa jedniček a nul
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Tipy, novinky a myšlenky o propojování technologií, designu a úspěšného podnikání.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          {/* Hlavní obsah s výpisem článků */}
          <main className="lg:col-span-3">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  // Používáme již existující komponentu, která teď bude vypadat moderněji
                  <BlogPostCard key={post.id} post={post} />
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
              <Suspense fallback={<div>Načítám sidebar...</div>}>
                <BlogSidebar />
              </Suspense>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}