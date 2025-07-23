// components/admin/PostForm.tsx

"use client";


import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { type Post } from "@prisma/client";

// Univerzální akce, kterou budeme volat (createPost nebo updatePost)
type FormAction = (prevState: any, formData: FormData) => Promise<any>;

interface PostFormProps {
  action: FormAction;
  post?: Post | null; // Nepovinný prop pro existující článek
}

export default function PostForm({ action, post }: PostFormProps) {
  const initialState = { message: "", errors: {} };
  
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl mx-auto">
      {/* Skryté pole pro ID článku při editaci */}
      {post?.id && <input type="hidden" name="postId" value={post.id} />}

      <div className="space-y-2">
        <Label htmlFor="title">Název článku</Label>
        <Input id="title" name="title" required defaultValue={post?.title} />
        {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Krátký úvod (Excerpt)</Label>
        <Textarea id="excerpt" name="excerpt" required defaultValue={post?.excerpt} />
        {state.errors?.excerpt && <p className="text-red-500 text-sm">{state.errors.excerpt}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Obsah článku (podporuje HTML)</Label>
        <Textarea id="content" name="content" required rows={15} defaultValue={post?.content} />
        {state.errors?.content && <p className="text-red-500 text-sm">{state.errors.content}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="published" name="published" defaultChecked={post?.published ?? false} />
        <Label htmlFor="published">Publikovat článek</Label>
      </div>

      <Button type="submit">{post ? "Uložit změny" : "Vytvořit článek"}</Button>
      {state.message && <p className="text-green-500 mt-4">{state.message}</p>}
    </form>
  );
}