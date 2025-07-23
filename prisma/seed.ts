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

// Data nyní žijí přímo zde, skript je soběstačný
const blogCategories = [
  { slug: 'webdevelopment', name: 'Webdevelopment', color: '#3b82f6' },
  { slug: 'seo', name: 'SEO & Marketing', color: '#22c55e' },
  { slug: 'design', name: 'Design & UX', color: '#8b5cf6' },
  { slug: 'business', name: 'Business & Strategie', color: '#f97316' },
  { slug: 'technologie', name: 'Technologie', color: '#ef4444' },
];

const blogPosts: BlogPost[] = [
  {
    slug: 'strategie-pro-uspesny-web',
    title: 'Strategie pro úspěšný web: Víc než jen design',
    date: '2025-07-20',
    author: 'Taras Ishchuk',
    category: 'business',
    tags: ['strategie', 'business', 'roi', 'webdevelopment'],
    readingTime: 8,
    imageUrl: '/images/blog/strategie-webu.jpeg',
    published: true,
    excerpt: 'Vytvoření webu, který skutečně vydělává, vyžaduje promyšlenou strategii. Přečtěte si, jak propojuji ekonomické znalosti s webdevelopmentem pro maximální návratnost investice.',
    content: `<p>V dnešní digitální době nestačí mít jen "hezký" web. Aby váš web skutečně fungoval jako obchodní nástroj, musí být postaven na pevné strategii. Mnoho firem investuje do designu a kódu, ale zapomíná na to nejdůležitější: <strong>proč web vlastně potřebují a jaké cíle má plnit.</strong></p>`,
  },
  {
    slug: 'responzivni-design-proc-je-dulezity',
    title: 'Responzivní design: Proč je dnes nezbytný pro každý web?',
    date: '2025-07-15',
    author: 'Copywriter',
    category: 'design',
    tags: ['responzivni-design', 'mobile', 'ux', 'seo'],
    readingTime: 6,
    imageUrl: '/images/blog/responzivni-design.jpeg',
    published: true,
    excerpt: 'Většina uživatelů dnes přistupuje k internetu z mobilních zařízení. Zjistěte, proč je responzivní design klíčový pro úspěch vašeho webu a jak ovlivňuje SEO.',
    content: `<p>Responzivní design je přístup k webdesignu, který zajišťuje, že se webová stránka automaticky přizpůsobí velikosti obrazovky zařízení. Ať už si váš web prohlíží uživatel na velkém monitoru, notebooku, tabletu nebo mobilním telefonu, vždy se mu zobrazí optimálně.</p>`,
  },
  {
    slug: 'seo-optimalizace-pro-male-firmy',
    title: 'Lokální SEO: Jak dostat vaši firmu na mapu Vysočiny',
    date: '2025-07-10',
    author: 'Taras Ishchuk',
    category: 'seo',
    tags: ['seo', 'lokalni-seo', 'vysocina', 'male-firmy'],
    readingTime: 10,
    imageUrl: '/images/blog/seo-optimalizace.jpeg',
    published: true,
    excerpt: 'Lokální SEO je pro malé firmy klíčové. Naučte se, jak optimalizovat svůj web pro místní vyhledávání a získat více zákazníků z regionu Jihlava, Třebíč a okolí.',
    content: `<p>Pro malé firmy na Vysočině je lokální SEO často rozhodující. Zatímco velké firmy bojují v celonárodním měřítku, vy můžete dominovat ve svém regionu.</p>`,
  },
  {
    slug: '5-nejcastejsich-chyb-na-webech',
    title: '5 Nejčastějších Chyb na Webech Firem z Vysočiny',
    date: '2025-06-28',
    author: 'Copywriter',
    category: 'webdevelopment',
    tags: ['chyby', 'webdesign', 'ux', 'vysocina'],
    readingTime: 7,
    imageUrl: '/images/blog/webove-chyby.jpeg',
    published: false, // Tento článek necháme jako nepublikovaný pro testování
    excerpt: 'Od zastaralého designu po chybějící kontaktní údaje. Projděte si seznam nejčastějších prohřešků, které brzdí růst místních firem online.',
    content: `<p>Zkontrolujte si, zda se nedopouštíte stejných chyb, které stojí vaše konkurenty cenné zákazníky. Správně postavený web je základem úspěchu.</p>`,
  },
];

function createSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function main() {
  console.log('Start seeding...');

  // 1. Vymazání starých dat pro čistý start
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
      image: '/images/zakladatel.jpg' // Přidána fotka autora
    },
  });

  const hashedPasswordEditor = await bcrypt.hash('editorpassword', 10);
  const editor = await prisma.user.create({
    data: {
      email: 'copywriter@webnamiru.site',
      name: 'Karel Novák (Copywriter)',
      password: hashedPasswordEditor,
      role: Role.EDITOR,
      image: '/placeholder-user.jpg' // Placeholder pro copywritera
    },
  });
  console.log('Users created.');

  // 3. Vytvoření kategorií - Používáme createMany pro efektivitu
  console.log('Creating categories...');
  await prisma.category.createMany({
    data: blogCategories,
    skipDuplicates: true,
  });
  console.log('Categories created.');

  // 4. Vytvoření všech unikátních tagů - Používáme createMany pro efektivitu
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