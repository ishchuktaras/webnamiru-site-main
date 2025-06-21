import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactInfoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Kde mě najdete a jak mě kontaktovat
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Jsem k dispozici pro konzultace a spolupráci. Neváhejte se ozvat!
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
            <MapPin className="h-10 w-10 text-black dark:text-gray-50 mb-4" />
            <h3 className="text-xl font-bold mb-2">Adresa</h3>
            <p className="text-gray-700 dark:text-gray-300">
              [Vaše ulice a číslo popisné]
              <br />
              Jihlava, Kraj Vysočina
            </p>
            <a
              href="https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_LINK" // Zde vložte odkaz na Google Maps
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-gray-50 hover:underline mt-4"
            >
              Zobrazit na mapě
            </a>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
            <Mail className="h-10 w-10 text-black dark:text-gray-50 mb-4" />
            <h3 className="text-xl font-bold mb-2">E-mail</h3>
            <a href="mailto:info@webnamiru.site" className="text-gray-700 dark:text-gray-300 hover:underline">
              info@webnamiru.site
            </a>
            <a href="mailto:poptavka@webnamiru.site" className="text-gray-700 dark:text-gray-300 hover:underline mt-1">
              poptavka@webnamiru.site
            </a>
            <a
              href="mailto:partnerstvi@webnamiru.site"
              className="text-gray-700 dark:text-gray-300 hover:underline mt-1"
            >
              partnerstvi@webnamiru.site
            </a>
            <a
              href="mailto:tech-podpora@webnamiru.site"
              className="text-gray-700 dark:text-gray-300 hover:underline mt-1"
            >
              tech-podpora@webnamiru.site
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Odpovídám obvykle do 24 hodin.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
            <Phone className="h-10 w-10 text-black dark:text-gray-50 mb-4" />
            <h3 className="text-xl font-bold mb-2">Telefon</h3>
            <a href="tel:+420777596216" className="text-gray-700 dark:text-gray-300 hover:underline">
              +420 777 596 216
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dostupný Po-Pá, 9:00 - 17:00.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
