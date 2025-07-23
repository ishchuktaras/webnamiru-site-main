// components/BlogTagsServer.tsx

import prisma from "@/lib/prisma";
import BlogTags from "./blog-tags";

// Načteme 15 nejpoužívanějších tagů
async function getTopTags() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 15,
  });

  return tags;
}

export default async function BlogTagsServer() {
  const tags = await getTopTags();

  // Předáme načtené tagy klientské komponentě
  return <BlogTags tags={tags} />;
}