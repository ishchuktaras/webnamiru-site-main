// lib/actions/inquiry.actions.ts
"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { NewInquiryNotificationEmail } from "@/components/emails/NewInquiryNotificationEmail";
import { InquiryConfirmationEmail } from "@/components/emails/InquiryConfirmationEmail";
import { InquiryEmail } from '@/components/emails/InquiryEmail';
import React from "react";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

// ====================================================================
// JEDNOTNÝ TYP PRO STAV FORMULÁŘE (POUŽIJEME VŠUDE)
// ====================================================================
// Exportujeme tento typ, aby byl dostupný pro všechny komponenty, které používají useFormState
export type FormState = {
  message: string | null; // Zpráva může být null
  success: boolean;
  errors?: Record<string, string[]>; // Chyby jsou vždy Record<string, string[]>
};

// ====================================================================
// AKCE PRO JEDNODUCHÝ POPTÁVKOVÝ FORMULÁŘ (z komponenty InquirySheet)
// ====================================================================
// InquiryFormState je nyní jen alias pro obecný FormState
export type InquiryFormState = FormState;

const inquirySchema = z.object({
  name: z.string().min(1, "Jméno je povinné."),
  email: z.string().email("Neplatný formát e-mailu."),
  message: z.string().optional(),
  service: z.string().optional(),
  phone: z.string().optional(),
});

export async function submitInquiry(
  prevState: FormState, // Používáme jednotný FormState
  formData: FormData
): Promise<InquiryFormState> {
  const validatedFields = inquirySchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { success: false, message: "Chyba ve formuláři.", errors: validatedFields.error.flatten().fieldErrors };
  }
  const { name, email, phone, message, service } = validatedFields.data;
  try {
    await resend.emails.send({
      from: "Web na míru <poptavka@webnamiru.site>",
      to: "poptavka@webnamiru.site",
      subject: `Nová poptávka: ${service || "Obecný dotaz"}`,
      replyTo: email,
      html: `<p>Od: ${name} (${email})</p>${phone ? `<p>Tel: ${phone}</p>` : ""}<p>Služba: ${service}</p><p>Zpráva: ${message || "Nezadána."}</p>`,
    });
    return { success: true, message: "Poptávka byla úspěšně odeslána." };
  } catch (error) {
    console.error("Chyba při odesílání e-mailu:", error); // Logujeme chybu pro debug
    return { success: false, message: "Chyba při odesílání e-mailu." };
  }
}

// ====================================================================
// AKCE PRO STRATEGICKOU ANALÝZU (z komponenty StrategicQuestionnaire)
// ====================================================================
// AnalysisFormState je nyní jen alias pro obecný FormState
export type AnalysisFormState = FormState;

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
    budgetRange: z.string().optional(),
    competitors: z.string().optional(),
    inspirations: z.string().optional(),
    brandStory: z.string().optional(),
    brandValues: z.array(z.string()).optional(), // <--- OPRAVA: Musí být array, pokud je to více checkboxů
    brandVoice: z.array(z.string()).optional(),
    mustHaveFeaturesOther: z.string().optional(),
    userPainPoints: z.string().optional(), // <--- DŮLEŽITÉ: Toto pole je ve formuláři StrategicQuestionnaire.tsx, musí být i ve schématu!
});

// <--- OPRAVA: Správný podpis funkce pro useFormState a zpracování formData
export async function submitAnalysisForm(prevState: FormState, formData: FormData): Promise<AnalysisFormState> {
  const data: Record<string, any> = {};
  formData.forEach((value, key) => {
    // Pro pole s více hodnotami (checkboxy) vytváříme pole stringů
    if (['kpis', 'mustHaveFeatures', 'brandValues', 'brandVoice'].includes(key)) {
      if (!data[key]) {
        data[key] = [];
      }
      (data[key] as string[]).push(value.toString());
    } else {
      data[key] = value;
    }
  });

  const validatedFields = analysisSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: "Formulář obsahuje chyby.", errors: validatedFields.error.flatten().fieldErrors };
  }

  // <--- OPRAVA: Extraktujeme projectType a description pro uložení do ProjectInquiry modelu
  const { clientName, clientEmail, projectName, projectType, brandStory, targetAudience, ...answers } = validatedFields.data;

  try {
    const inquiry = await prisma.projectInquiry.create({
      data: {
        clientName,
        clientEmail,
        projectName,
        projectType, // Nové přímé pole
        description: brandStory || targetAudience || null, // Nové přímé pole, může být null
        answers: {
          create: Object.entries(answers).map(([question, answer]) => ({
            question,
            answer: Array.isArray(answer) ? answer.join(", ") : String(answer),
          })),
        },
      },
    });

    await Promise.all([
      resend.emails.send({ from: "Web na míru <poptavka@webnamiru.site>", to: "poptavka@webnamiru.site", subject: `Nová poptávka: ${inquiry.projectName}`, react: React.createElement(NewInquiryNotificationEmail, { inquiryId: inquiry.id, projectName: inquiry.projectName, clientName, clientEmail }) }),
      resend.emails.send({ from: "Taras Ishchuk | webnamiru.site <poptavka@webnamiru.site>", to: inquiry.clientEmail, subject: `Potvrzení: Vaše strategická analýza pro ${inquiry.projectName}`, react: React.createElement(InquiryConfirmationEmail, { clientName, projectName: inquiry.projectName }) }),
    ]);

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Dotazník byl úspěšně odeslán." };
  } catch (error) {
    console.error("Chyba při ukládání analýzy:", error);
    return { success: false, message: "Chyba serveru při ukládání." };
  }
}

// ====================================================================
// AKCE PRO ODESLÁNÍ SOUHRNU KLIENTOVI Z ADMINA
// ====================================================================
// SendEmailState je nyní jen alias pro obecný FormState
export type SendEmailState = FormState;

export async function sendInquiryToClient(inquiryId: string): Promise<SendEmailState> {
    if (!inquiryId) return { success: false, message: "Chybí ID poptávky." };
    try {
        const inquiry = await prisma.projectInquiry.findUnique({ where: { id: inquiryId }, include: { answers: true } });
        if (!inquiry) return { success: false, message: "Poptávka nenalezena." };
        const answers = inquiry.answers.reduce((acc, ans) => { acc[ans.question] = ans.answer; return acc; }, {} as Record<string, string>);
        await resend.emails.send({ from: "Taras Ishchuk | webnamiru.site <poptavka@webnamiru.site>", to: [inquiry.clientEmail], subject: `Souhrn strategické analýzy pro projekt: ${inquiry.projectName}`, react: React.createElement(InquiryEmail, { projectName: inquiry.projectName, clientName: inquiry.clientName, answers: answers }) });
        await prisma.projectInquiry.update({ where: { id: inquiryId }, data: { status: 'contacted' } });
        revalidatePath(`/admin/inquiries/${inquiryId}`);
        return { success: true, message: "E-mail byl úspěšně odeslán." };
    } catch (e) {
        console.error("Chyba při odesílání e-mailu:", e);
        return { success: false, message: "Neočekávaná chyba serveru." };
    }
}

// ====================================================================
// NOVÉ AKCE PRO ADMIN DASHBOARD (úprava a mazání)
// ====================================================================

// Získání poptávky podle ID pro zobrazení detailu a editace
export async function getProjectInquiryById(id: string) {
  try {
    const inquiry = await prisma.projectInquiry.findUnique({
      where: { id },
      include: { answers: true },
    });
    return inquiry;
  } catch (error) {
    console.error(`Failed to fetch project inquiry with ID ${id}:`, error);
    return null;
  }
}

// Schema pro validaci dat při úpravě poptávky
const updateInquirySchema = z.object({
  id: z.string().min(1, "ID poptávky je povinné."),
  projectName: z.string().min(1, "Název projektu je povinný."),
  clientName: z.string().min(1, "Jméno klienta je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  projectType: z.string().optional(), // Je volitelné (String?)
  description: z.string().optional(), // Je volitelné (String?)
});

export async function updateProjectInquiry(prevState: FormState, formData: FormData): Promise<FormState> { // <--- OPRAVA: Správné typování
  const dataToValidate = {
    id: formData.get("id"),
    projectName: formData.get("projectName"),
    clientName: formData.get("clientName"),
    clientEmail: formData.get("clientEmail"),
    projectType: formData.get("projectType"),
    description: formData.get("description"),
  };

  const validatedFields = updateInquirySchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Chyba ve formuláři.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, projectName, clientName, clientEmail, projectType, description } = validatedFields.data;

  try {
    await prisma.projectInquiry.update({
      where: { id },
      data: {
        projectName,
        clientName,
        clientEmail,
        projectType,
        description,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${id}/edit`);
    redirect("/admin/inquiries");

  } catch (error) {
    console.error(`Failed to update project inquiry with ID ${id}:`, error);
    return { success: false, message: "Nepodařilo se aktualizovat poptávku." };
  }
}

// Funkce pro smazání poptávky
export async function deleteProjectInquiry(id: string) {
  "use server";
  try {
    await prisma.projectInquiry.delete({
      where: { id },
    });
    revalidatePath("/admin/inquiries");
    return { success: true, message: "Poptávka úspěšně smazána." };
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return { success: false, message: "Nepodařilo se smazat poptávku." };
  }
}