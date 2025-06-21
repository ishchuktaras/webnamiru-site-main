import "dotenv/config" // Přidat tento řádek na začátek
import { PrismaClient } from "@prisma/client"
import { blogPosts } from "../lib/blog-data" // Import blogových příspěvků

const prisma = new PrismaClient()

async function main() {
  console.log("Start seeding...")

  // Vymažeme existující komentáře a hodnocení, abychom měli čistý start
  await prisma.comment.deleteMany({})
  await prisma.rating.deleteMany({})
  console.log("Cleared existing comments and ratings.")

  // Přidáme ukázkové komentáře pro každý blogový příspěvek
  for (const post of blogPosts) {
    await prisma.comment.createMany({
      data: [
        {
          postId: post.slug,
          author: "Ukázkový Komentátor 1",
          email: "komentator1@example.com",
          content: `Skvělý článek o ${post.title.toLowerCase()}! Velmi inspirativní.`,
        },
        {
          postId: post.slug,
          author: "Ukázkový Komentátor 2",
          email: "komentator2@example.com",
          content: `Díky za tyto cenné informace. Pomohlo mi to pochopit více o ${post.title.toLowerCase()}.`,
        },
      ],
    })
    console.log(`Added comments for post: ${post.title}`)

    // Přidáme ukázková hodnocení pro každý blogový příspěvek
    await prisma.rating.createMany({
      data: [
        { postId: post.slug, value: 5 },
        { postId: post.slug, value: 4 },
        { postId: post.slug, value: 5 },
      ],
    })
    console.log(`Added ratings for post: ${post.title}`)
  }

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
