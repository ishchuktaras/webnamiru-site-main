// lib/data.ts

import {
  Star,
  Zap,
  Crown,
  Camera,
  TrendingUp,
  Users,
  Code,
  MapPin,
  Heart,
  Car,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Anchor,
  Leaf,
  PenTool,
  Hotel,
  BrainCircuit,
  GraduationCap,
  Award,
} from "lucide-react";

export const servicePackages = [
  {
    name: "Digitální Základ",
    price: "od 80 000 Kč",
    originalPrice: null,
    description:
      "Pro profesionály a menší firmy, které potřebují špičkovou a výkonnou online prezentaci postavenou na moderních technologiích.",
    features: [
      "Zakázkový design na míru",
      "Vývoj na Next.js & React",
      "Responzivita pro všechna zařízení",
      "Základní SEO optimalizace",
      "Redakční systém pro správu obsahu",
      "Nasazení a konfigurace",
    ],
    targetAudience: "Profesionální služby, menší SME, prémiové služby.",
    icon: Star,
    popular: false,
    timeline: "3-4 týdny",
    support: "Email podpora",
  },
  {
    name: "Motor Růstu",
    price: "od 150 000 Kč",
    originalPrice: null,
    description:
      "Pro rostoucí firmy a prémiové služby, které vyžadují pokročilé funkce, jako jsou rezervační systémy nebo platební brány.",
    features: [
      "Vše z balíčku Digitální Základ",
      "Integrace rezervačních systémů",
      "Napojení platebních bran (e-commerce)",
      "Integrace s CRM a API třetích stran",
      "Pokročilá analytika a reporting",
      "Prioritní podpora",
    ],
    targetAudience: "Prémiový turismus, rostoucí SME, specializované e-shopy.",
    icon: Zap,
    popular: true,
    timeline: "4-6 týdnů",
    support: "Email + telefonní podpora",
  },
  {
    name: "Řešení na Míru",
    price: "Individuální",
    originalPrice: null,
    description:
      "Pro zavedené B2B firmy a projekty s komplexními požadavky na míru, jako jsou klientské portály nebo napojení na ERP.",
    features: [
      "Vše z balíčku Motor Růstu",
      "Vývoj B2B klientských portálů",
      "Integrace s ERP a firemními systémy",
      "Pokročilé bezpečnostní protokoly",
      "Neomezená škálovatelnost a výkon",
      "Dlouhodobé strategické partnerství",
    ],
    targetAudience: "Výrobní firmy, B2B sektor, technologické startupy.",
    icon: Crown,
    popular: false,
    timeline: "Individuální",
    support: "Dedikovaná podpora",
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
    question: 'Co přesně znamená "strategický web" a jak mi pomůže?',
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
    client: "Spilka 'Ukrajinská kavárna'",
    subtitle: "Komunitní projekt v Jihlavě",
    category: "Komunita & Spolky",
    location: "Jihlava, Kraj Vysočina",
    instagram: null,
    imageUrl: "/images/blog/remeslnik.jpeg",
    challenge:
      "Vybudovat online platformu pro sjednocení ukrajinské komunity, sdílení událostí a prezentaci činnosti nově vznikajícího spolku.",
    solution:
      "Nasazení redakčního systému na míru pro snadnou správu obsahu, kalendáře akcí a blogu. Důraz na dvojjazyčnost (CZ/UA) a jednoduchost pro členy.",
    result:
      "Cílem je zvýšit povědomí, zjednodušit organizaci akcí a přilákat nové členy a podporovatele.",
    technologies: [
      "Next.js",
      "React",
      "CMS na míru",
      "Kalendář akcí",
      "Dvojjazyčnost",
    ],
    metrics: [
      { label: "Cíl členů", value: "50+" },
      { label: "Počet akcí", value: "1+/měsíc" },
      { label: "Organický dosah", value: "Cíl 2k/měsíc" },
    ],
    link: "/pripadove-studie/coming-soon",
    icon: Users,
    color: "from-orange-500 to-yellow-500",
  },
  {
    client: "Penzion U Jezera",
    subtitle: "Ubytování v Telči",
    category: "Tourism",
    location: "Telč",
    imageUrl: "/images/blog/designer.jpeg",
    challenge:
      "Nízká obsazenost mimo sezónu a nedostatečná online viditelnost v konkurenčním prostředí.",
    solution:
      "Optimalizoval jsem web pro lokální SEO, integroval moderní rezervační systém a spustil cílené marketingové kampaně.",
    result:
      "+25% obsazenosti v mimosezónních měsících a nárůst přímých rezervací.",
    technologies: [
      "Next.js",
      "React",
      "Booking System",
      "SEO Optimization",
      "Vercel",
    ],
    metrics: [
      { label: "Obsazenost", value: "+25%" },
      { label: "Přímé rezervace", value: "+40%" },
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
    imageUrl: "/images/website-hero.jpg",
    challenge:
      "Chyběla online platforma pro prodej lokálních produktů a vyprávění příběhu farmy.",
    solution:
      "Vytvořil jsem e-shop s jednoduchou správou produktů, integroval platební bránu a navrhl vizuální identitu zdůrazňující autentičnost.",
    result:
      "Spuštění online prodeje s průměrným měsíčním obratem 30 000 Kč během prvních 3 měsíců.",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Měsíční obrat", value: "30k Kč" },
      { label: "Konverzní poměr", value: "3.2%" },
    ],
    link: "/pripadove-studie/coming-soon",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
];

export const certificates = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Magisterský titul (Mgr.) v Ekonomii a Státní správě",
    institution: "VŠE Kyiv, Ukrajina ",
    description: "Obor: Státní správa a regionální rozvoj",
    year: "2012",
  },
  {
    id: 3,
    icon: Award,
    title: "Certifikace Webdevelopment",
    institution: "IT Step Academy",
    description: "Specializace: Moderní webové technologie (Frontend)",
    year: "2024",
  },
  {
    id: 4,
    icon: Award,
    title: "Jazykový certifikát (B1)",
    institution: "Státní jazyková zkouška",
    description: "Středně pokročilá úroveň anglického jazyka",
    year: "2022",
  },
];

export const skills = [
  "Next.js",
  "NEST.js",
  "Docker",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Shadcn/ui",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Vercel",
  "Git",
];

export const achievements = [
  {
    icon: Users,
    title: "24 regionů",
    description: "Řízení implementace prodejních systémů",
  },
  {
    icon: TrendingUp,
    title: "Ekonomické vzdělání",
    description: "Magisterský titul v ekonomii a státní správa",
  },
  {
    icon: Code,
    title: "Modern Stack",
    description: "Certifikace v moderních web technologiích",
  },
  {
    icon: MapPin,
    title: "Kraj Vysočina",
    description: "Specializace na regionální rozvoj",
  },
];

export const developmentPrinciples = [
  {
    icon: Users,
    principle: "Uživatel na prvním místě",
    description:
      "Každý řádek kódu a každý pixel designu má jediný cíl: vytvořit pro vašeho koncového uživatele co nejlepší a nejpříjemnější zážitek. Intuitivní ovládání a rychlost jsou absolutní prioritou.",
    name: "User-Centric Design",
    title: "Princip #1",
  },
  {
    icon: Zap,
    principle: "Technologie, které dávají smysl",
    description:
      "Nevyužívám technologie jen proto, že jsou moderní. Sázím na ověřený stack (Next.js, React), který zaručuje špičkový výkon, bezpečnost a budoucí rozšiřitelnost. Váš web poběží jako hodinky.",
    name: "Moderní a výkonný Stack",
    title: "Princip #2",
  },
  {
    icon: BrainCircuit,
    principle: "Chytřejší řešení s pomocí AI",
    description:
      "Využívám umělou inteligenci tam, kde to přináší reálnou hodnotu – od optimalizace SEO a obsahu až po personalizaci uživatelského zážitku. Nechte stroje pracovat pro váš byznys.",
    name: "AI-Powered",
    title: "Princip #3",
  },
];
