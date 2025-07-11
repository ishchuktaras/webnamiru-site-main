import PartnersPackagesSection from "@/components/partners-packages-section";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerství - Web na míru",
  description:
    "Výhodné podmínky spolupráce pro fotografy, designéry, marketology a project managery. Provize 15-30%.",
};

export default function PartnersPackagesPage() {
  return (
    <main className="flex flex-col min-h-[calc(100svh-64px)]">
      <PartnersPackagesSection />
      <Footer />
    </main>
  );
}
