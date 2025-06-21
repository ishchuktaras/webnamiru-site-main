"use server"

import { z } from "zod"
// V reálné aplikaci byste zde importovali Resend nebo jinou emailovou službu
// import { Resend } from 'resend';
// Odkomentujte import Resend a přidejte inicializaci
import { Resend } from "resend"

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

  // Získání validovaných dat
  const { name, email, phone, message } = validatedFields.data

  try {
    // Simulace odesílání e-mailu (v reálné aplikaci by zde byla integrace s Resend)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulace síťové latence

    console.log("Odesílání kontaktní zprávy:")
    console.log(`Jméno: ${name}`)
    console.log(`E-mail: ${email}`)
    console.log(`Telefon: ${phone || "Nezadán"}`)
    console.log(`Zpráva: ${message}`)

    // Příklad použití Resend (odkomentujte a nakonfigurujte, pokud používáte)
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: "onboarding@resend.dev", // Změňte na ověřenou doménu Resend
      to: "poptavka@webnamiru.site", // Změňte na Váš e-mail, kam chcete dostávat poptávky
      subject: `Nová poptávka z webnamiru.site od ${name}`,
      html: `<p>Jméno: ${name}</p><p>E-mail: ${email}</p><p>Telefon: ${phone || "Nezadán"}</p><p>Zpráva: ${message}</p>`,
    })

    return { message: "Vaše zpráva byla úspěšně odeslána! Brzy se Vám ozveme." }
  } catch (error) {
    console.error("Chyba při odesílání zprávy:", error)
    return { message: "Nastala chyba při odesílání zprávy. Zkuste to prosím znovu." }
  }
}
