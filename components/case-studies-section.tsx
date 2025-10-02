// components/case-studies-section.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionWrapper from './SectionWrapper';
import { caseStudies } from '@/lib/data'; // Stále používáme vaše data
import InquirySheet from './InquirySheet';

// Varianty animací
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function CaseStudiesSection() {
  return (
    <SectionWrapper
      id="case-studies-section"
      badgeText="Úspěšné projekty"
      title="Místo prázdných slov, měřitelné výsledky"
      subtitle="Podívejte se na konkrétní příklady, jak mé strategické webové aplikace pomohly klientům na Vysočině dosáhnout jejich obchodních cílů."
      className="bg-white dark:bg-gray-950"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-7xl items-stretch gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {caseStudies.map((study) => (
          <motion.div key={study.client} variants={itemVariants}>
            <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-60 w-full">
                <Image
                  src={study.imageUrl}
                  alt={`Případová studie pro ${study.client}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{study.client}</h3>
                  <p className="text-sm text-white/90">{study.subtitle}</p>
                </div>
              </div>

              <CardContent className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <p className="mb-4 text-sm text-muted-foreground">{study.challenge}</p>
                  
                  {/* Zvýrazněný hlavní výsledek */}
                  <div className="mb-6 rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {study.metrics[0].label}
                    </p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {study.metrics[0].value}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold">Použité technologie:</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="mt-auto w-full group-hover:bg-primary" asChild>
                  <Link href={study.link}>
                    Prohlédnout celou studii
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Spodní Call-to-Action */}
      <div className="mt-20 text-center">
         <div className="inline-flex flex-col items-center gap-4 rounded-2xl border bg-secondary p-8">
            <h3 className="text-2xl font-bold">Chcete podobné výsledky?</h3>
            <p className="max-w-md text-muted-foreground">Pojďme společně vytvořit řešení, které bude skutečně fungovat pro váš byznys.</p>
            <InquirySheet
                title="Nezávazná konzultace"
                description="Zanechte mi kontakt a já se vám ozvu, abychom probrali, jak mohu pomoci vašemu projektu růst."
                serviceInfo="Obecná poptávka (z Případových studií)"
                trigger={
                    <Button size="lg">
                        Domluvit konzultaci
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                }
            />
          </div>
      </div>
    </SectionWrapper>
  );
}