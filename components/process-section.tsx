"use client"

import { useEffect, useState } from "react"
import { Search, Code, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProcessSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Tento hook zajistí, že animace se spustí až po načtení komponenty na straně klienta.
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const processSteps = [
    {
      icon: <Search className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "1. Strategický audit a návrh řešení",
      description:
        "Nejdříve analyzuji váš byznys, cíle a konkurenci. Výstupem je jasná strategie, jak web přispěje k vašemu růstu a jaké KPI budeme sledovat.",
    },
    {
      icon: <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "2. Realizace webu na míru",
      description:
        "Na základě schválené strategie vytvořím technicky precizní a funkční web. Každý prvek slouží obchodnímu cíli, s moderním a responzivním designem.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
      title: "3. Partnerství pro správu a růst",
      description:
        "Nabízím dlouhodobou správu, pravidelné aktualizace a optimalizaci výkonu webu. Jsme partneři pro váš kontinuální online růst.",
    },
  ]

  return (
    <section 
      className={`w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 transition-opacity duration-1000 ${isMounted ? "mounted" : "opacity-0"}`} 
      data-section="process-section"
    >
      <div className="container px-4 md:px-6">
        <div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-animate-item
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Váš úspěch ve 3 krocích.</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Můj transparentní a osvědčený proces zajišťuje, že váš web bude nejen krásný, ale především efektivní
              obchodní nástroj.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {processSteps.map((step, index) => (
            <div
              key={index}
              data-animate-item
              style={{ transitionDelay: `${150 + index * 150}ms` }}
            >
              <Card
                className="flex flex-col h-full text-center p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 dark:bg-gray-950 border-l-4 border-l-blue-500 relative hover:-translate-y-2"
              >
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                <CardHeader>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4 self-center">
                    {step.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl font-bold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-500 dark:text-gray-400 flex-1">
                  {step.description}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
