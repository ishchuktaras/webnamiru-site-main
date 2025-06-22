# Vercel Environment Variables Setup

## Problém
Aplikace má 500 server errors v produkci kvůli chybějícím environment variables.

## Řešení

### 1. Přihlášení do Vercel Dashboard
1. Jděte na [vercel.com](https://vercel.com)
2. Přihlaste se do svého účtu
3. Najděte projekt `webnamiru-site`

### 2. Nastavení Environment Variables
1. Klikněte na projekt `webnamiru-site`
2. Jděte na **Settings** (nastavení)
3. V levém menu klikněte na **Environment Variables**

### 3. Přidání požadovaných proměnných
Přidejte tyto environment variables (hodnoty zkopírujte z vašeho lokálního `.env` souboru):

#### Povinné proměnné:
\`\`\`
NODE_ENV=production
DATABASE_URL=postgresql://...
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...
\`\`\`

#### Volitelné proměnné:
\`\`\`
PGHOST=...
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
NEON_PROJECT_ID=...
\`\`\`

### 4. Nastavení Environment pro všechna prostředí
Pro každou proměnnou zaškrtněte:
- ✅ Production
- ✅ Preview  
- ✅ Development

### 5. Redeploy aplikace
1. Po přidání všech proměnných jděte na **Deployments**
2. Klikněte na nejnovější deployment
3. Klikněte na **Redeploy** (znovu nasadit)

### 6. Ověření
Po redeploymentu navštivte:
- `https://webnamiru.site/api/health` - pro kontrolu stavu
- `https://webnamiru.site/blog` - pro test blog funkcionality

## Troubleshooting

### Pokud stále nefunguje:
1. Zkontrolujte, že všechny proměnné jsou správně nastavené
2. Ověřte, že Neon databáze je dostupná
3. Zkontrolujte logy v Vercel Dashboard → Functions → View Function Logs
\`\`\`

Vytvořím také rychlý setup script:
