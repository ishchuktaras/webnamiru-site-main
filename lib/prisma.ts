import { PrismaClient } from "@prisma/client"

// Add prisma to the global type to avoid re-instantiating PrismaClient in development
declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma