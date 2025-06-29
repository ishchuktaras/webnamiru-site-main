// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Globální objekt pro cachování instance Prisma klienta
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Tento kód chytře rozlišuje mezi lokálním vývojem a produkcí na Vercelu
const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
      db: {
        // V developmentu použijeme přímé a stabilní připojení
        // V produkci se použije pooling odkaz, který je optimalizovaný pro serverless
        url: process.env.NODE_ENV === 'production' 
             ? process.env.DATABASE_URL 
             : process.env.DIRECT_URL,
      },
    },
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma