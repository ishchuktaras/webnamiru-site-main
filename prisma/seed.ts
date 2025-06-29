// prisma/seed.ts

import { PrismaClient } from "@prisma/client"
import { blogPosts, blogCategories } from "../lib/blog-data"

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Vymažeme stará data pro čistý start při každém spuštění seederu
  await prisma.comment.deleteMany({})
  await prisma.rating.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
  console.log("Cleared existing data.")

  // 1. Vytvoření výchozího uživatele (autora)
  const defaultUser = await prisma.user.create({
    data: {
      email: 'poptavka@webnamiru.cz',
      name: 'Taras Ishchuk',
    },
  })
  console.log(`Default user created: ${defaultUser.name}`)

  // 2. Vytvoření kategorií
  for (const category of blogCategories) {
    await prisma.category.create({
      data: {
        slug: category.slug,
        name: category.name,
        color: category.color,
      },
    })
  }
  console.log('Categories created.')

  // 3. Vytvoření článků a k nim navázaných komentářů a hodnocení
  for (const postData of blogPosts) {
    const category = await prisma.category.findUnique({
      where: { slug: postData.category },
    })

    // Vytvoříme článek v databázi
    const newPost = await prisma.post.create({
      data: {
        slug: postData.slug,
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        imageUrl: postData.image,
        published: true,
        featured: postData.featured,
        readingTime: postData.readingTime,
        seoTitle: postData.seoTitle,
        seoDescription: postData.seoDescription,
        tags: postData.tags,
        createdAt: new Date(postData.date),
        authorId: defaultUser.id,
        categoryId: category?.id,
      },
    })
    console.log(`Created post: ${newPost.title}`)

    // ZMĚNA ZDE: Vytvoříme komentáře s použitím správného ID článku a správných názvů polí
    await prisma.comment.createMany({
      data: [
        {
          postId: newPost.id, // Používáme ID nově vytvořeného článku
          originalAuthor: "Ukázkový Komentátor 1", // Používáme 'originalAuthor'
          originalEmail: "komentator1@example.com", // Používáme 'originalEmail'
          content: `Skvělý článek o ${newPost.title.toLowerCase()}! Velmi inspirativní.`,
          approved: true, // Ukázkové komentáře rovnou schválíme
        },
        {
          postId: newPost.id, // Používáme ID nově vytvořeného článku
          originalAuthor: "Ukázkový Komentátor 2", // Používáme 'originalAuthor'
          originalEmail: "komentator2@example.com", // Používáme 'originalEmail'
          content: `Díky za tyto cenné informace. Pomohlo mi to pochopit více o ${newPost.title.toLowerCase()}.`,
          approved: true,
        },
      ],
    })
    console.log(`Added comments for post: ${newPost.title}`)
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