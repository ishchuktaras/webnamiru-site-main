"use client"

// Toto je malá změna pro vynucení nového commitu a nasazení na Vercel.
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// Corrected import paths for custom components (assuming PascalCase filenames)
import Footer from "@/components/Footer"
import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import ForWhomSection from "@/components/for-whom-section"
import TestimonialsSection from "@/components/testimonials-section"
import ProcessSection from "@/components/process-section"
import ServicePackagesSection from "@/components/service-packages-section"
import FaqSection from "@/components/faq-section"
import FinalCtaSection from "@/components/final-cta-section"
import ContactInfoSection from "@/components/contact-info-section"
import PartnersSection from "@/components/partners-section"
import ContactForm from "@/components/ContactForm"
import { Suspense } from "react"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<div>Načítám sekci Problém...</div>}>
        <ProblemSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci Řešení...</div>}>
        <SolutionSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci Pro koho...</div>}>
        <ForWhomSection />
      </Suspense>
      {/* <Suspense fallback={<div>Načítám sekci Případové studie...</div>}>
        <CaseStudiesSection />
      </Suspense> */}{" "}
      {/* Tuto sekci jsme přesunuli na samostatnou stránku */}
      <Suspense fallback={<div>Načítám sekci Reference...</div>}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci Proces...</div>}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci Balíčky služeb...</div>}>
        <ServicePackagesSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci FAQ...</div>}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci CTA...</div>}>
        <FinalCtaSection />
      </Suspense>
      <Suspense fallback={<div>Načítám kontaktní informace...</div>}>
        <ContactInfoSection />
      </Suspense>
      <Suspense fallback={<div>Načítám sekci Partneři...</div>}>
        <PartnersSection />
      </Suspense>
      <Footer />
      {/* New Sheet component for Contact Form */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default" className="fixed bottom-4 right-4 z-50 px-6 py-3 text-lg font-semibold shadow-lg">
            Chci zjistit potenciál svého webu
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Získejte bezplatnou konzultaci</SheetTitle>
            <SheetDescription>
              Vyplňte formulář a zjistěte, jak může váš web generovat skutečný obchodní růst.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Suspense fallback={<div>Načítám kontaktní formulář...</div>}>
              <ContactForm />
            </Suspense>
          </div>
          <SheetFooter>{/* You can add additional actions or information here if needed */}</SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  )
}
