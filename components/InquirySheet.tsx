// components/InquirySheet.tsx
"use client"

import { useState, type ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import ContactForm from "./ContactForm"
import { ConsultationForm } from "./ConsultationForm"
import { StrategicAnalysisEmbed } from "./StrategicAnalysisEmbed"

interface InquirySheetProps {
  trigger: ReactNode
  title: string
  description: string
  formComponent: "contact" | "consultation" | "strategic-analysis" | "default"
  serviceInfo?: string
}

export default function InquirySheet({ trigger, title, description, formComponent, serviceInfo }: InquirySheetProps) {
  const [isOpen, setIsOpen] = useState(false)

  const googleFormEmbedUrl =
    process.env.NEXT_PUBLIC_STRATEGIC_ANALYSIS_FORM_URL ||
    "https://docs.google.com/forms/d/e/TVUJ_TVŮJ_ID_FORMULÁŘE/viewform?embedded=true"

  const renderFormComponent = () => {
    switch (formComponent) {
      case "contact":
      case "default":
        return <ContactForm onClose={() => setIsOpen(false)} defaultService={serviceInfo} />
      case "consultation":
        return <ConsultationForm onClose={() => setIsOpen(false)} />
      case "strategic-analysis":
        return <StrategicAnalysisEmbed googleFormUrl={googleFormEmbedUrl} onClose={() => setIsOpen(false)} />
      default:
        return <p>Chyba: Formulář nebyl nalezen.</p>
    }
  }

  const sheetContentClassName =
    formComponent === "strategic-analysis"
      ? "w-full max-w-4xl lg:max-w-6xl overflow-y-auto"
      : "w-full sm:max-w-2xl overflow-y-auto"

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className={sheetContentClassName}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-4">{renderFormComponent()}</div>
      </SheetContent>
    </Sheet>
  )
}
