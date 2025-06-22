#!/usr/bin/env tsx

// Load .env file
import { config } from "dotenv"
config()

interface DatabaseTestResult {
  test: number
}

interface ErrorWithCode extends Error {
  code?: string
}

console.log("=== Environment Check (with .env) ===")
console.log("Timestamp:", new Date().toISOString())

// Required environment variables
const envVariables = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_USER",
  "POSTGRES_HOST",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
] as const

console.log("\n📋 Environment Variables Status:")
console.log("NODE_ENV:", process.env.NODE_ENV || "❌ NOT SET")

envVariables.forEach((envVar) => {
  const value = process.env[envVar]
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 30)}...`)
  } else {
    console.log(`❌ ${envVar}: NOT SET`)
  }
})

// Test database connection
console.log("\n🔌 Testing Database Connection:")

async function checkDatabaseConnection(): Promise<void> {
  try {
    const { PrismaClient } = await import("@prisma/client")
    const prisma = new PrismaClient({
      log: ["error"],
      errorFormat: "pretty",
    })

    console.log("Connecting to database...")
    await prisma.$connect()
    console.log("✅ Database connection successful")

    console.log("Testing database query...")
    const result = (await prisma.$queryRaw`SELECT 1 as test`) as DatabaseTestResult[]
    console.log("✅ Database query successful:", result)

    await prisma.$disconnect()
    console.log("✅ Database disconnected successfully")
  } catch (error) {
    const err = error as ErrorWithCode
    console.error("❌ Database error:", err.message)
    if (err.code) {
      console.error("Error code:", err.code)
    }
  }
}

checkDatabaseConnection().catch(console.error)
