"use client"

import { useEffect, useState } from "react"
import { Brain, Code, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SolutionSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Spustí animaci po načtení komponenty
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section 
      className={`w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950 transition-opacity duration-1000 ${isMounted ? "mounted" : "opacity-0"}`} 
      data-section="solution-section"
    >
      <div className="container px-4 md:px-6">
        <div 
          className="flex flex-col items-center justify-center space-y-4 text-center"
          data-animate-item
        >
          <Badge variant="outline" className="mb-4">
            Unikátní přístup
          </Badge>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Nenabízím jen kód a design.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nabízím strategické partnerství.
              </span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Můj přístup kombinuje hluboké ekonomické znalosti s precizními vývojářskými dovednostmi, aby Váš web
              skutečně fungoval pro Váš byznys.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          <div data-animate-item style={{ transitionDelay: '150ms' }}>
            <Card className="group relative overflow-hidden border-0 bg-white p-6 shadow-custom-lg transition-all duration-300 hover:shadow-custom-xl hover:-translate-y-2 dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 dark:from-blue-950/20 dark:to-indigo-950/20" />
              <CardHeader className="relative flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-bold">Ekonom</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  Magistr ekonomie
                </Badge>
              </CardHeader>
              <CardContent className="relative space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Díky magisterskému vzdělání v ekonomii a státní správě rozumím vašim cílům, trhu a financím. Každý
                  projekt začíná analýzou a definicí klíčových ukazatelů výkonnosti (KPIs).
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    Zkušenost: Implementace systému automatizace prodeje ve 24 regionech
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div data-animate-item style={{ transitionDelay: '300ms' }}>
            <Card className="group relative overflow-hidden border-0 bg-white p-6 shadow-custom-lg transition-all duration-300 hover:shadow-custom-xl hover:-translate-y-2 dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 dark:from-purple-950/20 dark:to-pink-950/20" />
              <CardHeader className="relative flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                  <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl font-bold">Developer</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  Full-stack
                </Badge>
              </CardHeader>
              <CardContent className="relative space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Díky certifikaci a praxi webdevelopera dokážu tuto strategii přetavit do technicky precizního a
                  funkčního webu, který plní stanovené cíle.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Tech stack: Next.js, React, Tailwind CSS, Shadcn/ui, Node.js</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Propojovací prvek */}
        <div className="flex justify-center" data-animate-item style={{ transitionDelay: '450ms' }}>
          <div className="flex items-center gap-4 rounded-full bg-white px-6 py-3 shadow-md dark:bg-gray-800">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              = Strategické webové řešení pro váš růst
            </span>
            <div className="h-2 w-2 rounded-full bg-purple-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
