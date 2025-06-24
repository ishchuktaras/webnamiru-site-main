"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Camera, Palette, TrendingUp, Users, Handshake, Star } from "lucide-react"
import Link from "next/link"

export default function PartnersPackagesSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

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
      idealFor: "Svatební fotografové, produktoví fotografové, grafici, designéři loga a identity.",
      icon: Camera,
      popular: true,
      timeline: "Start do 48 hodin",
      support: "Dedikovaný partner manager",
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
      idealFor: "Digitální marketéři, SEO specialisté, business konzultanti, social media manageři.",
      icon: TrendingUp,
      popular: false,
      timeline: "Onboarding do 1 týdne",
      support: "Strategické konzultace",
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
      idealFor: "Freelance PM, malé digitální agentury, konzultační firmy, business developeři.",
      icon: Users,
      popular: false,
      timeline: "Individuální dohoda",
      support: "Strategické partnerství",
    },
  ]

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800 transition-opacity duration-1000 ${isMounted ? "mounted" : "opacity-0"}`}
      data-section="partners-packages-section"
    >
      <div className="container px-4 md:px-6">
        <div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-animate-item
        >
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Handshake className="h-8 w-8 text-blue-600" />
              <Badge variant="outline" className="text-sm px-3 py-1">
                Partnerské příležitosti
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Staňte se mým obchodním partnerem
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hledám kreativní profesionály, kteří chtějí rozšířit své služby o webová řešení. Nabízím výhodné podmínky
              spolupráce a dlouhodobé partnerství.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {partnerPackages.map((pkg, index) => {
            const IconComponent = pkg.icon
            return (
              <div
                key={index}
                data-animate-item
                style={{ transitionDelay: `${150 + index * 150}ms` }}
              >
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
                      <div
                        className={`p-2 rounded-lg ${pkg.popular ? "bg-blue-100 dark:bg-blue-900/20" : "bg-gray-100 dark:bg-gray-800"}`}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${pkg.popular ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                        />
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
                    <Button
                      className={`w-full inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 ${
                        pkg.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-black text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
                      }`}
                      asChild
                    >
                      <Link href="/kontakt?type=partnership">
                        {pkg.commission === "Individuální" ? "Domluvit spolupráci" : "Začít spolupráci"}
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
