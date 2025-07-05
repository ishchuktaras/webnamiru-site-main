// app/(forms)/strategicka-analyza/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Resend } from 'resend';
import { NewInquiryNotificationEmail } from '@/components/emails/NewInquiryNotificationEmail';
import { InquiryConfirmationEmail } from '@/components/emails/InquiryConfirmationEmail';
import React from 'react';

export type AnalysisFormState = {
  message: string;
  success: boolean;
  errors?: z.ZodIssue[];
};

// Finální Zod schéma pro validaci
const analysisSchema = z.object({
  clientName: z.string().min(1, "Jméno je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  projectType: z.string().min(1, "Typ projektu je povinný."),
  kpis: z.array(z.string()).min(1, "Vyberte alespoň jeden cíl/KPI."),
  targetAudience: z.string().min(1, "Popis cílové skupiny je povinný."),
  usp: z.string().min(1, "Unikátní prodejní nabídka je povinná."),
  mustHaveFeatures: z.array(z.string()).min(1, "Vyberte alespoň jednu funkci."),
  contentProvider: z.string().min(1, "Je třeba určit, kdo dodá obsah."),
  
  // Ostatní pole jsou volitelná
  mainGoalOther: z.string().optional(),
  userPainPoints: z.string().optional(),
  competitors: z.string().optional(),
  inspirations: z.string().optional(),
  mustHaveFeaturesOther: z.string().optional(),
  budgetRange: z.string().optional(),
  brandStory: z.string().optional(),
  brandValues: z.string().optional(),
  brandVoice: z.array(z.string()).optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitAnalysisForm(
  data: Record<string, any> // Přijímáme objekt místo FormData
): Promise<AnalysisFormState> {

  const validatedFields = analysisSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten());
    return { 
      success: false, 
      message: "Formulář obsahuje chyby. Zkontrolujte zadané údaje.",
      errors: validatedFields.error.errors,
    };
  }

  const { clientName, clientEmail, projectName, ...answers } = validatedFields.data;

  try {
    const inquiry = await prisma.projectInquiry.create({
      data: {
        clientName,
        clientEmail,
        projectName,
        projectType: answers.projectType,
        answers: {
          create: Object.entries(answers).map(([question, answer]) => ({
            question,
            answer: Array.isArray(answer) ? answer.join(', ') : String(answer),
          })),
        },
      },
    });

    // Odeslání e-mailů souběžně
    await Promise.all([
        resend.emails.send({
            from: 'Web na míru <poptavka@webnamiru.site>',
            to: 'poptavka@webnamiru.site',
            subject: `Nová poptávka: ${inquiry.projectName}`,
            react: React.createElement(NewInquiryNotificationEmail, {
                inquiryId: inquiry.id,
                projectName: inquiry.projectName,
                clientName: inquiry.clientName,
                clientEmail: inquiry.clientEmail,
            }),
        }),
        resend.emails.send({
            from: 'Taras Ishchuk | webnamiru.site <poptavka@webnamiru.site>',
            to: inquiry.clientEmail,
            subject: `Potvrzení: Vaše strategická analýza pro ${inquiry.projectName}`,
            react: React.createElement(InquiryConfirmationEmail, {
                clientName: inquiry.clientName,
                projectName: inquiry.projectName,
            }),
        })
    ]);

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Děkujeme! Váš dotazník byl úspěšně odeslán a na Váš e-mail jsme zaslali potvrzení.", errors: [] };
  
  } catch (error) {
    console.error("Chyba při ukládání analýzy a odesílání e-mailů:", error);
    return { success: false, message: "Při odesílání došlo k chybě. Zkontrolujte prosím nastavení API klíčů.", errors: [] };
  }
}