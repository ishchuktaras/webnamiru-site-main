import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Web na míru nám pomohl transformovat naši online prezentaci. Díky strategickému přístupu Tarase máme nyní web, který skutečně generuje poptávky a posiluje naši značku na Vysočině.",
      author: "Jan Novák",
      title: "Majitel, Strojírna Novák",
    },
    {
      quote:
        "Byla jsem ohromena, jak Taras dokázal propojit mé obchodní cíle s technickým řešením. Náš nový web je nejen krásný, ale hlavně funkční a přináší nám nové klienty.",
      author: "Eva Svobodová",
      title: "Majitelka, Kosmetický salon Eva",
    },
    {
      quote:
        "Potřebovali jsme e-shop pro naše lokální produkty a Web na míru to zvládl perfektně. Oceňuji individuální přístup a pochopení pro naše specifické potřeby.",
      author: "Petr Dvořák",
      title: "Farmář, Farma Zelený Kopec",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Co říkají moji klienti</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Spokojenost klientů je pro mě prioritou. Zde jsou některé ohlasy od firem, kterým jsem pomohl růst.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col p-6 shadow-md dark:bg-gray-900">
              <CardContent className="flex-grow">
                <Quote className="h-8 w-8 text-gray-400 dark:text-gray-600 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-0">
                <CardTitle className="text-lg font-bold text-black dark:text-gray-50">{testimonial.author}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
