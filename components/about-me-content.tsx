// components/about-me-content.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
              src="/images/zakladatel.jpg" // Ujistěte se, že cesta k fotce je správná
              alt="Portrét Tarase Ishchuka"
              fill
              className="rounded-3xl object-cover shadow-2xl"
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

        {/* === Sekce Dovedností a Certifikátů === */}
        <motion.div
          className="grid gap-12 lg:grid-cols-2"
          variants={itemVariants}
        >
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Klíčové dovednosti</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="default" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 text-2xl font-semibold">Certifikáty</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {certificates.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square w-full overflow-hidden rounded-lg"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}