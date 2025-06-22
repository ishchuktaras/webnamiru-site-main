import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export async function GET() {
  const healthCheck = {
    timestamp: new Date().toISOString(),
    status: "checking...",
    environment: {
      NODE_ENV: process.env.NODE_ENV || "not set",
      VERCEL_ENV: process.env.VERCEL_ENV || "not set",
      DATABASE_URL_EXISTS: !!process.env.DATABASE_URL,
      POSTGRES_URL_EXISTS: !!process.env.POSTGRES_URL,
    },
    database: {
      status: "checking...",
      error: null as string | null,
    },
  }

  // Test database connection
  try {
    const prisma = new PrismaClient({
      log: ["error"],
    })

    await prisma.$connect()
    const testResult = (await prisma.$queryRaw`SELECT 1 as test`) as Array<{ test: number }>
    await prisma.$disconnect()

    console.log("Database test result:", testResult)

    healthCheck.database.status = "connected"
    healthCheck.status = "healthy"
  } catch (error) {
    healthCheck.database.status = "failed"
    healthCheck.database.error = error instanceof Error ? error.message : "Unknown error"
    healthCheck.status = "unhealthy"
  }

  return NextResponse.json(healthCheck, {
    status: healthCheck.status === "healthy" ? 200 : 500,
  })
}
