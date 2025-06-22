import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Přidáno Card, CardContent, CardHeader, CardTitle
import Link from "next/link" // Přidáno pro odkaz na kontakt
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PartnersSection() {
  const partnerLogos = [
    {
      name: "Malé podniky",
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
      name: "Startups",
      src: "/placeholder.svg?height=80&width=160&text=Startups",
      alt: "Ikona startupů",
      category: "Inovace",
      description: "MVP a růstové weby",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Připravuji se na spolupráci s vámi
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Jako začínající webový podnikatel hledám partnery, kteří oceňují strategický přístup a chtějí růst
              společně se mnou.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-8 mb-8 text-center">
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
        <div className="mx-auto grid max-w-6xl items-center justify-center gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <TooltipProvider>
            {partnerLogos.map((logo, index) => (
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

          {/* Zachovat existující CTA kartu */}
          <Card className="flex flex-col items-center justify-center text-center p-6 shadow-md dark:bg-gray-950 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-black dark:text-gray-50">
                Staňte se mým prvním klientem
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center items-center pt-0">
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                Získejte výhodné podmínky jako jeden z mých prvních klientů.
              </p>
              <Link href="/kontakt" passHref>
                <Button
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Kontaktujte nás
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
