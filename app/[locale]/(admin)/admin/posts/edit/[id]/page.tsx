// app/[locale]/(admin)/admin/posts/edit/[id]/page.tsx

import prisma from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: { select: { id: true } },
      tags: { select: { id: true } },
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

  // Pripravíme dáta pre formulár
  const postData = {
    ...post,
    categoryIds: post.categories.map(c => c.id),
    tagIds: post.tags.map(t => t.id),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upraviť článok</h1>
      <PostForm 
        post={postData} 
        allCategories={categories}
        allTags={tags}
      />
    </div>
  );
}