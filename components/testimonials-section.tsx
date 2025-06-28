// components/testimonials-section.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Heart, Target, Users, Lightbulb, Shield } from "lucide-react";
import SectionWrapper from "./SectionWrapper"; 
export default function TestimonialsSection() {
    
  const values = [
    {
      icon: GraduationCap,
      title: "Ekonomické vzdělání + IT dovednosti",
      description:
        "Magisterský titul v ekonomii a regionálním rozvoji mi umožňuje chápat váš byznys do hloubky, nejen technicky.",
      badge: "Unikátní kombinace",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Heart,
      title: "Osobní přístup a transparentnost",
      description:
        "Jako začínající podnikatel si vážím každého klienta. Dostanete mou plnou pozornost a pravidelné reporty o postupu.",
      badge: "100% transparentnost",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      icon: Target,
      title: "Zaměření na výsledky, ne jen design",
      description:
        "Každý web navrhuji s ohledem na vaše obchodní cíle. Nejde mi o 'hezký web', ale o nástroj, který vám přinese zákazníky.",
      badge: "ROI focused",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    },
    {
      icon: Users,
      title: "Specializace na Vysočinu",
      description:
        "Znám místní trh, konkurenci i specifika regionu. Pomůžu vám vyniknout mezi lokálními firmami a oslovit správné zákazníky.",
      badge: "Lokální expert",
      color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    },
    {
      icon: Lightbulb,
      title: "Inovativní řešení za férové ceny",
      description:
        "Jako startup nabízím moderní technologie a kreativní přístupy za ceny, které si může dovolit i menší firma.",
      badge: "Startup výhoda",
      color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: Shield,
      title: "Dlouhodobé partnerství",
      description:
        "Neopustím vás po dokončení webu. Nabízím kontinuální podporu, optimalizace a rozvoj podle vašeho růstu.",
      badge: "Spolehlivý partner",
      color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <SectionWrapper
      id="testimonials-section"
      title={<>Proč si vybrat <span className="text-blue-600">Web na míru</span>?</>}
      subtitle="Jsem začínající podnikatel s jasnou vizí: pomáhat firmám na Vysočině růst prostřednictvím strategických webových řešení. Zde je to, co vám mohu nabídnout."
      className="bg-gray-50 dark:bg-gray-950"
    >
      {/* Unikátní obsah sekce */}
      <div className="mx-auto grid max-w-6xl items-stretch gap-6 py-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {values.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div key={index}>
              <Card className="flex flex-col h-full p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 dark:bg-gray-900 border-l-4 border-l-blue-500 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${value.color.split(" ")[0]} ${value.color.split(" ")[1]}`}>
                      <IconComponent className={`h-6 w-6 ${value.color.split(" ")[2]} ${value.color.split(" ")[3]}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {value.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-left">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-left leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Můj závazek vůči vám</h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            Jako začínající podnikatel si uvědomuji, že každý projekt je pro mě příležitostí dokázat svou hodnotu.
            Proto do každého webu vkládám maximum energie, kreativity a odborných znalostí. Váš úspěch je můj úspěch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ✓ Osobní přístup ke každému projektu
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ✓ Pravidelná komunikace a reporty
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ✓ Férové ceny bez skrytých poplatků
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm">
              ✓ Podpora i po dokončení projektu
            </Badge>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}