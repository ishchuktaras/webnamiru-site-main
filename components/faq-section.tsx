// components/faq-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { HelpCircle, Briefcase, Code, Rocket } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionWrapper from './SectionWrapper';
import { faqs } from '@/lib/data'; // Načítáme vaše FAQ data

// Rozdělení FAQ do kategorií pro zobrazení ve sloupcích
const generalFaqs = faqs.filter((faq) => faq.category === 'Obecné');
const servicesFaqs = faqs.filter(
  (faq) => faq.category === 'Služby a Cenotvorba'
);
const processFaqs = faqs.filter(
  (faq) =>
    faq.category === 'Proces a Technologie' || faq.category === 'Po Dokončení'
);
const partnershipFaqs = faqs.filter((faq) => faq.category === 'Partnerství');

// Varianty animací
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

interface FaqColumnProps {
  title: string;
  icon: React.ElementType;
  faqs: typeof faqs;
}

// Komponenta pro jeden sloupec s otázkami
const FaqColumn: React.FC<FaqColumnProps> = ({ title, icon: Icon, faqs }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Icon className="h-6 w-6 text-primary" />
      <h3 className="text-2xl font-semibold">{title}</h3>
    </div>
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default function FaqSection() {
  return (
    <SectionWrapper
      id="faq-section"
      badgeText="Časté dotazy"
      title="Máte otázky? Mám odpovědi."
      subtitle="Zde najdete odpovědi na nejčastější dotazy, které mi klienti pokládají. Pokud zde nenajdete, co hledáte, neváhejte mě kontaktovat."
      className="bg-white dark:bg-gray-950"
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-7xl gap-12 lg:grid-cols-2"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={itemVariants}>
          <FaqColumn
            title="Obecné a Služby"
            icon={HelpCircle}
            faqs={[...generalFaqs, ...servicesFaqs]}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FaqColumn
            title="Proces a Partnerství"
            icon={Briefcase}
            faqs={[...processFaqs, ...partnershipFaqs]}
          />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}