import FaqSection from "@/components/faq-section"
import ContactForm from "@/components/ContactForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - Web na míru",
  description: "Máte dotaz nebo chcete nezávaznou konzultaci? Vyplňte kontaktní formulář a ozveme se vám.",
}

export default function KontaktPage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center py-12 md:py-24 lg:py-32">
      
      <ContactForm />
      {/* Přidání sekce FAQ pod kontaktní formulář */}
      <FaqSection />
    </main>
  )
}
