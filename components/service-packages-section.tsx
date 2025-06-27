// ServicePackagesSection.js

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, Zap, Crown } from "lucide-react";
import Link from "next/link";

export default function ServicePackagesSection() {
  const packages = [
    // ... data balíčků zůstávají stejná ...
    {
      name: "START",
      price: "od 6 000 Kč",
      originalPrice: null,
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
      targetAudience:
        "Řemeslníci, kadeřnice, fotografové, poradci, OSVČ ve službách.",
      icon: Star,
      popular: false,
      timeline: "1-2 týdny",
      support: "Email podpora",
    },
    {
      name: "RŮST",
      price: "od 12 000 Kč",
      originalPrice: "15 000 Kč",
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
      targetAudience:
        "Kosmetické salony, menší stavební firmy, restaurace, penziony, designová studia.",
      icon: Zap,
      popular: true,
      timeline: "2-3 týdny",
      support: "Email + telefonní podpora",
    },
    {
      name: "EXPANZE",
      price: "Individuální",
      originalPrice: null,
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
      icon: Crown,
      popular: false,
      timeline: "4-6 týdnů",
      support: "Prioritní podpora 24/7",
    },
  ];

  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
      data-section="service-packages-section"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Vyberte si balíček, který podpoří váš růst.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Nabízím transparentní balíčky služeb, které jsou navrženy tak, aby
              vyhovovaly různým potřebám a rozpočtům podnikatelů na Vysočině.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <Card
                key={index}
                className={`flex flex-col p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-gray-950 relative ${
                  pkg.popular
                    ? "border-2 border-blue-500 dark:border-blue-400"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                    Nejpopulárnější
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${pkg.popular ? "bg-blue-100 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${pkg.popular ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                      />
                    </div>
                    <CardTitle className="text-2xl font-bold text-black dark:text-gray-50">
                      {pkg.name}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                    {pkg.description}
                  </CardDescription>

                  <div className="flex items-baseline gap-2 mt-4">
                    <p className="text-3xl font-extrabold text-black dark:text-gray-50">
                      {pkg.price}
                    </p>
                    {pkg.originalPrice && (
                      <p className="text-lg text-gray-500 line-through">
                        {pkg.originalPrice}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      ⏱️ {pkg.timeline}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🎧 {pkg.support}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Cílová skupina:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pkg.targetAudience}
                    </p>
                  </div>
                </CardContent>

                <div className="mt-auto pt-6">
                  <Button
                    className="w-full inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group"
                    asChild
                  >
                    {/* === ZMĚNA ZDE: Sjednocení textu tlačítka === */}
                    <Link href={`/poptavka?type=service&package=${pkg.name}`}>
                      Získat nabídku
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* ... Sekce s detaily cenotvorby zůstává stejná ... */}
        <div className="mt-24 max-w-5xl mx-auto">
          {/* ... obsah sekce ... */}
        </div>
      </div>
    </section>
  );
}