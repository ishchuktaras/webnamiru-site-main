// app/comments/actions.ts

"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const commentSchema = z.object({
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  originalAuthor: z.string().min(1, { message: "Jméno je povinné." }),
  originalEmail: z.string().email({ message: "Neplatný e-mail." }),
  content: z.string().min(1, { message: "Obsah komentáře je povinný." }),
});

export async function addComment(
  prevState: { message: string; errors?: Record<string, string[]> },
  formData: FormData,
) {
  try {
    const validatedFields = commentSchema.safeParse({
      postId: formData.get("postId"),
      originalAuthor: formData.get("author"),
      originalEmail: formData.get("email"),
      content: formData.get("content"),
    });

    if (!validatedFields.success) {
      return {
        message: "Chyba validace komentáře.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { postId, originalAuthor, originalEmail, content } = validatedFields.data;

    // Najdeme článek v databázi, abychom měli jeho data k dispozici
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return { message: "Článek nenalezen." };
    }

    await prisma.comment.create({
      data: {
        content,
        approved: false,
        originalAuthor: originalAuthor,
        originalEmail: originalEmail,
        postId: post.id,
      },
    });
    
    // ZMĚNA ZDE: Použijeme slug z článku, který jsme si načetli z databáze
    revalidatePath(`/blog/${post.slug}`);

    return { message: "Váš komentář byl úspěšně přidán a čeká na schválení." };
  } catch (error) {
    console.error("Chyba při přidávání komentáře:", error);
    return { message: "Nastala chyba při přidávání komentáře. Zkuste to prosím znovu." };
  }
}

export async function getComments(postId: string, limit: number, offset = 0) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit + 1,
      skip: offset,
    });

    const hasMore = comments.length > limit;
    const data = hasMore ? comments.slice(0, limit) : comments;

    return { success: true, data: JSON.parse(JSON.stringify(data)), hasMore: hasMore };
  } catch (error) {
    console.error("Chyba při načítání komentářů:", error);
    return { success: false, error: "Chyba při načítání komentářů.", data: [], hasMore: false };
  }
}