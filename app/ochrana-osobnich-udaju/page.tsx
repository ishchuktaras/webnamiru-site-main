export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl min-h-[calc(100vh-150px)]">
        <h1 className="text-4xl font-bold mb-6">Ochrana osobních údajů</h1>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Zde budou uvedeny informace o ochraně osobních údajů. Prosím,
            doplňte relevantní text.
          </p>
          <p>
            Vaše soukromí je pro nás důležité. Tato stránka popisuje, jak
            shromažďujeme, používáme a chráníme vaše osobní údaje.
          </p>
          {/* Můžete přidat další sekce a odstavce */}
          <h2>1. Shromažďování údajů</h2>
          <p>
            Shromažďujeme pouze nezbytné údaje pro poskytování našich služeb.
          </p>
          <h2>2. Použití údajů</h2>
          <p>
            Osobní údaje jsou používány výhradně pro účely, pro které byly
            shromážděny.
          </p>
        </div>
      </main>
    </>
  );
}
