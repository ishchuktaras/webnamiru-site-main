// components/service-packages-section.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import InquirySheet from "./InquirySheet";

// Definuje typ pro balíček služeb
interface ServicePackage {
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  ctaText: string;
  serviceInfo: string;
}

// Data pro balíčky podle nové prémiové strategie
const servicePackages: ServicePackage[] = [
  {
    title: "Digitální Základ",
    price: "od 80 000 Kč",
    description:
      "Pro profesionály a menší firmy, které potřebují špičkovou a výkonnou online prezentaci.",
    features: [
      "Zakázkový design na míru",
      "Vývoj na moderní technologii (Next.js)",
      "Responzivita pro všechna zařízení",
      "Základní SEO optimalizace",
      "Nasazení a konfigurace",
    ],
    ctaText: "Mám zájem",
    serviceInfo: "webova-aplikace",
  },
  {
    title: "Motor Růstu",
    price: "od 150 000 Kč",
    description:
      "Pro rostoucí firmy a prémiové služby, které vyžadují pokročilé funkce a integrace.",
    features: [
      "Vše z balíčku Digitální Základ",
      "Rezervační systémy",
      "Platební brány a e-commerce funkce",
      "Integrace s CRM a API třetích stran",
      "Pokročilá analytika a reporting",
    ],
    isFeatured: true,
    ctaText: "Chci nastartovat růst",
    serviceInfo: "e-commerce",
  },
  {
    title: "Řešení na Míru",
    price: "Individuální",
    description:
      "Pro zavedené B2B firmy a projekty se specifickými požadavky na míru.",
    features: [
      "Vše z balíčku Motor Růstu",
      "B2B klientské portály",
      "Integrace s ERP a firemními systémy",
      "Pokročilé bezpečnostní protokoly",
      "Neomezená škálovatelnost",
    ],
    ctaText: "Poptat řešení",
    serviceInfo: "dlouhodoba-spoluprace",
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ServicePackagesSection() {
  return (
    <SectionWrapper
      id="service-packages-section"
      badgeText="Služby a Ceny"
      title="Investice, která se vám vrátí"
      subtitle="Každý projekt začíná placenou strategickou analýzou (od 15 000 Kč), abychom zajistili, že finální řešení bude přesně odpovídat vašim obchodním cílům. Níže jsou orientační cenové úrovně."
    >
      <motion.div
        className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-4xl lg:max-w-none lg:grid-cols-3"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicePackages.map((pkg) => (
          <motion.div key={pkg.title} variants={itemVariants}>
            <Card
              className={cn(
                "flex h-full flex-col",
                pkg.isFeatured && "border-primary shadow-2xl"
              )}
            >
              <CardHeader className="relative">
                {pkg.isFeatured && (
                  <div className="absolute -top-4 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Nejoblíbenější
                  </div>
                )}
                <CardTitle>{pkg.title}</CardTitle>
                <CardDescription className="text-4xl font-bold">
                  {pkg.price}
                </CardDescription>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
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
                      className="group h-12 bg-gradient-to-r from-blue-600 to-blue-700 px-8 text-base font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      Nezávazná poptávka
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  }
                  title="Pojďme společně nastartovat váš projekt"
                  description="Vyplňte krátký dotazník a já se vám co nejdříve ozvu s konkrétními návrhy a dalším postupem."
                  serviceInfo={undefined}
                  formComponent="contact" 
                />
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
