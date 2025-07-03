// components/StrategicQuestionnaire.tsx
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitAnalysisForm, type AnalysisFormState } from "@/app/(main)/strategicka-analyza/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import React from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? "Odesílám..." : "Odeslat analýzu"}
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
            <CardTitle className="text-2xl text-green-600 mb-4">Děkujeme!</CardTitle>
            <CardContent>
                <p>{state.message}</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Základní informace</CardTitle>
          <CardDescription>Začněme tím nejdůležitějším – o jaký projekt se jedná a kdo jste vy.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="clientName">Vaše jméno*</Label>
                    <Input id="clientName" name="clientName" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="clientEmail">Kontaktní e-mail*</Label>
                    <Input id="clientEmail" name="clientEmail" type="email" required />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="projectName">Název projektu/firmy*</Label>
                <Input id="projectName" name="projectName" required />
            </div>
        </CardContent>
        <CardHeader>
            <CardTitle>Cíle a strategie</CardTitle>
            <CardDescription>Proč tento web potřebujete a čeho má dosáhnout?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="businessGoals">Jaké jsou hlavní obchodní cíle vašeho nového webu?* (např. zvýšit prodeje o 20 %, získat 50 nových poptávek měsíčně, vybudovat značku)</Label>
                <Textarea id="businessGoals" name="businessGoals" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="targetAudience">Kdo je vaše cílová skupina?* (Popište ideálního zákazníka)</Label>
                <Textarea id="targetAudience" name="targetAudience" required />
            </div>
        </CardContent>
        <div className="p-6">
          <SubmitButton />
        </div>
      </form>
    </Card>
  );
}