import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ServicePackagesSection() {
  const packages = [
    {
      name: "START",
      price: "od 6 000 Kč",
      description:
        "Ideální pro živnostníky a jednotlivce, kteří potřebují profesionální online vizitku – rychle a efektivně.",
      features: [
        "Jednostránkový web nebo web do 3 podstránek",
        "Moderní, responzivní design",
        "Kontaktní formulář a interaktivní mapa",
        "Základní fotogalerie (do 15 fotografií)",
        "Propojení na sociální sítě",
        "Základní SEO optimalizace",
        "Nasazení na vaši doménu a hosting",
      ],
      targetAudience: "Řemeslníci, kadeřnice, fotografové, poradci, OSVČ ve službách.",
    },
    {
      name: "RŮST",
      price: "od 12 000 Kč",
      description:
        "Pro malé firmy a ambiciózní podnikatele, kteří chtějí nejen informovat, ale také aktivně prezentovat svou práci a budovat značku.",
      features: [
        "Vše z balíčku START",
        "Web s rozsahem do 7 podstránek",
        "Pokročilá galerie nebo portfolio",
        "Sekce pro reference a hodnocení",
        "Možnost založení blogu nebo sekce s novinkami",
        "Integrace Google Analytics",
        "Rozšířená on-page SEO optimalizace",
      ],
      targetAudience: "Kosmetické salony, menší stavební firmy, restaurace, penziony, designová studia.",
    },
    {
      name: "EXPANZE",
      price: "Individuální",
      description:
        "Pro střední a větší firmy, e-shopy a projekty s komplexními požadavky, které chtějí dominovat svému trhu a maximalizovat online potenciál.",
      features: [
        "Vše z balíčku RŮST",
        "Neomezený počet podstránek",
        "Pokročilé funkce e-shopu (filtry, varianty, správa objednávek)",
        "Integrace s externími systémy (CRM, ERP)",
        "Pokročilá SEO a obsahová strategie",
        "Pravidelná analytika a reporting",
        "Prioritní podpora",
      ],
      targetAudience:
        "Střední a větší e-shopy, výrobní firmy s komplexním portfoliem, realitní kanceláře, vzdělávací instituce.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Vyberte si balíček, který podpoří váš růst.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Nabízím transparentní balíčky služeb, které jsou navrženy tak, aby vyhovovaly různým potřebám a rozpočtům
              podnikatelů na Vysočině.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {packages.map((pkg, index) => (
            <Card key={index} className="flex flex-col p-6 shadow-lg dark:bg-gray-950">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-black dark:text-gray-50">{pkg.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</CardDescription>
                <p className="text-3xl font-extrabold text-black dark:text-gray-50 mt-4">{pkg.price}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  **Cílová skupina:** {pkg.targetAudience}
                </p>
              </CardContent>
              <div className="mt-auto pt-6">
                <Button className="w-full inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300">
                  Zjistit více
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
