// app/[locale]/(admin)/admin/posts/edit/[id]/page.tsx

import prisma from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import type { Post, Category, Tag } from "@prisma/client";

// Definuje nový typ pro příspěvek s načtenými kategoriemi a tagy
type PostWithRelations = Post & {
  category?: Category | null; // Kategorie může být jedna nebo žádná
  tags: Tag[];             // Tagů může být více
};

async function getPost(id: string): Promise<PostWithRelations | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    // Používáme správné názvy vztahů podle schématu
    include: {
      category: true, // jednotné číslo
      tags: true,     // množné číslo
    },
  });
  return post;
}

async function getCategoriesAndTags() {
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    return { categories, tags };
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const { categories, tags } = await getCategoriesAndTags();

  if (!post) {
    return notFound();
  }

  // Připravíme data pro formulář se správnými typy
  const postData = {
    ...post,
    // Pokud kategorie existuje, vezmeme její ID, jinak je pole prázdné
    categoryIds: post.category ? [post.category.id] : [],
    // Zmapujeme pole tagů na pole jejich IDček
    tagIds: post.tags.map(t => t.id),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upravit článek</h1>
      <PostForm 
        post={postData} 
        allCategories={categories}
        allTags={tags}
      />
    </div>
  );
}