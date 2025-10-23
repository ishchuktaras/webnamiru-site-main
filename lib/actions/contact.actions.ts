// lib/actions/contact.actions.ts (příklad nového souboru nebo úprava existujícího)
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import React from "react";
import { ContactConfirmationEmail } from "@/components/emails/ContactConfirmationEmail"; // Musel bys vytvořit tento email template

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactSummaryEmail(contactId: string) {
  try {
    const submission = await prisma.contactSubmission.findUnique({
      where: { id: contactId },
    });

    if (!submission) {
      return { success: false, message: "Poptávka nenalezena." };
    }

    // Zde bys potřeboval vytvořit emailovou šablonu pro ContactSubmission
    // Např. components/emails/ContactConfirmationEmail.tsx
    await resend.emails.send({
      from: "Web na míru <poptavka@webnamiru.site>",
      to: submission.email,
      subject: `Potvrzení odeslání poptávky: ${submission.name}`,
      react: React.createElement(ContactConfirmationEmail, {
        name: submission.name,
        email: submission.email,
        message: submission.message,
        inquiryType: submission.inquiryType || "obecná",
        // Další data z ContactSubmission, která chceš zobrazit v emailu
      }),
    });

    revalidatePath(`/admin/contacts/${contactId}`); // Uprav cestu
    return { success: true, message: "E-mail s potvrzením odeslán klientovi." };
  } catch (error) {
    console.error("Failed to send contact summary email:", error);
    return { success: false, message: "Nepodařilo se odeslat e-mail." };
  }
}