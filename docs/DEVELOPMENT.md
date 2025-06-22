# Development Guide

## Rychlý start

1. **Klonování a instalace**
   \`\`\`bash
   git clone <repository-url>
   cd webnamiru-site
   npm install
   \`\`\`

2. **Environment setup**
   \`\`\`bash
   cp .env.example .env.local
   # Vyplňte hodnoty v .env.local
   \`\`\`

3. **Kontrola prostředí**
   \`\`\`bash
   npm run check-env
   npm run test-db
   \`\`\`

4. **Spuštění aplikace**
   \`\`\`bash
   npm run dev
   \`\`\`

## Užitečné příkazy

- `npm run check-env` - Kontrola environment variables
- `npm run test-db` - Test databázového připojení
- `npm run setup-dev` - Automatické nastavení dev prostředí
- `npm run db:studio` - Otevření Prisma Studio
- `npm run db:reset` - Reset databáze a seedování
- `npm run type-check` - TypeScript kontrola bez buildu

## Databáze

Projekt používá PostgreSQL přes Neon.tech:
- Produkční databáze: Neon PostgreSQL
- ORM: Prisma
- Migrace: `npx prisma db push`
- Seedování: `npm run seed`

## Struktura projektu

\`\`\`
webnamiru-site/
├── app/                 # Next.js App Router
├── components/          # React komponenty
├── lib/                # Utility funkce
├── prisma/             # Databázové schéma a migrace
├── scripts/            # Development scripty
└── styles/             # CSS styly
