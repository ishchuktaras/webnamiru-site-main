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
      <div className="container px-4 md:px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Kontaktujte nás</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
          Máte dotaz, potřebujete poradit s webem, nebo chcete nezávaznou konzultaci? Vyplňte formulář níže a já se Vám
          co nejdříve ozvu. První konzultace je zdarma!
        </p>
      </div>
      <ContactForm />
      {/* Přidání sekce FAQ pod kontaktní formulář */}
      <FaqSection />
    </main>
  )
}
