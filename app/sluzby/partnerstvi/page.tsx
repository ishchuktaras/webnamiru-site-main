import PartnersPackagesSection from "@/components/partners-packages-section"
import Footer from "@/components/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partnerství - Web na míru",
  description: "Výhodné podmínky spolupráce pro fotografy, designéry, marketology a project managery. Provize 15-30%.",
}

export default function PartnersPackagesPage() {
  return (
    <main className="flex flex-col min-h-[calc(100svh-64px)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Partnerské Balíčky</h1>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
            Staňte se naším partnerem a rozšiřte své služby o webová řešení s výhodnou provizí.
          </p>
        </div>
      </section>
      <PartnersPackagesSection />
      <Footer />
    </main>
  )
}
