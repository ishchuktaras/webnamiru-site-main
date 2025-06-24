"use client"
import { useActionState, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { submitContactForm } from "@/app/actions"
import { Building2, Handshake, Clock, MapPin, Users, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState<"service" | "partnership" | "">("")

  const initialState = {
    message: "",
    errors: {},
  }

  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          {/* ... Hlavička ... */}
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <form action={formAction} className="space-y-8">
            {/* Typ poptávky */}
            <Card className={state.errors?.inquiryType ? "border-2 border-red-500 dark:border-red-700" : "border-2 border-blue-100 dark:border-blue-900"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Typ poptávky *
                </CardTitle>
                <CardDescription>Vyberte, zda máte zájem o naše služby nebo partnerství</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={inquiryType}
                  onValueChange={(value) => setInquiryType(value as "service" | "partnership")}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                    <RadioGroupItem value="service" id="service" />
                    <Label htmlFor="service" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Objednávka služeb</div>
                        <div className="text-sm text-gray-500">Chci web pro svou firmu</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                    <RadioGroupItem value="partnership" id="partnership" />
                    <Label htmlFor="partnership" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Handshake className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Partnerství</div>
                        <div className="text-sm text-gray-500">Chci spolupracovat</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                <input type="hidden" name="inquiryType" value={inquiryType} />
                {/* === ZMĚNA ZDE: Zobrazení chyby pro typ poptávky === */}
                {state.errors?.inquiryType && <p className="text-red-600 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{state.errors.inquiryType.join(", ")}</p>}
              </CardContent>
            </Card>

            {/* Kontaktní údaje */}
            <Card>
              <CardHeader><CardTitle>Kontaktní údaje</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Jméno a příjmení *</Label>
                    <Input id="name" name="name" placeholder="Jan Novák" type="text" required className="mt-1" />
                    {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name.join(", ")}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" name="email" placeholder="jan@firma.cz" type="email" required className="mt-1" />
                    {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email.join(", ")}</p>}
                  </div>
                </div>
                {/* ... další pole ... */}
              </CardContent>
            </Card>

            {/* ... další podmíněné karty ... */}

            {/* Zpráva */}
            <Card>
              <CardHeader><CardTitle>Vaše zpráva *</CardTitle></CardHeader>
              <CardContent>
                <div>
                  {/* ... Textarea a zobrazení chyby ... */}
                   <Textarea id="message" name="message" placeholder="Popište svou představu..." required rows={6} className="mt-1 resize-y" />
                   {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message.join(", ")}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Tlačítko odeslat */}
            <div className="flex flex-col items-center space-y-4">
              {/* === ZMĚNA ZDE: Tlačítko je neaktivní, pokud není vybrán typ poptávky === */}
              <Button
                type="submit"
                disabled={isPending || !inquiryType}
                className="w-full md:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {/* ... text tlačítka ... */}
              </Button>
            </div>
            
            {/* Zpráva o stavu odeslání */}
            {state.message && (
              <Card className={`${state.errors && Object.keys(state.errors).length > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
                <CardContent className="pt-6">
                  <p className={`text-center font-medium ${state.errors && Object.keys(state.errors).length > 0 ? "text-red-700" : "text-green-700"}`}>{state.message}</p>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
