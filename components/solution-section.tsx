import { Brain, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolutionSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Nenabízím jen kód a design. Nabízím strategické partnerství.
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Můj přístup kombinuje hluboké ekonomické znalosti s precizními vývojářskými dovednostmi, aby Váš web
              skutečně fungoval pro Váš byznys.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-900">
            <CardHeader>
              <Brain className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-2xl font-bold">Ekonom</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Díky magisterskému vzdělání v ekonomii a státní správě rozumím vašim cílům, trhu a financím. Každý projekt
              začíná analýzou a definicí klíčových ukazatelů výkonnosti (KPIs). Tento přístup jsem uplatnil při řízení
              implementace systému automatizace prodeje ve 24 regionech.
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-md dark:bg-gray-900">
            <CardHeader>
              <Code className="h-12 w-12 text-black dark:text-gray-50" />
              <CardTitle className="mt-4 text-2xl font-bold">Developer</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-500 dark:text-gray-400">
              Díky certifikaci a praxi webdevelopera dokážu tuto strategii přetavit do technicky precizního a funkčního
              webu, který plní stanovené cíle. Využívám moderní technologie jako Next.js, React, Tailwind CSS a
              Shadcn/ui pro robustní a škálovatelné řešení.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
