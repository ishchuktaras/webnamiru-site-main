#!/usr/bin/env tsx

console.log("=== Production Debug Info ===")

// Check environment variables
console.log("Environment Variables:")
console.log("NODE_ENV:", process.env.NODE_ENV)
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL)
console.log("DATABASE_URL starts with:", process.env.DATABASE_URL?.substring(0, 20) + "...")

// Check if we're in production
if (process.env.NODE_ENV === "production") {
  console.log("Running in PRODUCTION mode")
} else {
  console.log("Running in DEVELOPMENT mode")
}

// Try to import Prisma
try {
  const { PrismaClient } = require("@prisma/client")
  console.log("Prisma import: SUCCESS")

  const prisma = new PrismaClient()
  console.log("Prisma client creation: SUCCESS")

  // Try a simple query
  interface PrismaClientType {
    $connect: () => Promise<void>
    $disconnect: () => Promise<void>
  }

  prisma
    .$connect()
    .then((): Promise<void> => {
      console.log("Database connection: SUCCESS")
      return prisma.$disconnect()
    })
    .catch((error: { message: string }) => {
      console.error("Database connection: FAILED", error.message)
    })
} catch (error) {
  console.error("Prisma import: FAILED", error)
}
