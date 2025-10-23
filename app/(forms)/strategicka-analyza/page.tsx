// app/strategicka-analyza/page.tsx
import React from 'react';
import { StrategicAnalysisEmbed } from '@/components/StrategicAnalysisEmbed'; // Importuj komponentu

export const metadata = {
  title: 'Strategická Analýza | Web na míru',
  description: 'Vyplňte strategickou analýzu projektu pro Web na míru.',
};

export default function StrategicAnalysisPage() {
  const googleFormUrl = process.env.NEXT_PUBLIC_STRATEGIC_ANALYSIS_FORM_URL || "https://docs.google.com/forms/d/e/TVUJ_TVŮJ_ID_FORMULÁŘE/viewform?embedded=true"; // ZDE UPRAV URL SVÉHO FORMULÁŘE A NASTAV V .ENV

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-center">Strategická Analýza Projektu</h1>
      <p className="text-lg text-gray-400 mb-10 text-center max-w-2xl">
        Pro lepší pochopení vašich potřeb a vytvoření řešení přesně na míru, prosím, vyplňte náš dotazník.
      </p>

      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6">
        <StrategicAnalysisEmbed googleFormUrl={googleFormUrl} />
      </div>

      <p className="mt-8 text-gray-500 text-sm text-center">
        Vaše odpovědi nám pomohou připravit tu nejlepší nabídku.
      </p>
    </div>
  );
}