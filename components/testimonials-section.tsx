// components/testimonials-section.tsx
'use client';

import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SectionWrapper from './SectionWrapper';
import { developmentPrinciples } from '@/lib/data';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function TestimonialsSection() {
  // Pojistka pro případ, že by data nebyla dostupná
  if (!developmentPrinciples || developmentPrinciples.length === 0) {
    return null; // Nebo zobrazit nějaký placeholder
  }

  return (
    <SectionWrapper
      id="principles-section"
      badgeText="Moje principy"
      title="Co můžete od naší spolupráce očekávat?"
      subtitle="Místo prázdných slibů se soustředím na konkrétní hodnoty a principy, které přináším do každého projektu."
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <motion.div
        className="mx-auto mt-16 max-w-7xl"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {developmentPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div className="p-1" variants={itemVariants}>
                    <Card className="flex h-full flex-col justify-between rounded-2xl shadow-lg">
                      <CardContent className="flex flex-col p-8">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">{principle.principle}</h3>
                        <p className="mt-4 flex-grow text-muted-foreground">
                          {principle.description}
                        </p>
                        <div className="mt-8">
                          <p className="font-semibold">{principle.name}</p>
                          <p className="text-sm text-muted-foreground">{principle.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </motion.div>
    </SectionWrapper>
  );
}