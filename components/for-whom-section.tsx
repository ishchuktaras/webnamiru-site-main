import { Factory, Utensils, Sprout, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForWhomSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pomáhám firmám na Vysočině růst.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Můj strategický přístup je šitý na míru specifickým potřebám různých podnikatelských segmentů v Kraji
              Vysočina.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-950">
            <CardHeader>
              <Factory className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-xl font-bold">Výrobní SME a Řemeslníci</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Potřebujete více B2B poptávek a prorazit v exportu? Vím, jak prezentovat technickou firmu a oslovit
              správné partnery.
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-950">
            <CardHeader>
              <Utensils className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-xl font-bold">Poskytovatelé Služeb</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Chcete plný rezervační kalendář a porazit online konkurenci v Jihlavě či Telči? Pomohu Vám optimalizovat
              online přítomnost.
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-950">
            <CardHeader>
              <Sprout className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-xl font-bold">Místní Producenti a Farmáři</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Chcete prodávat své poctivé výrobky online a vyprávět svůj příběh? Pomůžu vám vybudovat silnou značku a
              e-shop.
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-950">
            <CardHeader>
              <Globe className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-xl font-bold">Podnikatelé-cizinci</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Потрібен веб-сайт для вашого бізнесу на Височині? Пропоную повний сервіс вашою рідною мовою a usnadním
              integraci.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
