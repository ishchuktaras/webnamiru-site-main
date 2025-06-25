import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Sekce O projektu s logem */}
        <div className="space-y-4 flex flex-col">
          <Link
            className="flex items-center gap-3 group transition-all duration-200"
            href="/"
            aria-label="webnamíru - Domovská stránka"
          >
            <div className="relative">
              <Image
                src="/images/logo/logo.svg"
                width={50}
                height={50}
                alt="webnamíru - Logo"
                className="rounded-lg transition-all duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500/20"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                webnamíru.site
              </span>
              <span className="text-xs text-gray-400">
                Strategické weby pro Vysočinu
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-400">
            Propojuji technické dovednosti s ekonomickou expertízou pro
            měřitelný obchodní růst na Vysočině.
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <MapPin className="h-4 w-4" />
            <span>🎯 Specializace na Kraj Vysočina</span>
          </div>
          <div className="flex space-x-4 mt-auto pt-4">
            <a
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors"
              href="https://www.facebook.com/profile.php?id=61577297867091"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-5 w-5" />
            </a>
            {/* <a
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors"
              href="#"
            >
              <Instagram className="h-5 w-5" />
            </a> */}
          </div>
        </div>

        {/* Sekce Rychlé odkazy */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Navigace</h3>
          <nav className="flex flex-col space-y-2">
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/"
            >
              Domů
            </Link>
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/o-mne"
            >
              O mně
            </Link>
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/pripadove-studie"
            >
              Případové studie
            </Link>
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/kontakt"
            >
              Kontakt
            </Link>
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="text-sm text-gray-400 hover:text-white transition-colors"
              href="/sluzby/balicky"
            >
              Balíčky služeb
            </Link>
          </nav>
        </div>

        {/* Sekce Kontakt */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Kontakt</h3>
          <div className="space-y-3">
            <a
              href="tel:+420777596216"
              className="flex items-center space-x-3 group"
            >
              <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                +420 777 596 216
              </span>
            </a>
            <a
              href="mailto:poptavka@webnamiru.site"
              className="flex items-center space-x-3 group"
            >
              <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                poptavka@webnamiru.site
              </span>
            </a>
            <p className="text-xs text-gray-500 pt-2">Odpovídám do 24 hodin.</p>
          </div>
        </div>

        {/* Sekce Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Získejte novinky</h3>
          <p className="text-sm text-gray-400">
            Nechte si posílat tipy ze světa webů a marketingu přímo do vaší
            schránky.
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="vas@email.cz"
              className="bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              aria-label="E-mail pro newsletter"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 shrink-0"
              aria-label="Přihlásit k odběru"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500">
            Žádný spam, jen hodnotný obsah.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 mt-10 border-t border-gray-800 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} webnamíru.site - Všechna práva
            vyhrazena.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <Link
              href="/ochrana-osobnich-udaju"
              className="hover:text-white transition-colors"
            >
              Ochrana osobních údajů
            </Link>
            <Link
              href="/obchodni-podminky"
              className="hover:text-white transition-colors"
            >
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
