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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// OPRAVA: Importujeme přímo GoogleReCaptcha
import { GoogleReCaptcha } from "react-google-recaptcha-v3"; 
// OPRAVA: Už nepotřebujeme importovat ReCaptcha od nás, jen Provider v Root Layoutu
// import ReCaptcha from "./ReCaptchaProvider"; 

// Schema pro validaci formuláře
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Jméno musí mít alespoň 2 znaky.",
  }),
  email: z.string().email({
    message: "Zadejte platný e-mail.",
  }),
  phone: z.string().optional(),
  service: z.string().min(1, {
    message: "Vyberte prosím službu.",
  }),
  message: z.string().min(10, {
    message: "Zpráva musí mít alespoň 10 znaků.",
  }),
});

export default function ContactForm({ onClose }: { onClose?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  // OPRAVA: Funkce pro získání reCAPTCHA tokenu
  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!recaptchaToken) {
        toast.error("Prosím, ověřte, že nejste robot.");
        return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nepodařilo se odeslat poptávku.");
      }

      toast.success("Poptávka byla úspěšně odeslána! Ozveme se Vám co nejdříve.");
      form.reset();
      setRecaptchaToken(null); // Reset reCAPTCHA tokenu
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      console.error("Chyba při odesílání formuláře:", error);
      toast.error(error.message || "Došlo k chybě při odesílání poptávky. Zkuste to prosím znovu.");
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
        Pojďme společně nastartovat váš projekt
      </h2>
      <p className="text-gray-400 mb-8">
        Vyplňte krátký dotazník a já se vám co nejdříve ozvu s konkrétními návrhy a dalším postupem.
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Telefon (nepovinné)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+420 123 456 789" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">O jakou službu máte zájem?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white [&>span]:text-gray-500">
                      <SelectValue placeholder="Vyberte službu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="web-na-miru">Web na míru</SelectItem>
                    <SelectItem value="e-shop">E-shop</SelectItem>
                    <SelectItem value="seo-optimalizace">SEO optimalizace</SelectItem>
                    <SelectItem value="strategicka-analyza">Strategická analýza</SelectItem>
                    <SelectItem value="jina-sluzba">Jiná služba</SelectItem>
                  </SelectContent>
                </Select>
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
                    placeholder="Řekněte nám více o Vašich cílech a představách..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            {/* OPRAVA: Vykreslujeme GoogleReCaptcha přímo zde */}
            <GoogleReCaptcha onVerify={handleRecaptchaVerify} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Odesílám..." : "Odeslat poptávku"}
          </Button>
        </form>
      </Form>
    </div>
  );
}