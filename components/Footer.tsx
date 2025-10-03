// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Sekce O projektu s logem */}
          <div className="space-y-4">
            <Link
              className="flex items-center gap-3"
              href="/"
              aria-label="webnamiru.site - Domovská stránka"
            >
              <Image
                src="/images/logo/logo.svg"
                width={40}
                height={40}
                alt="webnamiru.site - Logo"
                className="rounded-lg"
              />
              <span className="text-lg font-bold">webnamiru.site</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Propojuji technické dovednosti s ekonomickou expertízou pro
              měřitelný obchodní růst na Vysočině.
            </p>
            <div className="flex space-x-3">
               <Button asChild variant="outline" size="icon">
                  <Link href="#" target="_blank" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="icon">
                  <Link href="https://github.com/ishchuktaras" target="_blank" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
            </div>
          </div>

          {/* Sekce Navigace */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigace
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#service-packages-section">Služby</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/#case-studies-section">Reference</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/o-mne">O mně</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/blog">Blog</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary transition-colors" href="/kontakt">Kontakt</Link>
            </nav>
          </div>

          {/* Sekce Kontakt */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Kontakt
            </h3>
            <div className="space-y-3">
              <a href="mailto:poptavka@webnamiru.site" className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  poptavka@webnamiru.site
                </span>
              </a>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Jihlava, Kraj Vysočina
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Spodní část s copyrightem a reCAPTCHA textem */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} webnamiru.site - Všechna práva vyhrazena.
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <Link href="/ochrana-osobnich-udaju" className="hover:text-primary transition-colors">Ochrana osobních údajů</Link>
              <Link href="/obchodni-podminky" className="hover:text-primary transition-colors">Obchodní podmínky</Link>
            </div>
          </div>
          {/* === TEXT PRO reCAPTCHA === */}
          <div className="mt-4 text-center text-xs text-muted-foreground/80 md:text-left">
            Tento web je chráněn službou reCAPTCHA a platí pro něj 
            <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary"> Zásady ochrany osobních údajů</Link> a 
            <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary"> Smluvní podmínky</Link> společnosti Google.
          </div>
        </div>
      </div>
    </footer>
  );
}