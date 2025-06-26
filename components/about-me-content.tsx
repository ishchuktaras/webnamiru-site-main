"use client"

import Image from "next/image"
import { GraduationCap, Briefcase, Code, Lightbulb, MapPin, Calendar, Target, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

// Definice certifikátů
const certificates = [
  {
    id: 1,
    title: "Diplom - Státní správa",
    type: "Vysokoškolský diplom",
    image: "/images/certificates/statni-sluzba-diploma.png",
    description: "Státní správa a regionální rozvoj",
  },
  {
    id: 2,
    title: "Příloha k diplomu",
    type: "Vysokoškolský diplom",
    image: "/images/certificates/statni-sluzba-priloha.png",
    description: "Detaily studia a specializace",
  },
  {
    id: 3,
    title: "IT Step Academy",
    type: "Technická certifikace",
    image: "/images/certificates/it-step-academy-certificate.jpg",
    description: "Programování a webdevelopment",
  },
  {
    id: 4,
    title: "Jazykový certifikát",
    type: "Jazyková certifikace",
    image: "/images/certificates/language-certificate.jpg",
    description: "Pokročilá znalost cizího jazyka",
  },
]

export default function AboutMeContent() {
  // useState je nyní správně uvnitř komponenty
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/ui",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Vercel",
    "Git",
  ]

  const achievements = [
    { icon: Users, title: "24 regionů", description: "Řízení implementace prodejních systémů" },
    { icon: TrendingUp, title: "Ekonomické vzdělání", description: "Magisterský titul v ekonomii a státní správa" },
    { icon: Code, title: "Modern Stack", description: "Certifikace v moderních web technologiích" },
    { icon: MapPin, title: "Kraj Vysočina", description: "Specializace na regionální rozvoj" },
  ]

  const handleImageError = (certId: number) => {
    setImageErrors((prev) => new Set([...prev, certId]))
  }

  const openLightbox = (certId: number) => {
    setSelectedImage(certId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = certificates.findIndex((cert) => cert.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : certificates.length - 1
    } else {
      newIndex = currentIndex < certificates.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(certificates[newIndex].id)
  }

  const selectedCert = certificates.find((cert) => cert.id === selectedImage)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Hero sekce */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <Badge variant="outline" className="mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            Kraj Vysočina
          </Badge>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Můj příběh: Od ekonoma k developerovi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Věřím, že úspěšný web je víc než jen kód a design. Je to strategický nástroj, který rozumí vašemu byznysu a
            pomáhá mu růst. Kombinuji ekonomické vzdělání s moderními technologiemi.
          </p>
        </div>

        {/* Hlavní obsah */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Levá strana - příběh */}
          <div className="space-y-8">
            <div className="space-y-8">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Ekonomické základy</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Moje cesta začala magisterským studiem ekonomie a státní správy. Zde jsem získal hluboké
                        porozumění pro fungování trhů, finanční analýzu a strategické plánování. Diplomová práce na téma
                        regionálního rozvoje mi navíc dala unikátní pohled na specifika podnikání v Kraji Vysočina.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Praxe v řízení prodeje</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Zkušenosti s řízením implementace prodejních systémů ve 24 regionech mi ukázaly, jak klíčové je
                        propojit obchodní cíle s technologickými řešeními. Naučil jsem se, jak efektivně analyzovat
                        data, identifikovat klíčové ukazatele výkonnosti (KPIs) a optimalizovat procesy pro maximální
                        ziskovost.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                      <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Vášeň pro webdevelopment</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Postupně jsem objevil vášeň pro webdevelopment. Získal jsem certifikace a praxi v moderních
                        technologiích jako Next.js, React, Tailwind CSS a Shadcn/ui. Tato kombinace mi umožňuje nejen
                        navrhovat, ale i technicky precizně realizovat weby, které jsou robustní, škálovatelné a plní
                        stanovené obchodní cíle.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                      <Lightbulb className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Můj unikátní přístup</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Mým cílem je zaplnit mezeru na trhu na Vysočině. Nenabízím jen "hezký web", ale strategické
                        partnerství. Každý projekt začíná hloubkovou analýzou vašeho byznysu, abychom zajistili, že váš
                        web bude skutečně generovat poptávky, zvyšovat prodeje a přinášet měřitelnou návratnost
                        investice.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pravá strana - obrázek a statistiky */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src="/images/zakladatel.jpg"
                width={600}
                height={600}
                alt="Profesionální portrét web developera a ekonoma"
                className="rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">5+ let zkušeností</span>
                </div>
              </div>
            </div>

            {/* Klíčové achievementy */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-md transition-all duration-300">
                  <CardContent className="p-0">
                    <achievement.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Technické dovednosti */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Technické dovednosti</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Moderní technologie, které používám pro vytváření výkonných a škálovatelných webových aplikací.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certifikáty a diplomy */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Certifikáty a diplomy</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Zde naleznete skeny mých diplomů a certifikátů, které dokládají mé vzdělání a odborné znalosti.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative group cursor-pointer" onClick={() => openLightbox(cert.id)}>
                    <Image
                      src={
                        imageErrors.has(cert.id)
                          ? `/placeholder.svg?height=200&width=300&query=${cert.title}`
                          : cert.image
                      }
                      width={300}
                      height={200}
                      alt={cert.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(cert.id)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{cert.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{cert.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {cert.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA sekce */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 md:p-12">
          <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Připraven na váš projekt?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Spojme síly a vytvořme web, který bude skutečně pracovat pro váš byznys. Začněme nezávaznou konzultací o
            vašich cílech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Link href="/kontakt">Nezávazná konzultace</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pripadove-studie">Prohlédnout portfolio</Link>
            </Button>
          </div>
        </div>
        {/* Lightbox Dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
            <DialogHeader className="absolute top-4 left-4 z-10">
              <DialogTitle className="text-white text-lg">{selectedCert?.title}</DialogTitle>
            </DialogHeader>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Main image */}
            <div className="flex items-center justify-center min-h-[80vh] p-8">
              {selectedCert && (
                <div className="relative max-w-full max-h-full">
                  <Image
                    src={
                      imageErrors.has(selectedCert.id)
                        ? `/placeholder.svg?height=600&width=800&query=${selectedCert.title}`
                        : selectedCert.image
                    }
                    width={800}
                    height={600}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                    onError={() => handleImageError(selectedCert.id)}
                  />
                </div>
              )}
            </div>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 rounded-lg p-4 text-white">
              <h3 className="font-semibold text-lg">{selectedCert?.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{selectedCert?.description}</p>
              <Badge variant="secondary" className="mt-2">
                {selectedCert?.type}
              </Badge>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
