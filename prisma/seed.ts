// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client'
import { blogPosts, blogCategories } from '../lib/blog-data'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

function createSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

async function main() {
  console.log('Start seeding...')

  // 1. Vymažeme stará data pro čistý start
  console.log("Clearing previous data...");
  await prisma.comment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.blogView.deleteMany({});
  await prisma.contactSubmission.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Previous data cleared.");

  // 2. Vytvoření SuperAdmin uživatele s heslem
  console.log("Creating SuperAdmin user...");
  const password = "_?Cdj,jlf"; // DŮLEŽITÉ: Změň si toto na své vlastní bezpečné heslo!
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: 'ishchuktaras@gmail.com',
      name: 'Taras Ishchuk (SuperAdmin)',
      password: hashedPassword,
      role: Role.SUPERADMIN,
    },
  })
  console.log(`SuperAdmin user created: ${user.name}`)

  // 3. Vytvoření kategorií
  for (const category of blogCategories) {
    await prisma.category.create({ data: category })
  }
  console.log('Categories created.')

  // 4. Vytvoření všech unikátních tagů
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

  // 5. Vytvoření článků a jejich propojení s tagy
  for (const postData of blogPosts) {
    const category = await prisma.category.findUnique({ where: { slug: postData.category } });
    
    await prisma.post.create({
      data: {
        slug: postData.slug,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        published: true,
        authorId: user.id,
        categoryId: category?.id,
        createdAt: new Date(postData.date),
        tags: { 
          connect: postData.tags.map(tagName => ({ slug: createSlug(tagName) }))
        }
      },
    });
    console.log(`Created post: ${postData.title}`);
  }

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