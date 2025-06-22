"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "Proč bych si měl vybrat Web na míru?",
      answer:
        "Web na míru nabízí unikátní kombinaci hlubokých ekonomických znalostí a precizních vývojářských dovedností. Nejenže vám vytvořím vizuálně atraktivní web, ale především strategický nástroj, který bude generovat měřitelný obchodní růst a návratnost investice.",
      category: "obecne",
    },
    {
      question: "Jak dlouho trvá vytvoření webu?",
      answer:
        "Délka projektu závisí na složitosti a rozsahu webu. Základní jednostránkový web může být hotov do 7-10 pracovních dnů. Rozsáhlejší projekty s e-shopem nebo komplexními funkcemi trvají 3-6 týdnů. Přesný časový harmonogram vždy stanovíme na úvodní konzultaci.",
      category: "proces",
    },
    {
      question: "Jaké technologie používáte?",
      answer:
        "Pro frontend využívám moderní framework Next.js 14 a React 18, styling zajišťuje Tailwind CSS a komponenty shadcn/ui. Pro backend používám Node.js s Next.js App Routerem, Prisma ORM a PostgreSQL databázi. To zajišťuje vysoký výkon, bezpečnost a škálovatelnost.",
      category: "technicke",
    },
    {
      question: "Poskytujete i správu a údržbu webu?",
      answer:
        "Ano, nabízím dlouhodobou správu a údržbu webu, včetně pravidelných aktualizací, zálohování a bezpečnostních kontrol. Mým cílem je být vaším partnerem pro kontinuální online růst, nejen jednorázovým dodavatelem.",
      category: "sluzby",
    },
    {
      question: "Je první konzultace skutečně zdarma a nezávazná?",
      answer:
        "Ano, první konzultace a základní audit vašeho byznysu jsou zcela zdarma a nezávazné. Je to příležitost pro nás oba, abychom zjistili, zda si rozumíme a zda mohu vašemu projektu skutečně pomoci.",
      category: "konzultace",
    },
    {
      question: "Kolik stojí vytvoření webu?",
      answer:
        "Ceny se pohybují od 15 000 Kč za základní prezentační web až po 80 000 Kč za komplexní e-shop s pokročilými funkcemi. Každý projekt oceňuji individuálně na základě požadavků. Nabízím také možnost splátek bez navýšení.",
      category: "ceny",
    },
    {
      question: "Jak probíhá platba za služby?",
      answer:
        "Standardně požaduji 50% zálohu před zahájením prací a zbytek po dokončení a předání webu. U větších projektů je možné rozložit platby do více splátek. Přijímám platby bankovním převodem i kartou.",
      category: "platby",
    },
    {
      question: "Kolik revizí je v ceně zahrnuto?",
      answer:
        "V ceně každého projektu jsou zahrnuty 3 kola revizí. Další úpravy účtuji hodinovou sazbou 800 Kč/hod. Snažím se však vždy najít kompromis a vyhovět rozumným požadavkům klientů.",
      category: "revize",
    },
    {
      question: "Vytvářím web i pro zahraniční klienty?",
      answer:
        "Ano, specializuji se na pomoc podnikatelům z Ukrajiny a dalších zemí při vstupu na český trh. Nabízím kompletní servis v ukrajinštině, ruštině a angličtině, včetně poradenství ohledně českých obchodních praktik.",
      category: "mezinarodni",
    },
    {
      question: "Zajišťujete i SEO optimalizaci?",
      answer:
        "Ano, základní SEO optimalizace je součástí každého webu. Zahrnuje optimalizaci rychlosti, meta tagů, strukturovaných dat a mobilní responzivitu. Pro pokročilé SEO strategie nabízím samostatné konzultace.",
      category: "seo",
    },
  ]

  // Filtrování FAQ na základě vyhledávacího dotazu
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs

    const query = searchQuery.toLowerCase().trim()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    )
  }, [searchQuery, faqs])

  // Funkce pro zvýraznění textu
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Často kladené otázky</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Máte otázky? Zde najdete odpovědi na ty nejčastější.
            </p>
          </div>
        </div>

        {/* Vyhledávací pole */}
        <div className="mx-auto max-w-3xl mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Vyhledejte v otázkách a odpovědích..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Vymazat vyhledávání</span>
              </Button>
            )}
          </div>

          {/* Indikátor počtu výsledků */}
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {filteredFaqs.length === 0
                ? "Žádné výsledky nenalezeny"
                : `Nalezeno ${filteredFaqs.length} ${filteredFaqs.length === 1 ? "výsledek" : filteredFaqs.length < 5 ? "výsledky" : "výsledků"}`}
            </div>
          )}
        </div>

        <div className="mx-auto max-w-3xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Žádné výsledky nenalezeny</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Zkuste změnit vyhledávací dotaz nebo se podívejte na všechny otázky.
              </p>
              <Button onClick={clearSearch} variant="outline">
                Zobrazit všechny otázky
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={`${faq.category}-${index}`} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left hover:no-underline">
                    {highlightText(faq.question, searchQuery)}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    {highlightText(faq.answer, searchQuery)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {/* Kontaktní CTA pokud nejsou nalezeny výsledky */}
        {filteredFaqs.length === 0 && searchQuery && (
          <div className="mx-auto max-w-3xl mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Nenašli jste odpověď?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kontaktujte mě přímo a rád odpovím na vaše specifické otázky.
            </p>
            <Button asChild>
              <a href="/kontakt">Kontaktovat</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
