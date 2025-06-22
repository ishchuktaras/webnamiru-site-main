import "dotenv/config"
import { PrismaClient } from "@prisma/client"

async function testDatabaseConnection() {
  console.log("🔗 Testování připojení k databázi...\n")

  if (!process.env.DATABASE_URL) {
    console.log("❌ DATABASE_URL není nastavena!")
    process.exit(1)
  }

  const prisma = new PrismaClient()

  try {
    // Pokus o připojení k databázi
    await prisma.$connect()
    console.log("✅ Připojení k databázi úspěšné!")

    // Test jednoduchého dotazu
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log("✅ Testovací dotaz proběhl úspěšně:", result)

    // Kontrola tabulek (pokud existují)
    try {
      const commentCount = await prisma.comment.count()
      const ratingCount = await prisma.rating.count()
      console.log(`📊 Počet komentářů: ${commentCount}`)
      console.log(`📊 Počet hodnocení: ${ratingCount}`)
    } catch (error) {
      console.log("⚠️  Tabulky ještě neexistují nebo nejsou dostupné")
      console.log("💡 Spusťte: npx prisma db push nebo npx prisma migrate dev")
    }
  } catch (error) {
    console.log("❌ Chyba při připojování k databázi:")
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log("\n🔌 Připojení k databázi ukončeno")
  }
}

testDatabaseConnection()
