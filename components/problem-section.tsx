export default function ProblemSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Má Váš web stejný problém jako 90 % firem na Vysočině?
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Mnoho místních firem se potýká s weby, které spíše brzdí, než pomáhají. Poznejte nejčastější problémy,
              které Vám brání v růstu.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-1 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-bold">Zastaralé stránky, které nefungují na mobilu</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Většina návštěvníků přichází z mobilních zařízení. Pokud Váš web není responzivní, ztrácíte potenciální
              zákazníky a poškozujete svou reputaci.
            </p>
          </div>
          <div className="grid gap-1 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-bold">Žádné poptávky z webu</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Váš web by měl být aktivním prodejním nástrojem. Pokud negeneruje nové kontakty nebo poptávky, je to jen
              drahá online vizitka.
            </p>
          </div>
          <div className="grid gap-1 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-bold">Investice do webu bez viditelné návratnosti</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Vložili jste peníze do webu, ale nevidíte žádné výsledky? Bez jasné strategie a měření výkonu je to jen
              plýtvání zdroji.
            </p>
          </div>
          <div className="grid gap-1 bg-gray-50 p-6 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-xl font-bold">Neznalost lokálního trhu a specifických potřeb</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Obecné webové řešení nemusí fungovat pro specifika Kraje Vysočina. Potřebujete partnera, který rozumí
              místnímu podnikatelskému prostředí.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
