// app/(admin)/admin/workflow/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, FileText, GanttChartSquare, Milestone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const workflowPhases = [
  {
    phase: 1,
    title: "Poptávka a První Kontakt",
    goal: "Efektivně zpracovat příchozí poptávku a udělat skvělý první dojem.",
    steps: [
      "Jakmile obdržíte poptávku, založte nový projekt v sekci 'Projekty'.",
      "Zkopírujte údaje od klienta do detailu projektu.",
      "V záložce 'Nabídka' vyplňte sekci 'Interní analýza a poznámky'.",
      "Odešlete klientovi potvrzovací e-mail a navrhněte termín konzultace.",
    ],
    action: {
      href: "/admin/projects/new",
      text: "Založit nový projekt",
    },
  },
  {
    phase: 2,
    title: "Konzultace a Návrh Řešení",
    goal: "Plně porozumět potřebám klienta a připravit pro něj profesionální nabídku na míru.",
    steps: [
      "Proveďte s klientem úvodní konzultaci (online nebo osobně).",
      "Na základě získaných informací vyplňte v detailu projektu záložku 'Nabídka'.",
      "Vyplňte všechny části: shrnutí, rozsah prací i cenovou kalkulaci.",
      "Uložte nabídku a případně vygenerujte PDF, které zašlete klientovi.",
    ],
    action: {
      href: "/admin/projects",
      text: "Přejít na přehled projektů",
    },
  },
  {
    phase: 3,
    title: "Potvrzení Objednávky a Záloha",
    goal: "Oficiálně stvrdit spolupráci a získat zálohu nutnou pro zahájení prací.",
    steps: [
      "Po odsouhlasení nabídky klientem přejděte k projektu.",
      "V záložce 'Smlouva' zaznamenejte stav (např. 'Podepsáno').",
      "V záložce 'Faktury' vytvořte novou 'Zálohovou fakturu' na 50 % ceny.",
      "Po přijetí platby změňte status faktury na 'Zaplaceno'.",
    ],
  },
  {
    phase: 4,
    title: "Vývoj a Komunikace",
    goal: "Samotná tvorba webu a udržování klienta v obraze.",
    steps: [
      "V detailu projektu přejděte na záložku 'Úkoly'.",
      "Vytvořte si seznam všech úkolů, které je potřeba udělat.",
      "Postupně odškrtávejte hotové úkoly, abyste měli přehled o postupu.",
      "V polovině času zvažte zaslání průběžného reportu klientovi.",
    ],
  },
  {
    phase: 5,
    title: "Dokončení a Předání",
    goal: "Získat od klienta finální schválení a formálně mu předat hotové dílo.",
    steps: [
      "Prezentujte klientovi finální verzi webu.",
      "Po schválení vyplňte v detailu projektu záložku 'Předání'.",
      "Zaznamenejte datum předání a odkaz na podepsaný protokol.",
      "Bezpečně předejte klientovi všechny přístupové údaje.",
    ],
  },
  {
    phase: 6,
    title: "Finální Fakturace a Závěr",
    goal: "Ukončit projekt, získat doplatek a otevřít dveře pro další spolupráci.",
    steps: [
      "V detailu projektu přejděte na záložku 'Faktury'.",
      "Vytvořte novou 'Finální fakturu' na zbývajících 50 % ceny.",
      "Po přijetí platby změňte status faktury na 'Zaplaceno'.",
      "Pošlete klientovi závěrečný e-mail s poděkováním a žádostí o referenci.",
    ],
  },
];

export default function WorkflowGuidePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <GanttChartSquare className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Kompletní Průvodce Zakázkou
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
          Standardizovaný postup pro správu a realizaci klientských projektů od
          A do Z.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-6 h-full w-0.5 bg-border -z-10" />

        <div className="space-y-12">
          {workflowPhases.map((phase) => (
            <div key={phase.phase} className="relative pl-12">
              <div className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Milestone className="h-6 w-6" />
              </div>
              <Card>
                <CardHeader>
                  <CardDescription>Fáze {phase.phase}</CardDescription>
                  <CardTitle>{phase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{phase.goal}</p>
                  <ul className="space-y-2">
                    {phase.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  {phase.action && (
                    <div className="pt-4">
                      <Button asChild>
                        <Link href={phase.action.href}>
                          {phase.action.text}
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
