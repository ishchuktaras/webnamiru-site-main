// app/(main)/kontakt/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, ArrowRight, Linkedin, Github, FileText, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InquirySheet from '@/components/InquirySheet';

export const metadata: Metadata = {
  title: 'Kontakt | webnamiru.site',
  description: 'Máte projekt nebo jen nápad? Pojďme se spojit a probrat, jak mohu pomoci vašemu byznysu růst. Nabízím nezávaznou konzultaci.',
};

export default function KontaktPage() {
  return (
    <main className="py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-black">
      <div className="container px-4 md:px-6">
        {/* Úvodní sekce */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">
            Kontakt
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-white">
            Pojďme tvořit
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Jsem připraven vám naslouchat. Ať už máte konkrétní projekt, nebo jen nápad, ozvěte se a společně probereme další kroky.
          </p>
        </div>

        {/* Hlavní obsah - dva sloupce */}
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-5">
          {/* Levý sloupec - Preferovaný kontakt (formulář) */}
          <div className="lg:col-span-3 space-y-8 rounded-2xl border bg-card p-8 shadow-lg">
            <div className="space-y-3">
              <FileText className="h-10 w-10 text-primary" />
              <h2 className="text-3xl font-bold">Startovací bod vašeho projektu</h2>
              <p className="text-muted-foreground">
                Nejlepším způsobem, jak začít, je vyplnění strategického dotazníku. Pomůže mi to rychle pochopit vaše cíle a připravit pro vás co nejrelevantnější návrhy.
              </p>
            </div>
            <InquirySheet
              title="Pojďme společně nastartovat váš projekt"
              description="Vyplňte krátký dotazník a já se vám co nejdříve ozvu s konkrétními návrhy a dalším postupem."
              serviceInfo="Obecná poptávka (ze stránky Kontakt)"
              trigger={
                <Button size="lg" className="group w-full sm:w-auto">
                  Vyplnit strategický dotazník
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              }
            />
          </div>

          {/* Pravý sloupec - Přímé kontakty */}
          <div className="lg:col-span-2 space-y-8 rounded-2xl border bg-muted/20 p-8">
             <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Přímý kontakt</h3>
                <p className="text-muted-foreground">Pro rychlejší dotazy nebo pokud preferujete přímou komunikaci.</p>
             </div>
             <div className="space-y-4">
              <a href="mailto:poptavka@webnamiru.site" className="group flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-lg font-medium group-hover:underline">poptavka@webnamiru.site</span>
              </a>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-muted-foreground" />
                <span className="text-lg text-muted-foreground">+420 777 596 216</span>
              </div>
            </div>
            
            <div className="border-t pt-6 space-y-2">
                <h4 className="text-lg font-semibold flex items-center gap-2"><Building className="h-5 w-5" /> Fakturační údaje</h4>
                <p className="text-muted-foreground">
                    Taras Ishchuk
                    <br />
                    IČO: 19523253
                </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}