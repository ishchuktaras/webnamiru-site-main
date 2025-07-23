import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
  image?: string;
}

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
    image: '/images/blog/strategie-webu.jpeg',
    excerpt: 'Vytvoření webu, který skutečně vydělává, vyžaduje promyšlenou strategii.',
    content: `<p>V dnešní digitální době nestačí mít jen "hezký" web. Aby váš web skutečně fungoval jako obchodní nástroj, musí být postaven na pevné strategii.</p>`,
  },
  {
    slug: 'responzivni-design-proc-je-dulezity',
    title: 'Responzivní design: Proč je dnes nezbytný pro každý web?',
    date: '2025-07-15',
    author: 'Copywriter',
    category: 'design',
    tags: ['responzivni-design', 'mobile', 'ux', 'seo'],
    readingTime: 6,
    image: '/images/blog/responzivni-design.jpeg',
    excerpt: 'Většina uživatelů dnes přistupuje k internetu z mobilních zařízení.',
    content: `<p>Responzivní design je přístup k webdesignu, který zajišťuje, že se webová stránka automaticky přizpůsobí velikosti obrazovky zařízení.</p>`,
  },
  // ... další články
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
    },
  });

  const hashedPasswordEditor = await bcrypt.hash('editorpassword', 10);
  const editor = await prisma.user.create({
    data: {
      email: 'copywriter@webnamiru.site',
      name: 'Karel Novák (Copywriter)',
      password: hashedPasswordEditor,
      role: Role.EDITOR,
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

  // 4. Vytvoření všech unikátních tagů
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
        imageUrl: postData.image,
        readingTime: postData.readingTime,
        published: true,
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