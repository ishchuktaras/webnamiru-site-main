// components/service-packages-section.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { servicePackages } from "@/lib/data";
import SectionWrapper from "./SectionWrapper";
import InquirySheet from "./InquirySheet";

export default function ServicePackagesSection() {
  const packages = servicePackages;

  return (
    <SectionWrapper
      dataSection="service-packages-section"
      title="Vyberte si balíček, který podpoří váš růst."
      subtitle="Nabízím transparentní balíčky služeb, které jsou navrženy tak, aby vyhovovaly různým potřebám a rozpočtům podnikatelů na Vysočině."
      className="bg-white dark:bg-gray-900"
    >
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {packages.map((pkg, index) => {
          const IconComponent = pkg.icon;
          return (
            <Card
              key={index}
              className={`flex flex-col p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 dark:bg-gray-950 relative ${
                pkg.popular
                  ? "border-2 border-blue-500 dark:border-blue-400"
                  : "border-transparent"
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                  Nejpopulárnější
                </Badge>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${pkg.popular ? "bg-blue-100 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}>
                    <IconComponent className={`h-6 w-6 ${pkg.popular ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-black dark:text-gray-50">{pkg.name}</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="text-3xl font-extrabold text-black dark:text-gray-50">{pkg.price}</p>
                  {pkg.originalPrice && (<p className="text-lg text-gray-500 line-through">{pkg.originalPrice}</p>)}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">⏱️ {pkg.timeline}</Badge>
                  <Badge variant="outline" className="text-xs">🎧 {pkg.support}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Cílová skupina:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.targetAudience}</p>
                </div>
              </CardContent>
              <div className="mt-auto pt-6">
                <InquirySheet
                  title={`Poptávka balíčku: ${pkg.name}`}
                  description="Děkuji za váš zájem! Vyplňte prosím své kontaktní údaje a já se vám co nejdříve ozvu."
                  serviceInfo={`Tvorba webu - balíček ${pkg.name}`}
                  trigger={
                    <Button className="w-full inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group">
                      Získat nabídku
                    </Button>
                  }
                />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold tracking-tighter">Transparentní cenotvorba</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Žádné skryté poplatky. Vždy přesně víte, co je a co není součástí ceny vašeho nového webu.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* ZDE JE OBNOVENÝ A KOMPLETNÍ OBSAH */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">Vždy zahrnuto v ceně</h4>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Úvodní konzultace a analýza** vašich potřeb a cílů.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Responzivní design**, který skvěle vypadá na mobilech, tabletech i počítačích.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Základní on-page SEO**, aby vás vyhledávače jako Google a Seznam našly.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Nasazení webu** na vaši doménu a doporučený hosting.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Školení pro obsluhu webu**, abyste si mohli sami snadno upravovat obsah.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>**Technická záruka 30 dní** po spuštění pro případné doladění.</span>
              </li>
            </ul>
          </div>

          {/* ZDE JE OBNOVENÝ A KOMPLETNÍ OBSAH */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4">Není zahrnuto v ceně</h4>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span>**Hosting a doména** – roční poplatky třetím stranám (rád s výběrem a nákupem pomohu).</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span>**Tvorba obsahu** – psaní textů, grafika či focení (nabízeno v rámci balíčku <a href="#maintenance-section" className="font-bold underline">Strategické Partnerství</a>).</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span>**Licence prémiových pluginů**, pokud je projekt vyžaduje pro specifické funkce.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span>**Pokročilé marketingové služby** jako správa PPC kampaní nebo dlouhodobé SEO.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span>**Dlouhodobá správa a údržba** webu po uplynutí 30denní záruky (viz. <a href="#maintenance-section" className="font-bold underline">balíčky správy</a>).</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* ZDE JE OBNOVENÝ A KOMPLETNÍ OBSAH */}
        <div className="mt-12 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Jak probíhá platba?</h4>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Spolupráce je založena na férovém a jednoduchém platebním modelu, který zajišťuje jistotu pro obě strany.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-6 text-lg font-medium">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">50%</span>
                <span>záloha před zahájením prací</span>
              </div>
              <div className="text-2xl text-gray-300 dark:text-gray-600">→</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">50%</span>
                <span>doplatek po schválení, před spuštěním</span>
              </div>
            </div>
          </div>
      </div>
    </SectionWrapper>
  );
}