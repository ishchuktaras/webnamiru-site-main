// components/partners-packages-section.tsx

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
import {
  CheckCircle,
  Camera,
  TrendingUp,
  Users,
  Handshake,
  Star,
  Workflow,
  CircleDollarSign,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "./SectionWrapper"; // Import našeho wrapperu
import InquirySheet from "./InquirySheet";   // Import pro vysouvací formulář

export default function PartnersPackagesSection() {
  // ZMĚNA: Odstraněna logika pro animaci (useState, useEffect)

  const partnerPackages = [
    {
      name: "KREATIVNÍ PARTNER",
      profession: "Fotografové & Designéři",
      commission: "15-25%",
      description:
        "Ideální pro fotografy a grafické designéry, kteří chtějí rozšířit své služby o webové řešení pro své klienty.",
      benefits: [
        "Provize 15-25% z každého projektu",
        "Kompletní technická podpora",
        "Brandované materiály s vaším logem",
        "Školení o webových technologiích",
        "Prioritní komunikace a rychlé dodání",
        "Možnost spolupráce na designu",
        "Referenční portfolio pro vaše klienty",
      ],
      icon: Camera,
      popular: true,
    },
    {
      name: "MARKETING EXPERT",
      profession: "Marketologové & Konzultanti",
      commission: "20-30%",
      description:
        "Pro marketingové specialisty a business konzultanty, kteří chtějí nabídnout komplexní digitální řešení.",
      benefits: [
        "Provize 20-30% z každého projektu",
        "Společné strategické plánování",
        "Přístup k analytickým nástrojům",
        "Konzultace SEO a obsahové strategie",
        "Možnost vedení klientských workshopů",
        "Brandované reporty a prezentace",
        "Dlouhodobé partnerství na projektech",
      ],
      icon: TrendingUp,
      popular: false,
    },
    {
      name: "PROJEKTOVÝ LÍDR",
      profession: "Project Manageři & Agentury",
      commission: "Individuální",
      description:
        "Pro zkušené project managery a menší agentury, které chtějí outsourcovat webový vývoj a soustředit se na řízení.",
      benefits: [
        "Flexibilní provizní model nebo fixní ceny",
        "Kompletní projektové řízení z naší strany",
        "White-label řešení pod vaší značkou",
        "Pravidelné reporty a komunikace s klienty",
        "Možnost spoluřízení větších projektů",
        "Prioritní kapacita pro vaše projekty",
        "Dlouhodobé strategické partnerství",
      ],
      icon: Users,
      popular: false,
    },
  ];

  return (
    <SectionWrapper
      dataSection="partners-packages-section"
      badgeText="Partnerské příležitosti"
      title="Staňte se mým obchodním partnerem"
      subtitle="Hledám kreativní profesionály, kteří chtějí rozšířit své služby o webová řešení. Nabízím výhodné podmínky spolupráce a dlouhodobé partnerství."
      className="bg-gray-50 dark:bg-gray-800"
    >
      {/* Unikátní obsah sekce */}
      <div className="mx-auto grid max-w-6xl items-stretch gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {partnerPackages.map((pkg, index) => {
          const IconComponent = pkg.icon;
          return (
            <div key={index}>
              <Card
                className={`flex flex-col h-full p-6 shadow-custom-lg transition-all duration-300 hover:shadow-custom-xl hover:scale-105 dark:bg-gray-950 relative ${
                  pkg.popular ? "border-2 border-blue-500 dark:border-blue-400" : "border-transparent"
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Nejžádanější
                  </Badge>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${pkg.popular ? "bg-blue-100 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}>
                      <IconComponent className={`h-6 w-6 ${pkg.popular ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-black dark:text-gray-50">{pkg.name}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pkg.profession}</p>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">{pkg.description}</CardDescription>
                  <div className="flex items-baseline gap-2 mt-4">
                    <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{pkg.commission}</p>
                    <p className="text-sm text-gray-500">provize</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="mt-auto pt-6">
                   {/* ZMĚNA: Tlačítko nyní otevírá boční panel pomocí InquirySheet */}
                   <InquirySheet
                    title={`Poptávka partnerství: ${pkg.name}`}
                    description="Skvělá volba! Zanechte mi prosím kontakt a já se vám ozvu, abychom probrali detaily naší budoucí spolupráce."
                    serviceInfo={`Partnerská spolupráce - balíček ${pkg.name}`}
                    trigger={
                      <Button className="w-full inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium text-white shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group">
                        {pkg.commission === "Individuální" ? "Domluvit spolupráci" : "Začít spolupráci"}
                      </Button>
                    }
                  />
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="mt-24 max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-12">
            <h3 className="text-3xl font-bold tracking-tighter">Zásady a podmínky férové spolupráce</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                Kladu důraz na transparentnost, důvěru a oboustranně výhodné vztahy. Zde jsou klíčové principy našeho partnerství.
            </p>
        </div>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {/* Zde je kompletní obsah akordeonu s podmínkami */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><Workflow className="h-5 w-5 text-blue-600"/><span>Jak to celé funguje? (Proces spolupráce)</span></div></AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2"><ol className="list-decimal list-inside space-y-2"><li>**Spojení:** Kontaktujete mě s vaší představou o partnerství.</li><li>**Dohoda:** Společně probereme detaily, odsouhlasíme si výši provize a podmínky.</li><li>**Doporučení:** Předáte mi kontakt na klienta, který má zájem o webové služby.</li><li>**Komunikace:** Převezmu veškerou komunikaci s klientem ohledně technických detailů a realizace projektu. Vás budu průběžně informovat o stavu.</li><li>**Realizace:** Postarám se o kompletní vývoj webu od A do Z v té nejvyšší kvalitě.</li><li>**Fakturace a provize:** Po dokončení projektu a úhradě od klienta vám vyplatím sjednanou provizi.</li></ol></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><CircleDollarSign className="h-5 w-5 text-green-600"/><span>Výplata provizí</span></div></AccordionTrigger>
            <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2">Provize je splatná po **plném uhrazení finální faktury** doporučeným klientem. Následně vás vyzvu k vystavení faktury na dohodnutou částku s obvyklou splatností 14 dní. Vše probíhá plně transparentně.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
             <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><Users className="h-5 w-5 text-gray-600"/><span>Role a zodpovědnosti</span></div></AccordionTrigger>
             <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2"><p className="mb-2"><strong>Vaše role (partnera):</strong> Zajištění prvotního kontaktu s klientem, představení mých služeb a předání kontaktu. Očekává se, že klient je srozuměn s tím, že web bude realizován mnou.</p><p><strong>Moje role (webnamíru.site):</strong> Kompletní převzetí zodpovědnosti za projekt – od komunikace s klientem, přes návrh, vývoj, testování až po finální spuštění a následnou podporu.</p></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
             <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-yellow-600"/><span>Záruky a kvalita</span></div></AccordionTrigger>
             <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2">Zavazuji se, že každý vámi doporučený klient obdrží stejnou, ne-li vyšší, úroveň péče, kvality a profesionality jako moji přímí klienti. Vaše dobré jméno je pro mě stejně důležité jako to mé. Všichni klienti mají nárok na standardní 30denní záruku na technickou funkčnost webu.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
             <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><Megaphone className="h-5 w-5 text-indigo-600"/><span>Společný marketing a reference</span></div></AccordionTrigger>
             <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2">U úspěšných projektů se rád dohodnu na společné případové studii. Po dohodě vás mohu uvést jako partnera na svém webu v sekci referencí, což může přinést další obchodní příležitosti i vám.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
             <AccordionTrigger className="text-lg text-left hover:no-underline"><div className="flex items-center gap-3"><Handshake className="h-5 w-5 text-purple-600"/><span>Exkluzivita a etika</span></div></AccordionTrigger>
             <AccordionContent className="text-base text-gray-700 dark:text-gray-300 pt-2">Partnerství je **zcela neexkluzivní**. Můžete spolupracovat s kýmkoliv dalším. Klíčová je pro mě etika a jednání v nejlepším zájmu klienta. Nikdy nebudu tlačit na prodej služeb, které klient nepotřebuje.</AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
    </SectionWrapper>
  );
}