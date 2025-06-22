import { Factory, Utensils, Sprout, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForWhomSection() {
  const segments = [
    {
      icon: Factory,
      title: "Výrobní SME a Řemeslníci",
      problem: "78,2% stavebních firem nemá web",
      solution:
        "Získejte B2B poptávky a exportní příležitosti prostřednictvím profesionální online prezentace vaší technické expertízy.",
      features: ["B2B katalogy", "Exportní prezentace", "Technické specifikace"],
    },
    {
      icon: Utensils,
      title: "Poskytovatelé Služeb",
      problem: "Nízká online konverze",
      solution: "Plný rezervační kalendář díky webu s online objednávkami, platbami a automatickým sledováním zakázek.",
      features: ["Online rezervace", "Platební brána", "CRM integrace"],
    },
    {
      icon: Sprout,
      title: "Místní Producenti a Farmáři",
      problem: "Chybí online prodej",
      solution: "E-shop s příběhem vaší značky, který osloví i 35% seniorů díky jednoduchému a přístupnému designu.",
      features: ["E-commerce", "Storytelling", "Přístupný design"],
    },
    {
      icon: Globe,
      title: "Podnikatelé-cizinci",
      problem: "Jazykové a kulturní bariéry",
      solution: "Повний сервіс вашою рідною мовою + strategická podpora pro úspěšnou integraci na český trh.",
      features: ["Vícejazyčnost", "Kulturní adaptace", "Lokální SEO"],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Řešení šité na míru <span className="text-blue-600">vašemu segmentu</span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Každý segment má specifické problémy. Můj strategický přístup kombinuje ekonomickou expertízu s
              technickými dovednostmi pro maximální ROI.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8">
          {segments.map((segment, index) => {
            const IconComponent = segment.icon
            return (
              <Card
                key={index}
                className="flex flex-col text-center p-6 shadow-md hover:shadow-lg transition-all duration-300 dark:bg-gray-950 border-l-4 border-l-blue-600"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg font-bold">{segment.title}</CardTitle>
                  <div className="text-sm text-red-600 dark:text-red-400 font-medium">⚠️ {segment.problem}</div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{segment.solution}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      Klíčové funkce:
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {segment.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Solution Summary */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Proč strategický přístup funguje
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+187%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">růst IT sektoru - využijte příležitost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">86,9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">firem má web - buďte mezi nimi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">ROI</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">měřitelná návratnost investice</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
