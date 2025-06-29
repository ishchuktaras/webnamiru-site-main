import ServicePackagesSection from "@/components/service-packages-section";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balíčky služeb - Web na míru",
  description:
    "Detailní přehled našich balíčků služeb: START, RŮST, EXPANZE. Najděte ideální řešení pro váš web.",
};

export default function ServicePackagesPage() {
  return (
    <main className="flex flex-col min-h-[calc(100svh-64px)]">
      <ServicePackagesSection />
      <Footer />
    </main>
  );
}
