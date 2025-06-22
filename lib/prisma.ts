import { PrismaClient } from "@prisma/client"

// Add prisma to the global type to avoid re-instantiating PrismaClient in development
declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  console.log("Initializing PrismaClient in production...") 
  try {
    prisma = new PrismaClient()
    console.log("PrismaClient initialized successfully in production.") 
  } catch (e) {
    console.error("Error initializing PrismaClient in production:", e) 
    throw e // Znovu vyhodit chybu, aby se projevila
  }
} else {
  if (!global.prisma) {
    console.log("Initializing PrismaClient in development (global instance)...") 
    try {
      global.prisma = new PrismaClient()
      console.log("PrismaClient initialized successfully in development.") 
    } catch (e) {
      console.error("Error initializing PrismaClient in development:", e) 
      throw e
    }
  }
  prisma = global.prisma as PrismaClient
}

export default prisma
