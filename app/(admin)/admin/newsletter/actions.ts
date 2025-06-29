// app/admin/newsletter/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- Akce pro načítání dat ---

export async function getNewsletterStats() {
  try {
    const [activeSubscribers, campaignCount] = await prisma.$transaction([
      prisma.newsletter.count({ where: { active: true } }),
      prisma.campaign.count(),
    ]);
    return { success: true, data: { activeSubscribers, campaignCount } };
  } catch (error) {
    return { success: false, error: "Nepodařilo se načíst statistiky." };
  }
}

export async function getCampaigns() {
  return prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getSubscribers() {
  return prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' } });
}


// --- Akce pro vytváření kampaní ---

const campaignSchema = z.object({
  subject: z.string().min(1, "Předmět je povinný."),
  content: z.string().min(1, "Obsah je povinný."),
  previewText: z.string().optional(),
});

export async function createCampaign(prevState: any, formData: FormData) {
  const validatedFields = campaignSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return { success: false, message: "Chyba validace." };
  }
  
  try {
    await prisma.campaign.create({
      data: validatedFields.data,
    });
    revalidatePath('/admin/newsletter');
    return { success: true, message: "Kampaň byla úspěšně uložena jako koncept." };
  } catch (error) {
    return { success: false, message: "Chyba při vytváření kampaně." };
  }
}