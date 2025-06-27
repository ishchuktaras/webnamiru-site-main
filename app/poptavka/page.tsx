// /app/kontakt/page.tsx
"use client"

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceForm from '@/components/ServiceForm'; 
import PartnershipForm from '@/components/PartnershipForm';

// Komponenta, která se stará o logiku zobrazení správného formuláře
function ContactForm() {
  const searchParams = useSearchParams();
  const formType = searchParams.get('type'); // Získáme 'type' (service nebo partnership)
  const selectedPackage = searchParams.get('package'); // Získáme název balíčku, např. 'RŮST'

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        {/* Podmíněně zobrazíme jeden z formulářů */}
        {formType === 'partnership' ? (
          <PartnershipForm selectedPackage={selectedPackage} />
        ) : (
          <ServiceForm selectedPackage={selectedPackage} />
        )}
      </div>
    </section>
  );
}

// Hlavní exportovaná stránka
export default function KontaktPage() {
  return (
    // Suspense je zde pro správné fungování useSearchParams
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Načítání formuláře...</div>}>
      <ContactForm />
    </Suspense>
  );
}