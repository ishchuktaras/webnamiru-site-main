// lib/actions/post.actions.ts

"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const postSchema = z.object({
  title: z.string().min(1, "Název je povinný."),
  excerpt: z.string().min(1, "Úvod je povinný."),
  content: z.string().min(1, "Obsah je povinný."),
  published: z.preprocess((val) => val === 'on', z.boolean()),
});

// Funkce pro vytvoření unikátního slugu
function createSlug(title: string) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createPost(prevState: any, formData: FormData) {
  const validatedFields = postSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { title, excerpt, content, published } = validatedFields.data;

  const authorId = "cmchhpjdl0000ijgc6dldvr7h"; // Nahraď skutečným ID autora

  try {
    await prisma.post.create({
      data: {
        title,
        slug: createSlug(title) + '-' + Date.now(),
        excerpt,
        content,
        published,
        authorId,
      },
    });
  } catch (error) {
    return { message: "Chyba při vytváření článku." };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(prevState: any, formData: FormData) {
    const postId = formData.get("postId") as string;
    if (!postId) return { message: "Chybí ID článku." };

    const validatedFields = postSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { title, excerpt, content, published } = validatedFields.data;

    try {
        await prisma.post.update({
            where: { id: postId },
            data: { title, excerpt, content, published, slug: createSlug(title) },
        });
    } catch (error) {
        return { message: "Chyba při ukládání změn." };
    }

    revalidatePath("/admin/posts");
    revalidatePath(`/blog/${createSlug(title)}`);
    redirect("/admin/posts");
}

export async function deletePost(postId: string) {
  if (!postId) {
    return { message: "Chybí ID článku." };
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error("Chyba při mazání článku:", error);
    return { message: "Chyba při mazání článku." };
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}