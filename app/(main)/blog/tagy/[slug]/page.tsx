// app/(main)/blog/tagy/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import BlogPostCard, { type PostWithRelations } from '@/components/BlogPostCard';
import BlogBreadcrumbs from '@/components/blog-breadcrumbs';

type TagPageProps = {
  params: {
    slug: string;
  };
};

// Funkce pro načtení dat tagu a jeho článků
async function getTagData(slug: string) {
  const tagWithPosts = await prisma.tag.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        include: {
          author: true,
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return tagWithPosts;
}

// Funkce pro generování dynamických SEO metadat
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tagData = await prisma.tag.findUnique({
    where: { slug: params.slug },
  });

  if (!tagData) {
    return { title: 'Tag nenalezen' };
  }

  return {
    title: `Články s tagem: ${tagData.name} | webnamiru.site`,
    description: `Prohlédněte si všechny články označené tagem #${tagData.name} na blogu webnamiru.site.`,
  };
}

// Komponenta stránky
export default async function TagPage({ params }: TagPageProps) {
  const tagData = await getTagData(params.slug);

  // Pokud tag neexistuje, zobrazíme 404
  if (!tagData) {
    notFound();
  }

  const posts = tagData.posts as PostWithRelations[];

  return (
    <div className="bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="mb-8">
          <BlogBreadcrumbs postTitle={`Tag: #${tagData.name}`} />
        </div>
        
        <header className="text-center mb-12">
          <p className="text-lg text-primary font-semibold mb-2">Archiv tagu</p>
          <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-100 sm:text-5xl">
            #{tagData.name}
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
            <p className="text-xl text-gray-500">Pod tímto tagem zatím nejsou žádné články.</p>
          </div>
        )}
      </div>
    </div>
  );
}