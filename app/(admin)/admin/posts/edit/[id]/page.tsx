// app/admin/posts/edit/[id]/page.tsx

import prisma from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";
import { updatePost } from "@/lib/actions/post.actions";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Upravit článek</h1>
      <PostForm action={updatePost} post={post} />
    </div>
  );
}