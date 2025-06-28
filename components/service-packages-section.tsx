// components/service-packages-section.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Wallet, FileText, PiggyBank } from "lucide-react";
import Link from "next/link";
import { servicePackages } from "@/lib/data";
import SectionWrapper from "./SectionWrapper";
import InquirySheet from "./InquirySheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicePackagesSection() {
  const packages = servicePackages;

  return (
    <SectionWrapper
      id="service-packages-section"
      title="Vyberte si balíček, který podpoří váš růst."
      subtitle="Nabízím transparentní balíčky služeb, které jsou navrženy tak, aby vyhovovaly různým potřebám a rozpočtům podnikatelů na Vysočině."
      className="bg-white dark:bg-gray-900"
    >
      {/* Sekce 'Transparentní cenotvorba' nahoře a v záložkách */}
      <div className="mb-24 max-w-4xl mx-auto">
        <Tabs defaultValue="included" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="included">Co je vždy v ceně?</TabsTrigger>
            <TabsTrigger value="extras">Na co se připravit?</TabsTrigger>
          </TabsList>
          
          <TabsContent value="included">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle /> Vždy zahrnuto v ceně
                </CardTitle>
                <CardDescription>
                  Tyto položky jsou základem každého projektu a jsou již započítány v ceně balíčků.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Úvodní konzultace a analýza** vašich potřeb a cílů.</span></li>
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Responzivní design**, který skvěle vypadá na všech zařízeních.</span></li>
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Základní on-page SEO**, aby vás vyhledávače našly.</span></li>
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Nasazení webu** na vaši doménu a doporučený hosting.</span></li>
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Školení pro obsluhu webu**, abyste si mohli sami snadno upravovat obsah.</span></li>
                   <li className="flex items-start gap-3"><CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" /><span>**Technická záruka 30 dní** po spuštění pro případné doladění.</span></li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extras">
             <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <XCircle /> Na co se připravit?
                </CardTitle>
                <CardDescription>
                  Položky a služby, které nejsou součástí ceny balíčků, a jak probíhá platba.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4" />Služby nad rámec balíčků</h4>
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 pl-4">
                      <li className="flex items-start gap-3"><XCircle className="h-4 w-4 text-red-500 mt-1 shrink-0" /><span>**Hosting a doména** – roční poplatky třetím stranám (rád s výběrem a nákupem pomohu).</span></li>
                      <li className="flex items-start gap-3"><XCircle className="h-4 w-4 text-red-500 mt-1 shrink-0" /><span>**Tvorba obsahu** – psaní textů, grafika či focení (nabízeno v rámci balíčku <a href="#maintenance-section" className="font-bold underline hover:text-purple-500">Strategické Partnerství</a>).</span></li>
                      <li className="flex items-start gap-3"><XCircle className="h-4 w-4 text-red-500 mt-1 shrink-0" /><span>**Licence prémiových pluginů**, pokud je projekt vyžaduje pro specifické funkce.</span></li>
                      <li className="flex items-start gap-3"><XCircle className="h-4 w-4 text-red-500 mt-1 shrink-0" /><span>**Dlouhodobá správa a údržba** (viz. <a href="#maintenance-section" className="font-bold underline hover:text-blue-500">balíčky správy</a>).</span></li>
                    </ul>
                 </div>
                 <div className="border-t pt-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><PiggyBank className="h-4 w-4" />Proces platby</h4>
                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Spolupráce je založena na férovém a jednoduchém platebním modelu, který zajišťuje jistotu pro obě strany.</p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg font-medium">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ZDE JE OBNOVENÝ A KOMPLETNÍ KÓD PRO VÝPIS BALÍČKŮ */}
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
    </SectionWrapper>
  );
}