import { MapPin, Mail, Phone } from "lucide-react";
import { ContactCard } from "@/components/ContactCard"; // Naimportuj novou komponentu

export default function ContactInfoSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        {/* 1. Vylepšený nadpis a úvodní text */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Kontakt
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pojďme se spojit
          </h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
            Máte nápad, nebo jen potřebujete poradit? Vyberte si způsob, který je vám nejpříjemnější, a ozvěte se.
          </p>
        </div>

        {/* 2. Přehledné kontaktní karty */}
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-1 md:grid-cols-3">
          
          <ContactCard icon={Mail} title="Napište mi">
            <p>Nejlepší způsob pro zahájení konverzace a zaslání poptávky.</p>
            <a
              href="mailto:poptavka@webnamiru.site"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-lg"
            >
              poptavka@webnamiru.site
            </a>
            <p className="text-sm text-gray-500">Odpovídám do 24 hodin.</p>
          </ContactCard>

          <ContactCard icon={Phone} title="Zavolejte mi">
            <p>Pro rychlé dotazy a operativní záležitosti.</p>
            <a
              href="tel:+420777596216"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline text-lg"
            >
              +420 777 596 216
            </a>
            <p className="text-sm text-gray-500">Po–Pá, 9:00 – 17:00</p>
          </ContactCard>
          
          <ContactCard icon={MapPin} title="Působnost">
            <p>Tvořím weby pro klienty primárně v tomto regionu.</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
              Jihlava, Kraj Vysočina
            </p>
             <p className="text-sm text-gray-500">Osobní schůzka po domluvě.</p>
          </ContactCard>

        </div>

        {/* 3. Mapa přesunutá pod karty - má vlastní prostor */}
        <div className="mx-auto mt-24 max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d165383.17697207602!2d15.421966021679685!3d49.39564999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d0323de140229%3A0x400af0f6614e590!2sJihlava!5e0!3m2!1scs!2scz!4v1719506161830!5m2!1scs!2scz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}