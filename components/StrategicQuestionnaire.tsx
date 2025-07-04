// components/StrategicQuestionnaire.tsx

"use client";

import React, { useState, useTransition } from "react";
import {
  submitAnalysisForm,
  type AnalysisFormState,
} from "@/app/(forms)/strategicka-analyza/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Loader2,
  Send,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Building,
  HeartHandshake,
} from "lucide-react";

const totalSteps = 5;

// Tlačítko pro odeslání
function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full md:w-auto"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      {isPending ? "Odesílám..." : "Odeslat strategickou analýzu"}
    </Button>
  );
}

// Komponenta pro zobrazení chyb
function FieldError({
  fieldName,
  errors,
}: {
  fieldName: string;
  errors?: AnalysisFormState["errors"];
}) {
  const fieldErrors = errors?.filter((error) => error.path.includes(fieldName));
  if (!fieldErrors || fieldErrors.length === 0) return null;
  return (
    <p className="text-red-500 text-sm mt-1">
      {fieldErrors.map((e) => e.message).join(", ")}
    </p>
  );
}

export default function StrategicQuestionnaire() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({
    mustHaveFeatures: [],
    brandVoice: [],
  });
  const [state, setState] = useState<AnalysisFormState>({
    message: "",
    success: false,
    errors: [],
  });
  const [isPending, startTransition] = useTransition();

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const updateFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const existing = prev[name] || [];
      return {
        ...prev,
        [name]: checked
          ? [...existing, value]
          : existing.filter((v: string) => v !== value),
      };
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const form = new FormData();
      // RUČNĚ PŘIDÁME VŠECHNA DATA ZE STAVU DO FORMULÁŘE
      for (const key in formData) {
        const value = formData[key];
        if (Array.isArray(value)) {
          value.forEach((v) => form.append(key, v));
        } else if (value !== undefined) {
          form.append(key, value);
        }
      }

      const result = await submitAnalysisForm(form);
      setState(result);
      if (result.success) {
        toast.success("Odesláno!", { description: result.message });
      } else {
        toast.error("Chyba ve formuláři!", {
          description: result.message || "Zkontrolujte prosím vyplněná pole.",
        });
      }
    });
  };

  if (state.success) {
    return (
      <Card className="max-w-3xl mx-auto text-center p-8 border-green-500 animate-in fade-in-50">
        <CardHeader>
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-green-600">Děkujeme!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">{state.message}</p>
          <Button asChild className="mt-6">
            <a href="/">Zpět na hlavní stránku</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto animate-in fade-in-50">
      <form onSubmit={handleFormSubmit}>
        {step >= 2 && (
          <div className="p-6 border-b">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">
                Krok {step - 1} z {totalSteps}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${((step - 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="p-6 min-h-[450px] flex items-center justify-center">
          {step === 0 && <Step0 handleNext={handleNext} />}
          {step === 1 && (
            <Step1
              handleRadioChange={handleRadioChange}
              handleNext={handleNext}
            />
          )}
          {step === 2 && (
            <Step2
              formData={formData}
              handleChange={updateFormData}
              errors={state.errors}
            />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              handleRadioChange={handleRadioChange}
              handleChange={updateFormData}
              errors={state.errors}
            />
          )}
          {step === 4 && (
            <Step4
              formData={formData}
              handleChange={updateFormData}
              errors={state.errors}
            />
          )}
          {step === 5 && (
            <Step5
              formData={formData}
              handleChange={updateFormData}
              errors={state.errors}
            />
          )}
          {step === 6 && (
            <Step6
              formData={formData}
              handleCheckboxChange={handleCheckboxChange}
              handleChange={updateFormData}
              handleRadioChange={handleRadioChange}
              errors={state.errors}
            />
          )}
        </div>

        {step > 0 && (
          <div className="p-6 flex justify-between items-center border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handlePrev}
              className={step <= 1 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Zpět
            </Button>
            {step < totalSteps + 1 ? (
              <Button type="button" onClick={handleNext}>
                Další krok <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <SubmitButton isPending={isPending} />
            )}
          </div>
        )}
      </form>
    </Card>
  );
}

// Komponenty pro jednotlivé kroky zůstávají stejné, uvádím je pro úplnost

const Step0 = ({ handleNext }: { handleNext: () => void }) => (
  <div className="text-center">
    <CardHeader>
      <CardTitle className="text-2xl">
        Vítejte ve strategickém dotazníku
      </CardTitle>
      <CardDescription className="mt-2">
        Pojďme společně odhalit potenciál vašeho projektu. Tento dotazník je
        prvním krokem k vytvoření webu, který bude skutečně fungovat.
      </CardDescription>
    </CardHeader>
    <Button onClick={handleNext} size="lg">
      Začít analýzu
    </Button>
  </div>
);
const Step1 = ({ handleRadioChange, handleNext }: any) => (
  <div className="text-center animate-in fade-in-50">
    <CardHeader>
      <CardTitle className="text-2xl mb-4">
        Pro jaký typ organizace web tvoříme?
      </CardTitle>
      <CardDescription className="mb-6">
        Pomozte mi lépe pochopit kontext vašeho projektu.
      </CardDescription>
    </CardHeader>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button
        variant="outline"
        className="h-28 text-lg flex flex-col gap-2"
        onClick={() => {
          handleRadioChange("projectType", "business");
          handleNext();
        }}
      >
        <Building className="h-8 w-8" /> Pro firmu / byznys
      </Button>
      <Button
        variant="outline"
        className="h-28 text-lg flex flex-col gap-2"
        onClick={() => {
          handleRadioChange("projectType", "nonprofit");
          handleNext();
        }}
      >
        <HeartHandshake className="h-8 w-8" /> Pro neziskovku
      </Button>
    </div>
  </div>
);
const Step2 = ({ formData, handleChange, errors }: any) => (
  <div className="space-y-6 animate-in fade-in-50 w-full">
    <CardHeader className="p-0 mb-4">
      <CardTitle>Krok 1: DNA vaší značky</CardTitle>
      <CardDescription>Pojďme do hloubky pochopit, kdo jste.</CardDescription>
    </CardHeader>
    <div className="space-y-2">
      <Label htmlFor="clientName">Vaše celé jméno*</Label>
      <Input
        id="clientName"
        name="clientName"
        required
        onChange={handleChange}
        defaultValue={formData.clientName || ""}
      />
      <FieldError fieldName="clientName" errors={errors} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="clientEmail">Kontaktní e-mail*</Label>
      <Input
        id="clientEmail"
        name="clientEmail"
        type="email"
        required
        onChange={handleChange}
        defaultValue={formData.clientEmail || ""}
      />
      <FieldError fieldName="clientEmail" errors={errors} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="projectName">Název projektu/firmy*</Label>
      <Input
        id="projectName"
        name="projectName"
        required
        onChange={handleChange}
        defaultValue={formData.projectName || ""}
      />
      <FieldError fieldName="projectName" errors={errors} />
    </div>
  </div>
);
const Step3 = ({ formData, handleChange, handleRadioChange, errors }: any) => {
  const isBusiness = formData.projectType === "business";
  return (
    <div className="space-y-6 animate-in fade-in-50 w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle>Krok 2: Cíle a úspěch</CardTitle>
        <CardDescription>Definujme, co znamená "vítězství".</CardDescription>
      </CardHeader>
      <div className="space-y-2">
        <Label>Jaký je hlavní cíl vašeho webu?*</Label>
        <RadioGroup
          name="mainGoal"
          required
          onValueChange={(value) => handleRadioChange("mainGoal", value)}
          defaultValue={formData.mainGoal}
        >
          {isBusiness ? (
            <>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="increase_sales" id="g1" />
                <Label htmlFor="g1">Zvýšit prodeje / získat poptávky</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="build_brand" id="g2" />
                <Label htmlFor="g2">Budovat značku a důvěru</Label>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="raise_funds" id="g3" />
                <Label htmlFor="g3">Získat dárce / zvýšit povědomí</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inform_public" id="g4" />
                <Label htmlFor="g4">Informovat veřejnost o naší činnosti</Label>
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="g-other" />
            <Label htmlFor="g-other">Jiný (specifikujte níže)</Label>
          </div>
        </RadioGroup>
        <FieldError fieldName="mainGoal" errors={errors} />
      </div>
      {formData.mainGoal === "other" && (
        <div className="space-y-2 animate-in fade-in-20">
          <Label htmlFor="mainGoalOther">Prosím, upřesněte hlavní cíl:</Label>
          <Input
            id="mainGoalOther"
            name="mainGoalOther"
            onChange={handleChange}
            defaultValue={formData.mainGoalOther || ""}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="successMetrics">Jak budeme měřit úspěch? (KPIs)</Label>
        <Textarea
          id="successMetrics"
          name="successMetrics"
          onChange={handleChange}
          defaultValue={formData.successMetrics || ""}
          placeholder="např. Počet odeslaných formulářů, míra konverze..."
        />
      </div>
    </div>
  );
};
const Step4 = ({ formData, handleChange, errors }: any) => (
  <div className="space-y-6 animate-in fade-in-50 w-full">
    <CardHeader className="p-0 mb-4">
      <CardTitle>Krok 3: Váš ideální zákazník</CardTitle>
      <CardDescription>Pro koho tento web tvoříme?</CardDescription>
    </CardHeader>
    <div className="space-y-2">
      <Label htmlFor="targetAudience">
        {formData.projectType === "business"
          ? "Detailně popište ideálního zákazníka*"
          : "Detailně popište ideálního dárce/podporovatele*"}
      </Label>
      <Textarea
        id="targetAudience"
        name="targetAudience"
        required
        onChange={handleChange}
        defaultValue={formData.targetAudience || ""}
      />
      <FieldError fieldName="targetAudience" errors={errors} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="userPainPoints">
        {formData.projectType === "business"
          ? "Jaké jsou jeho největší problémy, které mu můžete vyřešit?"
          : "Co motivuje vaše podporovatele?"}
      </Label>
      <Textarea
        id="userPainPoints"
        name="userPainPoints"
        onChange={handleChange}
        defaultValue={formData.userPainPoints || ""}
      />
      <FieldError fieldName="userPainPoints" errors={errors} />
    </div>
  </div>
);
const Step5 = ({ formData, handleChange, errors }: any) => (
  <div className="space-y-6 animate-in fade-in-50 w-full">
    <CardHeader className="p-0 mb-4">
      <CardTitle>Krok 4: Trh a inspirace</CardTitle>
      <CardDescription>Podívejme se kolem sebe.</CardDescription>
    </CardHeader>
    <div className="space-y-2">
      <Label htmlFor="competitors">
        {formData.projectType === "business"
          ? "Uveďte 2-3 vaše hlavní konkurenty."
          : "Uveďte 2-3 podobné organizace."}
      </Label>
      <Textarea
        id="competitors"
        name="competitors"
        onChange={handleChange}
        defaultValue={formData.competitors || ""}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="usp">V čem jste unikátní oproti ostatním?*</Label>
      <Textarea
        id="usp"
        name="usp"
        required
        onChange={handleChange}
        defaultValue={formData.usp || ""}
      />
      <FieldError fieldName="usp" errors={errors} />
    </div>
    <div className="space-y-2">
      <Label htmlFor="inspirations">
        Uveďte 2-3 weby (i mimo váš obor), které se vám líbí a proč.
      </Label>
      <Textarea
        id="inspirations"
        name="inspirations"
        onChange={handleChange}
        defaultValue={formData.inspirations || ""}
      />
    </div>
  </div>
);
const Step6 = ({
  formData,
  handleChange,
  handleRadioChange,
  handleCheckboxChange,
  errors,
}: any) => {
  const commonFeatures = [
    "Kontaktní formulář",
    "Fotogalerie",
    "Blog / Novinky",
    "Mapa",
    "Reference",
  ];
  return (
    <div className="space-y-6 animate-in fade-in-50 w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle>Krok 5: Funkce a obsah</CardTitle>
        <CardDescription>
          Co konkrétně bude web obsahovat a umět.
        </CardDescription>
      </CardHeader>
      <div className="space-y-2">
        <Label>
          Jaké funkce jsou pro spuštění webu absolutně nezbytné (Must-have)?*
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {commonFeatures.map((f) => (
            <div key={f} className="flex items-center space-x-2">
              <Checkbox
                id={f}
                name="mustHaveFeatures"
                value={f}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("mustHaveFeatures", f, !!checked)
                }
                checked={formData.mustHaveFeatures?.includes(f)}
              />
              <Label htmlFor={f}>{f}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other"
              name="mustHaveFeatures"
              value="other"
              onCheckedChange={(checked) =>
                handleCheckboxChange("mustHaveFeatures", "other", !!checked)
              }
              checked={formData.mustHaveFeatures?.includes("other")}
            />
            <Label htmlFor="other">Jiná (specifikujte)</Label>
          </div>
        </div>
        {formData.mustHaveFeatures?.includes("other") && (
          <Textarea
            name="mustHaveFeaturesOther"
            onChange={handleChange}
            defaultValue={formData.mustHaveFeaturesOther || ""}
            placeholder="Popište další nezbytnou funkci..."
            className="mt-2"
          />
        )}
        <FieldError fieldName="mustHaveFeatures" errors={errors} />
      </div>
      <div className="space-y-2">
        <Label>Kdo bude zodpovědný za dodání obsahu (texty, fotky)?*</Label>
        <RadioGroup
          name="contentProvider"
          required
          onValueChange={(value) => handleRadioChange("contentProvider", value)}
          defaultValue={formData.contentProvider || ""}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="c1" />
            <Label htmlFor="c1">Dodám veškerý obsah sám/sama.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="agency" id="c2" />
            <Label htmlFor="c2">Potřebuji pomoci s tvorbou obsahu.</Label>
          </div>
        </RadioGroup>
        <FieldError fieldName="contentProvider" errors={errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budgetRange">Jaký je váš odhadovaný rozpočet?</Label>
        <Input
          id="budgetRange"
          name="budgetRange"
          onChange={handleChange}
          defaultValue={formData.budgetRange || ""}
          placeholder="např. 10 000 - 15 000 Kč"
        />
      </div>
    </div>
  );
};
