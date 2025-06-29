"use client";

import Footer from "@/components/Footer";
import HeroSection from "@/components/hero-section";
import ProblemSection from "@/components/problem-section";
import SolutionSection from "@/components/solution-section";
import ForWhomSection from "@/components/for-whom-section";
import TestimonialsSection from "@/components/testimonials-section";
import ProcessSection from "@/components/process-section";
import ServicePackagesSection from "@/components/service-packages-section";
import FaqSection from "@/components/faq-section";
import ContactInfoSection from "@/components/contact-info-section";
import PartnersSection from "@/components/partners-section";
import { Suspense } from "react";
import PartnersPackagesSection from "@/components/partners-packages-section";
import CaseStudiesSection from "@/components/case-studies-section";
import AboutMeContent from "@/components/about-me-content";
import MaintenancePackagesSection from "@/components/MaintenancePackagesSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<div>Načítám...</div>}>
        <ProblemSection />
        <SolutionSection />
        <ForWhomSection />
        <TestimonialsSection />
        <ProcessSection />
        <ServicePackagesSection />
        <MaintenancePackagesSection />
        <CaseStudiesSection />
        <PartnersPackagesSection />
        <PartnersSection />
        <AboutMeContent />
        <FaqSection />
        <ContactInfoSection />
      </Suspense>
      <Footer />
    </main>
  );
}
