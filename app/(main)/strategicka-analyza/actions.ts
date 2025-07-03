// app/(main)/strategicka-analyza/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type AnalysisFormState = {
  message: string;
  success: boolean;
};

// ZMĚNA: Rozšířené Zod schéma pro validaci všech nových polí
const analysisSchema = z.object({
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  
  // Nová pole
  businessGoals: z.string().min(1, "Prosím, popište hlavní cíle."),
  targetAudience: z.string().min(1, "Prosím, popište cílovou skupinu."),
  kpis: z.string().optional(),
  competitors: z.string().optional(),
  uniqueValue: z.string().min(1, "Prosím, popište vaši unikátní hodnotu."),
  marketingChannels: z.string().optional(),
  contentSources: z.string().optional(),
  budget: z.string().optional(),
  techRequirements: z.string().optional(),
});

export async function submitAnalysisForm(
  prevState: AnalysisFormState,
  formData: FormData
): Promise<AnalysisFormState> {
  
  const validatedFields = analysisSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    // Vrátíme první nalezenou chybu
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