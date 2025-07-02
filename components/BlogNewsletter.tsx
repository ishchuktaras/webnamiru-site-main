// components/BlogNewsletter.tsx

"use client";

import { useEffect, useRef } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToNewsletter, type NewsletterFormState } from "@/app/(main)/newsletter/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Pomocná komponenta pro tlačítko, aby ukazovalo stav odesílání
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" aria-disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Odesílám...
        </>
      ) : (
        "Přihlásit se k odběru"
      )}
    </Button>
  );
}

export default function BlogNewsletter() {
  const initialState: NewsletterFormState = { message: "", success: false };
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Efekt, který zobrazí notifikaci a případně vymaže formulář
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Hotovo!", { description: state.message });
        formRef.current?.reset(); // Vymažeme formulář po úspěchu
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  return (
    <Card className="bg-gray-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
            <Mail className="h-8 w-8 text-blue-600" />
            <div>
                <CardTitle className="text-2xl">Nezmeškejte nové články</CardTitle>
                <CardDescription>
                Přihlaste se k odběru a dostávejte nejnovější tipy o webdevelopmentu a online marketingu přímo do emailu.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
          <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
            <Input
              name="email"
              type="email"
              placeholder="vas@email.cz"
              required
              className="flex-grow"
              // Formulář zakážeme po úspěšném odeslání
              disabled={state.success}
            />
            <SubmitButton />
          </form>
      </CardContent>
    </Card>
  );
}