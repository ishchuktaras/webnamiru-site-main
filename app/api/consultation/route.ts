// app/api/consultation/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import * as z from 'zod';
import React from 'react';
import { ConsultationConfirmationEmail } from '@/components/emails/ConsultationConfirmationEmail';
import { NewConsultationNotificationEmail } from '@/components/emails/NewConsultationNotificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().min(10),
  recaptchaToken: z.string().min(1, { message: "reCAPTCHA token je vyžadován." }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, preferredDate, message, recaptchaToken } = consultationSchema.parse(body);

    // 1. Ověření reCAPTCHA tokenu na serveru
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecretKey) {
        console.error("RECAPTCHA_SECRET_KEY není nastaven.");
        return NextResponse.json({ message: "Konfigurace reCAPTCHA chybí.", success: false }, { status: 500 });
    }
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`;
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error("reCAPTCHA verification failed for consultation:", recaptchaData);
        return NextResponse.json({ message: "Ověření reCAPTCHA selhalo. Zkuste to znovu.", success: false }, { status: 400 });
    }

    // 2. Uložení poptávky do databáze (do ContactSubmission s typem "consultation")
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        message: `Konzultace: ${message} (Preferovaný termín: ${preferredDate || 'neuveden'})`,
        inquiryType: "consultation",
        status: "new",
      },
    });

    // 3. Odeslání e-mailu klientovi
    await resend.emails.send({
      from: "Taras Ishchuk | webnamiru.site <poptavka@webnamiru.site>",
      to: email,
      subject: `Potvrzení: Váš požadavek na konzultaci`,
      react: React.createElement(ConsultationConfirmationEmail, {
        name,
        email,
        message,
        preferredDate,
      }),
    });

    // 4. Odeslání notifikace tobě
    await resend.emails.send({
      from: "Web na míru <poptavka@webnamiru.site>",
      to: "poptavka@webnamiru.site", // Zde tvůj e-mail pro notifikace
      subject: `Nový požadavek na konzultaci: ${name}`,
      react: React.createElement(NewConsultationNotificationEmail, {
        name,
        email,
        message,
        preferredDate,
        submissionId: submission.id,
      }),
    });

    return NextResponse.json({ message: "Požadavek na konzultaci úspěšně odeslán!", success: true }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Neplatná data formuláře.", errors: error.flatten().fieldErrors, success: false }, { status: 400 });
    }
    console.error("Chyba při odesílání konzultace:", error);
    return NextResponse.json({ message: "Interní chyba serveru. Zkuste to prosím znovu.", success: false }, { status: 500 });
  }
}