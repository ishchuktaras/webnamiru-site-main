// app/(admin)/admin/inquiries/[id]/page.tsx

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sendInquiryToClient } from "@/app/(admin)/admin/inquiries/actions"; 

// Pomocná komponenta pro tlačítko, která řeší odesílání
"use client";
import { useTransition } from "react";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";

function SendEmailButton({ inquiryId }: { inquiryId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const result = await sendInquiryToClient(inquiryId);
            if (result.success) {
                toast.success("Odesláno!", { description: result.message });
            } else {
                toast.error("Chyba!", { description: result.message });
            }
        });
    };

    return (
        <Button onClick={handleClick} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            {isPending ? 'Odesílám...' : 'Poslat souhrn klientovi'}
        </Button>
    );
}

async function getInquiryDetails(id: string) {
  const inquiry = await prisma.projectInquiry.findUnique({
    where: { id },
    include: {
      answers: true, // Zahrneme všechny odpovědi
    },
  });
  return inquiry;
}

// Pomocná komponenta pro zobrazení odpovědi
const AnswerDisplay = ({ label, value }: { label: string, value?: string }) => {
    if (!value) return null; // Pokud odpověď neexistuje, nic nezobrazíme
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{value}</p>
        </div>
    );
};

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const inquiry = await getInquiryDetails(params.id);

  if (!inquiry) {
    notFound();
  }
  
  // Převedeme pole odpovědí na objekt pro snadnější přístup
  const answers = inquiry.answers.reduce((acc, ans) => {
    acc[ans.question] = ans.answer;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl">{inquiry.projectName}</CardTitle>
              <CardDescription>
                Poptávka od: {inquiry.clientName} ({inquiry.clientEmail})
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                 <Badge variant={inquiry.status === 'contacted' ? 'default' : 'secondary'}>
                    {inquiry.status === 'contacted' ? 'Kontaktováno' : 'Nová poptávka'}
                 </Badge>
                 <SendEmailButton inquiryId={inquiry.id} />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
             <CardHeader><CardTitle>DNA Značky</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <AnswerDisplay label="Příběh značky" value={answers.brandStory} />
                <AnswerDisplay label="Hodnoty značky" value={answers.brandValues} />
                <AnswerDisplay label="Osobnost značky" value={answers.brandVoice} />
             </CardContent>
          </Card>
          <Card>
             <CardHeader><CardTitle>Cíle a úspěch</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <AnswerDisplay label="Hlavní cíl webu" value={answers.mainGoal} />
                <AnswerDisplay label="Metriky úspěchu (KPIs)" value={answers.successMetrics} />
             </CardContent>
          </Card>
          <Card>
             <CardHeader><CardTitle>Cílový zákazník</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <AnswerDisplay label="Popis ideálního zákazníka" value={answers.targetAudience} />
                <AnswerDisplay label="Jeho největší problémy" value={answers.userPainPoints} />
             </CardContent>
          </Card>
          <Card>
             <CardHeader><CardTitle>Trh a inspirace</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <AnswerDisplay label="Konkurence" value={answers.competitors} />
                <AnswerDisplay label="Unikátní prodejní nabídka (USP)" value={answers.usp} />
                <AnswerDisplay label="Inspirativní weby" value={answers.inspirations} />
             </CardContent>
          </Card>
          <Card>
             <CardHeader><CardTitle>Funkce a obsah</CardTitle></CardHeader>
             <CardContent className="space-y-4">
                <AnswerDisplay label="Nezbytné funkce (Must-have)" value={answers.mustHaveFeatures} />
                <AnswerDisplay label="Dodavatel obsahu" value={answers.contentProvider === 'agency' ? 'Potřebuje pomoci' : 'Dodá si sám'} />
                <AnswerDisplay label="Odhadovaný rozpočet" value={answers.budgetRange} />
             </CardContent>
          </Card>
      </div>
    </div>
  );
}