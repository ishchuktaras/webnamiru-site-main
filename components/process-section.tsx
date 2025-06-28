// components/process-section.tsx

"use client";

import { Search, Code, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionWrapper from "./SectionWrapper";


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
];

export default function ProcessSection() {
  // ZMĚNA: Veškerá logika pro animaci je pryč.
  
  return (
    <SectionWrapper
      id="process-section"
      badgeText="Proces"
      title="Váš úspěch ve 3 krocích."
      subtitle="Můj transparentní a osvědčený proces zajišťuje, že váš web bude nejen krásný, ale především efektivní obchodní nástroj."
      className="bg-white dark:bg-gray-900"
    >
      {/* Unikátní obsah sekce - mřížka s kroky procesu */}
      <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {processSteps.map((step, index) => (
          // ZMĚNA: Odebrány atributy pro animaci
          <div key={index}>
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
    </SectionWrapper>
  );
}