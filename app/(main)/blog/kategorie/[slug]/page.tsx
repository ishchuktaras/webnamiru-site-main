// app/(main)/blog/kategorie/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogPostCard, { type PostWithRelations } from '@/components/BlogPostCard';
import BlogBreadcrumbs from '@/components/blog-breadcrumbs';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

// Funkce pro načtení dat kategorie a jejích článků
async function getCategoryData(slug: string) {
  const categoryWithPosts = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        include: {
          author: true,
          category: true, // Zahrneme kategorii pro konzistenci dat v BlogPostCard
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return categoryWithPosts;
}

// Funkce pro generování dynamických SEO metadat
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryData = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!categoryData) {
    return { title: 'Kategorie nenalezena' };
  }

  return {
    title: `Články v kategorii: ${categoryData.name} | webnamiru.site`,
    description: `Prohlédněte si všechny články v kategorii ${categoryData.name} na blogu webnamiru.site.`,
  };
}

// Komponenta stránky
export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = await getCategoryData(params.slug);

  // Pokud kategorie neexistuje, zobrazíme 404
  if (!categoryData) {
    notFound();
  }

  const posts = categoryData.posts as PostWithRelations[];

  return (
    <div className="bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <BlogBreadcrumbs postTitle={`Kategorie: ${categoryData.name}`} />
        </div>
        
        <header className="text-center mb-12">
          <p className="text-lg text-primary font-semibold mb-2">Archiv kategorie</p>
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl">
            {categoryData.name}
          </h1>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">V této kategorii zatím nejsou žádné články.</p>
          </div>
        )}
      </div>
    </div>
  );
}