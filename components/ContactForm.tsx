// components/ContactForm.tsx
"use client";

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

const contactSchema = z.object({
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Zadejte platný e-mail." }),
  message: z.string().min(10, { message: "Zpráva musí mít alespoň 10 znaků." }),
});

// ZDE JE KLÍČOVÁ ZMĚNA: Definice props pro ContactForm
interface ContactFormProps {
  onClose?: () => void;
  defaultSubject?: string; // Tuto prop potřebuješ!
}

// ZDE JE KLÍČOVÁ ZMĚNA: Přijímání props
export default function ContactForm({
  onClose,
  defaultSubject = "",
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: defaultSubject ? `${defaultSubject}: ` : "", // Nastaví výchozí zprávu
    },
  });

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    if (!recaptchaToken) {
      toast.error("Prosím, ověřte, že nejste robot.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          recaptchaToken,
          inquiryType: defaultSubject || "Obecná poptávka",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nepodařilo se odeslat zprávu.");
      }

      toast.success("Vaše zpráva byla odeslána! Brzy se Vám ozveme.");
      form.reset();
      setRecaptchaToken(null);
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Chyba při odesílání kontaktního formuláře:", error);
      toast.error(
        error.message ||
          "Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu."
      );
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
        Nezávazná poptávka
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
                <FormLabel className="text-gray-300">
                  Jméno a příjmení
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan Novák"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                    {...field}
                  />
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
                  <Input
                    type="email"
                    placeholder="jan.novak@email.cz"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                    {...field}
                  />
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

          <GoogleReCaptcha onVerify={handleRecaptchaVerify} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Odesílám..." : "Odeslat zprávu"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
