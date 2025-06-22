#!/usr/bin/env tsx

import { config } from "dotenv"
config()

console.log("=== Vercel Environment Variables Setup Guide ===")
console.log("\n🔧 Copy these environment variables to Vercel Dashboard:")
console.log("👉 Go to: https://vercel.com/dashboard → your-project → Settings → Environment Variables")

const requiredVars = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_USER",
  "POSTGRES_HOST",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
]

console.log("\n📋 Required Variables:")
console.log("NODE_ENV=production")

requiredVars.forEach((envVar) => {
  const value = process.env[envVar]
  if (value) {
    console.log(`${envVar}=${value}`)
  } else {
    console.log(`❌ ${envVar}=NOT_FOUND_IN_LOCAL_ENV`)
  }
})

console.log("\n📝 Instructions:")
console.log("1. Copy each variable above")
console.log("2. Paste into Vercel Dashboard → Environment Variables")
console.log("3. Set Environment: Production, Preview, Development")
console.log("4. Click 'Save'")
console.log("5. Redeploy your application")
console.log("\n🔗 Health check after deploy: https://webnamiru.site/api/health")
