// lib/data.ts

import { Star, Zap, Crown, Camera, TrendingUp, Users } from "lucide-react";

export const servicePackages = [
    {
      name: "START",
      price: "od 6 000 Kč",
      originalPrice: null,
      description:
        "Ideální pro živnostníky a jednotlivce, kteří potřebují profesionální online vizitku – rychle a efektivně.",
      features: [
        "Jednostránkový web nebo web do 3 podstránek",
        "Moderní, responzivní design",
        "Kontaktní formulář a interaktivní mapa",
        "Základní fotogalerie (do 15 fotografií)",
        "Propojení na sociální sítě",
        "Základní SEO optimalizace",
        "Nasazení na vaši doménu a hosting",
      ],
      targetAudience:
        "Řemeslníci, kadeřnice, fotografové, poradci, OSVČ ve službách.",
      icon: Star,
      popular: false,
      timeline: "1-2 týdny",
      support: "Email podpora",
    },
    {
      name: "RŮST",
      price: "od 12 000 Kč",
      originalPrice: "15 000 Kč",
      description:
        "Pro malé firmy a ambiciózní podnikatele, kteří chtějí nejen informovat, ale také aktivně prezentovat svou práci a budovat značku.",
      features: [
        "Vše z balíčku START",
        "Web s rozsahem do 7 podstránek",
        "Pokročilá galerie nebo portfolio",
        "Sekce pro reference a hodnocení",
        "Možnost založení blogu nebo sekce s novinkami",
        "Integrace Google Analytics",
        "Rozšířená on-page SEO optimalizace",
      ],
      targetAudience:
        "Kosmetické salony, menší stavební firmy, restaurace, penziony, designová studia.",
      icon: Zap,
      popular: true,
      timeline: "2-3 týdny",
      support: "Email + telefonní podpora",
    },
    {
      name: "EXPANZE",
      price: "Individuální",
      originalPrice: null,
      description:
        "Pro střední a větší firmy, e-shopy a projekty s komplexními požadavky, které chtějí dominovat svému trhu a maximalizovat online potenciál.",
      features: [
        "Vše z balíčku RŮST",
        "Neomezený počet podstránek",
        "Pokročilé funkce e-shopu (filtry, varianty, správa objednávek)",
        "Integrace s externími systémy (CRM, ERP)",
        "Pokročilá SEO a obsahová strategie",
        "Pravidelná analytika a reporting",
        "Prioritní podpora",
      ],
      targetAudience:
        "Střední a větší e-shopy, výrobní firmy s komplexním portfoliem, realitní kanceláře, vzdělávací instituce.",
      icon: Crown,
      popular: false,
      timeline: "4-6 týdnů",
      support: "Prioritní podpora 24/7",
    },
  ];

  export const faqs = [
    {
      question: "Proč bych si měl vybrat právě vás a ne zavedenou agenturu?",
      answer:
        "Získáte unikátní kombinaci experta, který je zároveň ekonom i developer. Komunikujete přímo se mnou, což zaručuje osobní přístup, hluboké pochopení vašich obchodních cílů a maximální flexibilitu. Navíc, jako začínající podnikatel nabízím špičkové technologie za férovější ceny.",
      category: "Obecné",
    },
    {
      question: "Co přesně znamená 'strategický web' a jak mi pomůže?",
      answer:
        "Strategický web není jen hezká online vizitka. Je to nástroj postavený na základě analýzy vašeho byznysu a trhu. Cílem není jen design, ale měřitelný výsledek – ať už je to více poptávek, online prodejů, nebo efektivnější prezentace. Každý prvek webu má svůj účel a směřuje k návratnosti vaší investice (ROI).",
      category: "Obecné",
    },
    {
      question: "Co znamená cena 'od X Kč' u vašich balíčků?",
      answer:
        "Cena 'od' představuje základní sazbu za funkce a rozsah uvedený v daném balíčku. Finální cena se může lišit na základě vašich specifických požadavků, například potřeby tvorby obsahu, složitějších grafických prvků nebo napojení na externí systémy. Po naší úvodní konzultaci vždy obdržíte pevnou a finální cenovou nabídku.",
      category: "Služby a Cenotvorba",
    },
    {
      question: "Co když mé požadavky nespadají do žádného z balíčků?",
      answer:
        "Balíčky slouží především pro orientaci. Většina mých projektů je plně individuálních a šitých na míru. Pokud máte specifické požadavky, je to ideální situace. Kontaktujte mě, probereme vaše potřeby a já vám zdarma a nezávazně připravím individuální řešení a cenovou nabídku.",
      category: "Služby a Cenotvorba",
    },
     {
      question: "Jak probíhá celý proces od poptávky po spuštění webu?",
      answer:
        "Můj proces je transparentní a efektivní: 1. **Úvodní konzultace** (zdarma). 2. **Analýza a strategie**. 3. **Cenová nabídka** a odsouhlasení. 4. **Záloha** a start projektu. 5. **Design a vývoj** s pravidelnými ukázkami. 6. **Testování a schválení**. 7. **Spuštění webu** a finální platba.",
      category: "Proces a Technologie",
    },
    {
      question: "Jaké technologie pro vývoj používáte?",
      answer:
        "Sázím na moderní a ověřený technologický stack, který zaručuje rychlost, bezpečnost a skvělý uživatelský prožitek. Primárně používám Next.js, React, TypeScript a pro styling Tailwind CSS. Tato kombinace mi umožňuje tvořit weby na světové úrovni.",
      category: "Proces a Technologie",
    },
    {
      question: "Co se děje po spuštění webu? Skončí tím naše spolupráce?",
      answer:
        "Určitě ne. Mým cílem je dlouhodobé partnerství. Každý projekt zahrnuje 30denní technickou záruku pro doladění detailů. Po této době nabízím volitelné balíčky správy a údržby, které zajistí, že váš web bude stále aktuální, bezpečný a funkční.",
      category: "Po Dokončení",
    },
    {
        question: "Musím si zajistit vlastní texty, fotky a hosting?",
        answer:
            "Ideální je, pokud máte vlastní obsah, protože nejlépe znáte svůj byznys. Pokud však texty nebo fotky nemáte, nevadí – mohu vám pomoci s jejich tvorbou nebo doporučit profesionály. Hosting a doménu v ceně nemám, ale rád vám poradím s výběrem a vše zařídím.",
        category: "Služby a Cenotvorba",
    },
    {
      question: "Jak se mohu stát vaším partnerem?",
      answer:
        "Je to jednoduché. Kontaktujte mě přes formulář nebo e-mailem s představou o partnerství. Probereme detaily, odsouhlasíme si provizní podmínky a můžete začít. Vy se postaráte o prvotní kontakt s klientem a já převezmu kompletní realizaci projektu.",
      category: "Partnerství",
    },
    {
      question: "Kdy a jak mi bude vyplacena provize za doporučení?",
      answer:
        "Provize je splatná ihned po tom, co doporučený klient uhradí finální fakturu za dokončený projekt. V ten moment vás požádám o vystavení vaší faktury na dohodnutou částku, kterou obratem proplatím. Vše je 100% transparentní.",
      category: "Partnerství",
    },
  ];

  export const caseStudies = [
    {
      client: "Angelina Vavzhyniak",
      subtitle: "Fotografka z Jihlavy",
      category: "Portfolio",
      location: "Jihlava",
      instagram: "@AVXXREZSEN",
      challenge:
        "Mladá talentovaná fotografka potřebovala profesionální web portfolio pro prezentaci své práce a získání nových klientů.",
      solution:
        "Vytvořil jsem moderní, responzivní portfolio web s galerií, kontaktním formulářem a integrací se sociálními sítěmi. Design zdůrazňuje její fotografickou práci.",
      result:
        "+60% nových klientů během 4 měsíců a profesionální online prezence.",
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "Lightbox Gallery",
        "Contact Forms",
      ],
      metrics: [
        { label: "Nárůst klientů", value: "+60%" },
        { label: "Doba načítání", value: "< 2s" },
        { label: "Mobile optimalizace", value: "100%" },
      ],
      link: "/pripadove-studie/coming-soon",
      icon: Camera,
      color: "from-pink-500 to-purple-600",
    },
    {
      client: "Penzion U Jezera",
      subtitle: "Ubytování v Telči",
      category: "Tourism",
      location: "Telč",
      challenge:
        "Nízká obsazenost mimo sezónu a nedostatečná online viditelnost v konkurenčním prostředí.",
      solution:
        "Optimalizoval jsem web pro lokální SEO, integroval moderní rezervační systém a spustil cílené marketingové kampaně.",
      result:
        "+25% obsazenosti v mimosezónních měsících a nárůst přímých rezervací.",
      technologies: [
        "WordPress",
        "Booking System",
        "SEO Optimization",
        "Google Analytics",
      ],
      metrics: [
        { label: "Obsazenost", value: "+25%" },
        { label: "Přímé rezervace", value: "+40%" },
        { label: "SEO ranking", value: "Top 3" },
      ],
      link: "/pripadove-studie/coming-soon",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-600",
    },
    {
      client: "Farma Zelený Kopec",
      subtitle: "Ekologická farma",
      category: "E-commerce",
      location: "Třebíč",
      challenge:
        "Chyběla online platforma pro prodej lokálních produktů a vyprávění příběhu farmy.",
      solution:
        "Vytvořil jsem e-shop s jednoduchou správou produktů, integroval platební bránu a navrhl vizuální identitu zdůrazňující autentičnost.",
      result:
        "Spuštění online prodeje s průměrným měsíčním obratem 30 000 Kč během prvních 3 měsíců.",
      technologies: [
        "Shopify",
        "Payment Gateway",
        "Inventory Management",
        "Brand Design",
      ],
      metrics: [
        { label: "Měsíční obrat", value: "30k Kč" },
        { label: "Konverzní poměr", value: "3.2%" },
        { label: "Zákazníci", value: "150+" },
      ],
      link: "/pripadove-studie/coming-soon",
      icon: Users,
      color: "from-green-500 to-emerald-600",
    },
  ];