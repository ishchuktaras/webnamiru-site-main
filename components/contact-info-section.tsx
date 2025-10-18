// components/contact-info-section.tsx
'use client';

import { motion, Variants } from "framer-motion";
import { Mail, Phone, ArrowRight, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "./SectionWrapper";
import InquirySheet from "./InquirySheet";
import Link from "next/link";

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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ContactInfoSection() {
  return (
    <SectionWrapper
      id="contact-section"
      badgeText="Kontakt"
      title="Pojďme tvořit"
      subtitle="Jsem připraven vám naslouchat. Ať už máte konkrétní projekt, nebo jen nápad, ozvěte se a společně probereme další kroky."
      className="bg-white dark:bg-gray-950"
    >
      <motion.div
        className="mx-auto mt-16 max-w-7xl overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900/50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid lg:grid-cols-2">
          {/* Levá strana - Hlavní CTA */}
          <motion.div
            className="flex flex-col justify-center p-8 lg:p-12"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold tracking-tight">
              Připraveni posunout váš byznys na další úroveň?
            </h3>
            <p className="mt-4 text-muted-foreground">
              Nejlepší čas začít byl včera. Druhý nejlepší je právě teď. Vyplňte
              strategický dotazník a já se vám co nejdříve ozvu s konkrétními
              návrhy.
            </p>
            <div className="mt-8">
              <InquirySheet
                title="Pojďme společně nastartovat váš projekt"
                description="Vyplňte krátký dotazník a já se vám co nejdříve ozvu s konkrétními návrhy a dalším postupem."
                trigger={
                  <Button size="lg" className="group">
                    Spustit strategickou analýzu
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                }
              />
            </div>
          </motion.div>

          {/* Pravá strana - Přímé kontakty */}
          <motion.div
            className="bg-secondary/50 p-8 lg:p-12"
            variants={itemVariants}
          >
            <h4 className="text-2xl font-semibold">Přímý kontakt</h4>
            <div className="mt-6 space-y-4">
              <a
                href="mailto:poptavka@webnamiru.site"
                className="group flex items-center gap-4"
              >
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-lg group-hover:underline">
                  poptavka@webnamiru.site
                </span>
              </a>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <span className="text-lg text-muted-foreground">
                  +420 777 596 216
                </span>
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <h4 className="text-lg font-semibold">Fakturační údaje</h4>
              <p className="mt-2 text-muted-foreground">
                Taras Ishchuk
                <br />
                IČO: 00000000 <span className="text-lg text-muted-foreground">(Připravuje se)</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

