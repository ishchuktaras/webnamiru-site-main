export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string // V reálné aplikaci by to mohl být Markdown nebo HTML
}

export const blogPosts: BlogPost[] = [
  {
    slug: "strategie-pro-uspesny-web",
    title: "Strategie pro úspěšný web: Víc než jen design",
    date: "2025-06-20",
    author: "Taras Ishchuk",
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
      
      <p><strong>Výsledkem je web, který nejen skvěle vypadá, ale především aktivně pracuje pro váš byznys a přináší měřitelné výsledky.</strong></p>
    `,
  },
  {
    slug: "responzivni-design-proc-je-dulezity",
    title: "Responzivní design: Proč je dnes nezbytný pro každý web?",
    date: "2025-06-15",
    author: "Taras Ishchuk",
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
      
      <p><strong>Investice do responzivního designu je investicí do budoucnosti vašeho online podnikání.</strong></p>
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
