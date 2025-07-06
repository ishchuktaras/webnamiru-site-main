// components/admin/InquiryDetailView.tsx

"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sendInquiryToClient } from "@/app/(admin)/admin/inquiries/actions";
import { Mail, Loader2 } from "lucide-react";

// Typy, které potřebujeme
type Inquiry = {
    id: string;
    projectName: string;
    clientName: string;
    clientEmail: string;
    status: string;
    answers: Record<string, string>;
};

const sectionTitles: Record<string, string> = {
    brandStory: "Příběh značky",
    brandValues: "Hodnoty značky",
    brandVoice: "Osobnost značky",
    kpis: "Vybrané klíčové ukazatele (KPIs)",
    targetAudience: "Cílový zákazník/podporovatel",
    userPainPoints: "Problémy a motivace zákazníka",
    competitors: "Konkurence / Podobné organizace",
    usp: "Unikátní prodejní nabídka",
    inspirations: "Inspirativní weby",
    mustHaveFeatures: "Nezbytné funkce",
    mustHaveFeaturesOther: "Upřesnění dalších funkcí",
    contentProvider: "Dodání obsahu",
    budgetRange: "Odhadovaný rozpočet",
};

const AnswerDisplay = ({ label, value }: { label: string, value?: string }) => {
    if (!value) return null;
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-base text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{value}</p>
        </div>
    );
};


export default function InquiryDetailView({ inquiry }: { inquiry: Inquiry }) {
    const [isPending, startTransition] = useTransition();

    const handleSendEmail = () => {
        startTransition(async () => {
            const result = await sendInquiryToClient(inquiry.id);
            if (result.success) {
                toast.success("Odesláno!", { description: result.message });
            } else {
                toast.error("Chyba!", { description: result.message });
            }
        });
    };

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
                            <Button onClick={handleSendEmail} disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                                {isPending ? 'Odesílám...' : 'Poslat souhrn klientovi'}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>DNA Značky</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <AnswerDisplay label={sectionTitles.brandStory} value={inquiry.answers.brandStory} />
                        <AnswerDisplay label={sectionTitles.brandValues} value={inquiry.answers.brandValues} />
                        <AnswerDisplay label={sectionTitles.brandVoice} value={inquiry.answers.brandVoice} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Cíle a úspěch</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <AnswerDisplay label={sectionTitles.kpis} value={inquiry.answers.kpis} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Cílový zákazník</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <AnswerDisplay label={sectionTitles.targetAudience} value={inquiry.answers.targetAudience} />
                        <AnswerDisplay label={sectionTitles.userPainPoints} value={inquiry.answers.userPainPoints} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Trh a inspirace</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <AnswerDisplay label={sectionTitles.competitors} value={inquiry.answers.competitors} />
                        <AnswerDisplay label={sectionTitles.usp} value={inquiry.answers.usp} />
                        <AnswerDisplay label={sectionTitles.inspirations} value={inquiry.answers.inspirations} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Funkce a obsah</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <AnswerDisplay label={sectionTitles.mustHaveFeatures} value={inquiry.answers.mustHaveFeatures} />
                        <AnswerDisplay label={sectionTitles.mustHaveFeaturesOther} value={inquiry.answers.mustHaveFeaturesOther} />
                        <AnswerDisplay label={sectionTitles.contentProvider} value={inquiry.answers.contentProvider === 'agency' ? 'Potřebuje pomoci' : 'Dodá si sám'} />
                        <AnswerDisplay label={sectionTitles.budgetRange} value={inquiry.answers.budgetRange} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}