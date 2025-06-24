import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obchodní podmínky - Web na míru",
  description: "Kompletní obchodní podmínky pro poskytování služeb tvorby webových stránek a souvisejících služeb na webnamiru.site.",
};

export default function TermsAndConditionsPage() {
  const placeholderStyle = "bg-yellow-200 dark:bg-yellow-800 px-1 rounded-sm text-black";

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[calc(100vh-200px)]">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Obchodní podmínky</h1>
            <p className="text-lg text-gray-500 mt-2">
                Platné od: <span className={placeholderStyle}>[DOPLŇTE DATUM]</span> | Verze: 1.0
            </p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2>1. Základní ustanovení</h2>
            <h3>1.1 Identifikace poskytovatele</h3>
            <ul>
              <li><strong>Jméno:</strong> Taras Ishchuk</li>
              <li><strong>IČO:</strong> <span className={placeholderStyle}>[DOPLŇTE IČO]</span></li>
              <li><strong>DIČ:</strong> <span className={placeholderStyle}>[DOPLŇTE DIČ, pokud jste plátcem DPH]</span></li>
              <li><strong>Sídlo:</strong> Nad Plovárnou 3767/8, 586 01 Jihlava</li>
              <li><strong>Email:</strong> ishchuktaras@gmail.com</li>
              <li><strong>Telefon:</strong> +420 777 596 216</li>
              <li><strong>Zápis:</strong> <span className={placeholderStyle}>[DOPLŇTE ÚDAJE O ZÁPISU V ŽIVNOSTENSKÉM REJSTŘÍKU]</span></li>
            </ul>
            <h3>1.2 Definice pojmů</h3>
            <ul>
              <li><strong>Poskytovatel:</strong> Výše uvedený subjekt</li>
              <li><strong>Klient:</strong> Osoba objednávající služby</li>
              <li><strong>Služby:</strong> Vývoj webových stránek a související služby</li>
              <li><strong>Smlouva:</strong> Písemná nebo elektronická dohoda o poskytnutí služeb</li>
              <li><strong>Dílo:</strong> Výsledek poskytnutých služeb</li>
            </ul>
            <h3>1.3 Předmět podnikání</h3>
            <p>Poskytovatel podniká na základě živnostenského oprávnění v oblastech: Vývoj webových aplikací a stránek, Grafický design, Konzultační služby v IT, Správa a údržba webových systémů.</p>
          </section>

          <section>
            <h2>6. Povinnosti a odpovědnost stran</h2>
            <h3>6.1 Povinnosti poskytovatele</h3>
            <ul>
              <li>Provést dílo odborně a v dohodnuté kvalitě.</li>
              <li>Dodržet dohodnuté termíny.</li>
              <li>Informovat o podstatných změnách v průběhu realizace.</li>
              <li>Předat dílo včetně potřebné dokumentace.</li>
              <li>Poskytnout záruční servis v dohodnutém rozsahu.</li>
            </ul>
            <h3>6.2 Povinnosti klienta</h3>
            <ul>
                <li>Poskytnout všechny potřebné podklady a informace.</li>
                <li>Spolupracovat při testování a předávání díla.</li>
                <li>Hradit platby podle dohodnutého harmonogramu.</li>
                <li>Schvalovat návrhy v dohodnutých termínech.</li>
                <li>Informovat o změnách požadavků.</li>
            </ul>
            <h3>6.3 Omezení odpovědnosti</h3>
            <p>Poskytovatel neodpovídá za: Škody způsobené nesprávným používáním díla, ztráty dat způsobené klientem nebo třetí stranou, výpadky služeb třetích stran (hosting, domény), nepřímé škody a ušlý zisk.</p>
            <h3>6.4 Maximální odpovědnost</h3>
            <p>Celková odpovědnost poskytovatele je omezena na výši ceny za konkrétní službu, která škodu způsobila.</p>
          </section>

          <section>
            <h2>7. Autorská práva a duševní vlastnictví</h2>
            <h3>7.1 Autorská práva k dílu</h3>
            <ul>
              <li>Klient nabývá autorská práva k finálnímu dílu po úplném zaplacení.</li>
              <li>Poskytovatel si vyhrazuje právo použít dílo pro vlastní propagaci.</li>
              <li>Předávané dílo nesmí obsahovat prvky, které by porušovaly práva třetích stran.</li>
            </ul>
            <h3>7.2 Použité komponenty a knihovny</h3>
            <ul>
                <li>Open-source komponenty podléhají svým původním licencím.</li>
                <li>Licencované komponenty vyžadují samostatné licence klienta.</li>
                <li>Seznam použitých komponent je součástí dokumentace.</li>
            </ul>
            <h3>7.3 Ochranné známky a loga</h3>
            <ul>
                <li>Klient garantuje právo k použití svých log a ochranných známek.</li>
                <li>Poskytovatel není odpovědný za porušení práv třetích stran.</li>
            </ul>
          </section>
          
          <section>
            <h2>8. Záruka a reklamace</h2>
            <h3>8.1 Záruční doba</h3>
            <ul>
                <li>12 měsíců na funkčnost díla za standardních podmínek.</li>
                <li>6 měsíců na kompatibilitu s novými verzemi prohlížečů.</li>
                <li>Záruka se nevztahuje na změny požadavků klienta.</li>
            </ul>
            <h3>8.2 Záruční opravy</h3>
            <p>Poskytovatel se zavazuje bezplatně opravit: chyby v programování způsobující nefunkčnost, nesoulad s původní specifikací, bezpečnostní chyby způsobené nesprávnou implementací.</p>
            <h3>8.3 Vyloučení ze záruky</h3>
            <p>Záruka se nevztahuje na: dílo upravené klientem nebo třetí stranou, problémy způsobené nekompatibilním hostingem, škody způsobené nesprávným použitím nebo údržbou.</p>
            <h3>8.4 Reklamační řízení</h3>
            <ol>
                <li><strong>Oznámení:</strong> Písemné oznámení vady do 30 dnů od zjištění.</li>
                <li><strong>Prošetření:</strong> Poskytovatel prošetří reklamaci do 14 dnů.</li>
                <li><strong>Náprava:</strong> Oprava vady nebo poskytnutí náhradního plnění.</li>
                <li><strong>Uzavření:</strong> Potvrzení odstranění vady.</li>
            </ol>
          </section>

          <section>
            <h2>9. Změny a dodatky</h2>
            <h3>9.1 Změny rozsahu služeb</h3>
            <ul>
                <li>Podstatné změny vyžadují písemný dodatek ke smlouvě.</li>
                <li>Drobné změny lze dohodnout e-mailem.</li>
                <li>Změny mohou ovlivnit cenu a termín dodání.</li>
            </ul>
            <h3>9.2 Změny obchodních podmínek</h3>
            <ul>
                <li>Poskytovatel může měnit obchodní podmínky s předchozím oznámením.</li>
                <li>Změny se nevztahují na již uzavřené smlouvy.</li>
                <li>Klient bude informován alespoň 30 dní před účinností změn.</li>
            </ul>
          </section>

          <section>
            <h2>10. Ukončení spolupráce</h2>
            <h3>10.1 Řádné ukončení</h3>
            <p>Spolupráce se řádně ukončuje splněním všech povinností obou stran, uplynutím dohodnuté doby u dlouhodobých smluv, nebo dohodou stran.</p>
            <h3>10.2 Mimořádné ukončení</h3>
            <p>Smlouvu lze ukončit mimořádně při podstatném porušení povinností druhou stranou, úpadku nebo likvidaci jedné ze stran, nebo nemožnosti plnění z objektivních důvodů.</p>
            <h3>10.3 Následky ukončení</h3>
            <p>V případě ukončení spolupráce vzniká povinnost uhradit dosud provedené práce, předat všechny podklady a výstupy a zachovat mlčenlivost.</p>
          </section>

          <section>
            <h2>11. Ochrana osobních údajů</h2>
            <p>Zpracování osobních údajů se řídí samostatnými <Link href="/ochrana-osobnich-udaju" className="text-blue-600 hover:underline">Zásadami ochrany osobních údajů</Link>. Údaje zpracováváme pouze pro účely plnění smlouvy. Garantujeme bezpečnost a ochranu všech údajů. Klienti mají právo na přístup, opravu, výmaz a přenositelnost svých údajů.</p>
          </section>

          <section>
            <h2>12. Řešení sporů</h2>
            <h3>12.1 Mimosoudní řešení</h3>
            <p>Přednostně řešíme spory vzájemnou dohodou. Možné je využití mediace nebo rozhodčího řízení. Veškeré kroky k řešení jsou písemně dokumentovány.</p>
            <h3>12.2 Soudní řízení</h3>
            <p>Pro řešení sporů je místně příslušný soud podle sídla poskytovatele a uplatňuje se české právo. Možné je i řešení přes Evropskou platformu pro řešení sporů online.</p>
            <h3>12.3 Promlčení nároků</h3>
            <p>Nároky z vadného plnění se promlčují za 2 roky od předání díla, nároky z prodlení za 3 roky od splatnosti. Ostatní nároky se řídí obecnými lhůtami.</p>
          </section>

          <section>
            <h2>13. Závěrečná ustanovení</h2>
            <h3>13.1 Oddělitelnost ustanovení</h3>
            <p>Pokud se jakékoliv ustanovení těchto podmínek stane neplatným, ostatní ustanovení zůstávají v platnosti.</p>
            <h3>13.2 Komunikace</h3>
            <p>Oficiální komunikace probíhá e-mailem nebo písemně. Změny kontaktních údajů je nutno oznámit druhé straně. Za doručené se považují zprávy odeslané na poslední známé kontakty.</p>
            <h3>13.3 Platnost a účinnost</h3>
            <p>Tyto obchodní podmínky nabývají účinnosti dnem <span className={placeholderStyle}>[DOPLŇTE DATUM]</span> a ruší všechny předchozí verze. Jsou dostupné na webových stránkách https://webnamiru.site.</p>
            <h3>13.4 Právní úprava</h3>
            <p>Právní vztahy se řídí zákonem č. 89/2012 Sb., občanský zákoník, zákonem č. 634/1992 Sb., o ochraně spotřebitele, a nařízením EU 2016/679 (GDPR).</p>
          </section>

          <div className="text-center pt-8 border-t">
            <p className="text-sm text-gray-500">Tyto obchodní podmínky byly vytvořeny pomocí GDPR template od WEB NA MÍRU.</p>
            <p className="mt-4 text-sm text-gray-500">Datum posledního přezkoumání právníkem: <span className={placeholderStyle}>25.06.2025</span></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
