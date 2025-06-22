import CaseStudiesSection from "@/components/case-studies-section";
import { Suspense } from "react";
import Loading from "../loading"; // Předpokládáme, že máte loading.tsx

export default function CaseStudiesPage() {
  return (
    <main className="flex-1">
      <Suspense fallback={<Loading />}>
        <CaseStudiesSection />
      </Suspense>
    </main>
  );
}
