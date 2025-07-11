// app/[locale]/page.tsx

import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import ForWhomSection from "@/components/for-whom-section";
import TestimonialsSection from "@/components/testimonials-section";
import ProcessSection from "@/components/process-section";
import ServicePackagesSection from "@/components/service-packages-section";
import MaintenancePackagesSection from "@/components/MaintenancePackagesSection";
import CaseStudiesSection from "@/components/case-studies-section";
import PartnersPackagesSection from "@/components/partners-packages-section";
import FaqSection from "@/components/faq-section";
import ContactInfoSection from "@/components/contact-info-section";
import AboutMeSection from "@/components/about-me-section";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ForWhomSection />
      <TestimonialsSection />
      <ProcessSection />
      <ServicePackagesSection />
      <MaintenancePackagesSection />
      <CaseStudiesSection />
      <PartnersPackagesSection />
      <FaqSection />
      <ContactInfoSection />
      <AboutMeSection />
    </main>
  );
}