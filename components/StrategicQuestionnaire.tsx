// components/StrategicQuestionnaire.tsx
"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { submitAnalysisForm, type AnalysisFormState } from "@/app/(main)/strategicka-analyza/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? "Odesílám analýzu..." : "Odeslat strategickou analýzu"}
    </Button>
  );
}

export default function StrategicQuestionnaire() {
  const initialState: AnalysisFormState = { message: "", success: false };
  const [state, formAction] = useActionState(submitAnalysisForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Odesláno!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  if (state.success) {
    return (
        <Card className="max-w-3xl mx-auto text-center p-8 border-green-500">
            <CardTitle className="text-2xl text-green-600 mb-4">Děkuji za Váš čas!</CardTitle>
            <CardContent>
                <p>{state.message}</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <form action={formAction}>
        {/* --- Sekce 1: Základní informace --- */}
        <CardHeader>
          <CardTitle>1. Základní informace</CardTitle>
          <CardDescription>Začněme tím nejdůležitějším – o jaký projekt se jedná a kdo jste vy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2"><Label htmlFor="clientName">Vaše jméno*</Label><Input id="clientName" name="clientName" required /></div>
                <div className="space-y-2"><Label htmlFor="clientEmail">Kontaktní e-mail*</Label><Input id="clientEmail" name="clientEmail" type="email" required /></div>
            </div>
             <div className="space-y-2"><Label htmlFor="projectName">Název projektu/firmy*</Label><Input id="projectName" name="projectName" required /></div>
        </CardContent>

        {/* --- Sekce 2: Cíle a strategie --- */}
        <CardHeader><CardTitle>2. Cíle a strategie</CardTitle><CardDescription>Proč tento web potřebujete a čeho má dosáhnout?</CardDescription></CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2"><Label htmlFor="businessGoals">Jaké jsou hlavní obchodní cíle vašeho nového webu?* (např. zvýšit prodeje o 20 %, získat 50 poptávek měsíčně, vybudovat značku)</Label><Textarea id="businessGoals" name="businessGoals" required /></div>
            <div className="space-y-2"><Label htmlFor="targetAudience">Kdo je vaše cílová skupina?* (Popište ideálního zákazníka - jeho věk, zájmy, potřeby...)</Label><Textarea id="targetAudience" name="targetAudience" required /></div>
            <div className="space-y-2"><Label htmlFor="kpis">Jak budeme měřit úspěch? (Klíčové ukazatele výkonnosti - KPIs)</Label><Textarea id="kpis" name="kpis" placeholder="např. počet odeslaných formulářů, míra konverze, průměrná hodnota objednávky..." /></div>
        </CardContent>

        {/* --- Sekce 3: Trh a konkurence --- */}
        <CardHeader><CardTitle>3. Trh a konkurence</CardTitle><CardDescription>Kdo jsou vaši soupeři a v čem jste lepší?</CardDescription></CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2"><Label htmlFor="competitors">Znáte své hlavní online konkurenty? (Uveďte 2-3 odkazy na jejich weby)</Label><Textarea id="competitors" name="competitors" /></div>
            <div className="space-y-2"><Label htmlFor="uniqueValue">V čem je váš produkt nebo služba unikátní oproti konkurenci?* (Vaše unikátní prodejní propozice - USP)</Label><Textarea id="uniqueValue" name="uniqueValue" required /></div>
        </CardContent>
        
        {/* --- Sekce 4: Marketing a obsah --- */}
        <CardHeader><CardTitle>4. Marketing a obsah</CardTitle><CardDescription>Jak se o vás lidé dozví a co na webu najdou?</CardDescription></CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2"><Label htmlFor="marketingChannels">Jakými kanály plánujete na nový web přivádět návštěvnost? (např. sociální sítě, placená reklama, SEO, e-mail...)</Label><Textarea id="marketingChannels" name="marketingChannels" /></div>
            <div className="space-y-2"><Label htmlFor="contentSources">Kdo bude pro web vytvářet obsah (texty, fotky, videa)?</Label><Textarea id="contentSources" name="contentSources" placeholder="např. máme vlastního copywritera, fotky si zajistíme sami, potřebujeme s tím pomoci..." /></div>
        </CardContent>
        
        {/* --- Sekce 5: Technické a finanční aspekty --- */}
        <CardHeader><CardTitle>5. Technické a finanční aspekty</CardTitle><CardDescription>Rozpočet a specifické požadavky.</CardDescription></CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2"><Label htmlFor="budget">Jaký je váš odhadovaný rozpočet na tento projekt?</Label><Input id="budget" name="budget" placeholder="např. 20 000 - 40 000 Kč"/></div>
            <div className="space-y-2"><Label htmlFor="techRequirements">Máte nějaké specifické technické požadavky? (např. napojení na externí systém, vícejazyčnost, rezervační systém...)</Label><Textarea id="techRequirements" name="techRequirements" /></div>
        </CardContent>

        <div className="p-6">
          <SubmitButton />
        </div>
      </form>
    </Card>
  );
}