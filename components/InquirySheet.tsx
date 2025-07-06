// components/InquirySheet.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitInquiry, type InquiryFormState } from "@/app/(main)/actions"; 

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {pending ? 'Odesílám...' : 'Odeslat poptávku'}
        </Button>
    )
}

interface InquirySheetProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  serviceInfo: string;
}

function FieldError({ fieldName, errors }: { fieldName: string; errors?: Record<string, string[]> }) {
  if (!errors || !errors[fieldName]) return null;
  return <p className="text-red-500 text-sm mt-1">{errors[fieldName].join(", ")}</p>;
}

export default function InquirySheet({ trigger, title, description, serviceInfo }: InquirySheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const initialState: InquiryFormState = { message: "", success: false, errors: {} };
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Úspěch!", { description: state.message });
        setIsSheetOpen(false); 
        formRef.current?.reset();
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <form ref={formRef} action={formAction} id={`form-${serviceInfo.replace(/\s+/g, '-')}`} className="space-y-4">
            <input type="hidden" name="service" value={serviceInfo} />
            <div className="space-y-2">
              <Label htmlFor="name">Celé jméno (povinné)</Label>
              <Input id="name" name="name" placeholder="Jan Novák" required />
              {state.errors && <FieldError fieldName="name" errors={state.errors} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Kontaktní e-mail (povinné)</Label>
              <Input id="email" name="email" type="email" placeholder="vas@email.cz" required />
              {state.errors && <FieldError fieldName="email" errors={state.errors} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Vaše zpráva (nepovinné)</Label>
              <Textarea id="message" name="message" placeholder="Můžete doplnit specifické požadavky..." />
            </div>
             <SheetFooter className="flex-col sm:flex-row sm:justify-end sm:items-center gap-4 pt-4">
                <SheetClose asChild>
                    <Button type="button" variant="ghost">Zavřít</Button>
                </SheetClose>
                <SubmitButton />
            </SheetFooter>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}