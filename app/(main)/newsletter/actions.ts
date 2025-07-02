// app/(main)/newsletter/actions.ts

"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Definujeme si přesný typ pro stav, který bude akce vracet
export type NewsletterFormState = {
  message: string;
  success: boolean;
};

const NewsletterSchema = z.object({
  email: z.string().email({ message: "Zadejte prosím platný formát e-mailu." }),
});

export async function subscribeToNewsletter(
  prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  
  // 1. Validace dat
  const validatedFields = NewsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Chyba validace.",
      success: false,
    };
  }

  const { email } = validatedFields.data;

  try {
    // 2. Kontrola, zda uživatel již neexistuje
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return { message: "Tento e-mail je již k odběru přihlášen.", success: true };
    }

    // 3. Uložení do databáze
    await prisma.newsletter.create({
      data: {
        email: email,
        active: true,
        source: "Blog Newsletter Form", // Přidáme zdroj pro lepší přehled
      },
    });

    console.log(`✅ Nový odběratel uložen do databáze: ${email}`);
    
    // Revalidujeme cestu, aby se případně aktualizoval počet odběratelů v adminu
    revalidatePath('/admin/newsletter');

    return { success: true, message: "Děkujeme! Byli jste úspěšně přihlášeni." };

  } catch (error) {
    console.error("❌ Chyba při přihlašování k newsletteru:", error);
    return { message: "Na naší straně nastala chyba. Zkuste to prosím později.", success: false };
  }
}