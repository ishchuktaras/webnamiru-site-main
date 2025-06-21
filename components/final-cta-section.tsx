import { Button } from "@/components/ui/button"

export default function FinalCtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Jste připraveni na web, který skutečně funguje?
        </h2>
        <p className="max-w-[800px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Pojďme se nezávazně pobavit o Vašem byznysu a jeho potenciálu. První konzultace a základní audit jsou zdarma.
          Žádné závazky, jen čistá hodnota.
        </p>
        <Button className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50">
          Domluvit nezávaznou konzultaci
        </Button>
      </div>
    </section>
  )
}
