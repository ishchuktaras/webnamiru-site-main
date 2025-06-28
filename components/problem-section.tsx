// components/problem-section.tsx

"use client";

// ZMĚNA: Odstraněny importy pro useState a useEffect
import { TrendingDown, Users, Globe, CreditCard } from "lucide-react";
import SectionWrapper from './SectionWrapper';

export default function ProblemSection() {
  // Data pro sekci zůstávají
  const problems = [
    {
      icon: Globe,
      title: "13% podniků stále nemá webové stránky",
      description:
        "Podle ČSÚ má v roce 2024 webové stránky pouze 86,9% podniků. Ve stavebnictví je to dokonce jen 78,2%. Bez online prezentace ztrácíte konkurenceschopnost.",
      stat: "13% bez webu",
      source: "ČSÚ 2024",
    },
    {
      icon: CreditCard,
      title: "Většina webů neumožňuje online prodej",
      description:
        "Jen malé procento firem využívá pokročilé funkce webů - online objednávky, platby nebo sledování zakázek. Vaši zákazníci tak odcházejí ke konkurenci.",
      stat: "Nízká konverze",
      source: "Analýza trhu",
    },
    {
      icon: Users,
      title: "35% seniorů nad 65 let nepoužívá internet",
      description:
        "Přestože 78% lidí ve věku 55-74 let používá internet, starší generace stále zaostává. Pokud cílíte na tuto skupinu, potřebujete specifický přístup.",
      stat: "35% offline",
      source: "ČSÚ 2023",
    },
    {
      icon: TrendingDown,
      title: "Nízká přidaná hodnota IT služeb na Vysočině",
      description:
        "Průměrná přidaná hodnota na zaměstnance v IT sektorech je nižší než v Praze. Lokální firmy potřebují efektivnější digitální strategie pro růst.",
      stat: "Pod průměrem",
      source: "Regionální data",
    },
  ];

  return (
    <SectionWrapper
      dataSection="problem-section"
      title={<>Digitální propast českých firem: <span className="text-blue-600">Fakta z ČSÚ</span></>}
      subtitle="Analýza oficiálních statistik odhaluje konkrétní problémy, které brzdí digitalizaci podniků v České republice. Poznejte čísla, která stojí za zaostáváním vašich konkurentů."
      className="bg-gray-50 dark:bg-gray-900"
    >
      {/* Unikátní obsah sekce */}
      <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        {problems.map((problem, index) => {
          const IconComponent = problem.icon;
          return (
            // ZMĚNA: Odebrány atributy pro animaci (data-animate-item, style)
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{problem.stat}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{problem.source}</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{problem.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{problem.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-custom-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ekonomický dopad</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">23,625</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                aktivních programátorských firem v ČR (2023)
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+187%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">růst IT sektoru za posledních 13 let</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">81,145 Kč</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">průměrná mzda v programování (2023)</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          Zdroj dat: Český statistický úřad, Veřejná databáze, 2024
        </p>
      </div>
    </SectionWrapper>
  );
}