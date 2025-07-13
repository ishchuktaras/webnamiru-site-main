// lib/actions/settings.actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function updateSettings(prevState: any, formData: FormData) {
  const settingsData = Object.fromEntries(formData.entries());
  try {
    for (const [key, value] of Object.entries(settingsData)) {
      await prisma.setting.upsert({ where: { key }, update: { value: value.toString() }, create: { key, value: value.toString() } });
    }
  } catch (error) {
    return { success: false, message: "Nepodařilo se uložit nastavení." };
  }
  revalidatePath("/admin/settings");
  return { success: true, message: "Nastavení bylo úspěšně uloženo!" };
}