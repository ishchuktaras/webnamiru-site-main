import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 bg-gray-900 text-gray-300">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Sekce O projektu s logem */}
        <div className="space-y-4">
          <Link
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
            href="/"
            aria-label="webnamíru - Domovská stránka"
          >
            <div className="relative">
              <Image
                src="/images/logo/logo.svg"
                width={60}
                height={36}
                alt="webnamíru - Logo"
                className="rounded-lg transition-all duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500/20"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                webnamíru.site
              </span>
              <span className="text-xs text-gray-400 hidden sm:block">
                Strategické weby pro Vysočinu
              </span>
            </div>
          </Link>
          <p className="text-sm">
            Strategické weby, které vydělávají. Propojuji technické dovednosti
            webdevelopera s ekonomickou expertízou pro měřitelný obchodní růst
            na Vysočině.
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-300">
            <MapPin className="h-4 w-4" />
            <span>🎯 Specializujeme se na Kraj Vysočina</span>
          </div>
        </div>

        {/* Sekce Rychlé odkazy */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Rychlé odkazy</h3>
          <nav className="flex flex-col space-y-2">
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/"
            >
              Domů
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/o-mne"
            >
              O mně
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/pripadove-studie"
            >
              Případové studie
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/kontakt"
            >
              Kontakt
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/blog"
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Sekce Služby */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Služby</h3>
          <nav className="flex flex-col space-y-2">
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/sluzby/balicky"
            >
              📦 Balíčky služeb
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/sluzby/partnerstvi"
            >
              🤝 Partnerské balíčky
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/kontakt"
            >
              ⚡ Individuální řešení
            </Link>
            <Link
              className="text-sm hover:text-white transition-colors"
              href="/kontakt"
            >
              💬 Nezávazná konzultace
            </Link>
          </nav>
        </div>

        {/* Sekce Kontakt */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Kontakt</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
              <a
                className="text-sm hover:text-white transition-colors"
                href="tel:+420777596216"
              >
                +420 777 596 216
              </a>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a
                  className="text-sm hover:text-white transition-colors"
                  href="mailto:poptavka@webnamiru.site"
                >
                  poptavka@webnamiru.site
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <a
                  className="text-sm hover:text-white transition-colors"
                  href="mailto:partnerstvi@webnamiru.site"
                >
                  partnerstvi@webnamiru.site
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <a
                  className="text-sm hover:text-white transition-colors"
                  href="mailto:tech-podpora@webnamiru.site"
                >
                  tech-podpora@webnamiru.site
                </a>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">Odpovídám do 24 hodin</p>
          </div>

          <div className="flex space-x-3 mt-4">
            <a
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-gray-800"
              href="#"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-400 transition-colors p-1 rounded-full hover:bg-gray-800"
              href="#"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 mt-8 border-t border-gray-700 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} webnamíru.site - Web na míru.
            Všechna práva vyhrazena.
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
