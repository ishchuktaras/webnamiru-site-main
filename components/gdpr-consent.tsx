"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getCookieConsent, setCookie, type CookieConsent } from "@/lib/cookies";
import { ShieldCheck, BarChart2, Megaphone } from "lucide-react";
import Link from "next/link";

export default function GdprConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Dočasný stav pro úpravy v modálním okně
  const [localPreferences, setLocalPreferences] = useState<Omit<CookieConsent, 'necessary'>>({
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const currentConsent = getCookieConsent();
    setConsent(currentConsent);
    if (currentConsent) {
      setLocalPreferences({
        analytics: currentConsent.analytics,
        marketing: currentConsent.marketing,
      });
    } else {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: Omit<CookieConsent, 'necessary'>) => {
    const newConsent: CookieConsent = { necessary: true, ...prefs };
    setCookie("cookie_consent", JSON.stringify(newConsent), 365);
    setConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    // Pokud byly povoleny nové cookies, je dobré stránku znovu načíst, aby se aktivovaly skripty
    window.location.reload();
  };
  
  const handleAcceptAll = () => {
    savePreferences({ analytics: true, marketing: true });
  };

  const handleDeclineAll = () => {
    savePreferences({ analytics: false, marketing: false });
  };
  
  const handleSaveSelection = () => {
    savePreferences(localPreferences);
  };

  const openModal = () => {
    setShowBanner(false);
    setShowModal(true);
  };

  if (!showBanner && !showModal) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm text-white p-4 z-50 animate-slide-up-fade">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300">
              Používáme cookies, abychom vám poskytli co nejlepší zážitek. Více informací naleznete v našich <Link href="/ochrana-osobnich-udaju" className="underline hover:text-white">zásadách ochrany osobních údajů</Link>.
            </p>
            <div className="flex gap-2 shrink-0">
              <Button onClick={handleAcceptAll} className="bg-blue-600 hover:bg-blue-700">Přijmout vše</Button>
              <Button onClick={openModal} variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">Nastavení</Button>
              <Button onClick={handleDeclineAll} variant="ghost" className="hover:bg-gray-700 hover:text-white">Odmítnout</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Nastavení soukromí a cookies</DialogTitle>
            <DialogDescription>
              Zvolte, které typy cookies můžeme používat. Svůj souhlas můžete kdykoliv změnit.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-600" />
                <Label htmlFor="necessary-cookies" className="font-semibold">Nezbytné cookies</Label>
              </div>
              <Switch id="necessary-cookies" checked disabled />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
               <div className="flex items-center gap-3">
                <BarChart2 className="h-5 w-5 text-gray-600" />
                <Label htmlFor="analytics-cookies" className="font-semibold cursor-pointer">Analytické cookies</Label>
               </div>
              <Switch 
                id="analytics-cookies" 
                checked={localPreferences.analytics}
                onCheckedChange={(checked) => setLocalPreferences(prev => ({...prev, analytics: checked}))}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                <Megaphone className="h-5 w-5 text-gray-600" />
                <Label htmlFor="marketing-cookies" className="font-semibold cursor-pointer">Marketingové cookies</Label>
              </div>
              <Switch 
                id="marketing-cookies"
                checked={localPreferences.marketing}
                onCheckedChange={(checked) => setLocalPreferences(prev => ({...prev, marketing: checked}))}
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:justify-between">
            <Button onClick={handleDeclineAll} variant="outline">Odmítnout vše</Button>
            <div className="flex gap-2">
              <Button onClick={handleSaveSelection} variant="secondary">Uložit výběr</Button>
              <Button onClick={handleAcceptAll}>Přijmout vše</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
