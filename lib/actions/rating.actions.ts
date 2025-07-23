"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type FormState = {
  message: string;
  errors?: Record<string, string[]>;
};

const ratingSchema = z.object({
  postId: z.string().cuid({ message: "Neplatné ID článku." }),
  value: z.number().int().min(1).max(5),
  slug: z.string().min(1, { message: "Slug článku chybí." }),
});

export async function addRating(prevState: FormState, formData: FormData): Promise<FormState> {
  // Získáme přístup k cookies a počkáme na jejich načtení
  const cookieStore = await cookies(); // <-- ZDE JE KLÍČOVÁ ZMĚNA

  const postIdFromData = formData.get("postId") as string;
  
  // Nyní můžeme bezpečně pracovat s cookieStore
  if (cookieStore.has(`voted_${postIdFromData}`)) {
    return { message: "Tento článek jste již hodnotili." };
  }

  const validatedFields = ratingSchema.safeParse({
    postId: postIdFromData,
    value: parseInt(formData.get("value") as string, 10),
    slug: formData.get("slug") as string,
  });

  if (!validatedFields.success) {
    return {
      message: "Chyba ve formuláři.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { postId, value, slug } = validatedFields.data;

  try {
    await prisma.rating.create({
      data: { postId, value },
    });

    // Nyní můžeme bezpečně nastavit novou cookie
    cookieStore.set(`voted_${postId}`, "true", { // <-- ZDE JE KLÍČOVÁ ZMĚNA
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    
    revalidatePath(`/blog/${slug}`);
    
    return { message: "Děkujeme za vaše hodnocení!" };

  } catch (error) {
    return { message: "Při ukládání hodnocení došlo k interní chybě." };
  }
}

// Funkce pro získání průměru zůstává stejná
export async function getAverageRating(postId: string) {
  const result = await prisma.rating.aggregate({
    _avg: { value: true },
    _count: { value: true },
    where: { postId },
  });
  return {
    average: Number(result._avg.value?.toFixed(1) || 0),
    count: result._count.value || 0,
  };
}