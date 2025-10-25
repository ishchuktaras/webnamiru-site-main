// components/ContactForm.tsx
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';

// Zde definujeme schéma pro frontend, které musí odpovídat backendovému!
// Používáme zde "on" pro consent, aby to odpovídalo backendu.
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Zadejte platný e-mail." }),
  message: z.string().optional(), // Nyní nepovinné podle backend schématu
  service: z.string().min(1, { message: "Typ služby je povinný." }), // Nové povinné pole
  consent: z.boolean().refine(val => val === true, { // Zde stále boolean pro React Hook Form
    message: "Musíte souhlasit se zpracováním osobních údajů."
  }),
});

interface ContactFormProps {
    onClose?: () => void;
    // Přejmenujeme defaultSubject na defaultService, aby to odpovídalo backendu
    defaultService?: string;
}

export default function ContactForm({ onClose, defaultService = "Nezávazná poptávka" }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // Používáme nové schéma contactFormSchema
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "", // Message je nyní optional, takže ho nenastavujeme z defaultService
      service: defaultService, // Nastavujeme service z defaultService
      consent: false,
    },
  });

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    if (!recaptchaToken) {
        toast.error("Prosím, ověřte, že nejste robot.");
        return;
    }

    setIsLoading(true);
    try {
      // Speciální úprava pro odeslání 'consent' jako 'on' string, pokud je true
      const dataToSend = {
        ...values,
        recaptchaToken,
        consent: values.consent ? 'on' : undefined, // Odesíláme 'on' pokud je zaškrtnuto, jinak nic
        // Zod schéma na backendu pak bude mít "val === 'on'"
      };

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Zobrazíme detailnější chybovou zprávu z backendu
        const errorMessage = errorData.error || "Nepodařilo se odeslat zprávu.";
        console.error("Backend error response:", errorData); // Pro ladění
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      toast.success("Vaše zpráva byla odeslána! Brzy se Vám ozveme.");
      form.reset();
      setRecaptchaToken(null);
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Chyba při odesílání kontaktního formuláře:", error);
      // Toast už byl zobrazen v `if (!response.ok)` bloku
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative p-6 md:p-8 bg-background rounded-lg shadow-xl dark:bg-gray-900">
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Zavřít"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
        {defaultService || "Nezávazná poptávka"} {/* Nadpis stále využívá defaultService */}
      </h2>
      <p className="text-gray-400 mb-8">
        Zanechte nám zprávu a brzy se vám ozvu.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Jméno a příjmení</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Novák" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="jan.novak@email.cz" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NOVÉ SKRYTÉ POLE PRO SERVICE - MUSÍ SE POSÍLAT, I KDYŽ NENÍ VIDĚT */}
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem className="hidden"> {/* Skryjeme ho, protože už máme nadpis a defaultService */}
                <FormLabel className="text-gray-300">Služba</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Vaše zpráva</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Popište stručně váš projekt nebo dotaz."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-800 border-gray-700">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-300">
                    Souhlasím se zpracováním osobních údajů a <Link href="/podminky" className="text-primary hover:underline">obchodními podmínkami</Link>.
                  </FormLabel>
                  <FormDescription className="text-gray-500">
                    Pro odeslání poptávky je nutné potvrdit souhlas.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <GoogleReCaptcha onVerify={handleRecaptchaVerify} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Odesílám..." : "Odeslat zprávu"}
          </Button>
        </form>
      </Form>
    </div>
  );
}