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
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
POSTGRES_URL="postgresql://username:password@host/database?sslmode=require"
POSTGRES_PRISMA_URL="postgresql://username:password@host/database?connect_timeout=15&sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://username:password@host/database?sslmode=require"
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_HOST=host
POSTGRES_DATABASE=database
NEON_PROJECT_ID=project-id`)

console.log("\n📋 For Vercel (copy these from your local .env):")
console.log("NODE_ENV=production")
console.log("DATABASE_URL=[copy from your .env file]")
console.log("POSTGRES_URL=[copy from your .env file]")
console.log("POSTGRES_PRISMA_URL=[copy from your .env file]")
console.log("POSTGRES_URL_NON_POOLING=[copy from your .env file]")
console.log("POSTGRES_USER=[copy from your .env file]")
console.log("POSTGRES_PASSWORD=[copy from your .env file]")
console.log("POSTGRES_HOST=[copy from your .env file]")
console.log("POSTGRES_DATABASE=[copy from your .env file]")
console.log("NEON_PROJECT_ID=[copy from your .env file]")
