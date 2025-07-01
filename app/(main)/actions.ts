// app/(main)/actions.ts

"use server";

import { z } from "zod";
import { Resend } from "resend";
import { signIn } from '@/auth';
import AuthError from 'next-auth';

// Inicializace Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Univerzální schéma pro všechny poptávky
const inquirySchema = z.object({
  name: z.string().min(1, "Jméno je povinné."),
  email: z.string().email("Neplatný formát e-mailu."),
  message: z.string().optional(),
  service: z.string().optional(), 
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
});

// Univerzální funkce pro odeslání poptávky
export async function submitInquiry(prevState: any, formData: FormData) {
  const validatedFields = inquirySchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: "Chyba ve formuláři. Zkontrolujte prosím zadané údaje.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  if (!process.env.RESEND_API_KEY) {
    console.error("Server Error: RESEND_API_KEY is not configured.");
    return { message: "Chyba konfigurace serveru." };
  }

  const { name, email, phone, message, service, budget } = validatedFields.data;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #0056b3;">Nová poptávka z webnamiru.site</h2>
      <p><strong>Od:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
      ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
      <hr>
      ${service ? `<p><strong>Poptávaná služba:</strong> ${service}</p>` : ''}
      ${budget ? `<p><strong>Odhadovaný rozpočet:</strong> ${budget}</p>` : ''}
      <h3 style="margin-top: 20px;">Zpráva:</h3>
      <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
        ${message || 'Klient nezanechal žádnou zprávu.'}
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: "Web na míru <poptavka@webnamiru.site>",
      to: "poptavka@webnamiru.site",
      subject: `Nová poptávka od ${name}: ${service || 'Obecný dotaz'}`,
      replyTo: email,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { message: `Chyba při odesílání: ${error.message}` };
    }

    return { success: true, message: "Děkujeme! Vaše zpráva byla odeslána. Ozvu se Vám co nejdříve." };

  } catch (e) {
    console.error("Catch Error:", e);
    return { message: "Nastala neočekávaná chyba." };
  }
}

// Funkce pro přihlášení (authenticate)
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // Přidáme explicitní přesměrování pro případ úspěchu
    await signIn('credentials', { 
      ...Object.fromEntries(formData),
      redirectTo: '/admin', 
    });
    return undefined; // V případě úspěchu by mělo dojít k přesměrování
  } catch (error) {
    if (error instanceof AuthError || (typeof error === 'object' && error !== null && 'type' in error)) {
      const err = error as { type?: string };
      switch (err.type) {
        case 'CredentialsSignin':
          return 'Nesprávné přihlašovací údaje.';
        default:
          return 'Něco se pokazilo. Zkuste to prosím znovu.';
      }
    }
    throw error;
  }
}