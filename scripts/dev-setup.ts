import "dotenv/config"
import { execSync } from "child_process"

async function setupDevelopment() {
  console.log("🚀 Nastavování vývojového prostředí...\n")

  const steps = [
    {
      name: "Kontrola environment variables",
      command: "npx tsx scripts/check-env.ts",
      required: true,
    },
    {
      name: "Instalace závislostí",
      command: "npm install",
      required: true,
    },
    {
      name: "Generování Prisma klienta",
      command: "npx prisma generate",
      required: true,
    },
    {
      name: "Aplikace databázových migrací",
      command: "npx prisma db push",
      required: false,
    },
    {
      name: "Seedování databáze",
      command: "npx prisma db seed",
      required: false,
    },
  ]

  for (const step of steps) {
    console.log(`📋 ${step.name}...`)

    try {
      execSync(step.command, { stdio: "inherit" })
      console.log(`✅ ${step.name} - dokončeno\n`)
    } catch (error) {
      console.log(`❌ ${step.name} - chyba`)

      if (step.required) {
        console.log("🛑 Tento krok je povinný. Ukončuji setup.")
        process.exit(1)
      } else {
        console.log("⚠️  Tento krok není povinný, pokračuji...\n")
      }
    }
  }

  console.log("🎉 Development prostředí je připraveno!")
  console.log("💡 Můžete spustit: npm run dev")
}

setupDevelopment()
