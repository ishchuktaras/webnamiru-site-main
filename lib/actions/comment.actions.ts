// lib/actions/comment.actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const commentSchema = z.object({
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  originalAuthor: z.string().min(1, { message: "Jméno je povinné." }),
  originalEmail: z.string().email({ message: "Neplatný e-mail." }),
  content: z.string().min(1, { message: "Obsah komentáře je povinný." }),
});

// Pro veřejný formulář
export async function addComment(prevState: any, formData: FormData) {
  const validatedFields = commentSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
  }
  const { postId, originalAuthor, originalEmail, content } = validatedFields.data;
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { message: "Článek nenalezen." };
  await prisma.comment.create({ data: { content, approved: false, originalAuthor, originalEmail, postId: post.id } });
  revalidatePath(`/blog/${post.slug}`);
  return { message: "Komentář byl přidán a čeká na schválení." };
}

// Pro zobrazení na stránce blogu
export async function getComments(postId: string, limit: number, offset = 0) {
    const comments = await prisma.comment.findMany({ where: { postId: postId, approved: true }, orderBy: { createdAt: "desc" }, take: limit + 1, skip: offset });
    const hasMore = comments.length > limit;
    const data = hasMore ? comments.slice(0, limit) : comments;
    return { success: true, data: JSON.parse(JSON.stringify(data)), hasMore };
}

// Pro admina
export async function approveComment(commentId: string) {
    await prisma.comment.update({ where: { id: commentId }, data: { approved: true } });
    revalidatePath("/admin/comments");
    return { success: true, message: "Komentář byl schválen." };
}

export async function rejectComment(commentId: string) {
    await prisma.comment.delete({ where: { id: commentId } });
    revalidatePath("/admin/comments");
    return { success: true, message: "Komentář byl smazán." };
}

export async function getAllComments() {
    const comments = await prisma.comment.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    return { success: true, data: comments };
}

export async function bulkApproveComments(commentIds: string[]) {
    await prisma.comment.updateMany({ where: { id: { in: commentIds } }, data: { approved: true } });
    revalidatePath("/admin/comments");
    return { success: true, message: `${commentIds.length} komentářů bylo schváleno.` };
}