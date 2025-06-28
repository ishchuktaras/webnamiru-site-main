// components/MaintenancePackagesSection.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import InquirySheet from "./InquirySheet";

export default function MaintenancePackagesSection() {
  return (
    <SectionWrapper
      id="maintenance-section"
      badgeText="Dlouhodobé partnerství"
      title="Spuštěním webu to nekončí, ale začíná."
      subtitle="Váš web je jako auto – potřebuje pravidelnou péči, aby byl stále rychlý, bezpečný a plný nového obsahu. Nabízím vám klid a jistotu díky profesionální správě."
      className="bg-gray-50 dark:bg-gray-800"
    >
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 py-12 lg:grid-cols-3 lg:gap-8">
        
        {/* Balíček 1: Základní péče */}
        <Card className="flex flex-col p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:bg-gray-900 border-t-4 border-t-green-500">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl font-bold">Základní Péče</CardTitle>
            </div>
            <p className="text-3xl font-extrabold">990 Kč <span className="text-lg font-normal text-gray-500">/ měsíc</span></p>
            <CardDescription className="mt-2 h-12">Pro weby, které potřebují hlavně jistotu, že vše poběží, jak má.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Pravidelné zálohování (týdenní)</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Aktualizace systému a pluginů</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Bezpečnostní monitoring</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Měsíční report o stavu webu</span></li>
            </ul>
          </CardContent>
          <div className="mt-auto pt-6">
            <InquirySheet
              title="Poptávka: Základní Péče"
              description="Skvělá volba pro zajištění bezpečnosti a stability vašeho webu. Zanechte mi kontakt a já se vám ozvu."
              serviceInfo="Správa - balíček Základní Péče"
              trigger={<Button className="w-full" variant="outline">Zvolit balíček</Button>}
            />
          </div>
        </Card>

        {/* Balíček 2: Optimální provoz - Zvýrazněný */}
        <Card className="flex flex-col p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-950 border-2 border-blue-500 relative">
           <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1">Doporučeno</Badge>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-8 w-8 text-blue-500" />
              <CardTitle className="text-2xl font-bold">Optimální Provoz</CardTitle>
            </div>
            <p className="text-3xl font-extrabold">1 990 Kč <span className="text-lg font-normal text-gray-500">/ měsíc</span></p>
            <CardDescription className="mt-2 h-12">Nejlepší volba pro aktivní weby, které potřebují občasné úpravy a podporu.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 font-bold text-blue-600 dark:text-blue-400"><CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" /><span>Vše z balíčku Základní Péče</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>**2 hodiny práce měsíčně** na drobné úpravy, konzultace, atd.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Prioritní e-mailová podpora</span></li>
            </ul>
          </CardContent>
          <div className="mt-auto pt-6">
            <InquirySheet
              title="Poptávka: Optimální Provoz"
              description="Perfektní volba pro rozvoj vašeho webu. Zanechte mi kontakt a já se vám ozvu pro domluvení detailů."
              serviceInfo="Správa - balíček Optimální Provoz"
              trigger={<Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Zvolit balíček</Button>}
            />
          </div>
        </Card>

        {/* Prémiový balíček */}
        <Card className="flex flex-col p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:bg-gray-900 border-t-4 border-t-purple-500">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <HeartHandshake className="h-8 w-8 text-purple-500" />
              <CardTitle className="text-2xl font-bold">Strategické Partnerství</CardTitle>
            </div>
            <p className="text-3xl font-extrabold">od 4 990 Kč <span className="text-lg font-normal text-gray-500">/ měsíc</span></p>
            <CardDescription className="mt-2 h-12">Kompletní servis pro firmy, které chtějí kontinuálně růst a aktivně pracovat s obsahem.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 font-bold text-purple-600 dark:text-purple-400"><CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" /><span>Vše z balíčku Optimální Provoz</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>**Pravidelná tvorba obsahu** (např. blogové články)</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>**Tvorba nových stránek** a landing pages</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Pokročilá SEO optimalizace obsahu</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /><span>Pravidelné strategické konzultace a reporting</span></li>
            </ul>
          </CardContent>
          <div className="mt-auto pt-6">
             <InquirySheet
              title="Poptávka: Strategické Partnerství"
              description="Pojďme společně plánovat váš online růst. Zanechte mi kontakt a domluvíme si strategickou konzultaci."
              serviceInfo="Správa - balíček Strategické Partnerství"
              trigger={<Button className="w-full" variant="outline">Domluvit detaily</Button>}
            />
          </div>
        </Card>
      </div>
      
      {/* ZDE JE OPRAVENÁ SEKCE S HODINOVOU SAZBOU */}
      <div className="mt-12 max-w-lg mx-auto">
        <Card className="flex flex-col md:flex-row items-center p-6 shadow-lg dark:bg-gray-900">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <Clock className="h-12 w-12 text-gray-500" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold">Potřebujete jen jednorázovou pomoc?</h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Pro klienty bez paušálu nabízím práce v hodinové sazbě **1 200 Kč / hodina**.</p>
            {/* InquirySheet nyní obaluje POUZE tlačítko */}
            <InquirySheet
                title="Poptávka jednorázových prací"
                description="Potřebujete jednorázovou úpravu nebo konzultaci? Zanechte mi zprávu a já se vám ozvu s odhadem."
                serviceInfo="Jednorázový úkon / Hodinová sazba"
                trigger={
                    <Button className="mt-4" size="sm">
                        Nezávazně poptat
                    </Button>
                }
            />
          </div>
        </Card>
      </div>

      <div className="mt-24 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold tracking-tighter mb-8">Proč je pravidelná údržba klíčová?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="space-y-2">
                  <h4 className="font-semibold">🛡️ Bezpečnost</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pravidelné aktualizace a monitoring chrání váš web před hackery a malwarem, které by mohly poškodit vaši reputaci.</p>
              </div>
              <div className="space-y-2">
                  <h4 className="font-semibold">⚡ Rychlost</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Optimalizace a čištění databáze zajišťují, že váš web bude stále rychlý, což milují jak uživatelé, tak vyhledávače.</p>
              </div>
               <div className="space-y-2">
                  <h4 className="font-semibold">❤️ Váš klid</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">S vědomím, že je o váš web postaráno, se můžete plně soustředit na to nejdůležitější – na váš byznys.</p>
              </div>
          </div>
      </div>
    </SectionWrapper>
  );
}