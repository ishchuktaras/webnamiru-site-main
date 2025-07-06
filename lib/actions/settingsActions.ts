// lib/actions/settingsActions.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
        
    const updates = Object.keys(data).map(key => 
        prisma.setting.update({
            where: { key },
            data: { value: data[key] as string }
        })
    );
    
    try {
        await Promise.all(updates);
        revalidatePath('/admin/settings');
        return { success: true, message: 'Nastavení bylo úspěšně uloženo.' };
    } catch (error) {
        console.error("Chyba při ukládání nastavení:", error);
        return { success: false, message: 'Nastala chyba při ukládání.' };
    }
}