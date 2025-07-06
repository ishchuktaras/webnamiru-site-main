// app/admin/posts/new/page.tsx

import PostForm from "@/components/admin/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Vytvořit nový článek</h1>
      <PostForm action={createPost} />
    </div>
  );
}