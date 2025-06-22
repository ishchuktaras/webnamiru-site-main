import { execSync } from "child_process"

console.log("🔧 Rychlá oprava npm problémů...\n")

const commands = ["npm cache clean --force", "rm -rf node_modules package-lock.json", "npm install --legacy-peer-deps"]

for (const command of commands) {
  console.log(`⚡ Spouštím: ${command}`)
  try {
    execSync(command, { stdio: "inherit" })
    console.log("✅ Dokončeno\n")
  } catch (error) {
    console.log(`❌ Chyba při: ${command}`)
    console.log("💡 Zkuste spustit manuálně\n")
  }
}

console.log("🎯 Zkuste nyní spustit: npm run dev")
