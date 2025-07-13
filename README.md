webnamiru.site - Strategické weby, které vydělávajíToto je oficiální repozitář pro webovou prezentaci a portfolio webnamiru.site, freelancera Tarase Ishchuka, který se specializuje na tvorbu strategických webů na míru, primárně pro klienty z Kraje Vysočina. Projekt je postaven na moderním technologickém stacku s cílem dosáhnout vysokého výkonu, skvělého SEO a snadné správy obsahu.Live verze: https://www.webnamiru.site✨ Klíčové vlastnostiProjekt je víc než jen statická vizitka. Obsahuje komplexní funkcionalitu pro akvizici klientů a správu obsahu.Veřejná část:Responzivní design pro všechna zařízení.Prezentace služeb, balíčků a případových studií.Pokročilý strategický dotazník pro sběr požadavků od klientů.Plnohodnotný blog s kategoriemi, štítky a vyhledáváním.Systém komentářů a hodnocení u článků.Optimalizace pro SEO (dynamická sitemap, metadata, strukturovaná data).Světlý a tmavý režim.Administrační rozhraní (/admin):Zabezpečený přístup pomocí přihlášení (NextAuth.js).Dashboard s přehlednými statistikami (návštěvnost, komentáře, poptávky).CMS pro správu blogových příspěvků (vytváření, editace, publikování).Správa komentářů (schvalování, mazání).Přehled poptávek ze strategického dotazníku.Nastavení webu.🚀 Použité technologieKategorieTechnologieFrameworkNext.js 15 (App Router)JazykTypeScriptStylováníTailwind CSSUI Komponentyshadcn/uiDatabáze & ORMPostgreSQL (kompatibilní s NeonDB) & PrismaAutentizaceNextAuth.js (Auth.js v5)Odesílání e-mailůResendValidace formulářůZodSprávce balíčkůpnpmDeploymentVercel🛠️ Spuštění projektu lokálněPro spuštění projektu na vašem lokálním počítači postupujte podle následujících kroků.1. Klonování repozitářegit clone [https://github.com/ishchuktaras/webnamiru-site-main.git](https://github.com/ishchuktaras/webnamiru-site-main.git)
cd webnamiru-site-main
2. Instalace závislostíProjekt používá pnpm. Pokud ho nemáte, nainstalujte ho pomocí npm install -g pnpm.pnpm install
3. Nastavení proměnných prostředíVytvořte v kořenovém adresáři soubor .env a zkopírujte do něj obsah ze souboru .env.example (pokud existuje) nebo použijte tuto šablonu.# Připojení k databázi (např. PostgreSQL z Neon.tech nebo lokální)
DATABASE_URL="postgresql://uzivatel:heslo@host:port/databaze?schema=public"

# Tajný klíč pro NextAuth.js. Vygenerujte si vlastní, např. příkazem:
# openssl rand -base64 32
NEXTAUTH_SECRET="VASE_VYGENEROVANE_TAJEMSTVI"

# URL adresa, na které aplikace poběží lokálně
NEXTAUTH_URL="http://localhost:3000"

# API klíč pro službu Resend pro odesílání e-mailů
RESEND_API_KEY="re_VAS_API_KLIC"
4. Synchronizace databázeTento příkaz vytvoří tabulky ve vaší databázi podle schématu v prisma/schema.prisma.pnpm prisma migrate dev
5. Spuštění vývojového serverupnpm run dev
Nyní by měla být aplikace dostupná na adrese http://localhost:3000.👤 AutorTaras IshchukWeb: webnamiru.siteLinkedIn: [Váš LinkedIn profil]E-mail: poptavka@webnamiru.siteTento projekt je aktivně vyvíjen. Jakékoliv návrhy na vylepšení jsou vítány!