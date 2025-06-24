"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Rozšířené schéma se všemi poli
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Jméno je povinné." }),
  email: z.string().email({ message: "Neplatný formát e-mailu." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Zpráva musí mít alespoň 10 znaků." }),
  company: z.string().optional(),
  location: z.string().optional(),
  // === ZMĚNA ZDE: Typ poptávky je nyní povinný ===
  inquiryType: z.enum(["service", "partnership"], {
    errorMap: () => ({ message: "Prosím, vyberte typ poptávky." }),
  }),
  // Pole pro služby
  servicePackage: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  businessType: z.string().optional(),
  // Pole pro partnerství
  partnershipType: z.string().optional(),
  experience: z.string().optional(),
  portfolio: z.string().optional(),
});

function createEmailHtml(formData: z.infer<typeof contactFormSchema>) {
  // Funkce pro generování HTML zůstává stejná
  const {
    name,
    email,
    phone,
    message,
    company,
    location,
    inquiryType,
    ...details
  } = formData;

  let detailsHtml = "";
  if (inquiryType === "service") {
    detailsHtml = `
            <tr><td style="padding: 4px; background-color: #f0f4ff; border-radius: 4px;" colspan="2"><strong>Detail poptávky služeb:</strong></td></tr>
            ${details.servicePackage ? `<tr><td style="padding: 4px; font-weight: bold;">Balíček:</td><td style="padding: 4px;">${details.servicePackage}</td></tr>` : ""}
            ${details.budget ? `<tr><td style="padding: 4px; font-weight: bold;">Rozpočet:</td><td style="padding: 4px;">${details.budget}</td></tr>` : ""}
            ${details.timeline ? `<tr><td style="padding: 4px; font-weight: bold;">Časový rámec:</td><td style="padding: 4px;">${details.timeline}</td></tr>` : ""}
            ${details.businessType ? `<tr><td style="padding: 4px; font-weight: bold;">Typ podnikání:</td><td style="padding: 4px;">${details.businessType}</td></tr>` : ""}
        `;
  } else if (inquiryType === "partnership") {
    detailsHtml = `
            <tr><td style="padding: 4px; background-color: #f0f4ff; border-radius: 4px;" colspan="2"><strong>Detail nabídky partnerství:</strong></td></tr>
            ${details.partnershipType ? `<tr><td style="padding: 4px; font-weight: bold;">Typ partnerství:</td><td style="padding: 4px;">${details.partnershipType}</td></tr>` : ""}
            ${details.experience ? `<tr><td style="padding: 4px; font-weight: bold;">Zkušenosti:</td><td style="padding: 4px;">${details.experience}</td></tr>` : ""}
            ${details.portfolio ? `<tr><td style="padding: 4px; font-weight: bold;">Portfolio:</td><td style="padding: 4px;"><a href="${details.portfolio}">${details.portfolio}</a></td></tr>` : ""}
        `;
  }

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">
                <h2 style="color: #0056b3;">Nová poptávka z webnamiru.site</h2>
            </div>
            <h3 style="color: #0056b3;">Základní informace</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 4px; font-weight: bold; width: 150px;">Jméno:</td><td style="padding: 4px;">${name}</td></tr>
                <tr><td style="padding: 4px; font-weight: bold;">E-mail:</td><td style="padding: 4px;"><a href="mailto:${email}">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 4px; font-weight: bold;">Telefon:</td><td style="padding: 4px;"><a href="tel:${phone}">${phone}</a></td></tr>` : ""}
                ${company ? `<tr><td style="padding: 4px; font-weight: bold;">Firma:</td><td style="padding: 4px;">${company}</td></tr>` : ""}
                ${location ? `<tr><td style="padding: 4px; font-weight: bold;">Lokace:</td><td style="padding: 4px;">${location}</td></tr>` : ""}
            </table>
            
            ${detailsHtml ? `<h3 style="color: #0056b3; margin-top: 20px;">Specifické detaily</h3><table style="width: 100%; border-collapse: collapse;">${detailsHtml}</table>` : ""}

            <h3 style="color: #0056b3; margin-top: 20px;">Zpráva</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-style: italic;">${message}</div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
                <p>Tento e-mail byl odeslán z kontaktního formuláře na webu <a href="https://webnamiru.site" style="color: #0056b3;">webnamiru.site</a>.</p>
            </div>
        </div>
    </div>
    `;
}

export async function submitContactForm(
  prevState: { message: string; errors?: Record<string, string[]> },
  formData: FormData
) {
  const validatedFields = contactFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Chyba validace. Zkontrolujte prosím pole označená chybou.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Server Error: RESEND_API_KEY is not configured.");
    return {
      message:
        "Chyba konfigurace serveru. Služba pro odesílání e-mailů není nastavena.",
    };
  }

  try {
    const emailHtml = createEmailHtml(validatedFields.data);

    const { data, error } = await resend.emails.send({
      from: "poptavka@webnamiru.site",
      to: "poptavka@webnamiru.site",
      subject: `Nová poptávka (${validatedFields.data.inquiryType === "service" ? "Služby" : "Partnerství"}) od ${validatedFields.data.name}`,
      replyTo: validatedFields.data.email,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { message: `Chyba při odesílání e-mailu: ${error.message}` };
    }

    console.log("E-mail úspěšně odeslán:", data);
    return {
      message: "Vaše zpráva byla úspěšně odeslána! Brzy se Vám ozveme.",
    };
  } catch (exception) {
    console.error("Neočekávaná chyba při odesílání zprávy:", exception);
    return {
      message: "Nastala neočekávaná chyba serveru. Zkuste to prosím znovu.",
    };
  }
}
