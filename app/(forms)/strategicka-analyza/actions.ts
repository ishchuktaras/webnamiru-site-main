// app/(forms)/strategicka-analyza/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type AnalysisFormState = {
  message: string;
  success: boolean;
  errors?: z.ZodIssue[];
};

// Aktualizované Zod schéma pro validaci
const analysisSchema = z.object({
  // Povinná pole
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  projectType: z.string().min(1, "Typ projektu je povinný."),
  mainGoal: z.string().min(1, "Hlavní cíl je povinný."),
  targetAudience: z.string().min(1, "Popis cílové skupiny je povinný."),
  usp: z.string().min(1, "Unikátní prodejní nabídka je povinná."),
  contentProvider: z.string().min(1, "Je třeba určit, kdo dodá obsah."),
  mustHaveFeatures: z.array(z.string()).min(1, "Vyberte alespoň jednu funkci."),
  
  // Nepovinná pole
  projectReason: z.string().optional(),
  projectTimeline: z.string().optional(),
  budgetRange: z.string().optional(),
  brandStory: z.string().optional(),
  brandValues: z.string().optional(),
  brandVoice: z.array(z.string()).optional(),
  mainGoalOther: z.string().optional(),
  successMetrics: z.string().optional(),
  userPainPoints: z.string().optional(),
  competitors: z.string().optional(),
  inspirations: z.string().optional(),
  mustHaveFeaturesOther: z.string().optional(),
});

export async function submitAnalysisForm(
  formData: FormData
): Promise<AnalysisFormState> {
  
  const rawData = Object.fromEntries(formData.entries());
  const mustHaveFeatures = formData.getAll("mustHaveFeatures");
  const brandVoice = formData.getAll("brandVoice");
  const dataToValidate = { ...rawData, mustHaveFeatures, brandVoice };

  const validatedFields = analysisSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten());
    return { 
      success: false, 
      message: "Formulář obsahuje chyby. Zkontrolujte prosím zadané údaje.",
      errors: validatedFields.error.errors,
    };
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
            answer: Array.isArray(answer) ? answer.join(', ') : answer as string,
          })),
        },
      },
    });

    revalidatePath("/admin");
    return { success: true, message: "Děkujeme! Váš dotazník byl úspěšně odeslán. Brzy se vám ozvu s dalšími kroky.", errors: [] };
  } catch (error) {
    console.error("Chyba při ukládání analýzy:", error);
    return { success: false, message: "Při odesílání došlo k chybě. Zkuste to prosím znovu.", errors: [] };
  }
}