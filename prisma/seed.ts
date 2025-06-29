// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { blogPosts, blogCategories } from '../lib/blog-data'

const prisma = new PrismaClient()

// Pomocná funkce pro získání náhodného čísla
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pomocná funkce pro vytvoření slugu
function createSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}


async function main() {
  console.log('Start seeding...')

  // 1. Vymažeme stará data pro čistý start
  console.log("Clearing previous data...");
  // Musíme mazat v pořadí, které neporuší vazby (nejprve "děti", pak "rodiče")
  await prisma.comment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.blogView.deleteMany({});
  // Prisma se postará o smazání záznamů v propojovací tabulce _PostToTag
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Previous data cleared.");

  // 2. Vytvoření výchozího uživatele (autora)
  const user = await prisma.user.create({
    data: {
      email: 'ishchuktaras@gmail.com',
      name: 'Taras Ishchuk',
    },
  })
  console.log(`Default user created: ${user.name}`)

  // 3. Vytvoření kategorií
  for (const category of blogCategories) {
    await prisma.category.create({ data: category })
  }
  console.log('Categories created.')
  
  // ZMĚNA: 4. Vytvoření všech unikátních tagů
  const allTags = new Set(blogPosts.flatMap((post) => post.tags));
  for (const tagName of allTags) {
      await prisma.tag.create({
          data: {
              name: tagName,
              slug: createSlug(tagName),
          },
      });
  }
  console.log('All unique tags created.');

  // 5. Vytvoření článků a k nim navázaných dat
  const createdPosts = [];
  for (const postData of blogPosts) {
    const category = await prisma.category.findUnique({ where: { slug: postData.category } });
    
    // Vytvoříme článek
    const newPost = await prisma.post.create({
      data: {
        slug: postData.slug,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        published: true,
        authorId: user.id,
        categoryId: category?.id,
        createdAt: new Date(postData.date),
        // ZMĚNA: Propojíme článek s již vytvořenými tagy
        tags: {
          connect: postData.tags.map(tagName => ({ slug: createSlug(tagName) }))
        }
      },
    });
    createdPosts.push(newPost);
    console.log(`Created post: ${newPost.title}`);

    // ZMĚNA: Přidáme ukázkové komentáře ke každému článku
    await prisma.comment.createMany({
        data: [
            { postId: newPost.id, originalAuthor: "Nadšený čtenář", originalEmail: "citatel@example.com", content: "Skvělý článek, moc mi pomohl!", approved: true },
            { postId: newPost.id, originalAuthor: "Kritický kolega", originalEmail: "kolega@example.com", content: "Zajímavé postřehy, díky za ně.", approved: true },
        ]
    });

    // ZMĚNA: Přidáme ukázková hodnocení ke každému článku
    for(let i = 0; i < getRandomInt(5, 20); i++) {
        await prisma.rating.create({
            data: {
                postId: newPost.id,
                value: getRandomInt(4, 5) // Jen dobrá hodnocení :)
            }
        });
    }
  }

  // 6. Generování fiktivních analytických dat (zobrazení a poptávky)
  console.log('Generating analytics data for the last 30 days...');
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    for (const post of createdPosts) {
      const dailyViews = getRandomInt(5, 50);
      for (let j = 0; j < dailyViews; j++) {
        await prisma.blogView.create({ data: { postId: post.id, createdAt: date } });
      }
    }
    if (i % 5 === 0) {
        await prisma.contactSubmission.create({
            data: { name: `Test Klient ${i}`, email: `klient${i}@example.com`, message: `Toto je automaticky generovaná testovací poptávka.`, status: "new", createdAt: date }
        });
    }
  }
  console.log('Finished generating analytics data.');

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })