// app/[locale]/(admin)/admin/posts/new/page.tsx

import PostForm from "@/components/admin/PostForm";
import prisma from "@/lib/prisma";

async function getCategoriesAndTags() {
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    return { categories, tags };
}

export default async function NewPostPage() {
  const { categories, tags } = await getCategoriesAndTags();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Nový článok</h1>
      <PostForm 
        allCategories={categories}
        allTags={tags}
      />
    </div>
  );
}