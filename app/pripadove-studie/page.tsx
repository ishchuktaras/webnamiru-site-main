import CaseStudiesSection from "@/components/case-studies-section"
import { Suspense } from "react"
import Loading from "../loading" // Předpokládáme, že máte loading.tsx

export default function CaseStudiesPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Naše Případové Studie</h1>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
            Podívejte se, jak jsme pomohli našim klientům dosáhnout měřitelných výsledků.
          </p>
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <CaseStudiesSection />
      </Suspense>
    </main>
  )
}
