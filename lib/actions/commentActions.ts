// lib/actions/commentActions.ts
"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveComment(commentId: string) {
  await prisma.comment.update({ where: { id: commentId }, data: { approved: true } });
  revalidatePath("/admin/comments");
}

export async function deleteComment(commentId: string) {
  await prisma.comment.delete({ where: { id: commentId } });
  revalidatePath("/admin/comments");
}