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

const analysisSchema = z.object({
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  projectType: z.string().min(1, "Typ projektu je povinný."),
  mainGoal: z.string().min(1, "Hlavní cíl je povinný."),
  targetAudience: z.string().min(1, "Popis cílové skupiny je povinný."),
  usp: z.string().min(1, "Unikátní prodejní nabídka je povinná."),
  contentProvider: z.string().min(1, "Je třeba určit, kdo dodá obsah."),
  mustHaveFeatures: z.array(z.string()).min(1, "Vyberte alespoň jednu funkci."),

  mainGoalOther: z.string().optional(),
  kpis: z.array(z.string()).optional(),
  userPainPoints: z.string().optional(),
  competitors: z.string().optional(),
  inspirations: z.string().optional(),
  mustHaveFeaturesOther: z.string().optional(),
  budgetRange: z.string().optional(),
  brandStory: z.string().optional(),
  brandValues: z.string().optional(),
  brandVoice: z.array(z.string()).optional(),
});

// ZMĚNA: Akce nyní přijímá přímo objekt, ne FormData
export async function submitAnalysisForm(
  data: Record<string, any>
): Promise<AnalysisFormState> {
  const validatedFields = analysisSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Formulář obsahuje chyby. Zkontrolujte zadané údaje.",
      errors: validatedFields.error.errors,
    };
  }

  const { clientName, clientEmail, projectName, ...answers } =
    validatedFields.data;

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
            answer: Array.isArray(answer) ? answer.join(", ") : String(answer),
          })),
        },
      },
    });

    revalidatePath("/admin");
    return {
      success: true,
      message:
        "Děkujeme! Váš dotazník byl úspěšně odeslán. Brzy se vám ozvu s dalšími kroky.",
      errors: [],
    };
  } catch (error) {
    console.error("Chyba při ukládání analýzy:", error);
    return {
      success: false,
      message: "Při odesílání došlo k chybě. Zkuste to prosím znovu.",
      errors: [],
    };
  }
}
