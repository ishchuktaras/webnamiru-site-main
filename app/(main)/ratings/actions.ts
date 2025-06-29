// app/ratings/actions.ts

"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Schéma pro validaci hodnocení
const ratingSchema = z.object({
  // ZMĚNA: Používáme post.id (cuid), ne slug
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  value: z.number().int().min(1).max(5, { message: "Hodnocení musí být mezi 1 a 5." }),
});

// Server Action pro přidání hodnocení
export async function addRating(prevState: { message: string; errors?: Record<string, string[]> }, formData: FormData) {
  try {
    console.log("--- Server Action 'addRating' byla spuštěna ---"); // Diagnostický výpis 1

    const valueStr = formData.get("value");
    const validatedFields = ratingSchema.safeParse({
      postId: formData.get("postId"),
      value: valueStr ? parseInt(valueStr as string, 10) : undefined,
    });

    if (!validatedFields.success) {
      console.error("Chyba validace:", validatedFields.error.flatten().fieldErrors);
      return {
        message: "Chyba validace hodnocení.",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { postId, value } = validatedFields.data;

    console.log(`Pokouším se zapsat do databáze: postId=${postId}, value=${value}`); // Diagnostický výpis 2

    await prisma.rating.create({
      data: {
        postId,
        value,
      },
    });

    console.log("Zápis do databáze proběhl úspěšně."); // Diagnostický výpis 3

    const post = await prisma.post.findUnique({ where: { id: postId }, select: { slug: true }});
    if (post) {
      revalidatePath(`/blog/${post.slug}`);
      console.log(`Revalidace cesty pro /blog/${post.slug}`); // Diagnostický výpis 4
    }
    
    return { message: "Vaše hodnocení bylo úspěšně přidáno!" };

  } catch (error) {
    console.error("Došlo k chybě v 'addRating':", error);
    if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
       return { message: "Tento článek jste již hodnotili." };
    }
    return { message: "Nastala chyba při přidávání hodnocení." };
  }
}

// Server Action pro načtení průměrného hodnocení
export async function getAverageRating(postId: string) {
  try {
    const result = await prisma.rating.aggregate({
      _avg: {
        value: true,
      },
      _count: {
        value: true,
      },
      where: {
        postId,
      },
    });

    return {
      average: Number(result._avg.value?.toFixed(1) || 0),
      count: result._count.value || 0,
    };
  } catch (error) {
    console.error("Chyba při načítání hodnocení:", error);
    return { average: 0, count: 0 };
  }
}