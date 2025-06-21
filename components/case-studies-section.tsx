import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      client: "Strojírna Novák, Pelhřimov",
      challenge: "Zastaralý web negeneroval žádné poptávky ze zahraničí a neodrážel moderní image firmy.",
      solution:
        "Provedl jsem audit trhu, navrhl vícejazyčnou strategii a vytvořil web zaměřený na prezentaci referencí a snadnou poptávku.",
      result: "+40 % poptávek z Německa během 6 měsíců.",
      link: "#", // Zde by byl odkaz na detailní studii
    },
    {
      client: "Penzion U Jezera, Telč",
      challenge: "Nízká obsazenost mimo sezónu a nedostatečná online viditelnost v konkurenčním prostředí.",
      solution:
        "Optimalizoval jsem web pro lokální SEO, integroval moderní rezervační systém a spustil cílené marketingové kampaně.",
      result: "+25 % obsazenosti v mimosezónních měsících a nárůst přímých rezervací.",
      link: "#",
    },
    {
      client: "Farma Zelený Kopec, Třebíč",
      challenge: "Chyběla online platforma pro prodej lokálních produktů a vyprávění příběhu farmy.",
      solution:
        "Vytvořil jsem e-shop s jednoduchou správou produktů, integroval platební bránu a navrhl vizuální identitu zdůrazňující autentičnost.",
      result: "Spuštění online prodeje s průměrným měsíčním obratem 30 000 Kč během prvních 3 měsíců.",
      link: "#",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Místo prázdných slov, měřitelné výsledky.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Podívejte se na konkrétní příklady, jak mé strategické weby pomohly klientům dosáhnout jejich obchodních
              cílů.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="flex flex-col p-6 shadow-md dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{study.client}</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                  **Výzva:** {study.challenge}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700 dark:text-gray-300 mb-4">**Moje řešení:** {study.solution}</p>
                <p className="text-lg font-semibold text-black dark:text-gray-50">**Výsledek:** {study.result}</p>
              </CardContent>
              <div className="mt-auto pt-4">
                <Button variant="link" className="px-0 text-black dark:text-gray-50">
                  Zobrazit celou studii
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
