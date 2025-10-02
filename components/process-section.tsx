// components/process-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { BrainCircuit, Code, Rocket, Handshake } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

// Definuje typ pro jednotlivé kroky procesu
interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data pro jednotlivé kroky, upravená pro prémiovou strategii
const processSteps: ProcessStep[] = [
  {
    icon: BrainCircuit,
    title: '1. Strategická Analýza',
    description:
      'Každý úspěšný projekt začíná hloubkovým pochopením vašich cílů. Společně definujeme klíčové metriky úspěchu (KPIs), cílovou skupinu a technické požadavky. Výstupem je jasná projektová roadmapa.',
  },
  {
    icon: Code,
    title: '2. Design & Vývoj na Míru',
    description:
      'Na základě strategie vytvořím moderní a uživatelsky přívětivý design. Následuje vývoj vysoce výkonné a bezpečné webové aplikace s použitím nejmodernějších technologií (Next.js, React).',
  },
  {
    icon: Rocket,
    title: '3. Předání & Školení',
    description:
      'Po důkladném testování nasadím aplikaci na produkční prostředí. Provedu vás administrací a ukážu vám, jak efektivně spravovat nový web, abyste byli plně soběstační.',
  },
  {
    icon: Handshake,
    title: '4. Partnerství & Růst',
    description:
      'Spuštěním projektu naše spolupráce nekončí. Nabízím dlouhodobé partnerství, které zahrnuje technickou podporu, pravidelnou optimalizaci výkonu a strategické poradenství pro další růst.',
  },
];

// Varianty animací
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function ProcessSection() {
  return (
    <SectionWrapper
      id="process-section"
      badgeText="Náš proces"
      title="Od nápadu k ziskové aplikaci"
      subtitle="Spolupráce se mnou je transparentní a strukturovaný proces, který zaručuje, že se váš projekt bude ubírat správným směrem od samého začátku."
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* Vertikální propojovací čára */}
        <div className="absolute left-8 top-8 h-full w-px -translate-x-1/2 bg-border" aria-hidden="true" />

        <motion.div
          className="space-y-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex items-start"
              variants={itemVariants}
            >
              {/* Ikona a její pozadí */}
              <div className="z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-background shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
              </div>
              {/* Textový obsah */}
              <div className="ml-6">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}