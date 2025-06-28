// components/case-studies-section.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Instagram, MapPin } from "lucide-react";
import Link from "next/link";
import InquirySheet from "./InquirySheet";
import SectionWrapper from "./SectionWrapper"; // Import wrapperu
import { caseStudies } from "@/lib/data";   // Import dat

export default function CaseStudiesSection() {
  return (
    <SectionWrapper
      id="case-studies-section"
      badgeText="Úspěšné projekty"
      title={<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Místo prázdných slov, měřitelné výsledky</span>}
      subtitle="Podívejte se na konkrétní příklady, jak mé strategické weby pomohly klientům na Vysočině dosáhnout jejich obchodních cílů."
      className="bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"
    >
      {/* Unikátní obsah sekce */}
      <div className="grid grid-cols-3 gap-8 mb-16 -mt-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
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

      <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {caseStudies.map((study, index) => {
          const IconComponent = study.icon;
          return (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-900"
            >
              <div className={`h-2 bg-gradient-to-r ${study.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <Badge variant="secondary" className="text-xs">{study.category}</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {study.client}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{study.subtitle}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {study.location && (<div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{study.location}</div>)}
                      {study.instagram && (<div className="flex items-center gap-1"><Instagram className="h-3 w-3" />{study.instagram}</div>)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">🎯 Výzva</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">💡 Řešení</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">🛠️ Technologie</h4>
                  <div className="flex flex-wrap gap-1">
                    {study.technologies.map((tech, techIndex) => (<Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">{tech}</Badge>))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">📈 Výsledky</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {study.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-xs text-gray-600 dark:text-gray-400">{metric.label}</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">🎉 {study.result}</p>
                </div>
                <Button className={`w-full bg-gradient-to-r ${study.color} hover:shadow-lg transition-all duration-300 text-white border-0 group-hover:scale-105`} asChild>
                  <Link href={study.link}>
                    Zobrazit detaily projektu
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-16">
        <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chcete podobné výsledky pro svůj projekt?</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">Pojďme společně vytvořit web, který skutečně funguje pro váš byznys.</p>
          <InquirySheet
              title="Nezávazná konzultace"
              description="Zanechte mi kontakt a já se vám ozvu, abychom probrali, jak mohu pomoci vašemu projektu růst."
              serviceInfo="Obecná poptávka (z Případových studií)"
              trigger={
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                      Nezávazná konzultace
                      <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
              }
          />
        </div>
      </div>
    </SectionWrapper>
  );
}