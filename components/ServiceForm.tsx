// /components/ServiceForm.tsx (profesionální verze)

"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Toaster, toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { User, Mail, Phone, Building, FileText, Loader2 } from "lucide-react"

// 1. Definice schématu pro validaci pomocí Zod
const formSchema = z.object({
  package: z.string().min(1, { message: "Prosím, vyberte balíček." }),
  name: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  company: z.string().optional(),
  email: z.string().email({ message: "Zadejte prosím platnou e-mailovou adresu." }),
  phone: z.string().min(9, { message: "Telefonní číslo musí mít alespoň 9 číslic." }),
  projectDescription: z.string().min(10, { message: "Popis musí mít alespoň 10 znaků." }),
  gdpr: z.boolean().refine(val => val === true, { message: "Pro odeslání je nutný souhlas." }),
});

interface ServiceFormProps {
  selectedPackage: string | null;
}

export default function ServiceForm({ selectedPackage }: ServiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 2. Inicializace formuláře pomocí React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package: selectedPackage || "",
      name: "",
      company: "",
      email: "",
      phone: "",
      projectDescription: "",
      gdpr: false,
    },
  });

  // 3. Funkce pro odeslání dat
   async function onSubmit(values: z.infer<typeof formSchema>) {
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

      toast.success("Poptávka byla úspěšně odeslána!", {
        description: "Brzy se vám ozvu na uvedený e-mail.",
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


  // 4. Nová, čistší struktura JSX
  return (
    <>
      <Toaster richColors position="top-center" />
      <Card className="w-full max-w-2xl mx-auto border-0 md:border shadow-none md:shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mb-2">
                <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Poptávka služeb</CardTitle>
            <CardDescription>
            Stačí pár detailů a já se vám co nejdříve ozvu s dalším postupem.
            </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6 p-4 md:p-6">
              {/* Balíček */}
              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mám zájem o balíček</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Vyberte balíček..." /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="START">START</SelectItem>
                        <SelectItem value="RŮST">RŮST</SelectItem>
                        <SelectItem value="EXPANZE">EXPANZE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Jméno a Firma */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Jméno a příjmení</FormLabel>
                          <FormControl><Input placeholder="Jan Novák" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Název firmy / IČO (nepovinné)</FormLabel>
                          <FormControl><Input placeholder="MojeFirma s.r.o." {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
              </div>

              {/* Email a Telefon */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl><Input type="email" placeholder="jan.novak@email.cz" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                          <FormLabel>Telefon</FormLabel>
                          <FormControl><Input type="tel" placeholder="+420 123 456 789" {...field} /></FormControl>
                          <FormMessage />
                      </FormItem>
                  )} />
              </div>
              
              {/* Popis projektu */}
              <FormField control={form.control} name="projectDescription" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Krátce popište svůj projekt</FormLabel>
                      <FormControl><Textarea placeholder="Chtěl bych vytvořit moderní web pro..." className="min-h-[120px]" {...field} /></FormControl>
                      <FormMessage />
                  </FormItem>
              )} />
              
              {/* GDPR Souhlas */}
              <FormField control={form.control} name="gdpr" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                       <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1 leading-none">
                          <FormLabel>Souhlas se zpracováním osobních údajů</FormLabel>
                          <FormMessage />
                      </div>
                  </FormItem>
              )} />
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Odesílám...
                  </>
                ) : "Odeslat poptávku"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  )
}