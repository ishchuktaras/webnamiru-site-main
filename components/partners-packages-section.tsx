// components/partners-packages-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Handshake, Zap, Award, ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { Button } from './ui/button';
import Link from 'next/link';

// Definuje typ pro krok v partnerském procesu
interface PartnershipStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data pro kroky partnerského programu
const partnershipSteps: PartnershipStep[] = [
  {
    icon: Handshake,
    title: '1. Vy doporučíte klienta',
    description:
      'Předáte mi kontakt na klienta, který potřebuje špičkové webové řešení. Postaráte se o úvodní představení a já převezmu zbytek.',
  },
  {
    icon: Zap,
    title: '2. Já se postarám o realizaci',
    description:
      'Převezmu veškerou technickou komunikaci, analýzu, vývoj a nasazení. Vy se můžete soustředit na svou práci a máte jistotu, že váš klient je v dobrých rukou.',
  },
  {
    icon: Award,
    title: '3. Získáte férovou odměnu',
    description:
      'Po úspěšném dokončení projektu a úhradě faktury klientem vám náleží transparentní provize. Vše je postaveno na důvěře a oboustranné výhodnosti.',
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
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function PartnersPackagesSection() {
  return (
    <SectionWrapper
      id="partners-packages-section"
      badgeText="Partnerství"
      title="Pojďme růst společně"
      subtitle="Jste marketingový specialista, designér nebo konzultant? Spojme síly. Vy se soustřeďte na to, co umíte nejlépe, a technickou realizaci nechte na mně."
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Levá strana - proces a výhody */}
        <div className="space-y-10">
          {partnershipSteps.map((step) => (
            <motion.div
              key={step.title}
              className="flex items-start gap-4"
              variants={itemVariants}
            >
              <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pravá strana - Call to Action */}
        <motion.div
          className="rounded-2xl bg-primary p-8 text-center text-primary-foreground lg:p-12"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold">Máte zájem o spolupráci?</h3>
          <p className="mt-4 opacity-90">
            Hledám partnery, kteří sdílí mé nadšení pro kvalitu a smysluplné
            projekty. Pokud si myslíte, že bychom si mohli vzájemně pomoci,
            ozvěte se.
          </p>
          <Button asChild variant="secondary" size="lg" className="mt-8 group">
            <Link href="/kontakt">
              Staňte se partnerem
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}