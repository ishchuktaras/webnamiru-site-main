// components/StrategicQuestionnaire.tsx
"use client";

import { useFormState } from "react-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormState, submitAnalysisForm } from "@/lib/actions/inquiry.actions"; // Import FormState

// Původní initialState, jak je definováno v inquiry.actions.ts
const initialState: FormState = {
  message: null,
  success: false,
  errors: undefined,
};

export default function StrategicQuestionnaire() {
  const [state, formAction] = useFormState(submitAnalysisForm as any, initialState); // Použijeme 'as any' dočasně, dokud neopravíme typování analysisSchema/submitAnalysisForm

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Odesláno!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg shadow-md">
      <form action={formAction} className="space-y-8">
        {state.message && (
          <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
            {state.message}
          </p>
        )}
        {state.errors && (
          <ul className="text-red-500 text-sm list-disc pl-5">
            {Object.entries(state.errors).map(([field, errors]) => (
              <li key={field}>
                <strong>{field}:</strong> {errors.join(", ")}
              </li>
            ))}
          </ul>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Základní informace</h2>
          <div>
            <Label htmlFor="clientName">Vaše jméno / Název firmy</Label>
            <Input id="clientName" name="clientName" required />
            {state.errors?.clientName && <p className="text-red-500 text-xs mt-1">{state.errors.clientName[0]}</p>}
          </div>
          <div>
            <Label htmlFor="clientEmail">Váš e-mail</Label>
            <Input id="clientEmail" name="clientEmail" type="email" required />
            {state.errors?.clientEmail && <p className="text-red-500 text-xs mt-1">{state.errors.clientEmail[0]}</p>}
          </div>
          <div>
            <Label htmlFor="projectName">Název projektu / webu</Label>
            <Input id="projectName" name="projectName" required />
            {state.errors?.projectName && <p className="text-red-500 text-xs mt-1">{state.errors.projectName[0]}</p>}
          </div>
          <div>
            <Label>Typ projektu</Label>
            <RadioGroup name="projectType" required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Neziskový" id="type-nonprofit" />
                <Label htmlFor="type-nonprofit">Neziskový</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Byznys" id="type-business" />
                <Label htmlFor="type-business">Byznys</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Startup" id="type-startup" />
                <Label htmlFor="type-startup">Startup</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Osobní" id="type-personal" />
                <Label htmlFor="type-personal">Osobní</Label>
              </div>
            </RadioGroup>
            {state.errors?.projectType && <p className="text-red-500 text-xs mt-1">{state.errors.projectType[0]}</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Cíle a klíčové ukazatele (KPIs)</h2>
          <p className="text-muted-foreground text-sm">Jaké jsou vaše hlavní cíle pro tento projekt a jak budete měřit jeho úspěch?</p>
          <div className="space-y-2">
            <Label>Vyberte hlavní cíle / KPIs</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-leads" name="kpis" value="Generování leadů" />
                <Label htmlFor="kpi-leads">Generování leadů</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-sales" name="kpis" value="Zvýšení prodeje/konverzí" />
                <Label htmlFor="kpi-sales">Zvýšení prodeje/konverzí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-traffic" name="kpis" value="Zvýšení návštěvnosti" />
                <Label htmlFor="kpi-traffic">Zvýšení návštěvnosti</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-brand" name="kpis" value="Posílení značky/povědomí" />
                <Label htmlFor="kpi-brand">Posílení značky/povědomí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-engagement" name="kpis" value="Zlepšení uživatelské angažovanosti" />
                <Label htmlFor="kpi-engagement">Zlepšení uživatelské angažovanosti</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kpi-support" name="kpis" value="Zlepšení zákaznické podpory" />
                <Label htmlFor="kpi-support">Zlepšení zákaznické podpory</Label>
              </div>
            </div>
            {state.errors?.kpis && <p className="text-red-500 text-xs mt-1">{state.errors.kpis[0]}</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Cílová skupina</h2>
          <p className="text-muted-foreground text-sm">Kdo je váš ideální zákazník/uživatel? Popište ho/ji.</p>
          <div>
            <Label htmlFor="targetAudience">Popis cílové skupiny (demografie, psychografie, potřeby)</Label>
            <Textarea id="targetAudience" name="targetAudience" rows={4} required />
            {state.errors?.targetAudience && <p className="text-red-500 text-xs mt-1">{state.errors.targetAudience[0]}</p>}
          </div>
          <div>
            <Label htmlFor="userPainPoints">Jaké problémy nebo motivace zákazníka váš projekt řeší?</Label>
            <Textarea id="userPainPoints" name="userPainPoints" rows={3} />
            {state.errors?.userPainPoints && <p className="text-red-500 text-xs mt-1">{state.errors.userPainPoints[0]}</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Konkurence a Unikátnost</h2>
          <p className="text-muted-foreground text-sm">Kdo jsou vaši hlavní konkurenti nebo podobné organizace a co vás odlišuje?</p>
          <div>
            <Label htmlFor="competitors">Hlavní konkurenti / Podobné organizace (uveďte webové stránky, pokud existují)</Label>
            <Textarea id="competitors" name="competitors" rows={3} />
            {state.errors?.competitors && <p className="text-red-500 text-xs mt-1">{state.errors.competitors[0]}</p>}
          </div>
          <div>
            <Label htmlFor="usp">Jaká je vaše unikátní prodejní nabídka (USP)? Co děláte lépe nebo jinak?</Label>
            <Textarea id="usp" name="usp" rows={3} required />
            {state.errors?.usp && <p className="text-red-500 text-xs mt-1">{state.errors.usp[0]}</p>}
          </div>
          <div>
            <Label htmlFor="inspirations">Webové stránky, které se vám líbí nebo vás inspirují (kvůli designu, funkcionalitě apod.)</Label>
            <Textarea id="inspirations" name="inspirations" rows={3} />
            {state.errors?.inspirations && <p className="text-red-500 text-xs mt-1">{state.errors.inspirations[0]}</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Základní rysy a obsah</h2>
          <p className="text-muted-foreground text-sm">Jaké jsou nezbytné funkce vašeho projektu a kdo bude zajišťovat obsah?</p>
          <div className="space-y-2">
            <Label>Nezbytné funkce / Sekce webu (vyberte vše, co platí)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-about" name="mustHaveFeatures" value="O nás / O projektu" />
                <Label htmlFor="feat-about">O nás / O projektu</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-services" name="mustHaveFeatures" value="Služby / Produkty" />
                <Label htmlFor="feat-services">Služby / Produkty</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-blog" name="mustHaveFeatures" value="Blog / Novinky" />
                <Label htmlFor="feat-blog">Blog / Novinky</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-contact" name="mustHaveFeatures" value="Kontaktní formulář" />
                <Label htmlFor="feat-contact">Kontaktní formulář</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-portfolio" name="mustHaveFeatures" value="Portfolio / Reference" />
                <Label htmlFor="feat-portfolio">Portfolio / Reference</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-faq" name="mustHaveFeatures" value="FAQ" />
                <Label htmlFor="feat-faq">FAQ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-ecomm" name="mustHaveFeatures" value="E-shop / Platby" />
                <Label htmlFor="feat-ecomm">E-shop / Platby</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="feat-members" name="mustHaveFeatures" value="Členská sekce / Login" />
                <Label htmlFor="feat-members">Členská sekce / Login</Label>
              </div>
            </div>
            {state.errors?.mustHaveFeatures && <p className="text-red-500 text-xs mt-1">{state.errors.mustHaveFeatures[0]}</p>}
          </div>
          <div>
            <Label htmlFor="mustHaveFeaturesOther">Další funkce, které potřebujete a nejsou v seznamu</Label>
            <Textarea id="mustHaveFeaturesOther" name="mustHaveFeaturesOther" rows={2} />
            {state.errors?.mustHaveFeaturesOther && <p className="text-red-500 text-xs mt-1">{state.errors.mustHaveFeaturesOther[0]}</p>}
          </div>
          <div>
            <Label>Kdo bude dodávat obsah (texty, obrázky, videa)?</Label>
            <RadioGroup name="contentProvider" required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="content-client" />
                <Label htmlFor="content-client">Dodáme si obsah sami (máme copywritera, fotografa atd.)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="agency" id="content-agency" />
                <Label htmlFor="content-agency">Potřebujeme pomoci s tvorbou obsahu</Label>
              </div>
            </RadioGroup>
            {state.errors?.contentProvider && <p className="text-red-500 text-xs mt-1">{state.errors.contentProvider[0]}</p>}
          </div>
          <div>
            <Label htmlFor="budgetRange">Máte představu o rozpočtu? (Nepovinné, ale pomůže mi lépe navrhnout řešení)</Label>
            <Input id="budgetRange" name="budgetRange" type="text" placeholder="Např. 50 000 - 100 000 Kč" />
            {state.errors?.budgetRange && <p className="text-red-500 text-xs mt-1">{state.errors.budgetRange[0]}</p>}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">DNA a Osobnost značky</h2>
          <p className="text-muted-foreground text-sm">Jaká je podstata vaší značky? Jak by měla působit na zákazníka?</p>
          <div>
            <Label htmlFor="brandStory">Popište příběh vaší značky nebo projektu. Co vás motivuje?</Label>
            <Textarea id="brandStory" name="brandStory" rows={3} />
            {state.errors?.brandStory && <p className="text-red-500 text-xs mt-1">{state.errors.brandStory[0]}</p>}
          </div>
          <div>
            <Label>Vyberte 3-5 klíčových hodnot, které vaše značka ztělesňuje.</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2"><Checkbox id="value-innovation" name="brandValues" value="Inovace" /><Label htmlFor="value-innovation">Inovace</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-quality" name="brandValues" value="Kvalita" /><Label htmlFor="value-quality">Kvalita</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-trust" name="brandValues" value="Důvěra" /><Label htmlFor="value-trust">Důvěra</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-passion" name="brandValues" value="Vášeň" /><Label htmlFor="value-passion">Vášeň</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-sustainability" name="brandValues" value="Udržitelnost" /><Label htmlFor="value-sustainability">Udržitelnost</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-community" name="brandValues" value="Komunita" /><Label htmlFor="value-community">Komunita</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-simplicity" name="brandValues" value="Jednoduchost" /><Label htmlFor="value-simplicity">Jednoduchost</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="value-creativity" name="brandValues" value="Kreativita" /><Label htmlFor="value-creativity">Kreativita</Label></div>
            </div>
            {state.errors?.brandValues && <p className="text-red-500 text-xs mt-1">{state.errors.brandValues[0]}</p>}
          </div>
          <div>
            <Label>Jaká by měla být osobnost vaší značky (tón komunikace, styl)?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2"><Checkbox id="voice-friendly" name="brandVoice" value="Přátelská" /><Label htmlFor="voice-friendly">Přátelská</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="voice-professional" name="brandVoice" value="Profesionální" /><Label htmlFor="voice-professional">Profesionální</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="voice-innovative" name="brandVoice" value="Inovativní" /><Label htmlFor="voice-innovative">Inovativní</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="voice-playful" name="brandVoice" value="Hravá" /><Label htmlFor="voice-playful">Hravá</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="voice-authoritative" name="brandVoice" value="Autoritativní" /><Label htmlFor="voice-authoritative">Autoritativní</Label></div>
              <div className="flex items-center space-x-2"><Checkbox id="voice-empathetic" name="brandVoice" value="Empatická" /><Label htmlFor="voice-empathetic">Empatická</Label></div>
            </div>
            {state.errors?.brandVoice && <p className="text-red-500 text-xs mt-1">{state.errors.brandVoice[0]}</p>}
          </div>
        </section>

        <Button type="submit" className="w-full">
          Odeslat strategickou analýzu
        </Button>
      </form>
    </div>
  );
}