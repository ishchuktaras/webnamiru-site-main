// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Rozhraní pro typovou bezpečnost našich dat
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readingTime: number;
  imageUrl?: string;
  published: boolean;
}

// Data kategorií
const blogCategories = [
  { slug: 'webdevelopment', name: 'Webdevelopment', color: '#3b82f6' },
  { slug: 'seo', name: 'SEO & Marketing', color: '#22c55e' },
  { slug: 'design', name: 'Design & UX', color: '#8b5cf6' },
  { slug: 'business', name: 'Business & Strategie', color: '#f97316' },
  { slug: 'technologie', name: 'Technologie', color: '#ef4444' },
];

// Data článků s plně propracovaným obsahem
const blogPosts: BlogPost[] = [
  {
    slug: 'strategie-pro-uspesny-web',
    title: 'Strategie pro úspěšný web: Víc než jen hezký design',
    date: '2025-07-20',
    author: 'Taras Ishchuk',
    category: 'business',
    tags: ['strategie', 'business', 'roi', 'webdevelopment'],
    readingTime: 8,
    imageUrl: '/images/blog/designer.jpeg',
    published: true,
    excerpt: 'Přestaňte utrácet za online vizitky. Investujte do webu, který se stane motorem vašeho růstu. Jako ekonom a developer propojuji obchodní cíle s technickým řešením.',
    content: `
      <p>V dnešní digitální době nestačí mít jen "hezký" web. Aby váš web skutečně fungoval jako obchodní nástroj a přinášel měřitelnou hodnotu, musí být postaven na pevné strategii. Mnoho firem investuje desítky tisíc korun do designu a programování, ale zapomíná na to nejdůležitější: <strong>proč web vlastně potřebují a jaké konkrétní cíle má plnit.</strong> Výsledkem je často jen drahá online vizitka, která negeneruje poptávky a nepřináší zisk.</p>
      <h2>Proč je strategie klíčová?</h2>
      <p>Bez jasné strategie je web jako loď bez kormidla. Může vypadat krásně, ale nikam vás nedoveze. Efektivní strategický přístup zahrnuje několik klíčových fází, které definují celý projekt ještě před napsáním prvního řádku kódu:</p>
      <ul>
        <li><strong>Analýza trhu a konkurence:</strong> Kdo jsou vaši zákazníci? Jaké jsou jejich potřeby a co je pro ně důležité? Co dělají vaši konkurenti na Vysočině dobře a kde mají slabiny? Důkladná analýza nám umožní najít vaši unikátní pozici na trhu.</li>
        <li><strong>Definice cílů a Klíčových ukazatelů výkonnosti (KPIs):</strong> Co přesně od webu očekáváte? Chcete generovat více B2B poptávek, zvýšit přímé rezervace ve vašem penzionu, nebo budovat značku jako lokální výrobce? Každý cíl musí být měřitelný. Stanovíme si konkrétní KPIs, například "zvýšení počtu poptávek o 20 % za 6 měsíců".</li>
        <li><strong>Porozumění cílové skupině:</strong> Pro koho je web určen a jak se tito lidé chovají online? Vytvoříme si persony typických zákazníků a navrhneme uživatelskou cestu (user journey) tak, aby byla co nejjednodušší a vedla k požadované akci (konverzi).</li>
      </ul>
      <h2>Můj unikátní přístup: Ekonom + Developer</h2>
      <p>Díky mému magisterskému vzdělání v ekonomii se na každý projekt dívám primárně z pohledu byznysu a návratnosti investic (ROI). Nerozumím jen kódu, ale i vašim financím, trhu a obchodním cílům. Každý projekt začíná hloubkovou analýzou a vytvořením strategie na míru. Až poté přichází na řadu technická realizace s využitím moderních a výkonných technologií jako Next.js a React, která tuto strategii přetaví do funkčního a rychlého webu.</p>
      <p><strong>Výsledkem není jen web, který skvěle vypadá. Výsledkem je strategický nástroj, který aktivně pracuje pro váš byznys, oslovuje správné zákazníky a přináší měřitelné výsledky, které vidíte ve svých reportech i na bankovním účtu.</strong></p>`,
  },
  {
    slug: '5-nejcastejsich-chyb-na-webech',
    title: '5 Nejčastějších Chyb na Webech Firem z Vysočiny',
    date: '2025-07-18',
    author: 'Taras Ishchuk',
    category: 'webdevelopment',
    tags: ['chyby', 'webdesign', 'ux', 'vysocina'],
    readingTime: 7,
    imageUrl: '/images/blog/Chyby_webu.jpeg',
    published: true,
    excerpt: 'Od zastaralého designu po chybějící kontaktní údaje. Projděte si seznam nejčastějších prohřešků, které brzdí růst místních firem online a stojí je nemalé peníze.',
    content: `
      <p>Během své praxe a analýz webů na Vysočině narážím na několik zásadních chyb, které se na firemních prezentacích neustále opakují. Tyto chyby často vedou ke ztrátě důvěry, odchodu potenciálních zákazníků a v konečném důsledku ke snížení zisku. Přitom jejich náprava často není složitá a může mít obrovský dopad na vaši online úspěšnost. Zkontrolujte si, zda se jich nedopouštíte také.</p>
      <h3>1. Web není responzivní</h3>
      <p>V roce 2025 je neuvěřitelné, kolik webů stále není optimalizováno pro mobilní telefony. Více než 60 % návštěv dnes přichází z mobilních zařízení. Pokud se váš web na telefonu zobrazuje špatně, návštěvníci musí text přibližovat a posouvat do stran, je to pro ně frustrující zážitek. Okamžitě odcházejí ke konkurenci, která jim nabídne pohodlnější prohlížení.</p>
      <h3>2. Pomalé načítání stránek</h3>
      <p>Uživatelé jsou netrpěliví. Podle výzkumů Googlu, pokud se stránka načítá déle než 3 sekundy, více než polovina návštěvníků ji opustí. Pomalý web nejenže odrazuje zákazníky, ale je také penalizován vyhledávači, což znamená horší pozici ve výsledcích vyhledávání.</p>
      <h3>3. Neintuitivní a složitá navigace</h3>
      <p>Zlaté pravidlo zní: zákazník musí najít to, co hledá, na maximálně tři kliknutí. Pokud je struktura menu zmatená, názvy stránek nic neříkající a důležité informace jsou schované hluboko v webu, návštěvník se rychle ztratí a odejde.</p>
      <h3>4. Chybějící a nejasné Výzvy k akci (Call to Action - CTA)</h3>
      <p>Váš web musí návštěvníkovi na každém kroku jasně říkat, co má udělat. Chybějící nebo špatně viditelná tlačítka jako "Zjistit více", "Nezávazně poptat", "Kontaktujte nás" nebo "Koupit" vedou k tomu, že i zaujatý zákazník neprovede požadovanou akci, protože neví jak.</p>
      <h3>5. Zastaralé a neúplné kontaktní údaje</h3>
      <p>Zní to jako banalita, ale je to jedna z nejčastějších a nejhorších chyb. Telefonní číslo, e-mail a adresa musí být snadno dohledatelné, ideálně v patičce každé stránky. Pokud zákazník musí kontakt složitě hledat, je to signál neprofesionality a často ho to odradí.</p>
      <p>Vyvarování se těchto základních chyb je prvním a nejdůležitějším krokem k webu, který vám bude přivádět nové zákazníky, a ne je odrazovat.</p>`,
  },
    {
    slug: 'lokalni-seo-pro-vysocinu',
    title: 'Lokální SEO: Jak dostat vaši firmu na mapu Jihlavy a okolí',
    date: '2025-07-10',
    author: 'Copywriter',
    category: 'seo',
    tags: ['seo', 'lokalni-seo', 'vysocina', 'male-firmy', 'google'],
    readingTime: 10,
    imageUrl: '/images/blog/SEO_optimalizace.jpeg',
    published: true,
    excerpt: 'Pro malé a střední firmy na Vysočině je lokální SEO klíčové. Naučte se, jak optimalizovat svůj web a firemní profil, abyste byli vidět pro zákazníky z vašeho regionu.',
    content: `
      <p>Pro malé firmy na Vysočině je lokální SEO optimalizace často rozhodující mezi úspěchem a neúspěchem. Zatímco velké firmy bojují v celonárodním měřítku, vy můžete dominovat ve svém regionu s mnohem menším úsilím a rozpočtem.</p>
      <h2>Proč je lokální SEO tak důležité?</h2>
      <p>Statistiky ukazují, že téměř polovina všech vyhledávání na Googlu má lokální záměr. Lidé hledají "kavárna v okolí", "opravna obuvi Jihlava" nebo "ubytování Telč". Pokud na tyto dotazy nejste vidět, jako byste pro tyto zákazníky neexistovali.</p>
      <h3>Začněte s Firemním profilem na Googlu</h3>
      <p>Váš Firemní profil na Googlu (dříve Google My Business) je naprostý základ lokálního SEO a váš nejdůležitější bezplatný marketingový nástroj. Ujistěte se, že máte:</p>
      <ul>
        <li><strong>Kompletně vyplněné všechny informace:</strong> Přesná adresa, otevírací doba (včetně svátků), telefon, odkaz na web.</li>
        <li><strong>Pravidelně přidávané kvalitní fotografie:</strong> Ukažte svou provozovnu, produkty, tým. Fotky zvyšují důvěru a engagement.</li>
        <li><strong>Aktivně spravované recenze:</strong> Odpovídejte na všechny recenze, pozitivní i negativní. Ukazujete tím, že vám na zákaznících záleží.</li>
        <li><strong>Využívejte Příspěvky:</strong> Pravidelně přidávejte krátké aktuality, akce nebo novinky.</li>
      </ul>
      <h3>Optimalizace webu pro lokální vyhledávání</h3>
      <p>Váš web musí jasně komunikovat, kde působíte. Ujistěte se, že na klíčových místech, jako je titulek stránky, hlavní nadpis, patička a kontaktní stránka, máte uvedeno město nebo region (např. Jihlava, Vysočina).</p>
      <h4>Klíčová slova s lokálním zaměřením</h4>
      <p>Vytvářejte obsah a popisky služeb s využitím lokálních klíčových slov. Například místo "Prodej kvalitního medu" použijte "Prodej kvalitního včelího medu z Vysočiny".</p>`,
  },
  {
    slug: 'proc-remeslnik-potrebuje-web',
    title: 'Digitální vizitka nestačí: Proč řemeslník na Vysočině potřebuje web',
    date: '2025-06-25',
    author: 'Copywriter',
    category: 'business',
    tags: ['řemeslníci', 'lokální business', 'vysocina', 'poptavky'],
    readingTime: 6,
    imageUrl: '/images/blog/remeslnik.jpeg',
    published: true,
    excerpt: 'Spoléháte se jen na doporučení od známých? Profesionální web vám může přinést stálý přísun nových poptávek a ukázat kvalitu vaší práce lépe než jakákoliv vizitka.',
    content: `
      <p>Jste šikovný řemeslník, instalatér, truhlář nebo pokrývač, ale zakázky se nehrnou tak, jak byste si představovali? Možná je problém v tom, že vás potenciální zákazníci nemohou najít online. V dnešní době již nestačí spoléhat se jen na doporučení od známých – moderní zákazník si nejprve udělá průzkum na internetu.</p>
      <h2>Co vám kvalitní web přinese?</h2>
      <ul>
        <li><strong>Profesionální prezentace a reference:</strong> Místo posílání fotek přes telefon můžete zákazníkovi poslat odkaz na přehlednou galerii vaší práce. Ukažte své nejlepší realizace a dejte jim vyniknout.</li>
        <li><strong>Snadný a nepřetržitý sběr poptávek:</strong> Poptávkový formulář na webu pracuje pro vás 24 hodin denně, 7 dní v týdnu. Zákazník ho může vyplnit v klidu večer, aniž by vás musel rušit telefonem.</li>
        <li><strong>Zvýšení důvěryhodnosti:</strong> Web s vaším příběhem, certifikáty a recenzemi od spokojených zákazníků působí mnohem profesionálněji a důvěryhodněji než jen telefonní číslo v online inzerátu.</li>
        <li><strong>Nové zakázky z vyhledávačů:</strong> Lidé dnes hledají služby na Googlu a Seznamu. Pokud budete mít web optimalizovaný na dotazy jako "instalatér Třebíč" nebo "truhlářství Jihlava", zákazníci vás najdou sami.</li>
      </ul>
      <p>Investice do jednoduchého, ale profesionálního webu se vám může vrátit již s první větší zakázkou, kterou díky němu získáte.</p>`,
  },
  {
    slug: 'responzivni-design-proc-je-dulezity',
    title: 'Responzivní design: Nutnost pro každý moderní web',
    date: '2025-06-15',
    author: 'Taras Ishchuk',
    category: 'design',
    tags: ['responzivni-design', 'mobile', 'ux', 'seo'],
    readingTime: 5,
    imageUrl: '/images/blog/responziv_design.jpeg',
    published: true,
    excerpt: 'Věděli jste, že více než polovina návštěvníků vašeho webu přijde z mobilu? Pokud se jim stránka zobrazí špatně, okamžitě odcházejí ke konkurenci.',
    content: `
      <p>Možná jste ten termín už slyšeli, ale co přesně znamená? Responzivní design je přístup k tvorbě webových stránek, který zajišťuje, že se layout a obsah automaticky a inteligentně přizpůsobí jakékoliv velikosti obrazovky. Ať už si váš web někdo prohlíží na obrovském monitoru v kanceláři, na notebooku, tabletu nebo na malém displeji mobilního telefonu, obsah bude vždy perfektně čitelný a všechny prvky plně funkční.</p>
      <h2>Proč je to dnes absolutní standard?</h2>
      <p>Doby, kdy se tvořily speciální "mobilní verze" webu na subdoméně m.web.cz, jsou dávno pryč. Dnes existuje jediný správný přístup, a tím je responzivita. Důvody jsou pádné:</p>
      <ul>
        <li><strong>Dominance mobilních zařízení:</strong> Podle aktuálních statistik pochází více než 60 % veškeré internetové návštěvnosti z mobilních telefonů. Ignorovat tuto skupinu znamená dobrovolně se vzdát více než poloviny potenciálních zákazníků.</li>
        <li><strong>Uživatelská zkušenost (UX):</strong> Nikdo nechce na mobilu text přibližovat a posouvat stránku do všech stran, aby si přečetl nabídku. Frustrovaný návštěvník web opustí během několika sekund.</li>
        <li><strong>Klíčový faktor pro SEO:</strong> Vyhledávače jako Google a Seznam již několik let používají tzv. "mobile-first" indexaci. To znamená, že primárně hodnotí a indexují mobilní verzi vašeho webu. Pokud není kvalitní a responzivní, váš web bude ve výsledcích vyhledávání penalizován a ztratí pozice.</li>
        <li><strong>Zvýšení konverzí:</strong> Spokojený uživatel na mobilu s mnohem větší pravděpodobností odešle poptávku, zavolá vám nebo dokončí nákup. Responzivita přímo ovlivňuje vaše obchodní výsledky.</li>
      </ul>
      <p>Responzivní design dnes není "něco navíc", je to naprostý základ a hygienické minimum pro jakýkoliv web, který má ambici uspět v online prostředí.</p>`,
  },
    {
    slug: 'nextjs-vs-wordpress-co-vybrat',
    title: 'Next.js vs WordPress: Kdy se vyplatí investovat do řešení na míru?',
    date: '2025-06-05',
    author: 'Taras Ishchuk',
    category: 'technologie',
    tags: ['nextjs', 'wordpress', 'cms', 'vykon'],
    readingTime: 12,
    imageUrl: '/images/blog/Next.js_WordPress.jpeg',
    published: true,
    excerpt: 'Vybíráte mezi šablonovým řešením jako WordPress a webem na míru v Next.js? Přečtěte si detailní srovnání a zjistěte, která volba je pro váš byznys ta pravá.',
    content: `
      <p>Při výběru technologie pro nový web se mnoho podnikatelů dostane k dilema: zvolit globálně nejrozšířenější WordPress, nebo investovat do moderního řešení na míru postaveného na frameworku jako je Next.js? Obě technologie mají své místo, ale slouží k jiným účelům.</p>
      <h3>WordPress: Král šablon a jednoduchosti</h3>
      <p>WordPress je systém pro správu obsahu (CMS), který pohání obrovskou část internetu. Jeho hlavní síla spočívá v jednoduchosti a obrovském ekosystému hotových šablon a pluginů.</p>
      <strong>Výhody:</strong>
      <ul>
        <li><strong>Nízká počáteční cena:</strong> Tisíce šablon a pluginů jsou zdarma nebo za nízký poplatek.</li>
        <li><strong>Snadná správa obsahu:</strong> Administrace je velmi intuitivní pro psaní článků a úpravu textů.</li>
        <li><strong>Obrovská komunita:</strong> Vždy najdete návod nebo někoho, kdo vám poradí.</li>
      </ul>
      <strong>Nevýhody:</strong>
      <ul>
        <li><strong>Výkon:</strong> S větším počtem pluginů se web výrazně zpomaluje.</li>
        <li><strong>Bezpečnost:</strong> Kvůli své popularitě je častým cílem hackerů a vyžaduje neustálé aktualizace.</li>
        <li><strong>Omezená flexibilita:</strong> Jste vázáni možnostmi šablony a pluginů. Úpravy na míru jsou složité a drahé.</li>
      </ul>
      <h3>Next.js: Rychlost, bezpečnost a flexibilita na míru</h3>
      <p>Next.js je moderní React framework pro tvorbu webových aplikací. Nejedná se o hotový systém, ale o stavebnici pro vývojáře, která umožňuje vytvořit extrémně rychlé a bezpečné weby přesně na míru.</p>
      <strong>Výhody:</strong>
      <ul>
        <li><strong>Extrémní rychlost:</strong> Díky moderním technikám renderování (SSR, SSG) jsou stránky bleskově rychlé, což milují uživatelé i vyhledávače.</li>
        <li><strong>Vysoká bezpečnost:</strong> Architektura Next.js je mnohem méně náchylná k běžným typům útoků než monolitické systémy jako WordPress.</li>
        <li><strong>Neomezená flexibilita:</strong> Web může vypadat a fungovat naprosto jakkoliv. Nejste omezeni žádnou šablonou.</li>
        <li><strong>Lepší SEO:</strong> Moderní frameworky jsou pro optimalizaci pro vyhledávače jako stvořené.</li>
      </ul>
       <strong>Nevýhody:</strong>
      <ul>
        <li><strong>Vyšší počáteční náklady:</strong> Vývoj na míru je dražší než nákup hotové šablony.</li>
        <li><strong>Nutnost partnera:</strong> Pro správu a rozvoj potřebujete developera nebo agenturu.</li>
      </ul>
      <h3>Závěr: Kdy se co vyplatí?</h3>
      <p>Pro jednoduché blogy, osobní portfolia nebo malé firemní prezentace s omezeným rozpočtem může být <strong>WordPress</strong> stále dobrou volbou. Pokud to ale se svým online podnikáním myslíte vážně a vnímáte web jako klíčový obchodní nástroj, je investice do <strong>řešení na míru v Next.js</strong> dlouhodobě mnohem výhodnější. Získáte rychlost, bezpečnost a web, který poroste s vámi.</p>`,
  },
];


function createSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function main() {
  console.log('Start seeding...');

  // 1. Vymazání starých dat
  console.log('Clearing previous data...');
  await prisma.comment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.blogView.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Previous data cleared.');

  // 2. Vytvoření uživatelů
  console.log('Creating users...');
  const hashedPasswordAdmin = await bcrypt.hash('_?Cdj,jlf', 10);
  const superAdmin = await prisma.user.create({
    data: {
      email: 'ishchuktaras@gmail.com',
      name: 'Taras Ishchuk',
      password: hashedPasswordAdmin,
      role: Role.SUPERADMIN,
      image: '/images/zakladatel.jpg'
    },
  });

  const hashedPasswordEditor = await bcrypt.hash('editorpassword', 10);
  const editor = await prisma.user.create({
    data: {
      email: 'copywriter@webnamiru.site',
      name: 'Karel Novák (Copywriter)',
      password: hashedPasswordEditor,
      role: Role.EDITOR,
      image: '/placeholder-user.jpg'
    },
  });
  console.log('Users created.');

  // 3. Vytvoření kategorií
  console.log('Creating categories...');
  await prisma.category.createMany({
    data: blogCategories,
    skipDuplicates: true,
  });
  console.log('Categories created.');

  // 4. Vytvoření tagů
  console.log('Creating unique tags...');
  const allTags = new Set(blogPosts.flatMap((post) => post.tags));
  const tagData = Array.from(allTags).map(tagName => ({
    name: tagName,
    slug: createSlug(tagName),
  }));
  await prisma.tag.createMany({
    data: tagData,
    skipDuplicates: true,
  });
  console.log('All unique tags created.');

  // 5. Vytvoření článků
  console.log('Creating posts...');
  for (const postData of blogPosts) {
    const category = await prisma.category.findUnique({ where: { slug: postData.category } });
    const authorId = postData.author === 'Copywriter' ? editor.id : superAdmin.id;

    await prisma.post.create({
      data: {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        imageUrl: postData.imageUrl,
        readingTime: postData.readingTime,
        published: postData.published,
        authorId: authorId,
        categoryId: category?.id,
        createdAt: new Date(postData.date),
        tags: {
          connect: postData.tags.map((tagName: string) => ({
            slug: createSlug(tagName),
          })),
        },
      },
    });
    console.log(`Created post: ${postData.title}`);
  }
  console.log('Posts created.');

  console.log('Seeding finished. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });