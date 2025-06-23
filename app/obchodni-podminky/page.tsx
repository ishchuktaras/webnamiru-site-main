
export default function TermsAndConditionsPage() {
  return (
    <>
      
      <main className="container mx-auto px-4 py-8 max-w-4xl min-h-[calc(100vh-150px)]">
        <h1 className="text-4xl font-bold mb-6">Obchodní podmínky</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Zde budou uvedeny vaše obchodní podmínky. Prosím, doplňte relevantní text.</p>
          <p>
            Tyto podmínky upravují vztahy mezi poskytovatelem služeb a uživateli webu. Doporučujeme si je pečlivě
            přečíst.
          </p>
          {/* Můžete přidat další sekce a odstavce */}
          <h2>1. Úvodní ustanovení</h2>
          <p>
            Tyto obchodní podmínky platí pro nákup služeb a produktů prostřednictvím webové stránky [webnamiru.site].
          </p>
          <h2>2. Objednávka a uzavření smlouvy</h2>
          <p>Objednávka služeb je považována za závaznou po jejím potvrzení poskytovatelem.</p>
        </div>
      </main>
      
    </>
  )
}
