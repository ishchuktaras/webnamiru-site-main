// app/admin/settings/actions.ts

"use server"; // Tímto říkáme, že funkce v tomto souboru mohou být bezpečně volány z klienta

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  const settingsObject = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
  return settingsObject;
}

// Upravíme akci, aby vracela stav pro useFormState/useActionState
export async function updateSettings(prevState: any, formData: FormData) {
  const settingsData = Object.fromEntries(formData.entries());

  // Zpracování přepínačů (Switch), které posílají "on" nebo nic
  const generateSitemap = formData.get("generateSitemap") === "on";
  const generateRobots = formData.get("generateRobots") === "on";

  const dataToSave = {
      ...settingsData,
      generateSitemap: generateSitemap ? 'on' : 'off',
      generateRobots: generateRobots ? 'on' : 'off',
  };

  try {
    for (const [key, value] of Object.entries(dataToSave)) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: value.toString() },
        create: { key, value: value.toString() },
      });
    }
  } catch (error) {
    console.error("Chyba při ukládání nastavení:", error);
    return { success: false, message: "Nepodařilo se uložit nastavení." };
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/settings");

  return { success: true, message: "Nastavení bylo úspěšně uloženo!" };
}