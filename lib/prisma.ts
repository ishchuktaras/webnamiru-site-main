// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        // V developmentu použijeme přímý odkaz, v produkci pooling odkaz
        url:
          process.env.NODE_ENV === 'production'
            ? process.env.DATABASE_URL
            : process.env.DIRECT_URL,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma