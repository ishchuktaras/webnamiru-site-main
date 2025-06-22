#!/usr/bin/env tsx

import { config } from "dotenv"
config()

console.log("=== Environment Variables Analysis ===")
console.log("Timestamp:", new Date().toISOString())

// Analyze databases
const databaseUrl = process.env.DATABASE_URL
const postgresUrl = process.env.POSTGRES_URL

console.log("\n🔍 Database Analysis:")

if (databaseUrl) {
  const dbMatch = databaseUrl.match(/\/([^?]+)/)
  const dbName = dbMatch ? dbMatch[1] : "unknown"
  console.log(`✅ DATABASE_URL points to: "${dbName}" database`)
}

if (postgresUrl) {
  const pgMatch = postgresUrl.match(/\/([^?]+)/)
  const pgName = pgMatch ? pgMatch[1] : "unknown"
  console.log(`✅ POSTGRES_URL points to: "${pgName}" database`)
}

console.log("\n⚠️  Issue detected:")
console.log("You have TWO different databases:")
console.log("- webnamiru (from DATABASE_URL)")
console.log("- neondb (from POSTGRES_* variables)")

console.log("\n💡 Recommendation:")
console.log("For consistency, use the same database for all connections.")
console.log(
  "Since your app uses 'webnamiru' database, update POSTGRES_* variables to use 'webnamiru' instead of 'neondb'",
)

console.log("\n🔧 Suggested .env file:")
console.log(`NODE_ENV=development
DATABASE_URL="postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?sslmode=require"
POSTGRES_URL="postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw.gwc.azure.neon.tech/webnamiru?sslmode=require"
POSTGRES_USER=webnamiru_owner
POSTGRES_PASSWORD=npg_2m4ujoDGSwBJ
POSTGRES_HOST=ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech
POSTGRES_DATABASE=webnamiru
NEON_PROJECT_ID=gentle-wave-17018717`)

console.log("\n📋 For Vercel (copy these):")
console.log("NODE_ENV=production")
console.log(
  `DATABASE_URL=postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?sslmode=require`,
)
console.log(
  `POSTGRES_URL=postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?sslmode=require`,
)
console.log(
  `POSTGRES_PRISMA_URL=postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech/webnamiru?connect_timeout=15&sslmode=require`,
)
console.log(
  `POSTGRES_URL_NON_POOLING=postgresql://webnamiru_owner:npg_2m4ujoDGSwBJ@ep-late-band-a9bkromw.gwc.azure.neon.tech/webnamiru?sslmode=require`,
)
console.log(`POSTGRES_USER=webnamiru_owner`)
console.log(`POSTGRES_PASSWORD=npg_2m4ujoDGSwBJ`)
console.log(`POSTGRES_HOST=ep-late-band-a9bkromw-pooler.gwc.azure.neon.tech`)
console.log(`POSTGRES_DATABASE=webnamiru`)
console.log(`NEON_PROJECT_ID=gentle-wave-17018717`)
