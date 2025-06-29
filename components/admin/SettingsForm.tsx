// components/admin/SettingsForm.tsx

"use client";

import { useEffect } from "react";
// ZMĚNA: Opraveny importy pro hooky
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateSettings } from "@/app/admin/settings/actions";
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
      <Tabs defaultValue="seo" className="w-full">
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
                    <CardDescription>Základní nastavení webu.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Tato sekce se připravuje.</p>
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
                <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input id="metaTitle" name="metaTitle" defaultValue={settings.metaTitle || ""} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea id="metaDescription" name="metaDescription" defaultValue={settings.metaDescription || ""} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                        <Input id="googleAnalyticsId" name="googleAnalyticsId" defaultValue={settings.googleAnalyticsId || ""} />
                    </div>
                 </div>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label htmlFor="generateSitemap">Povolit sitemap.xml</Label>
                            <p className="text-sm text-muted-foreground">Automaticky generovaná mapa webu.</p>
                        </div>
                        <Switch id="generateSitemap" name="generateSitemap" defaultChecked={settings.generateSitemap === 'on'} />
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
            <Card>
                <CardHeader><CardTitle>Bezpečnost</CardTitle></CardHeader>
                <CardContent><p>Tato sekce se připravuje.</p></CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="email">
            <Card>
                <CardHeader><CardTitle>Nastavení e-mailů</CardTitle></CardHeader>
                <CardContent><p>Tato sekce se připravuje.</p></CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </form>
  );
}