#!/usr/bin/env tsx

interface DatabaseTestResult {
  test: number
}

console.log("=== Production Environment Check ===")
console.log("Timestamp:", new Date().toISOString())

// Required environment variables for production
const requiredEnvVars = [
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

requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar]
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 20)}...`)
  } else {
    console.log(`❌ ${envVar}: NOT SET`)
  }
})

// Test database connection with proper typing
console.log("\n🔌 Testing Database Connection:")
async function testDatabase() {
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
    console.error("❌ Database error:", error instanceof Error ? error.message : error)
    if (error && typeof error === "object" && "code" in error) {
      console.error("Error code:", (error as any).code)
    }
    console.error("Full error details:", error)
  }
}

// Check if we can access Vercel environment
console.log("\n🌐 Vercel Environment:")
console.log("VERCEL:", process.env.VERCEL || "❌ NOT SET")
console.log("VERCEL_ENV:", process.env.VERCEL_ENV || "❌ NOT SET")
console.log("VERCEL_URL:", process.env.VERCEL_URL || "❌ NOT SET")

// Run the database test
testDatabase().catch(console.error)
