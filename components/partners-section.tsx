import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" // Přidáno Card, CardContent, CardHeader, CardTitle
import Link from "next/link" // Přidáno pro odkaz na kontakt

export default function PartnersSection() {
  const partnerLogos = [
    {
      name: "Partner 1",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%201",
      alt: "Logo Partnera 1",
    },
    {
      name: "Partner 2",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%202",
      alt: "Logo Partnera 2",
    },
    {
      name: "Partner 3",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%203",
      alt: "Logo Partnera 3",
    },
    {
      name: "Partner 4",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%204",
      alt: "Logo Partnera 4",
    },
    {
      name: "Partner 5",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%205",
      alt: "Logo Partnera 5",
    },
    {
      name: "Partner 6",
      src: "/placeholder.svg?height=80&width=160&text=Logo%20Partnera%206",
      alt: "Logo Partnera 6",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Důvěřují mi spokojení klienti a partneři
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Spolupracuji s firmami a organizacemi, které oceňují strategický přístup a měřitelné výsledky.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center justify-center gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center p-4">
              <Image
                src={logo.src || "/placeholder.svg"}
                width={160}
                height={80}
                alt={logo.alt}
                className="object-contain h-20 w-40 grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
          {/* Nová karta s výzvou k akci */}
          <Card className="flex flex-col items-center justify-center text-center p-6 shadow-md dark:bg-gray-950 border-2 border-dashed border-gray-300 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-black dark:text-gray-50">Chcete být zde?</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center items-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Přidejte se k našim spokojeným klientům a partnerům.
              </p>
              <Link href="#contact-form" passHref>
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300">
                  Kontaktujte nás
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
