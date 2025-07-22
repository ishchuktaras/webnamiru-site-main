export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readingTime: number // v minutách
  featured?: boolean
  image?: string
  seoTitle?: string
  seoDescription?: string
}

export const blogCategories = [
  { slug: "webdevelopment", name: "Webdevelopment", color: "blue" },
  { slug: "seo", name: "SEO & Marketing", color: "green" },
  { slug: "design", name: "Design & UX", color: "purple" },
  { slug: "business", name: "Business & Strategie", color: "orange" },
  { slug: "technologie", name: "Technologie", color: "red" },
] as const

export const blogPosts: BlogPost[] = [
  {
    slug: "strategie-pro-uspesny-web",
    title: "Strategie pro úspěšný web: Víc než jen design",
    date: "2025-01-20",
    author: "Taras Ishchuk",
    category: "business",
    tags: ["strategie", "business", "roi", "webdevelopment"],
    readingTime: 8,
    featured: true,
    image: "/images/blog/designer.jpeg",
    seoTitle: "Strategie pro úspěšný web 2025 | Web na míru",
    seoDescription:
      "Jak vytvořit web, který skutečně vydělává? Přečtěte si o strategickém přístupu k webdevelopmentu s důrazem na ROI a obchodní cíle.",
    excerpt:
      "Vytvoření webu, který skutečně vydělává, vyžaduje promyšlenou strategii. Přečtěte si, jak propojuji ekonomické znalosti s webdevelopmentem pro maximální návratnost investice.",
    content: `
      <p>V dnešní digitální době nestačí mít jen "hezký" web. Aby váš web skutečně fungoval jako obchodní nástroj, musí být postaven na pevné strategii. Mnoho firem investuje do designu a kódu, ale zapomíná na to nejdůležitější: <strong>proč web vlastně potřebují a jaké cíle má plnit.</strong></p>
      
      <h2>Proč je strategie klíčová?</h2>
      <p>Bez jasné strategie je web jako loď bez kormidla. Může vypadat krásně, ale nikam vás nedoveze. Strategický přístup zahrnuje:</p>
      <ul>
        <li><strong>Analýzu trhu a konkurence:</strong> Kdo jsou vaši zákazníci? Co dělají vaši konkurenti?</li>
        <li><strong>Definici cílů:</strong> Chcete generovat poptávky, zvyšovat prodeje, budovat značku, nebo něco jiného?</li>
        <li><strong>Identifikaci KPI:</strong> Jak budete měřit úspěch vašeho webu?</li>
        <li><strong>Cílovou skupinu:</strong> Pro koho je web určen a jak s ním bude interagovat?</li>
      </ul>
      
      <h2>Můj unikátní přístup</h2>
      <p>Jako ekonom s praxí v řízení prodejních systémů rozumím vašim obchodním cílům a dokážu je přetavit do funkčního webového řešení. Každý projekt začíná hloubkovou analýzou a definicí klíčových ukazatelů výkonnosti (KPIs). Teprve poté přichází na řadu technická realizace s využitím moderních technologií jako Next.js, React a Tailwind CSS.</p>
      
      <h2>Praktické kroky k úspěchu</h2>
      <p>Každý úspěšný web prochází těmito fázemi:</p>
      <ol>
        <li><strong>Strategická analýza:</strong> Definice cílů a KPIs</li>
        <li><strong>UX/UI design:</strong> Návrh zaměřený na konverze</li>
        <li><strong>Technická realizace:</strong> Moderní, rychlé a bezpečné řešení</li>
        <li><strong>Testování a optimalizace:</strong> Kontinuální vylepšování</li>
        <li><strong>Monitoring a reporting:</strong> Měření výsledků</li>
      </ol>
      
      <p><strong>Výsledkem je web, který nejen skvěle vypadá, ale především aktivně pracuje pro váš byznys a přináší měřitelné výsledky.</strong></p>
    `,
  },
  {
    slug: "responzivni-design-proc-je-dulezity",
    title: "Responzivní design: Proč je dnes nezbytný pro každý web?",
    date: "2025-01-15",
    author: "Taras Ishchuk",
    category: "design",
    tags: ["responzivni-design", "mobile", "ux", "seo"],
    readingTime: 6,
    featured: false,
    image: "/images/blog/responziv_design.jpeg",
    seoTitle: "Responzivní design 2025 - Proč je nezbytný pro každý web",
    seoDescription:
      "Zjistěte, proč je responzivní design klíčový pro úspěch vašeho webu. Vliv na SEO, uživatelskou zkušenost a konverze.",
    excerpt:
      "Většina uživatelů dnes přistupuje k internetu z mobilních zařízení. Zjistěte, proč je responzivní design klíčový pro úspěch vašeho webu a jak ovlivňuje SEO.",
    content: `
      <p>V dnešní době, kdy se chytré telefony a tablety staly nedílnou součástí našeho života, je responzivní design webových stránek naprostou nutností. Co to ale přesně znamená a proč je tak důležitý?</p>
      
      <h2>Co je responzivní design?</h2>
      <p>Responzivní design je přístup k webdesignu, který zajišťuje, že se webová stránka automaticky přizpůsobí velikosti obrazovky zařízení, na kterém je zobrazena. Ať už si váš web prohlíží uživatel na velkém monitoru, notebooku, tabletu nebo mobilním telefonu, vždy se mu zobrazí optimálně a bude plně funkční.</p>
      
      <h2>Proč je responzivní design klíčový?</h2>
      <ul>
        <li><strong>Uživatelská zkušenost:</strong> Uživatelé očekávají, že se web bude na jejich zařízení zobrazovat správně. Pokud se musí neustále posouvat do stran nebo přibližovat obsah, rychle web opustí.</li>
        <li><strong>SEO:</strong> Google a další vyhledávače preferují responzivní weby a penalizují ty, které nejsou optimalizovány pro mobilní zařízení. Responzivní design je tedy klíčový pro dobrou pozici ve výsledcích vyhledávání.</li>
        <li><strong>Širší dosah:</strong> S rostoucím počtem mobilních uživatelů se responzivní web stává nezbytným pro oslovení co nejširšího publika.</li>
        <li><strong>Jednodušší správa:</strong> Místo udržování několika verzí webu (pro desktop, tablet, mobil) spravujete pouze jednu, což šetří čas i náklady.</li>
      </ul>
      
      <h2>Statistiky, které mluví jasně</h2>
      <p>Podle nejnovějších dat:</p>
      <ul>
        <li>Více než 60% návštěv webů pochází z mobilních zařízení</li>
        <li>85% uživatelů očekává, že mobilní verze bude stejně dobrá jako desktopová</li>
        <li>53% uživatelů opustí web, pokud se nenačte do 3 sekund na mobilu</li>
      </ul>
      
      <p><strong>Investice do responzivního designu je investicí do budoucnosti vašeho online podnikání.</strong></p>
    `,
  },
  {
    slug: "seo-optimalizace-pro-male-firmy",
    title: "SEO optimalizace pro malé firmy na Vysočině",
    date: "2025-01-10",
    author: "Taras Ishchuk",
    category: "seo",
    tags: ["seo", "lokalni-seo", "vysocina", "male-firmy"],
    readingTime: 10,
    featured: true,
    image: "/images/blog/SEO_optimalizace.jpeg",
    seoTitle: "SEO pro malé firmy Vysočina | Lokální optimalizace 2025",
    seoDescription:
      "Kompletní průvodce SEO optimalizací pro malé firmy na Vysočině. Lokální SEO strategie, které skutečně fungují.",
    excerpt:
      "Lokální SEO je pro malé firmy na Vysočině klíčové. Naučte se, jak optimalizovat svůj web pro místní vyhledávání a získat více zákazníků z regionu.",
    content: `
      <p>Pro malé firmy na Vysočině je lokální SEO optimalizace často rozhodující mezi úspěchem a neúspěchem v online prostoru. Zatímco velké firmy bojují o pozice v celonárodním měřítku, vy můžete dominovat ve svém regionu s mnohem menším úsilím a rozpočtem.</p>
      
      <h2>Proč je lokální SEO tak důležité?</h2>
      <p>Statistiky ukazují, že:</p>
      <ul>
        <li>46% všech vyhledávání na Google má lokální charakter</li>
        <li>78% lokálních vyhledávání na mobilu vede k offline nákupu</li>
        <li>72% spotřebitelů navštíví obchod do 8 km od své polohy</li>
      </ul>
      
      <h2>Klíčové kroky pro lokální SEO na Vysočině</h2>
      
      <h3>1. Google My Business optimalizace</h3>
      <p>Váš Google My Business profil je základ lokálního SEO:</p>
      <ul>
        <li>Kompletní vyplnění všech informací</li>
        <li>Pravidelné přidávání fotografií</li>
        <li>Aktivní správa recenzí</li>
        <li>Aktualizace otevírací doby a kontaktů</li>
      </ul>
      
      <h3>2. Lokální klíčová slova</h3>
      <p>Zaměřte se na kombinace jako:</p>
      <ul>
        <li>"[vaše služba] Jihlava"</li>
        <li>"[vaše služba] Havlíčkův Brod"</li>
        <li>"[vaše služba] Třebíč"</li>
        <li>"[vaše služba] Vysočina"</li>
      </ul>
      
      <h3>3. Lokální obsah</h3>
      <p>Vytvářejte obsah relevantní pro region:</p>
      <ul>
        <li>Články o místních událostech</li>
        <li>Případové studie místních klientů</li>
        <li>Průvodce po regionu</li>
        <li>Spolupráce s místními firmami</li>
      </ul>
      
      <h2>Praktické tipy pro Vysočinu</h2>
      <p>Region Vysočina má své specifika, které můžete využít:</p>
      <ul>
        <li><strong>Menší konkurence:</strong> Snadnější dosažení top pozic</li>
        <li><strong>Silná komunita:</strong> Word-of-mouth marketing funguje výborně</li>
        <li><strong>Tradice a řemesla:</strong> Zdůrazněte místní tradice ve svém obsahu</li>
        <li><strong>Turistický potenciál:</strong> Využijte návštěvníky regionu</li>
      </ul>
      
      <p><strong>S správnou lokální SEO strategií můžete na Vysočině dosáhnout výborných výsledků s relativně malým rozpočtem.</strong></p>
    `,
  },
  {
    slug: "nextjs-vs-wordpress-co-vybrat",
    title: "Next.js vs WordPress: Co vybrat pro váš web v roce 2025?",
    date: "2025-01-05",
    author: "Taras Ishchuk",
    category: "technologie",
    tags: ["nextjs", "wordpress", "cms", "performance"],
    readingTime: 12,
    featured: false,
    image: "/images/blog/Next.js_WordPress.jpeg",
    seoTitle: "Next.js vs WordPress 2025 - Kompletní srovnání pro váš web",
    seoDescription:
      "Detailní srovnání Next.js a WordPress. Výhody, nevýhody a kdy použít kterou technologii pro váš web.",
    excerpt:
      "Vybíráte mezi Next.js a WordPress pro svůj nový web? Přečtěte si detailní srovnání obou technologií a zjistěte, která je pro vás lepší volba.",
    content: `
      <p>Při výběru technologie pro nový web se často dostanete k dilema: zvolit osvědčený WordPress, nebo moderní Next.js? Obě technologie mají své výhody a nevýhody. Pojďme si je detailně porovnat.</p>
      
      <h2>WordPress - osvědčený veterán</h2>
      
      <h3>Výhody WordPress:</h3>
      <ul>
        <li><strong>Snadná správa obsahu:</strong> Intuitivní administrace</li>
        <li><strong>Obrovská komunita:</strong> Tisíce pluginů a témat</li>
        <li><strong>SEO friendly:</strong> Výborné SEO možnosti</li>
        <li><strong>Rychlé nasazení:</strong> Web můžete mít hotový za pár hodin</li>
        <li><strong>Nízké náklady:</strong> Mnoho bezplatných řešení</li>
      </ul>
      
      <h3>Nevýhody WordPress:</h3>
      <ul>
        <li><strong>Bezpečnostní rizika:</strong> Časté cíl hackerů</li>
        <li><strong>Výkonnostní limity:</strong> Může být pomalý při vysoké zátěži</li>
        <li><strong>Závislost na pluginech:</strong> Může vést k nestabilitě</li>
        <li><strong>Pravidelné aktualizace:</strong> Nutná kontinuální údržba</li>
      </ul>
      
      <h2>Next.js - moderní řešení</h2>
      
      <h3>Výhody Next.js:</h3>
      <ul>
        <li><strong>Výkon:</strong> Extrémně rychlé načítání</li>
        <li><strong>SEO optimalizace:</strong> Server-side rendering</li>
        <li><strong>Škálovatelnost:</strong> Zvládne vysokou zátěž</li>
        <li><strong>Bezpečnost:</strong> Menší bezpečnostní rizika</li>
        <li><strong>Moderní technologie:</strong> React, TypeScript</li>
      </ul>
      
      <h3>Nevýhody Next.js:</h3>
      <ul>
        <li><strong>Vyšší náklady:</strong> Potřeba vývojáře</li>
        <li><strong>Složitější správa:</strong> Technické znalosti nutné</li>
        <li><strong>Delší vývoj:</strong> Více času na implementaci</li>
        <li><strong>Menší komunita:</strong> Méně ready-made řešení</li>
      </ul>
      
      <h2>Kdy zvolit WordPress?</h2>
      <p>WordPress je ideální volba, když:</p>
      <ul>
        <li>Potřebujete web rychle a levně</li>
        <li>Plánujete často měnit obsah</li>
        <li>Máte omezený rozpočet</li>
        <li>Nepotřebujete specifické funkcionality</li>
        <li>Chcete spravovat web sami</li>
      </ul>
      
      <h2>Kdy zvolit Next.js?</h2>
      <p>Next.js je lepší volba, když:</p>
      <ul>
        <li>Výkon je prioritou</li>
        <li>Plánujete vysokou návštěvnost</li>
        <li>Potřebujete specifické funkcionality</li>
        <li>Máte rozpočet na kvalitní řešení</li>
        <li>Chcete moderní, budoucnost-proof web</li>
      </ul>
      
      <h2>Moje doporučení</h2>
      <p>Pro většinu malých a středních firem na Vysočině doporučuji <strong>Next.js</strong>. Ano, počáteční investice je vyšší, ale dlouhodobě se vyplatí díky:</p>
      <ul>
        <li>Lepšímu výkonu a SEO</li>
        <li>Nižším nákladům na údržbu</li>
        <li>Větší bezpečnosti</li>
        <li>Možnosti budoucího rozšiřování</li>
      </ul>
      
      <p><strong>Investice do kvalitního Next.js webu je investice do budoucnosti vašeho podnikání.</strong></p>
    `,
  },
  {
    slug: "webove-trendy-2025",
    title: "Webové trendy 2025: Co bude letos důležité?",
    date: "2025-01-01",
    author: "Taras Ishchuk",
    category: "design",
    tags: ["trendy", "design", "ux", "ai"],
    readingTime: 7,
    featured: false,
    image: "/images/blog/webové_trendy.jpeg",
    seoTitle: "Webové trendy 2025 - Co bude letos v designu důležité",
    seoDescription:
      "Objevte nejdůležitější webové trendy roku 2025. AI integrace, minimalistický design, dark mode a další trendy.",
    excerpt:
      "Rok 2025 přináší nové trendy ve webdesignu. Od AI integrace po udržitelný design - zjistěte, co bude letos důležité pro váš web.",
    content: `
      <p>Rok 2025 je zde a s ním přichází nové trendy ve webdesignu a vývoji. Jako webdeveloper specializující se na Vysočinu sleduji globální trendy a adaptuji je pro potřeby místních firem. Pojďme se podívat na to, co bude letos důležité.</p>
      
      <h2>1. AI integrace do webů</h2>
      <p>Umělá inteligence už není sci-fi, ale realita:</p>
      <ul>
        <li><strong>AI chatboty:</strong> Pokročilé zákaznické služby 24/7</li>
        <li><strong>Personalizace obsahu:</strong> Obsah přizpůsobený každému návštěvníkovi</li>
        <li><strong>Automatické SEO:</strong> AI optimalizace pro vyhledávače</li>
        <li><strong>Generování obsahu:</strong> AI asistenti pro tvorbu textů</li>
      </ul>
      
      <h2>2. Minimalistický design s účelem</h2>
      <p>Méně je více, ale s jasným cílem:</p>
      <ul>
        <li>Čisté, přehledné layouty</li>
        <li>Důraz na bílé prostory</li>
        <li>Jasná call-to-action tlačítka</li>
        <li>Rychlé načítání díky jednoduchosti</li>
      </ul>
      
      <h2>3. Dark mode jako standard</h2>
      <p>Tmavý režim už není jen trendem:</p>
      <ul>
        <li>Šetří baterii na mobilních zařízeních</li>
        <li>Snižuje únavu očí</li>
        <li>Vypadá moderně a elegantně</li>
        <li>Preferuje ho stále více uživatelů</li>
      </ul>
      
      <h2>4. Mikro-interakce a animace</h2>
      <p>Malé detaily, velký dopad:</p>
      <ul>
        <li>Hover efekty na tlačítkách</li>
        <li>Smooth scrolling</li>
        <li>Loading animace</li>
        <li>Feedback při akcích uživatele</li>
      </ul>
      
      <h2>5. Udržitelný web design</h2>
      <p>Ekologie i ve webdesignu:</p>
      <ul>
        <li>Optimalizace pro nižší spotřebu energie</li>
        <li>Menší velikosti souborů</li>
        <li>Efektivní hosting</li>
        <li>Green web certifikace</li>
      </ul>
      
      <h2>6. Voice User Interface (VUI)</h2>
      <p>Hlasové ovládání na vzestupu:</p>
      <ul>
        <li>Optimalizace pro hlasové vyhledávání</li>
        <li>Voice search SEO</li>
        <li>Hlasové navigace</li>
        <li>Accessibility vylepšení</li>
      </ul>
      
      <h2>Co to znamená pro firmy na Vysočině?</h2>
      <p>Nemusíte implementovat všechny trendy najednou. Doporučuji postupný přístup:</p>
      <ol>
        <li><strong>Začněte s AI chatbotem</strong> - okamžitě zlepší zákaznický servis</li>
        <li><strong>Přidejte dark mode</strong> - jednoduchá implementace, velký dopad</li>
        <li><strong>Optimalizujte výkon</strong> - udržitelnost a rychlost v jednom</li>
        <li><strong>Vylepšete mikro-interakce</strong> - lepší uživatelská zkušenost</li>
      </ol>
      
      <p><strong>Trendy jsou důležité, ale vždy musí sloužit vašim obchodním cílům. Nejdříve strategie, pak trendy.</strong></p>
    `,
  },
]

// Function to get a single blog post by its slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogPosts.find((post) => post.slug === slug) || null
}

// Function to get all blog post slugs for static generation
export async function getPostSlugs(): Promise<string[]> {
  return blogPosts.map((post) => post.slug)
}

// Function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category)
}

// Function to get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

// Function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

// Function to get recent posts
export function getRecentPosts(limit = 5): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
}

// Function to search posts
export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase()
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery),
  )
}

// Function to get all unique tags
export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap((post) => post.tags)
  return [...new Set(allTags)].sort()
}

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateShort(dateString: string | Date): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
