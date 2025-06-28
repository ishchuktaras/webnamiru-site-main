// app/api/send-email/route.tsx

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Validace dat pomocí Zod
const inquirySchema = z.object({
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Neplatná e-mailová adresa." }),
  message: z.string().optional(),
  service: z.string(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = 'poptavka@webnamiru.site'; // Zde je tvůj e-mail, kam budou chodit poptávky
const FROM_EMAIL = 'Poptávka z webu <poptavka@webnamiru.site>'; // Resend vyžaduje tuto doménu pro free účet

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validace vstupních dat
    const parsedData = inquirySchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }
    
    const { name, email, message, service } = parsedData.data;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `Nová poptávka z webnamiru.site: ${service}`,
      replyTo: email,
      text: `
        Nová poptávka ze stránek webnamiru.site!
        
        Jméno: ${name}
        Email: ${email}
        Poptávaná služba: ${service}
        
        Zpráva:
        ${message || 'Klient nezanechal žádnou zprávu.'}
      `,
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