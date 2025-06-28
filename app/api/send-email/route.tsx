// app/api/send-email/route.tsx

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ZMĚNA: Rozšíření schématu o nová, nepovinná pole
const inquirySchema = z.object({
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Neplatná e-mailová adresa." }),
  message: z.string().optional(),
  service: z.string(),
  budget: z.string().optional(),
  websiteUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'poptavka@webnamiru.site';
const FROM_EMAIL = 'Poptávka z webu <poptavka@webnamiru.site>';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = inquirySchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }
    
    // ZMĚNA: Získání nových dat z formuláře
    const { name, email, message, service, budget, websiteUrl, portfolioUrl } = parsedData.data;

    // ZMĚNA: Sestavení textu e-mailu s novými daty
    const emailText = `
Nová poptávka ze stránek webnamiru.site!
-----------------------------------------

Jméno: ${name}
Email: ${email}
Poptávaná služba: ${service}

${budget ? `Odhadovaný rozpočet: ${budget}` : ''}
${websiteUrl ? `Adresa webu ke správě: ${websiteUrl}` : ''}
${portfolioUrl ? `Portfolio partnera: ${portfolioUrl}` : ''}

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

    return NextResponse.json({ message: 'E-mail byl úspěšně odeslán!', data });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 });
  }
}