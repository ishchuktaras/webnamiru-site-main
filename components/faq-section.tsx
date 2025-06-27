// FaqSection

"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("")

  // === ZMĚNA ZDE: Nový, komplexní obsah FAQ sekce ===
  const faqs = [
    {
      question: "Proč bych si měl vybrat právě vás a ne zavedenou agenturu?",
      answer:
        "Získáte unikátní kombinaci experta, který je zároveň ekonom i developer. Komunikujete přímo se mnou, což zaručuje osobní přístup, hluboké pochopení vašich obchodních cílů a maximální flexibilitu. Navíc, jako začínající podnikatel nabízím špičkové technologie za férovější ceny.",
      category: "Obecné",
    },
    {
      question: "Co přesně znamená 'strategický web' a jak mi pomůže?",
      answer:
        "Strategický web není jen hezká online vizitka. Je to nástroj postavený na základě analýzy vašeho byznysu a trhu. Cílem není jen design, ale měřitelný výsledek – ať už je to více poptávek, online prodejů, nebo efektivnější prezentace. Každý prvek webu má svůj účel a směřuje k návratnosti vaší investice (ROI).",
      category: "Obecné",
    },
    {
      question: "Co znamená cena 'od X Kč' u vašich balíčků?",
      answer:
        "Cena 'od' představuje základní sazbu za funkce a rozsah uvedený v daném balíčku. Finální cena se může lišit na základě vašich specifických požadavků, například potřeby tvorby obsahu, složitějších grafických prvků nebo napojení na externí systémy. Po naší úvodní konzultaci vždy obdržíte pevnou a finální cenovou nabídku.",
      category: "Služby a Cenotvorba",
    },
    {
      question: "Co když mé požadavky nespadají do žádného z balíčků?",
      answer:
        "Balíčky slouží především pro orientaci. Většina mých projektů je plně individuálních a šitých na míru. Pokud máte specifické požadavky, je to ideální situace. Kontaktujte mě, probereme vaše potřeby a já vám zdarma a nezávazně připravím individuální řešení a cenovou nabídku.",
      category: "Služby a Cenotvorba",
    },
     {
      question: "Jak probíhá celý proces od poptávky po spuštění webu?",
      answer:
        "Můj proces je transparentní a efektivní: 1. **Úvodní konzultace** (zdarma). 2. **Analýza a strategie**. 3. **Cenová nabídka** a odsouhlasení. 4. **Záloha** a start projektu. 5. **Design a vývoj** s pravidelnými ukázkami. 6. **Testování a schválení**. 7. **Spuštění webu** a finální platba.",
      category: "Proces a Technologie",
    },
    {
      question: "Jaké technologie pro vývoj používáte?",
      answer:
        "Sázím na moderní a ověřený technologický stack, který zaručuje rychlost, bezpečnost a skvělý uživatelský prožitek. Primárně používám Next.js, React, TypeScript a pro styling Tailwind CSS. Tato kombinace mi umožňuje tvořit weby na světové úrovni.",
      category: "Proces a Technologie",
    },
    {
      question: "Co se děje po spuštění webu? Skončí tím naše spolupráce?",
      answer:
        "Určitě ne. Mým cílem je dlouhodobé partnerství. Každý projekt zahrnuje 30denní technickou záruku pro doladění detailů. Po této době nabízím volitelné balíčky správy a údržby, které zajistí, že váš web bude stále aktuální, bezpečný a funkční.",
      category: "Po Dokončení",
    },
    {
        question: "Musím si zajistit vlastní texty, fotky a hosting?",
        answer:
            "Ideální je, pokud máte vlastní obsah, protože nejlépe znáte svůj byznys. Pokud však texty nebo fotky nemáte, nevadí – mohu vám pomoci s jejich tvorbou nebo doporučit profesionály. Hosting a doménu v ceně nemám, ale rád vám poradím s výběrem a vše zařídím.",
        category: "Služby a Cenotvorba",
    },
    {
      question: "Jak se mohu stát vaším partnerem?",
      answer:
        "Je to jednoduché. Kontaktujte mě přes formulář nebo e-mailem s představou o partnerství. Probereme detaily, odsouhlasíme si provizní podmínky a můžete začít. Vy se postaráte o prvotní kontakt s klientem a já převezmu kompletní realizaci projektu.",
      category: "Partnerství",
    },
    {
      question: "Kdy a jak mi bude vyplacena provize za doporučení?",
      answer:
        "Provize je splatná ihned po tom, co doporučený klient uhradí finální fakturu za dokončený projekt. V ten moment vás požádám o vystavení vaší faktury na dohodnutou částku, kterou obratem proplatím. Vše je 100% transparentní.",
      category: "Partnerství",
    },
  ]
  
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

 const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

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
                    <p className="prose dark:prose-invert">
                        {highlightText(faq.answer, searchQuery)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>

        {filteredFaqs.length === 0 && searchQuery && (
          <div className="mx-auto max-w-3xl mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Nenašli jste odpověď?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kontaktujte mě přímo a rád odpovím na vaše specifické otázky.
            </p>
            <Button asChild>
              <Link href="/kontakt">Kontaktovat</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}