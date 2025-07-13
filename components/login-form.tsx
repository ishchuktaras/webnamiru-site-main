// components/login-form.tsx

"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from "@/lib/actions/auth.actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, AlertTriangle } from "lucide-react";

// Pomocná komponenta pro tlačítko, aby ukazovalo stav odesílání
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button className="w-full" aria-disabled={pending} disabled={pending}>
      {pending ? "Ověřuji..." : "Přihlásit se"}
    </Button>
  );
}

export default function LoginForm() {
  // Používáme useActionState pro správu stavu formuláře
  const [errorMessage, formAction] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <LogIn className="h-6 w-6"/> Přihlášení do administrace
          </CardTitle>
          <CardDescription>Zadejte své přihlašovací údaje.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="vas@email.cz" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          <LoginButton />
          
          {/* Zobrazíme chybovou hlášku, pokud nějaká existuje */}
          {errorMessage && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-500">
              <AlertTriangle className="h-4 w-4" />
              <p>{errorMessage}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}