// components/for-whom-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Briefcase, Gem, Building, ArrowRight, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

// Definuje typ pro jednotlivé profily ideálních klientů
interface IdealClientProfile {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

// Data pro jednotlivé karty, přímo navázaná na strategický plán
const idealClientProfiles: IdealClientProfile[] = [
  {
    icon: Building,
    title: 'Výrobní a B2B firmy',
    description:
      'Pro firmy, které potřebují víc než jen online vizitku. Tvořím robustní B2B portály a platformy, které digitalizují vaše obchodní procesy.',
    features: [
      'B2B klientské portály',
      'Integrace s ERP a CRM systémy',
      'Technické produktové katalogy',
    ],
  },
  {
    icon: Gem,
    title: 'Prémiové služby a turismus',
    description:
      'Pro hotely, penziony a poskytovatele zážitků, kteří chtějí maximalizovat přímé rezervace a prezentovat svou jedinečnost na té nejvyšší úrovni.',
    features: [
      'Rezervační systémy na míru',
      'Vizuálně působivé prezentace',
      'Vícejazyčná podpora',
    ],
  },
  {
    icon: Briefcase,
    title: 'Zavedení profesionálové',
    description:
      'Pro advokáty, architekty či finanční poradce, kteří chtějí posílit svou digitální image, důvěryhodnost a efektivně komunikovat s klienty.',
    features: [
      'Bezpečné klientské zóny',
      'Moderní a důvěryhodný design',
      'Prezentace odbornosti a referencí',
    ],
  },
];

// Varianty animací pro Framer Motion
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const ForWhomSection = () => {
  return (
    <motion.section
      className="py-24 sm:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        {/* === Titulek sekce === */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pro koho je spolupráce ideální?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nesnažím se být řešením pro každého. Specializuji se na partnery,
            kteří vnímají web jako strategickou investici do růstu svého
            podnikání.
          </p>
        </motion.div>

        {/* === Karty s profily ideálních klientů === */}
        <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-4xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3">
          {idealClientProfiles.map((profile, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <profile.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{profile.title}</CardTitle>
                  <CardDescription>{profile.description}</CardDescription>
                </CardHeader>
                <div className="flex-grow p-6 pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {profile.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* === Sekce "Pro koho to není" === */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl rounded-lg border bg-secondary p-8"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center text-center">
            <XCircle className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-2xl font-semibold">
              Kdy pravděpodobně nebudu ten pravý
            </h3>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pokud je vaším jediným kritériem nejnižší cena, hledáte co
              nejrychlejší řešení bez strategie nebo potřebujete jen jednoduchou
              vizitku na šabloně, pravděpodobně si nebudeme rozumět. Věřím v
              hodnotu, ne v cenovou válku.
            </p>
            <Button asChild variant="link" className="mt-4">
              <Link href="/o-mne">Více o mém přístupu</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};