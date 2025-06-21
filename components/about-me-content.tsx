import Image from "next/image"
import { GraduationCap, Briefcase, Code, Lightbulb } from "lucide-react"

export default function AboutMeContent() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Můj příběh: Od ekonoma k developerovi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Věřím, že úspěšný web je víc než jen kód a design. Je to strategický nástroj, který rozumí vašemu byznysu a
            pomáhá mu růst.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <GraduationCap className="h-8 w-8 text-black dark:text-gray-50 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Ekonomické základy</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Moje cesta začala magisterským studiem ekonomie a státní správy. Zde jsem získal hluboké porozumění
                  pro fungování trhů, finanční analýzu a strategické plánování. Diplomová práce na téma regionálního
                  rozvoje mi navíc dala unikátní pohled na specifika podnikání v Kraji Vysočina.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Briefcase className="h-8 w-8 text-black dark:text-gray-50 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Praxe v řízení prodeje</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Zkušenosti s řízením implementace prodejních systémů ve 24 regionech mi ukázaly, jak klíčové je
                  propojit obchodní cíle s technologickými řešeními. Naučil jsem se, jak efektivně analyzovat data,
                  identifikovat klíčové ukazatele výkonnosti (KPIs) a optimalizovat procesy pro maximální ziskovost.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Code className="h-8 w-8 text-black dark:text-gray-50 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Vášeň pro webdevelopment</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Postupně jsem objevil vášeň pro webdevelopment. Získal jsem certifikace a praxi v moderních
                  technologiích jako Next.js, React, Tailwind CSS a Shadcn/ui. Tato kombinace mi umožňuje nejen
                  navrhovat, ale i technicky precizně realizovat weby, které jsou robustní, škálovatelné a plní
                  stanovené obchodní cíle.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Lightbulb className="h-8 w-8 text-black dark:text-gray-50 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Můj unikátní přístup</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Mým cílem je zaplnit mezeru na trhu na Vysočině. Nenabízím jen "hezký web", ale strategické
                  partnerství. Každý projekt začíná hloubkovou analýzou vašeho byznysu, abychom zajistili, že váš web
                  bude skutečně generovat poptávky, zvyšovat prodeje a přinášet měřitelnou návratnost investice.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=600&width=600"
              width={600}
              height={600}
              alt="Profesionální portrét web developera a ekonoma"
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Certifikáty a diplomy</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-8">
            Zde naleznete skeny mých diplomů a certifikátů, které dokládají mé vzdělání a odborné znalosti.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Image
              src="/placeholder.svg?height=200&width=300"
              width={300}
              height={200}
              alt="Sken diplomu 1"
              className="rounded-lg object-cover shadow-md"
            />
            <Image
              src="/placeholder.svg?height=200&width=300"
              width={300}
              height={200}
              alt="Sken certifikátu 1"
              className="rounded-lg object-cover shadow-md"
            />
            <Image
              src="/placeholder.svg?height=200&width=300"
              width={300}
              height={200}
              alt="Sken diplomu 2"
              className="rounded-lg object-cover shadow-md"
            />
            <Image
              src="/placeholder.svg?height=200&width=300"
              width={300}
              height={200}
              alt="Sken certifikátu 2"
              className="rounded-lg object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
