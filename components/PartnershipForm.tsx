"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Toaster, toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Handshake, Loader2 } from "lucide-react"

// 1. Definice schématu pro validaci pomocí Zod
const partnershipSchema = z.object({
  package: z.string().min(1, { message: "Prosím, vyberte typ partnerství." }),
  name: z.string().min(2, { message: "Jméno nebo název firmy musí mít alespoň 2 znaky." }),
  portfolio: z.string().url({ message: "Zadejte prosím platnou URL adresu (včetně https://)." }),
  email: z.string().email({ message: "Zadejte prosím platnou e-mailovou adresu." }),
  phone: z.string().min(9, { message: "Telefonní číslo musí mít alespoň 9 číslic." }),
  reason: z.string().min(20, { message: "Popište prosím vaši motivaci alespoň 20 znaky." }),
  agreement: z.boolean().refine(val => val === true, { message: "Pro odeslání je nutný souhlas s podmínkami." }),
});

interface PartnershipFormProps {
  selectedPackage: string | null;
}

export default function PartnershipForm({ selectedPackage }: PartnershipFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 2. Inicializace formuláře
  const form = useForm<z.infer<typeof partnershipSchema>>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: {
      package: selectedPackage || "",
      name: "",
      portfolio: "",
      email: "",
      phone: "",
      reason: "",
      agreement: false,
    },
  });

  // 3. Funkce pro odeslání dat (volá stejnou API route)
  async function onSubmit(values: z.infer<typeof partnershipSchema>) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Něco se pokazilo při odesílání.');
      }

      toast.success("Váš zájem o partnerství byl úspěšně zaznamenán!", {
        description: "Děkuji! Brzy se vám ozvu s dalšími informacemi.",
      });
      form.reset();

    } catch (error) {
      console.error(error);
      toast.error("Chyba!", {
        description: "E-mail se nepodařilo odeslat. Zkuste to prosím později.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // 4. Vylepšená struktura JSX
  return (
    <>
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-2xl mx-auto border-0 md:border shadow-none md:shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 dark:bg-green-900/20 p-3 rounded-full mb-2">
                <Handshake className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Zájem o partnerství</CardTitle>
            <CardDescription>
              Máte zájem o spolupráci? Skvělé! Vyplňte formulář a já se vám ozvu.
            </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6 p-4 md:p-6">
              <FormField control={form.control} name="package" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typ partnerství</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Vyberte typ spolupráce..." /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="KREATIVNÍ PARTNER">Kreativní partner</SelectItem>
                        <SelectItem value="MARKETING EXPERT">Marketing expert</SelectItem>
                        <SelectItem value="PROJEKTOVÝ LÍDR">Projektový lídr</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
              )} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Jméno a příjmení / Firma</FormLabel><FormControl><Input placeholder="Jan Novák / Agency s.r.o." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="portfolio" render={({ field }) => (
                      <FormItem><FormLabel>Odkaz na portfolio / web</FormLabel><FormControl><Input placeholder="https://mojeprace.cz" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" placeholder="partner@email.cz" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Telefon</FormLabel><FormControl><Input type="tel" placeholder="+420 123 456 789" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
              </div>
              
              <FormField control={form.control} name="reason" render={({ field }) => (
                  <FormItem><FormLabel>Proč máte zájem o spolupráci?</FormLabel><FormControl><Textarea placeholder="Hledám spolehlivého partnera pro vývoj webů..." className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              <FormField control={form.control} name="agreement" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                       <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1 leading-none">
                          <FormLabel>Seznámil/a jsem se s podmínkami partnerského programu.</FormLabel>
                          <FormMessage />
                      </div>
                  </FormItem>
              )} />
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Odesílám...</>) : "Navázat spolupráci"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}
