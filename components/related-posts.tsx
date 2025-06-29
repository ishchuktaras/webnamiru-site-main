// components/related-posts.tsx

import Link from "next/link";
import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ZMĚNA: Definujeme, jaké props komponenta přijímá
interface RelatedPostsProps {
  currentPostSlug: string;
  currentPostCategory?: string | null; // Kategorie může být nepovinná
}

// ZMĚNA: Nová funkce pro načtení souvisejících článků
async function getRelatedPosts({ currentPostSlug, currentPostCategory }: RelatedPostsProps) {
  if (!currentPostCategory) {
    // Pokud článek nemá kategorii, vrátíme nejnovější články
    return prisma.post.findMany({
      where: {
        published: true,
        slug: { not: currentPostSlug }, // Vyloučíme aktuální článek
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { category: true },
    });
  }

  // Najdeme další články ve stejné kategorii
  return prisma.post.findMany({
    where: {
      published: true,
      category: { slug: currentPostCategory },
      slug: { not: currentPostSlug },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { category: true },
  });
}


export default async function RelatedPosts(props: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(props);

  if (relatedPosts.length === 0) {
    return null; // Pokud nenajdeme žádné související články, nic nezobrazíme
  }

  return (
    <div className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Související články</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                {post.category && (
                    <Badge variant="secondary" className="mb-2">{post.category.name}</Badge>
                )}
                <CardTitle className="text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm mt-2">
                    {new Date(post.createdAt).toLocaleDateString("cs-CZ", { month: 'long', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}