import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Camera, TrendingUp, Users, Instagram, MapPin } from "lucide-react"
import Link from "next/link"

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      client: "Angelina Vavzhyniak",
      subtitle: "Fotografka z Jihlavy",
      category: "Portfolio",
      location: "Jihlava",
      instagram: "@AVXXREZSEN",
      challenge:
        "Mladá talentovaná fotografka potřebovala profesionální web portfolio pro prezentaci své práce a získání nových klientů.",
      solution:
        "Vytvořil jsem moderní, responzivní portfolio web s galerií, kontaktním formulářem a integrací se sociálními sítěmi. Design zdůrazňuje její fotografickou práci.",
      result: "+60% nových klientů během 4 měsíců a profesionální online prezence.",
      technologies: ["Next.js", "Tailwind CSS", "Lightbox Gallery", "Contact Forms"],
      metrics: [
        { label: "Nárůst klientů", value: "+60%" },
        { label: "Doba načítání", value: "< 2s" },
        { label: "Mobile optimalizace", value: "100%" },
      ],
      link: "/pripadove-studie/coming-soon", // Změněno
      icon: Camera,
      color: "from-pink-500 to-purple-600",
    },
    {
      client: "Penzion U Jezera",
      subtitle: "Ubytování v Telči",
      category: "Tourism",
      location: "Telč",
      challenge: "Nízká obsazenost mimo sezónu a nedostatečná online viditelnost v konkurenčním prostředí.",
      solution:
        "Optimalizoval jsem web pro lokální SEO, integroval moderní rezervační systém a spustil cílené marketingové kampaně.",
      result: "+25% obsazenosti v mimosezónních měsících a nárůst přímých rezervací.",
      technologies: ["WordPress", "Booking System", "SEO Optimization", "Google Analytics"],
      metrics: [
        { label: "Obsazenost", value: "+25%" },
        { label: "Přímé rezervace", value: "+40%" },
        { label: "SEO ranking", value: "Top 3" },
      ],
      link: "/pripadove-studie/coming-soon", // Změněno
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
    },
    {
      client: "Farma Zelený Kopec",
      subtitle: "Ekologická farma",
      category: "E-commerce",
      location: "Třebíč",
      challenge: "Chyběla online platforma pro prodej lokálních produktů a vyprávění příběhu farmy.",
      solution:
        "Vytvořil jsem e-shop s jednoduchou správou produktů, integroval platební bránu a navrhl vizuální identitu zdůrazňující autentičnost.",
      result: "Spuštění online prodeje s průměrným měsíčním obratem 30 000 Kč během prvních 3 měsíců.",
      technologies: ["Shopify", "Payment Gateway", "Inventory Management", "Brand Design"],
      metrics: [
        { label: "Měsíční obrat", value: "30k Kč" },
        { label: "Konverzní poměr", value: "3.2%" },
        { label: "Zákazníci", value: "150+" },
      ],
      link: "/pripadove-studie/coming-soon", // Změněno
      icon: Users,
      color: "from-green-500 to-emerald-600",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="container px-4 md:px-6">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border-blue-200">
            Úspěšné projekty
          </Badge>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Místo prázdných slov, měřitelné výsledky
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Podívejte se na konkrétní příklady, jak mé strategické weby pomohly klientům na Vysočině dosáhnout jejich
              obchodních cílů.
            </p>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Úspěšných projektů</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Spokojených klientů</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Průměrný nárůst</div>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {caseStudies.map((study, index) => {
            const IconComponent = study.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-900"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${study.color}`} />

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <Badge variant="secondary" className="text-xs">
                          {study.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {study.client}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{study.subtitle}</p>

                      {/* Location and Social */}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {study.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {study.location}
                          </div>
                        )}
                        {study.instagram && (
                          <div className="flex items-center gap-1">
                            <Instagram className="h-3 w-3" />
                            {study.instagram}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Challenge */}
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                      🎯 Výzva
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                      💡 Řešení
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                      🛠️ Technologie
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {study.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                      📈 Výsledky
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {study.metrics.map((metric, metricIndex) => (
                        <div
                          key={metricIndex}
                          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <span className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</span>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Result */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">🎉 {study.result}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${study.color} hover:shadow-lg transition-all duration-300 text-white border-0 group-hover:scale-105`}
                    asChild
                  >
                    <Link href={study.link}>
                      Zobrazit detaily projektu
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Chcete podobné výsledky pro svůj projekt?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Pojďme společně vytvořit web, který skutečně funguje pro váš byznys.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              Nezávazná konzultace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
