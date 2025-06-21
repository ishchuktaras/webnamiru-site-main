import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 bg-gray-900 text-gray-300">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sekce O projektu */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Web na míru</h3>
          <p className="text-sm">
            Strategické weby, které vydělávají. Propojuji technické dovednosti webdevelopera s ekonomickou expertízou
            pro měřitelný obchodní růst na Vysočině.
          </p>
        </div>

        {/* Sekce Rychlé odkazy */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Rychlé odkazy</h3>
          <nav className="flex flex-col space-y-2">
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Domů
            </Link>
            <Link className="text-sm hover:text-white transition-colors" href="/o-mne">
              O mně
            </Link>
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Služby
            </Link>
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Případové studie
            </Link>
            <Link className="text-sm hover:text-white transition-colors" href="#">
              Kontakt
            </Link>
          </nav>
        </div>

        {/* Sekce Kontakt a sociální sítě */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Kontakt</h3>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <a className="text-sm hover:text-white transition-colors" href="mailto:info@webnamiru.site">
              info@webnamiru.site
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-gray-400" />
            <a className="text-sm hover:text-white transition-colors" href="tel:+420777596216">
              +420 777 596 216
            </a>
          </div>
          <div className="flex space-x-4 mt-4">
            <a aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors" href="#">
              <Facebook className="h-6 w-6" />
            </a>
            <a aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors" href="#">
              <Instagram className="h-6 w-6" />
            </a>
            <a aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors" href="#">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Web na míru. Všechna práva vyhrazena.</p>
      </div>
    </footer>
  )
}
