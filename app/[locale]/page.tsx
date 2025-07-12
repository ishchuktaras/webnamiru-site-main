import { unstable_setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/hero-section';
import ForWhomSection from '@/components/for-whom-section';
import ProblemSection from '@/components/problem-section';
import SolutionSection from '@/components/solution-section';
import ProcessSection from '@/components/process-section';
import ServicePackagesSection from '@/components/service-packages-section';
import CaseStudiesSection from '@/components/case-studies-section';
import TestimonialsSection from '@/components/testimonials-section';
import FaqSection from '@/components/faq-section';

// Tento soubor bude nová hlavní stránka pro všechny jazyky
export default function Home({ params: { locale } }: { params: { locale: string } }) {
  // Nastaví jazyk pro statické generování
  unstable_setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <ForWhomSection />
      <ProblemSection />
      <SolutionSection />
      <ProcessSection />
      <ServicePackagesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}