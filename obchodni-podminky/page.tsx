import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Obchodní podmínky - Web na míru",
  description: "Obchodní podmínky pro poskytování služeb tvorby webových stránek a souvisejících služeb na webnamiru.site.",
};

export default function TermsAndConditionsPage() {
  const placeholderStyle = "bg-yellow-200 dark:bg-yellow-800 px-1 rounded-sm";

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[calc(100vh-150px)]">
        <h1 className="text-4xl font-bold mb-8 text-center">Obchodní podmínky</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <p className="text-sm text-center text-gray-500">
            Platné od: <span className={placeholderStyle}>[DOPLŇTE DATUM]</span> | Verze: 1.0
          </p>

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

          {/* Další sekce dle PDF */}

          <section>
            <h2>6. Povinnosti a odpovědnost stran</h2>
            <h3>6.1 Povinnosti poskytovatele</h3>
            <ul>
              <li>Provést dílo odborně a v dohodnuté kvalitě</li>
              <li>Dodržet dohodnuté termíny</li>
              <li>Informovat o podstatných změnách v průběhu realizace</li>
              <li>Předat dílo včetně potřebné dokumentace</li>
              <li>Poskytnout záruční servis v dohodnutém rozsahu</li>
            </ul>
            <h3>6.2 Povinnosti klienta</h3>
            <ul>
                <li>Poskytnout všechny potřebné podklady a informace</li>
                <li>Spolupracovat při testování a předávání díla</li>
                <li>Hradit platby podle dohodnutého harmonogramu</li>
                <li>Schvalovat návrhy v dohodnutých termínech</li>
                <li>Informovat o změnách požadavků</li>
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
          
          {/* ... další sekce jako 8, 9, 10 ... */}

          <section>
            <h2>13. Závěrečná ustanovení</h2>
            <p>Tyto obchodní podmínky nabývají účinnosti dnem <span className={placeholderStyle}>[DOPLŇTE DATUM]</span> a ruší všechny předchozí verze. Jsou dostupné na webových stránkách https://webnamiru.site.</p>
          </section>

          <div className="text-center pt-8">
            <p>Kontakt pro dotazy:</p>
            <p>ishchuktaras@gmail.com | +420 777 596 216</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
