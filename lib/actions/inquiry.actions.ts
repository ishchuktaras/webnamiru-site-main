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

const resend = new Resend(process.env.RESEND_API_KEY);

// ====================================================================
// AKCE PRO JEDNODUCHÝ POPTÁVKOVÝ FORMULÁŘ (z komponenty InquirySheet)
// ====================================================================
export type InquiryFormState = {
  message: string;
  success: boolean;
  errors?: Record<string, string[]>;
};

const inquirySchema = z.object({
  name: z.string().min(1, "Jméno je povinné."),
  email: z.string().email("Neplatný formát e-mailu."),
  message: z.string().optional(),
  service: z.string().optional(),
  phone: z.string().optional(),
});

export async function submitInquiry(
  prevState: any,
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
    return { success: false, message: "Chyba při odesílání e-mailu." };
  }
}

// ====================================================================
// AKCE PRO STRATEGICKOU ANALÝZU (z komponenty StrategicQuestionnaire)
// ====================================================================
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
    kpis: z.array(z.string()).min(1, "Vyberte alespoň jeden cíl/KPI."),
    targetAudience: z.string().min(1, "Popis cílové skupiny je povinný."),
    usp: z.string().min(1, "Unikátní prodejní nabídka je povinná."),
    mustHaveFeatures: z.array(z.string()).min(1, "Vyberte alespoň jednu funkci."),
    contentProvider: z.string().min(1, "Je třeba určit, kdo dodá obsah."),
    budgetRange: z.string().optional(),
    competitors: z.string().optional(),
    inspirations: z.string().optional(),
    brandStory: z.string().optional(),
    brandValues: z.string().optional(),
    brandVoice: z.array(z.string()).optional(),
    mustHaveFeaturesOther: z.string().optional(),
});

export async function submitAnalysisForm(data: Record<string, any>): Promise<AnalysisFormState> {
  const validatedFields = analysisSchema.safeParse(data);
  if (!validatedFields.success) {
    return { success: false, message: "Formulář obsahuje chyby.", errors: validatedFields.error.errors };
  }
  const { clientName, clientEmail, projectName, ...answers } = validatedFields.data;
  try {
    const inquiry = await prisma.projectInquiry.create({
      data: { clientName, clientEmail, projectName, projectType: answers.projectType, answers: { create: Object.entries(answers).map(([question, answer]) => ({ question, answer: Array.isArray(answer) ? answer.join(", ") : String(answer) }))}},
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
type SendEmailState = { success: boolean; message: string; }

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