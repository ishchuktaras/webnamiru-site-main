// components/about-me-content.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import SectionWrapper from './SectionWrapper';
import { skills, achievements, certificates } from '@/lib/data';

// Varianty animací
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function AboutMeContent() {
  return (
    <SectionWrapper
      id="about-me-content"
      badgeText="Můj příběh"
      title="Spojuji svět byznysu a technologií"
      subtitle="Nejsem jen programátor. Jsem strategický partner, který díky svému vzdělání v ekonomii a státní správě rozumí vašim obchodním cílům. Tvořím weby, které nejen skvěle vypadají, ale hlavně plní svůj účel."
    >
      <motion.div
        className="mx-auto mt-16 max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* === Horní sekce - Fotka a Úvod === */}
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-2"
          variants={itemVariants}
        >
          <div className="relative h-[400px] w-full lg:h-[500px]">
            <Image
              src="/images/zakladatel.jpg"
              alt="Portrét Tarase Ishchuka"
              fill
              // === OPRAVA ZDE ===
              className="rounded-3xl object-cover object-top shadow-2xl" // Přidána třída 'object-top'
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Taras Ishchuk
            </h2>
            <p className="text-lg text-muted-foreground">
              Moje cesta k vývoji webů nebyla přímá. Začala studiem ekonomie a
              prací ve státní správě, kde jsem se naučil analyzovat data,
              rozumět komplexním systémům a přemýšlet v souvislostech. Brzy
              jsem ale zjistil, že mě fascinuje síla technologií měnit nápady
              ve skutečnost.
            </p>
            <p className="text-lg text-muted-foreground">
              Proto jsem absolvoval intenzivní studium na IT Step Academy a
              propojil své dva světy. Dnes tuto unikátní kombinaci nabízím
              svým klientům: netvořím jen kód, ale buduji digitální řešení,
              která mají reálný obchodní dopad.
            </p>
            <Button asChild size="lg">
              <Link href="/kontakt">
                Domluvit si konzultaci
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* === Sekce Úspěchů === */}
        <motion.div className="my-24" variants={itemVariants}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="border-0 bg-secondary/50 text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* === Sekce Vzdělání a Certifikací (Digitální odznaky) === */}
        <motion.div className="space-y-12" variants={itemVariants}>
            <div>
                <h3 className="mb-8 text-center text-3xl font-bold">Vzdělání a certifikace</h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert) => {
                        const Icon = cert.icon;
                        return (
                            <Card key={cert.id} className="flex flex-col border-0 bg-background shadow-lg">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>{cert.title}</CardTitle>
                                        <CardDescription>{cert.institution}, {cert.year}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{cert.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Originály všech dokumentů jsou na vyžádání k dispozici během úvodní konzultace.
                </p>
            </div>

            {/* === Sekce Dovedností === */}
            <div>
                <h3 className="mb-8 text-center text-3xl font-bold">Technologie, se kterými pracuji</h3>
                <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill) => (
                    <Badge key={skill} variant="default" className="px-4 py-2 text-base">
                    {skill}
                    </Badge>
                ))}
                </div>
            </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}