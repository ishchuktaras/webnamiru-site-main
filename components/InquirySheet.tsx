// components/InquirySheet.tsx

"use client";

import { useState, useCallback } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"; // ZMĚNA: Přidán import pro Checkbox
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"; // ZMĚNA: Přidán import pro reCAPTCHA
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link"; // ZMĚNA: Přidán import pro Link

interface InquirySheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  serviceInfo: string;
}

export default function InquirySheet({ trigger, title, description, serviceInfo }: InquirySheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // ZMĚNA: Integrace reCAPTCHA hooku
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!executeRecaptcha) {
      toast.error("Chyba reCAPTCHA", { description: "Nepodařilo se načíst ochranu proti spamu. Zkuste to prosím znovu." });
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    
    // ZMĚNA: Získáme reCAPTCHA token a přidáme ho do formuláře
    const token = await executeRecaptcha('inquiryForm');
    formData.append("recaptchaToken", token);
    
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Něco se pokazilo. Zkuste to prosím znovu.');
      }

      toast.success("Poptávka byla úspěšně odeslána!", {
        description: "Děkuji za Váš zájem. Ozvu se Vám co nejdříve.",
      });
      setIsSheetOpen(false);
    } catch (error) {
      toast.error("Chyba při odesílání", {
        description: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [executeRecaptcha, serviceInfo]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <form id={`form-${serviceInfo.replace(/\s+/g, '-')}`} className="space-y-6" onSubmit={handleSubmit}>
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

            {/* ZMĚNA: Přidáno zaškrtávací políčko pro GDPR a obchodní podmínky */}
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox id="consent" name="consent" required disabled={isLoading} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Souhlasím se zpracováním osobních údajů*
                </label>
                <p className="text-sm text-muted-foreground">
                  Odesláním formuláře souhlasíte s našimi{" "}
                  <Link href="/obchodni-podminky" className="underline hover:text-primary">obchodními podmínkami</Link> a{" "}
                  <Link href="/ochrana-osobnich-udaju" className="underline hover:text-primary">zásadami ochrany osobních údajů</Link>.
                </p>
              </div>
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