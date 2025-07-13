// lib/actions/rating.actions.ts
"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ratingSchema = z.object({
  postId: z.string().min(1),
  value: z.number().int().min(1).max(5),
});

export async function addRating(prevState: any, formData: FormData) {
  const validatedFields = ratingSchema.safeParse({ postId: formData.get("postId"), value: parseInt(formData.get("value") as string, 10) });
  if (!validatedFields.success) return { message: "Chyba validace." };
  const { postId, value } = validatedFields.data;
  await prisma.rating.create({ data: { postId, value } });
  const post = await prisma.post.findUnique({ where: { id: postId }, select: { slug: true } });
  if (post) revalidatePath(`/blog/${post.slug}`);
  return { message: "Hodnocení bylo přidáno!" };
}

export async function getAverageRating(postId: string) {
  const result = await prisma.rating.aggregate({ _avg: { value: true }, _count: { value: true }, where: { postId } });
  return { average: Number(result._avg.value?.toFixed(1) || 0), count: result._count.value || 0 };
}