// components/StrategicQuestionnaire.tsx

"use client";

import React, {
  useState,
  useTransition,
  createContext,
  useContext,
} from "react";
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
  Zap,
  ShoppingCart,
  Target,
  Heart,
  Users,
} from "lucide-react";

const totalSteps = 6;

const FormContext = createContext<{
  formData: Record<string, any>;
  updateFormData: (newData: Partial<Record<string, any>>) => void;
  state: AnalysisFormState;
  validateStep: (step: number) => boolean;
} | null>(null);

function useFormContext() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within a FormProvider");
  return context;
}

function SubmitButton({
  isPending,
  onClick,
}: {
  isPending: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="lg"
      className="w-full md:w-auto"
      disabled={isPending}
      onClick={onClick}
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
    kpis: [],
  });
  const [state, setState] = useState<AnalysisFormState>({
    message: "",
    success: false,
    errors: [],
  });
  const [isPending, startTransition] = useTransition();

  const updateFormDataInState = (newData: Partial<Record<string, any>>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const validateStep = (currentStep: number): boolean => {
    const requiredFields: Record<number, string[]> = {
      2: ["clientName", "clientEmail", "projectName"],
      3: ["kpis"],
      4: ["targetAudience"],
      5: ["usp"],
      6: ["mustHaveFeatures", "contentProvider"],
    };

    const fieldsToValidate = requiredFields[currentStep];
    if (!fieldsToValidate) return true;

    for (const field of fieldsToValidate) {
      const value = formData[field];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        toast.error("Nevyplněná pole", {
          description: `Prosím, vyplňte všechna povinná pole, než budete pokračovat.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleFormSubmit = () => {
    if (!validateStep(6)) return;

    startTransition(async () => {
      const form = new FormData();
      for (const key in formData) {
        const value = formData[key];
        if (Array.isArray(value)) {
          value.forEach((v) => form.append(key, v));
        } else if (value != null) {
          form.append(key, String(value));
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
    <FormContext.Provider
      value={{
        formData,
        updateFormData: updateFormDataInState,
        state,
        validateStep,
      }}
    >
      <Card className="max-w-3xl mx-auto animate-in fade-in-50">
        <div>
          {step >= 2 && (
            <div className="p-6 border-b">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Krok {step - 1} z {totalSteps - 1}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="p-6 min-h-[450px] flex items-center justify-center">
            {step === 0 && <Step0 onNext={() => setStep(1)} />}
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
            {step === 6 && <Step6 />}
          </div>

          {step > 0 && (
            <div className="p-6 flex justify-between items-center border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                className={step <= 1 ? "invisible" : ""}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Zpět
              </Button>
              {step < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Další krok <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <SubmitButton
                  isPending={isPending}
                  onClick={handleFormSubmit}
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </FormContext.Provider>
  );
}

// Data pro kroky
const businessKpis = {
  "Generování poptávek": {
    icon: Zap,
    kpis: [
      "Počet kvalifikovaných poptávek",
      "Míra konverze formulářů",
      "Cena za poptávku (CPL)",
    ],
  },
  "E-commerce": {
    icon: ShoppingCart,
    kpis: [
      "Celkové tržby z prodeje",
      "Průměrná hodnota objednávky (AOV)",
      "Míra opuštění košíku",
    ],
  },
  "Povědomí o značce": {
    icon: Target,
    kpis: [
      "Návštěvnost z organického vyhledávání",
      "Doba strávená na stránce",
      "Počet odběratelů newsletteru",
    ],
  },
};
const nonprofitKpis = {
  "Získávání podpory": {
    icon: Heart,
    kpis: [
      "Počet nových dárců",
      "Průměrná výše daru",
      "Míra konverze darovací stránky",
    ],
  },
  "Šíření osvěty": {
    icon: Target,
    kpis: [
      "Návštěvnost z organického vyhledávání",
      "Počet sdílení obsahu na soc. sítích",
      "Počet stažení materiálů",
    ],
  },
  "Budování komunity": {
    icon: Users,
    kpis: [
      "Počet odběratelů newsletteru",
      "Zapojení do diskuzí",
      "Návštěvnost komunitních akcí",
    ],
  },
};

const Step0 = ({ onNext }: { onNext: () => void }) => (
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
    <Button onClick={onNext} size="lg">
      Začít analýzu
    </Button>
  </div>
);
const Step1 = ({ onNext }: any) => {
  const { updateFormData } = useFormContext();
  return (
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
            updateFormData({ projectType: "business" });
            onNext();
          }}
        >
          <Building className="h-8 w-8" /> Pro firmu / byznys
        </Button>
        <Button
          variant="outline"
          className="h-28 text-lg flex flex-col gap-2"
          onClick={() => {
            updateFormData({ projectType: "nonprofit" });
            onNext();
          }}
        >
          <HeartHandshake className="h-8 w-8" /> Pro neziskovku
        </Button>
      </div>
    </div>
  );
};
const Step2 = () => {
  const { formData, updateFormData, state } = useFormContext();
  return (
    <div className="space-y-6 animate-in fade-in-50 w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle>Krok 1: Základní informace</CardTitle>
        <CardDescription>
          Pojďme si ujasnit, kdo jste a o jaký projekt se jedná.
        </CardDescription>
      </CardHeader>
      <div className="space-y-2">
        <Label htmlFor="clientName">
          Vaše celé jméno <span className="text-red-500">(povinné)</span>
        </Label>
        <Input
          id="clientName"
          name="clientName"
          required
          onChange={(e) => updateFormData({ clientName: e.target.value })}
          defaultValue={formData.clientName || ""}
        />
        <FieldError fieldName="clientName" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="clientEmail">
          Kontaktní e-mail <span className="text-red-500">(povinné)</span>
        </Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          type="email"
          required
          onChange={(e) => updateFormData({ clientEmail: e.target.value })}
          defaultValue={formData.clientEmail || ""}
        />
        <FieldError fieldName="clientEmail" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="projectName">
          Název projektu/firmy <span className="text-red-500">(povinné)</span>
        </Label>
        <Input
          id="projectName"
          name="projectName"
          required
          onChange={(e) => updateFormData({ projectName: e.target.value })}
          defaultValue={formData.projectName || ""}
        />
        <FieldError fieldName="projectName" errors={state.errors} />
      </div>
    </div>
  );
};
const Step3 = () => {
  const { formData, updateFormData, state } = useFormContext();
  const kpiData =
    formData.projectType === "business" ? businessKpis : nonprofitKpis;
  return (
    <div className="space-y-8 animate-in fade-in-50 w-full">
      <CardHeader className="p-0 mb-2">
        <CardTitle>Krok 2: Cíle a měření úspěchu</CardTitle>
        <CardDescription>
          Zaškrtněte 3-5 klíčových ukazatelů (KPIs), které jsou pro vás
          nejdůležitější. <span className="text-red-500">(povinné)</span>
        </CardDescription>
      </CardHeader>
      {Object.entries(kpiData).map(([category, { icon: Icon, kpis }]) => (
        <div key={category}>
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
            <Icon className="h-5 w-5 text-blue-600" /> {category}
          </h3>
          <div className="space-y-2 pl-4">
            {kpis.map((kpi) => (
              <div key={kpi} className="flex items-center space-x-2">
                <Checkbox
                  id={kpi}
                  name="kpis"
                  value={kpi}
                  onCheckedChange={(checked) => {
                    const newKpis = checked
                      ? [...(formData.kpis || []), kpi]
                      : (formData.kpis || []).filter((i: string) => i !== kpi);
                    updateFormData({ kpis: newKpis });
                  }}
                  checked={formData.kpis?.includes(kpi)}
                />
                <Label htmlFor={kpi}>{kpi}</Label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <FieldError fieldName="kpis" errors={state.errors} />
    </div>
  );
};
const Step4 = () => {
  const { formData, updateFormData, state } = useFormContext();
  return (
    <div className="space-y-6 animate-in fade-in-50 w-full">
      <CardHeader className="p-0 mb-4">
        <CardTitle>Krok 3: Váš ideální zákazník</CardTitle>
        <CardDescription>Pro koho tento web tvoříme?</CardDescription>
      </CardHeader>
      <div className="space-y-2">
        <Label htmlFor="targetAudience">
          {formData.projectType === "business"
            ? "Detailně popište ideálního zákazníka "
            : "Detailně popište ideálního dárce/podporovatele "}
          <span className="text-red-500">(povinné)</span>
        </Label>
        <Textarea
          id="targetAudience"
          name="targetAudience"
          required
          onChange={(e) => updateFormData({ targetAudience: e.target.value })}
          defaultValue={formData.targetAudience || ""}
        />
        <FieldError fieldName="targetAudience" errors={state.errors} />
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
          onChange={(e) => updateFormData({ userPainPoints: e.target.value })}
          defaultValue={formData.userPainPoints || ""}
        />
        <FieldError fieldName="userPainPoints" errors={state.errors} />
      </div>
    </div>
  );
};
const Step5 = () => {
  const { formData, updateFormData, state } = useFormContext();
  return (
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
          onChange={(e) => updateFormData({ competitors: e.target.value })}
          defaultValue={formData.competitors || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="usp">
          V čem jste unikátní oproti ostatním?{" "}
          <span className="text-red-500">(povinné)</span>
        </Label>
        <Textarea
          id="usp"
          name="usp"
          required
          onChange={(e) => updateFormData({ usp: e.target.value })}
          defaultValue={formData.usp || ""}
        />
        <FieldError fieldName="usp" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="inspirations">
          Uveďte 2-3 weby (i mimo váš obor), které se vám líbí a proč.
        </Label>
        <Textarea
          id="inspirations"
          name="inspirations"
          onChange={(e) => updateFormData({ inspirations: e.target.value })}
          defaultValue={formData.inspirations || ""}
        />
      </div>
    </div>
  );
};
const Step6 = () => {
  const { formData, updateFormData, state } = useFormContext();
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
          Jaké funkce jsou pro spuštění webu absolutně nezbytné (Must-have)?{" "}
          <span className="text-red-500">(povinné)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {commonFeatures.map((f) => (
            <div key={f} className="flex items-center space-x-2">
              <Checkbox
                id={f}
                onCheckedChange={(checked) => {
                  const newFeatures = checked
                    ? [...(formData.mustHaveFeatures || []), f]
                    : (formData.mustHaveFeatures || []).filter(
                        (i: string) => i !== f
                      );
                  updateFormData({ mustHaveFeatures: newFeatures });
                }}
                checked={formData.mustHaveFeatures?.includes(f)}
              />
              <Label htmlFor={f}>{f}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other"
              onCheckedChange={(checked) => {
                const newFeatures = checked
                  ? [...(formData.mustHaveFeatures || []), "other"]
                  : (formData.mustHaveFeatures || []).filter(
                      (i: string) => i !== "other"
                    );
                updateFormData({ mustHaveFeatures: newFeatures });
              }}
              checked={formData.mustHaveFeatures?.includes("other")}
            />
            <Label htmlFor="other">Jiná (specifikujte)</Label>
          </div>
        </div>
        {formData.mustHaveFeatures?.includes("other") && (
          <Textarea
            name="mustHaveFeaturesOther"
            onChange={(e) =>
              updateFormData({ mustHaveFeaturesOther: e.target.value })
            }
            defaultValue={formData.mustHaveFeaturesOther || ""}
            placeholder="Popište další nezbytnou funkci..."
            className="mt-2"
          />
        )}
        <FieldError fieldName="mustHaveFeatures" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label>
          Kdo bude zodpovědný za dodání obsahu (texty, fotky)?{" "}
          <span className="text-red-500">(povinné)</span>
        </Label>
        <RadioGroup
          name="contentProvider"
          required
          onValueChange={(value) => updateFormData({ contentProvider: value })}
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
        <FieldError fieldName="contentProvider" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budgetRange">Jaký je váš odhadovaný rozpočet?</Label>
        <Input
          id="budgetRange"
          name="budgetRange"
          onChange={(e) => updateFormData({ budgetRange: e.target.value })}
          defaultValue={formData.budgetRange || ""}
          placeholder="např. 10 000 - 15 000 Kč"
        />
      </div>
    </div>
  );
};
