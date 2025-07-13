// components/admin/SettingsForm.tsx

"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateSettings } from "@/lib/actions/settings.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Ukládám..." : "Uložit změny"}
    </Button>
  );
}

type SettingsFormProps = {
  settings: Record<string, string>;
};

export default function SettingsForm({ settings }: SettingsFormProps) {
  const initialState = { message: "", success: false };
  const [state, formAction] = useActionState(updateSettings, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Úspěch!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Tabs defaultValue="general" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="general">Obecné</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="security">Bezpečnost</TabsTrigger>
            <TabsTrigger value="email">E-mail</TabsTrigger>
          </TabsList>
          <SubmitButton />
        </div>
        
        <TabsContent value="general">
            <Card>
                <CardHeader>
                    <CardTitle>Obecné nastavení</CardTitle>
                    <CardDescription>Základní identifikace a kontaktní údaje vašeho webu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2"><Label htmlFor="siteName">Název webu</Label><Input id="siteName" name="siteName" defaultValue={settings.siteName || "webnamiru.site"} /></div>
                    <div className="space-y-2"><Label htmlFor="siteSlogan">Slogan / Podtitul</Label><Input id="siteSlogan" name="siteSlogan" defaultValue={settings.siteSlogan || "Strategické weby pro Vysočinu"} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2"><Label htmlFor="contactEmail">Hlavní kontaktní e-mail</Label><Input id="contactEmail" name="contactEmail" type="email" defaultValue={settings.contactEmail || ""} placeholder="poptavka@webnamiru.site" /></div>
                        <div className="space-y-2"><Label htmlFor="contactPhone">Hlavní kontaktní telefon</Label><Input id="contactPhone" name="contactPhone" type="tel" defaultValue={settings.contactPhone || ""} placeholder="+420 777 596 216" /></div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO nastavení</CardTitle>
              <CardDescription>Optimalizace pro vyhledávače.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2"><Label htmlFor="metaTitle">Hlavní Meta Title (pro homepage)</Label><Input id="metaTitle" name="metaTitle" defaultValue={settings.metaTitle || ""} /></div>
                <div className="space-y-2"><Label htmlFor="metaDescription">Hlavní Meta Description (pro homepage)</Label><Textarea id="metaDescription" name="metaDescription" defaultValue={settings.metaDescription || ""} /></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="googleAnalyticsId">Google Analytics ID</Label><Input id="googleAnalyticsId" name="googleAnalyticsId" defaultValue={settings.googleAnalyticsId || ""} /></div>
                 </div>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg"><Label htmlFor="generateSitemap" className="flex flex-col gap-1"><span>Povolit sitemap.xml</span><span className="text-sm text-muted-foreground">Automaticky generovaná mapa webu.</span></Label><Switch id="generateSitemap" name="generateSitemap" defaultChecked={settings.generateSitemap === 'on'} /></div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ZMĚNA: Doplněn obsah pro záložku "Bezpečnost" */}
        <TabsContent value="security">
            <Card>
                <CardHeader>
                    <CardTitle>Bezpečnostní nastavení</CardTitle>
                    <CardDescription>Zabezpečte svůj web a administraci.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <Label htmlFor="maintenanceMode" className="flex flex-col gap-1">
                            <span>Udržovací mód</span>
                            <span className="text-sm text-muted-foreground">Pokud je aktivní, běžní návštěvníci uvidí pouze stránku o údržbě.</span>
                        </Label>
                        <Switch id="maintenanceMode" name="maintenanceMode" defaultChecked={settings.maintenanceMode === 'on'} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="allowedAdminIPs">Povolené IP adresy pro admina</Label>
                        <Textarea id="allowedAdminIPs" name="allowedAdminIPs" placeholder="Zadejte IP adresy oddělené čárkou. Nechte prázdné pro povolení všech." defaultValue={settings.allowedAdminIPs || ""} />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        {/* ZMĚNA: Doplněn obsah pro záložku "E-mail" */}
        <TabsContent value="email">
            <Card>
                <CardHeader>
                    <CardTitle>Nastavení odesílání e-mailů</CardTitle>
                    <CardDescription>Konfigurace e-mailů odesílaných z webu (např. z poptávkových formulářů).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="emailAdminRecipient">E-mail pro příjem poptávek</Label>
                        <Input id="emailAdminRecipient" name="emailAdminRecipient" type="email" placeholder="vas-email@domena.cz" defaultValue={settings.emailAdminRecipient || ""} />
                        <p className="text-sm text-muted-foreground">Na tuto adresu budou chodit všechny zprávy z kontaktních formulářů.</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emailFromName">Jméno odesílatele</Label>
                        <Input id="emailFromName" name="emailFromName" placeholder="Web na míru" defaultValue={settings.emailFromName || ""} />
                        <p className="text-sm text-muted-foreground">Jméno, které se zobrazí příjemci jako odesílatel (např. v automatické odpovědi).</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="emailFromAddress">E-mailová adresa odesílatele</Label>
                        <Input id="emailFromAddress" name="emailFromAddress" type="email" placeholder="noreply@vasedomena.cz" defaultValue={settings.emailFromAddress || ""} />
                        <p className="text-sm text-muted-foreground">Adresa, ze které se budou posílat e-maily. Musí být na vaší ověřené doméně v Resend.</p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </form>
  );
}