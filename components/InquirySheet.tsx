// components/InquirySheet.tsx

"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // Import pro notifikace

interface InquirySheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  serviceInfo: string;
}

export default function InquirySheet({ trigger, title, description, serviceInfo }: InquirySheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Něco se pokazilo. Zkuste to prosím znovu.');
      }

      toast.success("Poptávka byla úspěšně odeslána!", {
        description: "Děkuji za Váš zájem. Ozvu se Vám co nejdříve.",
      });
      setIsSheetOpen(false); // Zavřeme panel po úspěšném odeslání
    } catch (error) {
      toast.error("Chyba při odesílání", {
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <form id={`form-${serviceInfo.replace(/\s+/g, '-')}`} className="space-y-4" onSubmit={handleSubmit}>
            <input type="hidden" name="service" value={serviceInfo} />
            <div className="space-y-2">
              <Label htmlFor="name">Celé jméno*</Label>
              <Input id="name" name="name" placeholder="Jan Novák" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Kontaktní e-mail*</Label>
              <Input id="email" name="email" type="email" placeholder="vas@email.cz" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Vaše zpráva (nepovinné)</Label>
              <Textarea id="message" name="message" placeholder="Můžete doplnit specifické požadavky..." disabled={isLoading} />
            </div>
          </form>
        </div>
        <SheetFooter className="flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <SheetClose asChild>
            <Button type="button" variant="ghost" disabled={isLoading}>Zavřít</Button>
          </SheetClose>
          <Button type="submit" form={`form-${serviceInfo.replace(/\s+/g, '-')}`} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Odesílám...' : 'Odeslat poptávku'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}