// components/partners-section.tsx

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SectionWrapper from "./SectionWrapper"; // Import našeho wrapperu
import InquirySheet from "./InquirySheet";   // Import pro vysouvací formulář

// ZMĚNA: Data přesunuta mimo hlavní funkci komponenty
const targetGroups = [
  {
    name: "Malé podniky a OSVČ",
    src: "/placeholder.svg?height=80&width=160&text=Malé%20podniky",
    alt: "Ikona malých podniků",
    category: "Cílová skupina",
    description: "Řemeslníci, obchodníci, služby",
  },
  {
    name: "Penziony & Ubytování",
    src: "/placeholder.svg?height=80&width=160&text=Penziony",
    alt: "Ikona ubytování",
    category: "Cestovní ruch",
    description: "Rezervační systémy a prezentace",
  },
  {
    name: "Restaurace & Kavárny",
    src: "/placeholder.svg?height=80&width=160&text=Restaurace",
    alt: "Ikona restaurací",
    category: "Gastronomie",
    description: "Online menu a objednávky",
  },
  {
    name: "Zdravotní služby",
    src: "/placeholder.svg?height=80&width=160&text=Zdravotnictví",
    alt: "Ikona zdravotnictví",
    category: "Zdravotnictví",
    description: "Objednávkové systémy",
  },
  {
    name: "Neziskové organizace",
    src: "/placeholder.svg?height=80&width=160&text=Neziskovky",
    alt: "Ikona neziskových organizací",
    category: "Neziskový sektor",
    description: "Transparentní prezentace",
  },
  {
    name: "Startupy a inovace",
    src: "/placeholder.svg?height=80&width=160&text=Startups",
    alt: "Ikona startupů",
    category: "Inovace",
    description: "MVP a růstové weby",
  },
];

export default function PartnersSection() {
  return (
    // ZMĚNA: Použití SectionWrapperu s novými, jasnějšími texty
    <SectionWrapper
      dataSection="partners"
      title="Pro koho tvořím weby"
      subtitle="Zaměřuji se na klíčové segmenty podnikání na Vysočině, kterým strategický web přináší největší hodnotu a návratnost investice."
      className="bg-white dark:bg-gray-900"
    >
      {/* Unikátní obsah sekce */}
      <div className="flex justify-center items-center gap-8 mb-12 text-center">
        <div>
          <div className="text-3xl font-bold text-black dark:text-white">3+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Úspěšné projekty</div>
        </div>
        <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>
        <div>
          <div className="text-3xl font-bold text-black dark:text-white">1</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Rok zkušeností</div>
        </div>
        <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>
        <div>
          <div className="text-3xl font-bold text-black dark:text-white">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Osobní přístup</div>
        </div>
      </div>
      
      <div className="mx-auto grid max-w-6xl items-center justify-center gap-8 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        <TooltipProvider>
          {targetGroups.map((logo, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="flex justify-center items-center p-4 cursor-pointer">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    width={160}
                    height={80}
                    alt={logo.alt}
                    className="object-contain h-20 w-40 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-center">
                  <p className="font-semibold">{logo.name}</p>
                  <p className="text-sm text-gray-600">{logo.category}</p>
                  <p className="text-xs mt-1">{logo.description}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>

        {/* ZMĚNA: Interaktivní CTA karta pomocí InquirySheet */}
        <InquirySheet
          title="Získejte výhodnou nabídku!"
          description="Jako jeden z mých prvních klientů získáte nejen špičkový web, ale i speciální podmínky. Zanechte mi kontakt a pojďme se bavit o vašem projektu."
          serviceInfo="Poptávka od prvního klienta"
          trigger={
            <Card className="flex flex-col items-center justify-center text-center p-6 shadow-md dark:bg-gray-950 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:dark:border-blue-500 transition-colors cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  Vaše firma zde?
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-center items-center pt-0">
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                  Získejte výhodné podmínky jako jeden z mých prvních klientů.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                >
                  Chci nabídku
                </Button>
              </CardContent>
            </Card>
          }
        />
      </div>
    </SectionWrapper>
  );
}