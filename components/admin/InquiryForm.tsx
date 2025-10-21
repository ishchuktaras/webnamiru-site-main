// components/admin/InquiryForm.tsx
"use client";

import { useFormStatus, useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

// Definice rozhraní pro data poptávky
interface InquiryData {
  id?: string; // <--- Oprava 4: Přidáno id jako volitelné
  projectName: string;
  clientName: string;
  clientEmail: string;
  projectType: string;
  description?: string; // <--- Je důležité, zda je volitelné/povinné a zda existuje v DB
}

// <--- Oprava 2: Upraven typ initialState
type FormState = {
  message: string | null;
  success: boolean;
  errors?: Record<string, string[]>;
};

// Aktualizovaný initialState
const initialState: FormState = {
  message: null,
  success: false,
  errors: undefined,
};

interface InquiryFormProps {
  // <--- Oprava 1: Upraven typ 'action' prop tak, aby odpovídal useFormState
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: InquiryData; // Volitelné defaultní hodnoty pro editaci
}

// Komponenta pro odesílací tlačítko s pending stavem
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Ukládám..." : "Uložit změny"}
    </Button>
  );
}

export default function InquiryForm({ action, defaultValues }: InquiryFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const [projectType, setProjectType] = useState(defaultValues?.projectType || '');

  useEffect(() => {
    if (defaultValues?.projectType && defaultValues.projectType !== projectType) {
      setProjectType(defaultValues.projectType);
    }
  }, [defaultValues?.projectType, projectType]); // Zahrnutí projectType do závislostí

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      {state.message && ( // <--- Oprava 2: state.message místo state?.message, protože message je vždy string | null
        <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>
          {state.message}
        </p>
      )}
      {state.errors && ( // <--- Oprava 2: state.errors místo state?.errors
        <ul className="text-red-500 text-sm list-disc pl-5">
          {Object.values(state.errors).flat().map((err, idx) => (
            <li key={idx}>{(err as string)}</li> // <--- Oprava 3: Přetypování na string
          ))}
        </ul>
      )}

      {/* Skryté pole pro ID, pokud editujeme */}
      {defaultValues?.id && ( // <--- Oprava 4: id je nyní v InquiryData
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div>
        <Label htmlFor="projectName">Název Projektu</Label>
        <Input
          id="projectName"
          name="projectName"
          type="text"
          defaultValue={defaultValues?.projectName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="clientName">Jméno Klienta</Label>
        <Input
          id="clientName"
          name="clientName"
          type="text"
          defaultValue={defaultValues?.clientName || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="clientEmail">E-mail klienta</Label>
        <Input
          id="clientEmail"
          name="clientEmail"
          type="email"
          defaultValue={defaultValues?.clientEmail || ""}
          required
        />
      </div>
      <div>
        <Label htmlFor="projectType">Typ projektu</Label>
        <Select
          name="projectType"
          value={projectType}
          onValueChange={setProjectType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Vyberte typ projektu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Neziskový">Neziskový</SelectItem>
            <SelectItem value="Byznys">Byznys</SelectItem>
            <SelectItem value="Startup">Startup</SelectItem>
            <SelectItem value="Osobní">Osobní</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Pokud description není v DB modelu, odstraňte tento div */}
      <div>
        <Label htmlFor="description">Popis poptávky</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description || ""}
          rows={5}
          // required={false} // Popis nemusí být vždy povinný
        />
      </div>
      <SubmitButton />
    </form>
  );
}