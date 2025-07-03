// app/(main)/strategicka-analyza/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type AnalysisFormState = {
  message: string;
  success: boolean;
};

// Zod schéma pro validaci všech polí z nového kvízu
const analysisSchema = z.object({
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  projectType: z.string().min(1, "Prosím, vyberte typ projektu."),
  
  // Krok 2
  mainGoal: z.string().optional(),
  kpis: z.string().optional(),
  
  // Krok 3
  targetAudience: z.string().min(1, "Prosím, popište cílovou skupinu."),
  competitors: z.string().optional(),
  
  // Krok 4
  uniqueValue: z.string().min(1, "Prosím, popište vaši unikátní hodnotu."),
  budget: z.string().optional(),
});

export async function submitAnalysisForm(
  prevState: AnalysisFormState,
  formData: FormData
): Promise<AnalysisFormState> {
  
  const validatedFields = analysisSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: firstError || "Prosím, vyplňte všechna povinná pole." };
  }

  const { clientName, clientEmail, projectName, ...answers } = validatedFields.data;

  try {
    await prisma.projectInquiry.create({
      data: {
        clientName,
        clientEmail,
        projectName,
        projectType: answers.projectType,
        answers: {
          create: Object.entries(answers).map(([question, answer]) => ({
            question,
            answer: answer as string,
          })),
        },
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Děkujeme! Váš dotazník byl úspěšně odeslán. Brzy se vám ozvu s dalšími kroky." };
  } catch (error) {
    console.error("Chyba při ukládání analýzy:", error);
    return { success: false, message: "Při odesílání došlo k chybě. Zkuste to prosím znovu." };
  }
}