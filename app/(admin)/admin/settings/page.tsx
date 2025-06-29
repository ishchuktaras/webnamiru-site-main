// app/admin/settings/page.tsx

import { getSettings } from "./actions";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  // Na serveru načteme aktuální nastavení
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Nastavení webu</h1>
      {/* Zobrazíme klientskou komponentu a předáme jí data */}
      <SettingsForm settings={settings} />
    </div>
  );
}