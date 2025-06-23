"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link" // Ujistěte se, že je importován Link

export default function FinalCtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" data-section="final-cta-section">
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Jste připraveni na web, který skutečně funguje?
          </h2>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Pojďme se nezávazně pobavit o Vašem byznysu a jeho potenciálu. První konzultace a základní audit jsou
            zdarma.
          </p>
          <div className="flex justify-center">
            
            <Button size="lg" asChild>
              <Link href="/kontakt">Nezávazná konzultace</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
