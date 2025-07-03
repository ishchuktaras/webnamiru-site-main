// components/StrategicQuestionnaire.tsx

"use client";

import React, { useState, useEffect } from "react";
// ZMĚNA: Používáme správný import z 'react', ne z 'react-dom'
import { useActionState } from "react"; 
import { useFormStatus } from "react-dom";
// ZMĚNA: Opravena cesta k souboru s akcemi
import { submitAnalysisForm, type AnalysisFormState } from "@/app/(forms)/strategicka-analyza/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Send, ArrowLeft, ArrowRight, Building, HeartHandshake, CheckCircle } from "lucide-react";

const totalSteps = 4;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? "Odesílám..." : "Odeslat strategickou analýzu"}
    </Button>
  );
}

export default function StrategicQuestionnaire() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<"business" | "nonprofit" | null>(null);

  const initialState: AnalysisFormState = { message: "", success: false };
  const [state, formAction] = useActionState(submitAnalysisForm, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) toast.success("Odesláno!", { description: state.message });
      else toast.error("Chyba!", { description: state.message });
    }
  }, [state]);

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  if (state.success) {
    return (
      <Card className="max-w-3xl mx-auto text-center p-8 border-green-500">
        <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-600">Děkujeme!</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg">{state.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (step === 0) {
    return (
      <Card className="max-w-2xl mx-auto text-center p-8 animate-in fade-in-50">
        <CardTitle className="text-2xl mb-4">Pro jaký typ organizace web tvoříme?</CardTitle>
        <CardDescription className="mb-6">Pomozte mi lépe pochopit kontext vašeho projektu.</CardDescription>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-28 text-lg flex flex-col gap-2" onClick={() => { setProjectType('business'); handleNext(); }}><Building className="h-8 w-8"/> Pro firmu / byznys</Button>
            <Button variant="outline" className="h-28 text-lg flex flex-col gap-2" onClick={() => { setProjectType('nonprofit'); handleNext(); }}><HeartHandshake className="h-8 w-8"/> Pro neziskovku</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto animate-in fade-in-50">
      <form action={formAction}>
        <input type="hidden" name="projectType" value={projectType!} />
        
        <div className="p-6 border-b">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Krok {step} z {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>
        </div>

        {step === 1 && (
            <>
            <CardHeader><CardTitle>1. Základní informace</CardTitle><CardDescription>Začněme tím nejdůležitějším.</CardDescription></CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label htmlFor="clientName">Vaše jméno*</Label><Input id="clientName" name="clientName" required /></div>
                    <div className="space-y-2"><Label htmlFor="clientEmail">Kontaktní e-mail*</Label><Input id="clientEmail" name="clientEmail" type="email" required /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="projectName">Název projektu/firmy*</Label><Input id="projectName" name="projectName" required /></div>
            </CardContent>
            </>
        )}
        
        {step === 2 && (
            <>
            <CardHeader><CardTitle>2. Cíle a měření úspěchu</CardTitle><CardDescription>Co přesně má web dokázat?</CardDescription></CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Jaký je hlavní cíl vašeho webu?*</Label>
                    <RadioGroup name="mainGoal" required>
                        {projectType === 'business' ? (
                            <>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="increase_sales" id="g1" /><Label htmlFor="g1">Zvýšit prodeje / získat poptávky</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="build_brand" id="g2" /><Label htmlFor="g2">Budovat značku a důvěru</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="g-other" /><Label htmlFor="g-other">Jiný (popíšu níže)</Label></div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="raise_funds" id="g3" /><Label htmlFor="g3">Získat dárce / zvýšit povědomí</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="inform_public" id="g4" /><Label htmlFor="g4">Informovat veřejnost o naší činnosti</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="g-other" /><Label htmlFor="g-other">Jiný (popíšu níže)</Label></div>
                            </>
                        )}
                    </RadioGroup>
                </div>
                <div className="space-y-2"><Label htmlFor="kpis">Jak budeme měřit úspěch? (Klíčové ukazatele výkonnosti - KPIs)</Label><Textarea id="kpis" name="kpis" placeholder="např. počet odeslaných formulářů, míra konverze, průměrná hodnota objednávky, počet nových dárců..." /></div>
            </CardContent>
            </>
        )}

        {step === 3 && (
            <>
            <CardHeader><CardTitle>3. Trh a konkurence</CardTitle><CardDescription>Na koho cílíme a kdo jsou naši soupeři?</CardDescription></CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-2"><Label htmlFor="targetAudience">Kdo je vaše cílová skupina?* (Popište ideálního zákazníka nebo podporovatele - jeho věk, zájmy, potřeby...)</Label><Textarea id="targetAudience" name="targetAudience" required /></div>
                 <div className="space-y-2"><Label htmlFor="competitors">Znáte své hlavní online konkurenty nebo podobné organizace? (Uveďte 2-3 odkazy)</Label><Textarea id="competitors" name="competitors" /></div>
            </CardContent>
            </>
        )}

        {step === 4 && (
            <>
            <CardHeader><CardTitle>4. Unikátnost a finance</CardTitle><CardDescription>Poslední, ale důležité detaily.</CardDescription></CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2"><Label htmlFor="uniqueValue">V čem je váš projekt, produkt nebo služba unikátní?*</Label><Textarea id="uniqueValue" name="uniqueValue" required /></div>
                <div className="space-y-2"><Label htmlFor="budget">Jaký je váš odhadovaný rozpočet na tento projekt?</Label><Input id="budget" name="budget" placeholder="např. 10 000 - 15 000 Kč"/></div>
            </CardContent>
            </>
        )}

        <div className="p-6 flex justify-between items-center">
            <div>{step > 1 && <Button type="button" variant="ghost" onClick={handlePrev}><ArrowLeft className="mr-2 h-4 w-4"/> Zpět</Button>}</div>
            <div>{step < totalSteps ? <Button type="button" onClick={handleNext}>Další krok <ArrowRight className="ml-2 h-4 w-4"/></Button> : <SubmitButton />}</div>
        </div>
      </form>
    </Card>
  );
}