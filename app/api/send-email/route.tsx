// app/api/send-email/route.tsx

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ZMĚNA: Jedno univerzální schéma pro VŠECHNA pole
const inquirySchema = z.object({
  // Základní údaje (vždy povinné)
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Neplatná e-mailová adresa." }),
  service: z.string(),

  // Nepovinná pole z různých formulářů
  message: z.string().optional(),
  budget: z.string().optional(),
  websiteUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),

  // Pole pro bezpečnost a souhlas
  recaptchaToken: z.string().min(1, { message: "Chybí reCAPTCHA token." }),
  consent: z.string().refine(val => val === 'on', { message: "Musíte souhlasit s podmínkami." }),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'poptavka@webnamiru.site';
const FROM_EMAIL = 'Poptávka z webu <poptavka@webnamiru.site>'; // Ujisti se, že máš doménu ověřenou v Resend

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validace všech dat ze formuláře
    const parsedData = inquirySchema.safeParse(body);
    if (!parsedData.success) {
      console.error("Validation errors:", parsedData.error.flatten().fieldErrors);
      return NextResponse.json({ error: "Neplatná data ve formuláři." }, { status: 400 });
    }
    
    // Rozbalíme všechna možná data
    const { name, email, message, service, budget, websiteUrl, portfolioUrl, recaptchaToken } = parsedData.data;

    // 2. Ověření reCAPTCHA tokenu
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error("reCAPTCHA verification failed:", recaptchaData['error-codes']);
        return NextResponse.json({ error: "Ověření proti robotům selhalo." }, { status: 400 });
    }

    // 3. Sestavení a odeslání e-mailu s daty, která dorazila
    const emailText = `
Nová poptávka ze stránek webnamiru.site!
-----------------------------------------

Jméno: ${name}
Email: ${email}
Poptávaná služba: ${service}

${budget ? `Odhadovaný rozpočet: ${budget}\n` : ''}
${websiteUrl ? `Adresa webu ke správě: ${websiteUrl}\n` : ''}
${portfolioUrl ? `Portfolio partnera: ${portfolioUrl}\n` : ''}
Zpráva:
${message || 'Klient nezanechal žádnou zprávu.'}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Nová poptávka: ${service}`,
      replyTo: email, 
      text: emailText,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: 'Chyba při odesílání e-mailu.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán!' });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 });
  }
}