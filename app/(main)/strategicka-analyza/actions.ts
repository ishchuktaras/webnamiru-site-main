// app/(main)/strategicka-analyza/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type AnalysisFormState = {
  message: string;
  success: boolean;
};

// Zde definujeme všechny otázky, které očekáváme z formuláře
const analysisSchema = z.object({
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  // A všechny další otázky jako stringy
  businessGoals: z.string(),
  targetAudience: z.string(),
  competitors: z.string().optional(),
  uniqueValue: z.string(),
  // ... a tak dále pro všechny otázky
});

export async function submitAnalysisForm(
  prevState: AnalysisFormState,
  formData: FormData
): Promise<AnalysisFormState> {
  
  const validatedFields = analysisSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: "Prosím, vyplňte všechna povinná pole." };
  }

  const { clientName, clientEmail, projectName, ...answers } = validatedFields.data;

  try {
    // Vytvoříme hlavní záznam o poptávce a k němu připojené odpovědi
    await prisma.projectInquiry.create({
      data: {
        clientName,
        clientEmail,
        projectName,
        answers: {
          create: Object.entries(answers).map(([question, answer]) => ({
            question,
            answer: answer as string,
          })),
        },
      },
    });

    revalidatePath("/admin"); // Aby se případně v adminu objevil nový záznam
    return { success: true, message: "Děkujeme! Váš dotazník byl úspěšně odeslán. Brzy se vám ozvu." };
  } catch (error) {
    console.error("Chyba při ukládání analýzy:", error);
    return { success: false, message: "Při odesílání došlo k chybě. Zkuste to prosím znovu." };
  }
}