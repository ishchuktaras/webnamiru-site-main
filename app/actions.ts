"use server"

import { z } from "zod"
import { Resend } from "resend"

// Zkontrolujeme, zda je API klíč dostupný v prostředí.
if (!process.env.RESEND_API_KEY) {
  console.error("Chybějící RESEND_API_KEY v environment variables.")
  // Můžeme se rozhodnout, zda chceme, aby aplikace spadla při startu, nebo jen logovala chybu.
  // V tomto případě jen logujeme, ale odesílání selže.
}

// Inicializace klienta Resend s API klíčem z environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// Definice schématu pro validaci formuláře pomocí Zod
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Jméno je povinné." }),
  email: z.string().email({ message: "Neplatný formát e-mailu." }),
  phone: z.string().optional(), // Telefon je nepovinný
  message: z.string().min(10, { message: "Zpráva musí mít alespoň 10 znaků." }),
})

// Server Action pro odeslání kontaktního formuláře
export async function submitContactForm(
  prevState: { message: string; errors?: Record<string, string[]> },
  formData: FormData,
) {
  // Validace dat z formuláře
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  })

  // Pokud validace selže, vrátíme chyby
  if (!validatedFields.success) {
    return {
      message: "Chyba validace formuláře.",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  // Zkontrolujeme znovu existenci API klíče před pokusem o odeslání
  if (!process.env.RESEND_API_KEY) {
      return { message: "Chyba konfigurace serveru: Služba pro odesílání e-mailů není nastavena." }
  }


  // Získání validovaných dat
  const { name, email, phone, message } = validatedFields.data

  try {
    const { data, error } = await resend.emails.send({
      // DŮLEŽITÉ: Nahraďte 'onboarding@resend.dev' e-mailem z vaší ověřené domény.
      // Například 'poptavka@webnamiru.site'
      from: "Web na míru <poptavka@webnamiru.site>", 
      to: ["poptavka@webnamiru.site"], // Zde je váš e-mail, kam chcete dostávat poptávky
      subject: `Nová poptávka z webnamiru.site od ${name}`,
      replyTo: email, // Odpověď půjde přímo na email odesílatele
      // Můžeme použít i textovou verzi nebo React komponentu pro hezčí e-mail
      html: `
        <p><strong>Nová poptávka z kontaktního formuláře:</strong></p>
        <ul>
          <li><strong>Jméno:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>Telefon:</strong> ${phone || "Nezadán"}</li>
        </ul>
        <p><strong>Zpráva:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("Chyba při odesílání z Resend:", error);
      return { message: "Nastala chyba při odesílání zprávy. Zkuste to prosím znovu." };
    }

    console.log("E-mail úspěšně odeslán:", data);
    return { message: "Vaše zpráva byla úspěšně odeslána! Brzy se Vám ozveme." }
  } catch (error) {
    console.error("Neočekávaná chyba při odesílání zprávy:", error)
    return { message: "Nastala neočekávaná chyba serveru. Zkuste to prosím znovu." }
  }
}
