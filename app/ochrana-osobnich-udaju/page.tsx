import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů - Web na míru",
  description: "Informace o zpracování a ochraně osobních údajů v souladu s GDPR na webu webnamiru.site.",
};

export default function PrivacyPolicyPage() {
    const placeholderStyle = "bg-yellow-200 dark:bg-yellow-800 px-1 rounded-sm text-black";

  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[calc(100vh-150px)]">
        <h1 className="text-4xl font-bold mb-8 text-center">Zásady ochrany osobních údajů</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-sm text-center text-gray-500">
            Poslední aktualizace: <span className={placeholderStyle}>[DOPLŇTE DATUM]</span>
          </p>

          <section>
            <h2>1. Správce osobních údajů</h2>
            <ul>
                <li><strong>Jméno:</strong> Taras Ishchuk</li>
                <li><strong>IČO:</strong> <span className={placeholderStyle}>[DOPLŇTE IČO]</span></li>
                <li><strong>Sídlo:</strong> Nad Plovárnou 3767/8, 586 01 Jihlava</li>
                <li><strong>Email:</strong> ishchuktaras@gmail.com</li>
                <li><strong>Telefon:</strong> +420 777 596 216</li>
            </ul>
          </section>

          <section>
            <h2>2. Jaké osobní údaje zpracováváme</h2>
            <h3>2.1 Údaje poskytnuté dobrovolně</h3>
            <p><strong>Kontaktní formuláře a dotazy:</strong> Jméno a příjmení, E-mailová adresa, Telefonní číslo (volitelně), Obsah zprávy nebo dotazu.</p>
            <p><strong>Objednávky služeb:</strong> Fakturační údaje (jméno, adresa, IČO, DIČ), Kontaktní informace, Specifikace požadovaných služeb.</p>
            <p><strong>Newsletter a marketing:</strong> E-mailová adresa, Jméno (volitelně), Předvolby komunikace.</p>
            <h3>2.2 Automaticky sbírané údaje</h3>
            <p><strong>Technické údaje:</strong> IP adresa (anonymizovaná), Typ a verze prohlížeče, Operační systém, Rozlišení obrazovky, Referrer URL.</p>
            <p><strong>Návštěvnost webu:</strong> Navštívené stránky, Doba strávená na webu, Zdroj návštěvy, Interakce s obsahem.</p>
            <p><strong>Cookies a podobné technologie:</strong> Funkční cookies (nezbytné), Analytické cookies (se souhlasem), Marketingové cookies (se souhlasem).</p>
          </section>

          <section>
            <h2>3. Účel a právní základ zpracování</h2>
            <h3>3.1 Poskytování služeb</h3>
            <p><strong>Účel:</strong> Komunikace s klienty, zpracování objednávek, poskytování služeb.<br/><strong>Právní základ:</strong> Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).<br/><strong>Doba uchovávání:</strong> Po dobu trvání smluvního vztahu + 3 roky.</p>
            <h3>3.2 Marketing a komunikace</h3>
            <p><strong>Účel:</strong> Zasílání novinek, nabídek, užitečného obsahu.<br/><strong>Právní základ:</strong> Souhlas (čl. 6 odst. 1 písm. a) GDPR).<br/><strong>Doba uchovávání:</strong> Do odvolání souhlasu.</p>
            <h3>3.3 Analýza návštěvnosti</h3>
            <p><strong>Účel:</strong> Vylepšování webových stránek, optimalizace uživatelského zážitku.<br/><strong>Právní základ:</strong> Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR) nebo souhlas.<br/><strong>Doba uchovávání:</strong> 26 měsíců (anonymizovaně).</p>
            <h3>3.4 Právní povinnosti</h3>
            <p><strong>Účel:</strong> Účetnictví, archivace, daňové povinnosti.<br/><strong>Právní základ:</strong> Právní povinnost (čl. 6 odst. 1 písm. c) GDPR).<br/><strong>Doba uchovávání:</strong> 10 let (dle zákona o účetnictví).</p>
          </section>

          <section>
            <h2>4. Předávání osobních údajů</h2>
            <h3>4.1 Zpracovatelé</h3>
            <p>Vaše osobní údaje mohou být předávány následujícím kategoriím zpracovatelů:</p>
            <ul>
                <li><strong>Technologičtí partneři:</strong> Brevo (email marketing), Google Analytics, Vercel/Netlify (hosting), Facebook/Meta.</li>
                <li><strong>Obchodní partneři:</strong> Účetní služby, Právní služby, Bankovní instituce.</li>
            </ul>
            <h3>4.2 Mezinárodní předávání</h3>
            <p>Některé služby mohou zahrnovat předávání dat do třetích zemí. Vždy zajišťujeme odpovídající záruky podle kapitoly V GDPR, například pomocí standardních smluvních doložek.</p>
          </section>
            
          <section>
            <h2>5. Vaše práva podle GDPR</h2>
            <p>Máte právo na informace (čl. 15), na opravu (čl. 16), na výmaz (čl. 17), na omezení zpracování (čl. 18), na přenositelnost údajů (čl. 20) a právo vznést námitku (čl. 21) či odvolat souhlas (čl. 7).</p>
          </section>
          
          <section>
            <h2>6. Jak uplatnit vaše práva</h2>
            <p>Pro uplatnění vašich práv nás kontaktujte e-mailem, telefonicky nebo poštou na adresách uvedených v sekci 1. Můžete také spravovat své preference cookies přímo na webu. Na žádosti odpovídáme nejpozději do 30 dnů.</p>
          </section>

          <section>
            <h2>7. Zabezpečení osobních údajů</h2>
            <p>Používáme technická (SSL/TLS šifrování, audity, aktualizace, zálohy) a organizační (školení, interní pravidla, kontrola přístupu) opatření k ochraně vašich dat. V případě narušení bezpečnosti informujeme úřad do 72 hodin a dotčené osoby bez zbytečného odkladu.</p>
          </section>

          <section>
            <h2>8. Cookies a sledovací technologie</h2>
            <p>Používáme nezbytné, analytické, marketingové a funkční cookies. Vaše preference můžete kdykoliv spravovat v nastavení cookies na webu nebo v nastavení vašeho prohlížeče.</p>
          </section>
          
          <section>
            <h2>9. Změny zásad ochrany osobních údajů</h2>
            <p>Tyto zásady můžeme aktualizovat. O podstatných změnách vás budeme informovat e-mailem nebo oznámením na webu.</p>
          </section>

          <section>
            <h2>10. Stížnosti a dozorový úřad</h2>
            <p>Pokud nejste spokojeni s naším přístupem, kontaktujte nás. Máte také právo podat stížnost u dozorového úřadu: Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz.</p>
          </section>

          <section>
            <h2>11. Specifické informace pro různé služby</h2>
            <p><strong>Webové stránky:</strong> Používáme Google Analytics a Facebook Pixel. Kontaktní formuláře slouží pro komunikaci.</p>
            <p><strong>Newsletter:</strong> Vyžaduje dobrovolné přihlášení, s možností odhlášení v každém e-mailu.</p>
            <p><strong>Klientský portál:</strong> Zabezpečený přístup pro stahování dokumentů a komunikaci.</p>
          </section>

          <section>
            <h2>12. Kontakt pro otázky ohledně GDPR</h2>
            <p>Odpovědná osoba: Taras Ishchuk. Kontaktujte mě na e-mailu, telefonu nebo adrese uvedené v sekci 1.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
