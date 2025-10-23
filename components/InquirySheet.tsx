// components/InquirySheet.tsx
'use client';

import { useState, ReactNode } from 'react'; // Přidáno useState a ReactNode
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Importuj komponenty formulářů
import  ContactForm from "./ContactForm";
import { ConsultationForm } from "./ConsultationForm";
import { StrategicAnalysisEmbed } from "./StrategicAnalysisEmbed";

interface InquirySheetProps {
  trigger: ReactNode;
  title: string;
  description: string;
  // Nová prop: typ formuláře, který se má renderovat
  formComponent: "contact" | "consultation" | "strategic-analysis" | "default"; // "default" pro ContactForm, pokud není specifikováno
  serviceInfo?: string; // Pro předání typu služby do formuláře, pokud je potřeba
}

export default function InquirySheet({
  trigger,
  title,
  description,
  formComponent,
  serviceInfo,
}: InquirySheetProps) {
  const [isOpen, setIsOpen] = useState(false); // Pro ovládání stavu Sheetu

  const googleFormEmbedUrl = process.env.NEXT_PUBLIC_STRATEGIC_ANALYSIS_FORM_URL || "https://docs.google.com/forms/d/e/TVUJ_TVŮJ_ID_FORMULÁŘE/viewform?embedded=true";

  // Funkce, která vrátí správnou komponentu formuláře
  const renderFormComponent = () => {
    switch (formComponent) {
      case "contact":
      case "default": // Pokud je default, zobrazí ContactForm
        return <ContactForm onClose={() => setIsOpen(false)} defaultSubject={serviceInfo} />;
      case "consultation":
        return <ConsultationForm onClose={() => setIsOpen(false)} />;
      case "strategic-analysis":
        // Pro StrategicAnalysisEmbed možná budeme potřebovat větší šířku SheetContent,
        // ale to se nastavuje v SheetContentu. onClose se předává iframe komponentě,
        // ale ta ho nevyužije, zavře se celý Sheet.
        return <StrategicAnalysisEmbed googleFormUrl={googleFormEmbedUrl} onClose={() => setIsOpen(false)} />;
      default:
        return <p>Chyba: Formulář nebyl nalezen.</p>; // Fallback
    }
  };

  // Dynamická className pro SheetContent, pokud je potřeba pro různé formuláře
  // Můžeš to upravit, pokud chceš mít pro Google Form jinou šířku nebo styl
  const sheetContentClassName = formComponent === "strategic-analysis"
    ? "w-full max-w-4xl lg:max-w-6xl overflow-y-auto" // Větší šířka pro Google Form
    : "w-full sm:max-w-2xl overflow-y-auto";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}> {/* Předání stavu Sheetu */}
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={sheetContentClassName}> {/* Dynamická className */}
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          {renderFormComponent()} {/* ZDE SE NYNÍ BUDE RENDERovat FORMULÁŘ */}
        </div>
      </SheetContent>
    </Sheet>
  );
}