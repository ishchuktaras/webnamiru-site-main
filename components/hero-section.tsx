import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Weby, které vydělávají.
          </h1>
          <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto lg:mx-0">
            Přestaňte utrácet za online vizitky. Investujte do webu, který se stane motorem vašeho růstu v Kraji
            Vysočina.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
            <Button className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300">
              Chci zjistit potenciál svého webu
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/placeholder.svg?height=500&width=500"
            width={500}
            height={500}
            alt="Profesionální fotografie ekonoma diskutujícího grafy s klientem"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  )
}
