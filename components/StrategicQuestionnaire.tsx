// components/StrategicQuestionnaire.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { submitInquiry } from '@/lib/actions/inquiry.actions';
import { Toaster } from '@/components/ui/toaster';

// Tlačítko, které ukazuje stav odesílání
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Odesílám...' : 'Odeslat poptávku'}
    </Button>
  );
}

// Props pro naši komponentu
interface StrategicQuestionnaireProps {
  selectedService?: string;
}

export default function StrategicQuestionnaire({
  selectedService,
}: StrategicQuestionnaireProps) {
  const initialState = { message: '', success: false, errors: {} };
  const [state, dispatch] = useFormState(submitInquiry, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Poptávka úspěšně odeslána!',
        description: 'Děkuji za Váš zájem. Brzy se Vám ozvu.',
      });
    } else if (state.message && !state.success) {
      // Zobrazí obecnou chybu, pokud nějaká nastane
      toast({
        title: 'Chyba při odesílání',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} className="space-y-6">
        {/* Jméno */}
        <div className="space-y-2">
          <Label htmlFor="name">Jméno a příjmení</Label>
          <Input id="name" name="name" placeholder="Jan Novák" required />
          {state.errors?.name && (
            <p className="text-sm text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jan.novak@email.cz"
            required
          />
          {state.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
        
        {/* Telefon (nepovinné) */}
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon (nepovinné)</Label>
          <Input id="phone" name="phone" placeholder="+420 123 456 789" />
        </div>

        {/* Služba */}
        <div className="space-y-2">
          <Label htmlFor="service">O jakou službu máte zájem?</Label>
          <Select name="service" defaultValue={selectedService}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Vyberte službu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strategicka-analyza">
                Strategická analýza a konzultace
              </SelectItem>
              <SelectItem value="webova-aplikace">
                Vývoj webové aplikace na míru
              </SelectItem>
              <SelectItem value="e-commerce">
                E-commerce řešení a B2B portály
              </SelectItem>
              <SelectItem value="dlouhodoba-spoluprace">
                Dlouhodobé partnerství a podpora
              </SelectItem>
              <SelectItem value="jine">Jiný dotaz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Zpráva */}
        <div className="space-y-2">
          <Label htmlFor="message">Vaše zpráva</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Řekněte nám více o Vašich cílech a představách..."
            className="min-h-[120px]"
          />
        </div>

        <SubmitButton />
      </form>
      <Toaster />
    </>
  );
}