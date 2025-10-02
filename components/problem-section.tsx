// components/problem-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { TrendingDown, Users, XCircle, Clock } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Definuje typ pro typický problém klienta
interface ClientProblem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data pro problémy, cílící na novou prémiovou klientelu
const clientProblems: ClientProblem[] = [
  {
    icon: TrendingDown,
    title: 'Zastaralý web odrazuje klienty',
    description:
      'Váš web už neodpovídá kvalitě vašich služeb a místo aby přitahoval, potenciální zákazníky spíše ztrácí. Důvěryhodnost vaší značky klesá.',
  },
  {
    icon: Users,
    title: 'Závislost na provizních portálech',
    description:
      'Velkou část vašich zisků odevzdáváte rezervačním portálům nebo srovnávačům. Chybí vám efektivní kanál pro přímý prodej a budování vztahu se zákazníky.',
  },
  {
    icon: XCircle,
    title: 'Šablonové řešení vás omezuje',
    description:
      'Používáte krabicové řešení (jako WordPress nebo Shoptet), které už narazilo na své limity. Potřebujete funkce na míru, ale vaše platforma vám je neumožňuje.',
  },
  {
    icon: Clock,
    title: 'Pomalost a špatné SEO vás brzdí',
    description:
      'Váš web se načítá pomalu, což odrazuje netrpělivé uživatele a trestají vás za to i vyhledávače. Přicházíte o cennou organickou návštěvnost.',
  },
];

// Varianty animací
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function ProblemSection() {
  return (
    <SectionWrapper
      id="problem-section"
      badgeText="Typické problémy"
      title="Poznáváte se v některé z těchto situací?"
      subtitle="Mnoho úspěšných firem na Vysočině naráží na digitální strop. Jejich online prezentace jim brání v dalším růstu, místo aby ho podporovala."
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {clientProblems.map((problem, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="group h-full transform-gpu rounded-2xl border-0 bg-background shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <problem.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold">
                  {problem.title}
                </CardTitle>
                <CardDescription className="mt-2 text-sm">
                  {problem.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}