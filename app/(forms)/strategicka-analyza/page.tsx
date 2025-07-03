// app/(main)/strategicka-analyza/page.tsx
import StrategicQuestionnaire from "@/components/StrategicQuestionnaire";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Strategická Analýza Projektu</h1>
            <p className="mt-4 text-xl text-muted-foreground">
                Tento dotazník je prvním krokem k vytvoření webu, který bude skutečně fungovat pro váš byznys. 
                Vaše odpovědi mi pomohou pochopit vaše cíle a navrhnout nejlepší možné řešení.
            </p>
        </div>
        <StrategicQuestionnaire />
    </div>
  );
}