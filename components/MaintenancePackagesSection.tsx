// components/MaintenancePackagesSection.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import SectionWrapper from './SectionWrapper';
import InquirySheet from './InquirySheet';

// Definuje typ pro partnerský program
interface PartnershipProgram {
  icon: React.ElementType;
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  ctaText: string;
  serviceInfo: string;
}

// Data pro programy partnerství podle nové strategie
const partnershipPrograms: PartnershipProgram[] = [
  {
    icon: ShieldCheck,
    title: 'Bezpečnost a Podpora',
    price: '2 500 Kč / měsíc',
    description: 'Pro klid vaší mysli. Zajistím, že váš web bude vždy bezpečný, rychlý a aktuální.',
    features: [
      'Prémiový a spravovaný hosting',
      'Denní zálohování dat a souborů',
      'Pravidelné bezpečnostní kontroly',
      'Aktualizace systému a závislostí',
      '4 hodiny technické podpory měsíčně',
    ],
    ctaText: 'Chci mít klid',
    serviceInfo: 'podpora-a-bezpecnost',
  },
  {
    icon: TrendingUp,
    title: 'Partner pro Růst',
    price: 'od 10 000 Kč / měsíc',
    description: 'Pro ambiciózní klienty, kteří chtějí svůj web aktivně využívat jako nástroj pro růst byznysu.',
    features: [
      'Vše z programu Bezpečnost a Podpora',
      'Proaktivní monitoring výkonu (rychlost, SEO)',
      'Měsíční strategické konzultace a reporting',
      'Pravidelná obsahová a SEO optimalizace',
      'Prioritní podpora a rychlejší reakce',
      'Přednostní přístup k novým funkcím',
    ],
    isFeatured: true,
    ctaText: 'Chci strategického partnera',
    serviceInfo: 'partnerstvi-pro-rust',
  },
];

// Varianty animací
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function MaintenancePackagesSection() {
  return (
    <SectionWrapper
      id="maintenance-packages-section"
      badgeText="Dlouhodobá spolupráce"
      title="Spuštěním to nekončí, ale začíná"
      subtitle="Váš web je živý organismus, který potřebuje péči, aby mohl růst. Nabízím dva programy partnerství, které zajistí, že vaše investice bude dlouhodobě v bezpečí a bude přinášet výsledky."
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-md grid-cols-1 items-stretch gap-8 md:max-w-4xl md:grid-cols-2 lg:max-w-5xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {partnershipPrograms.map((program) => (
          <motion.div key={program.title} variants={itemVariants}>
            <Card
              className={cn(
                'flex h-full flex-col',
                program.isFeatured && 'border-primary shadow-2xl'
              )}
            >
              <CardHeader className="relative">
                {program.isFeatured && (
                  <div className="absolute -top-4 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Doporučeno pro růst
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <program.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                </div>
                <CardDescription className="pt-2 text-3xl font-bold">
                  {program.price}
                </CardDescription>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <InquirySheet
                  trigger={
                    <Button
                      size="lg"
                      className="group w-full"
                      variant={program.isFeatured ? 'default' : 'outline'}
                    >
                      {program.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  }
                  title={`Poptávka: ${program.title}`}
                  description="Skvělý výběr! Dejte mi vědět, o který program máte zájem, a já se vám co nejdříve ozvu."
                  serviceInfo={program.serviceInfo}
                />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}