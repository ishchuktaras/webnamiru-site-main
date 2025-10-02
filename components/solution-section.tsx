// components/solution-section.tsx
'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { BrainCircuit, Zap, ShieldCheck, Gem } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

// Definuje typ pro klíčovou výhodu
interface UniqueAdvantage {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data pro klíčové body vašeho řešení
const uniqueAdvantages: UniqueAdvantage[] = [
  {
    icon: BrainCircuit,
    title: 'Strategie na prvním místě',
    description:
      'Nezačínáme designem, ale byznysem. Každý projekt startuje analýzou vašich cílů, abychom zajistili, že výsledná aplikace bude skutečně vydělávat.',
  },
  {
    icon: Zap,
    title: 'Moderní a bleskově rychlé technologie',
    description:
      'Zapomeňte na pomalý WordPress. Sázím na Next.js a React – technologie, které zaručují špičkový výkon, skvělé SEO a perfektní uživatelský zážitek.',
  },
  {
    icon: Gem,
    title: 'Řešení na míru bez kompromisů',
    description:
      'Žádné šablony, žádné limity. Vytvořím pro vás řešení, které přesně odpovídá vašim potřebám a může růst společně s vaším podnikáním.',
  },
  {
    icon: ShieldCheck,
    title: 'Bezpečnost a spolehlivost',
    description:
      'Moderní architektura mých aplikací minimalizuje bezpečnostní rizika typická pro masově rozšířené platformy. Váš web a data vašich klientů budou v bezpečí.',
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Jemná "elastic" animace
  },
};

export default function SolutionSection() {
  return (
    <SectionWrapper
      id="solution-section"
      badgeText="Můj přístup"
      title="Nejsem jen další 'webař'. Jsem váš digitální partner."
      subtitle="Mým cílem není jen odevzdat web. Mým cílem je dodat vám funkční a ziskový digitální nástroj, který vám pomůže růst a odliší vás od konkurence."
      className="bg-white dark:bg-gray-950"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Levá strana - výhody */}
        <div className="space-y-8">
          {uniqueAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <advantage.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{advantage.title}</h3>
                <p className="mt-1 text-muted-foreground">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pravá strana - obrázek */}
        <motion.div
          className="relative flex h-full min-h-[400px] items-center justify-center"
          variants={imageVariants}
        >
          <div className="absolute inset-0 scale-105 transform rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 rotate-3 dark:opacity-30"></div>
          <Image
            src="/images/website-hero.jpg" // Tento obrázek můžete nahradit za vhodnější
            alt="Strategický přístup k vývoji webových aplikací"
            width={500}
            height={500}
            className="relative z-10 w-full max-w-md rounded-2xl object-cover shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}