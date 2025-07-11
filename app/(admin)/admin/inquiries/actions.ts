// app/(admin)/admin/inquiries/actions.ts

"use server";

import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { InquiryEmail } from '@/components/emails/InquiryEmail';
import { revalidatePath } from 'next/cache';
import React from 'react';

const FROM_EMAIL = 'webnamíru.site <poptavka@webnamiru.site>';

type SendEmailState = {
    success: boolean;
    message: string;
}

export async function sendInquiryToClient(inquiryId: string): Promise<SendEmailState> {
    
    // Zkontrolujeme, jestli máme API klíč
    if (!process.env.RESEND_API_KEY) {
        console.error("SERVER ERROR: RESEND_API_KEY is not configured.");
        return { success: false, message: "Chyba serveru: Chybí nastavení pro odesílání e-mailů." };
    }
    
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!inquiryId) {
        return { success: false, message: "Chybí ID poptávky." };
    }

    try {
        const inquiry = await prisma.projectInquiry.findUnique({
            where: { id: inquiryId },
            include: { answers: true },
        });

        if (!inquiry) {
            return { success: false, message: "Poptávka nebyla nalezena." };
        }

        const answers = inquiry.answers.reduce((acc, ans) => {
            acc[ans.question] = ans.answer;
            return acc;
        }, {} as Record<string, string>);
        
        // OPRAVA: Používáme React.createElement, což je spolehlivější způsob
        const emailComponent = React.createElement(InquiryEmail, {
            projectName: inquiry.projectName,
            clientName: inquiry.clientName,
            answers: answers,
        });

        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [inquiry.clientEmail],
            subject: `Souhrn strategické analýzy pro projekt: ${inquiry.projectName}`,
            react: emailComponent,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return { success: false, message: `Chyba při odesílání e-mailu: ${error.message}` };
        }
        
        await prisma.projectInquiry.update({
            where: { id: inquiryId },
            data: { status: 'contacted' }
        });

        revalidatePath(`/admin/inquiries/${inquiryId}`);
        return { success: true, message: "E-mail byl úspěšně odeslán klientovi." };

    } catch (e: any) { // OPRAVA: Explicitně typujeme chybu
        console.error("Failed to send email:", e);
        return { success: false, message: "Nastala neočekávaná chyba." };
    }
}