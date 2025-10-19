// components/hero-section.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, BrainCircuit } from 'lucide-react';

import { Button } from '@/components/ui/button';
import InquirySheet from './InquirySheet';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const premiumSignals = [
  { icon: Zap, text: 'Moderní technologie' },
  { icon: ShieldCheck, text: 'Výkon a bezpečnost' },
  { icon: BrainCircuit, text: 'Strategický přístup' },
];

export function HeroSection() {
  return (
    <motion.section
      className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 md:py-32 lg:py-40"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>

      <div className="relative container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        
        <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-300 dark:to-white">
                Měním nápady v
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                ziskové aplikace.
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-[600px] text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl lg:mx-0"
          >
            Specializuji se na vývoj rychlých a bezpečných digitálních řešení na
            míru, která přináší měřitelné výsledky a posouvají vaše podnikání
            vpřed.
          </motion.p>

          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {premiumSignals.map((signal) => (
                <div
                  key={signal.text}
                  className="flex items-center justify-center gap-2 lg:justify-start"
                >
                  <signal.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {signal.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            {/* === OPRAVA ZDE === */}
            <InquirySheet
              trigger={
                <Button
                  size="lg"
                  className="group h-12 bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-base font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Nezávazná poptávka
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              }
              title="Pojďme společně nastartovat váš projekt"
              description="Vyplňte krátký dotazník a já se vám co nejdříve ozvu s konkrétními návrhy a dalším postupem."
              serviceInfo={undefined} 
            />
            
            <Button
              asChild
              variant="outline"
              className="group h-12 border-2 px-8 text-base font-medium transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Link href="/pripadove-studie">
                Prohlédnout projekty
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 scale-105 transform rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 rotate-3"></div>
          <div className="absolute inset-0 scale-110 transform rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 opacity-10 -rotate-2"></div>

          <div className="relative z-10 mx-auto max-w-lg lg:max-w-none">
            <Image
              src="/images/website-hero.jpg"
              width={600}
              height={600}
              alt="Strategický vývoj webových aplikací - developer analyzující data a metriky"
              className="aspect-square h-auto w-full rounded-2xl object-cover shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              priority
            />
            <div className="absolute -top-4 -right-4 z-20 rounded-xl bg-white p-3 shadow-xl dark:bg-gray-800">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-bold text-gray-800 dark:text-white">
                  Next.js & React
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Web na míru',
            description: 'Vývoj ziskových webových aplikací v Kraji Vysočina',
            url: 'https://webnamiru.site',
            areaServed: {
              '@type': 'State',
              name: 'Kraj Vysočina',
            },
            founder: {
              '@type': 'Person',
              name: 'Taras Ishchuk',
              jobTitle: 'Web Developer & Business Analyst',
            },
          }),
        }}
      />
    </motion.section>
  );
}

export default HeroSection;