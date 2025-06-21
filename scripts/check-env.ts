import "dotenv/config" // Ujistěte se, že je dotenv načten

function checkDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL

  if (databaseUrl) {
    console.log("DATABASE_URL je načtena:", databaseUrl)
  } else {
    console.log("DATABASE_URL NENÍ načtena. Zkontrolujte soubor .env.")
  }
}

checkDatabaseUrl()
