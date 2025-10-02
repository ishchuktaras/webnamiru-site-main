// components/testimonials-section.tsx
'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
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
import { testimonials } from '@/lib/data'; 

// Varianty animací
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
  return (
    <SectionWrapper
      id="testimonials-section"
      badgeText="Reference"
      title="Co říkají moji klienti?"
      subtitle="Důvěra a spokojenost mých partnerů je pro mě na prvním místě. Přečtěte si, jak hodnotí naši spolupráci."
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
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div className="p-1" variants={itemVariants}>
                  <Card className="flex h-full flex-col justify-between rounded-2xl shadow-lg">
                    <CardContent className="flex flex-col p-8">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="mt-6 flex-grow text-muted-foreground">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-8 flex items-center gap-4">
                        <Image
                          src={testimonial.avatarUrl}
                          alt={`Fotka ${testimonial.name}`}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </motion.div>
    </SectionWrapper>
  );
}