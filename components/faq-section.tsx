import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Proč bych si měl vybrat Web na míru?",
      answer:
        "Web na míru nabízí unikátní kombinaci hlubokých ekonomických znalostí a precizních vývojářských dovedností. Nejenže vám vytvořím vizuálně atraktivní web, ale především strategický nástroj, který bude generovat měřitelný obchodní růst a návratnost investice.",
    },
    {
      question: "Jak dlouho trvá vytvoření webu?",
      answer:
        "Délka projektu závisí na složitosti a rozsahu webu. Základní jednostránkový web může být hotov do 7-10 pracovních dnů. Rozsáhlejší projekty s e-shopem nebo komplexními funkcemi trvají déle. Přesný časový harmonogram vždy stanovíme na úvodní konzultaci.",
    },
    {
      question: "Jaké technologie používáte?",
      answer:
        "Pro frontend využívám moderní framework Next.js 14 a React 18, styling zajišťuje Tailwind CSS a komponenty shadcn/ui. Pro backend používám Node.js s Next.js App Routerem, Prisma ORM a PostgreSQL databázi. To zajišťuje vysoký výkon, bezpečnost a škálovatelnost.",
    },
    {
      question: "Poskytujete i správu a údržbu webu?",
      answer:
        "Ano, nabízím dlouhodobou správu a údržbu webu, včetně pravidelných aktualizací, zálohování a bezpečnostních kontrol. Mým cílem je být vaším partnerem pro kontinuální online růst, nejen jednorázovým dodavatelem.",
    },
    {
      question: "Je první konzultace skutečně zdarma a nezávazná?",
      answer:
        "Ano, první konzultace a základní audit vašeho byznysu jsou zcela zdarma a nezávazné. Je to příležitost pro nás oba, abychom zjistili, zda si rozumíme a zda mohu vašemu projektu skutečně pomoci.",
    },
  ]

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
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700 dark:text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
