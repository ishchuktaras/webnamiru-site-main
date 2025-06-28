// components/faq-section.tsx

"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SectionWrapper from "./SectionWrapper" // Import našeho wrapperu
import { faqs } from "@/lib/data" // Import dat ze samostatného souboru

export default function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("")

  // Logika pro filtrování a zvýraznění zůstává stejná
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs

    const query = searchQuery.toLowerCase().trim()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query),
    )
  }, [searchQuery])

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
    <SectionWrapper
      id="faq-section"
      title="Často kladené otázky"
      subtitle="Máte otázky? Zde najdete odpovědi na ty nejčastější."
      className="bg-white dark:bg-gray-900"
    >
      {/* Unikátní obsah sekce - vyhledávání a akordeon */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
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

        <div>
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
          <div className="mx-auto mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
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
    </SectionWrapper>
  )
}