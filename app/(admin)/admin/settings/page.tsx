// app/[locale]/(admin)/admin/settings/page.tsx

import SettingsForm from "@/components/admin/SettingsForm";
import prisma from "@/lib/prisma";

async function getSettings() {
    // Používame 'setting' podľa schémy
    const settings = await prisma.setting.findMany();
    
    return settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value ?? '';
        return acc;
    }, {} as Record<string, string>);
}

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Nastavenie webu</h1>
            <SettingsForm settings={settings} />
        </div>
    );
}