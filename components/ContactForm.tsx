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
import { Building2, Handshake, Clock, MapPin, Users } from "lucide-react"

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
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Začněme spolupráci
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
              Vyberte typ poptávky a vyplňte formulář. Odpovím do 24 hodin s konkrétním návrhem řešení.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <form action={formAction} className="space-y-8">
            {/* Typ poptávky */}
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Typ poptávky
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
              </CardContent>
            </Card>

            {/* Základní kontaktní údaje */}
            <Card>
              <CardHeader>
                <CardTitle>Kontaktní údaje</CardTitle>
              </CardHeader>
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
                    {state.errors?.email && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.email.join(", ")}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" name="phone" placeholder="+420 777 123 456" type="tel" className="mt-1" />
                    {state.errors?.phone && (
                      <p className="text-red-500 text-sm mt-1">{state.errors.phone.join(", ")}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Název firmy</Label>
                    <Input id="company" name="company" placeholder="Moje firma s.r.o." type="text" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Podmíněné zobrazení pro služby */}
            {inquiryType === "service" && (
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-300">Detaily objednávky</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="servicePackage">Balíček služeb</Label>
                    <Select name="servicePackage">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Vyberte balíček nebo individuální řešení" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="start">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600">
                              START
                            </Badge>
                            <span>Základní web (od 6 000 Kč)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="rust">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-blue-600">
                              RŮST
                            </Badge>
                            <span>Pokročilý web (od 12 000 Kč)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="expanze">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-purple-600">
                              EXPANZE
                            </Badge>
                            <span>Komplexní řešení (Individuální)</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="individual">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-orange-600">
                              INDIVIDUÁLNÍ
                            </Badge>
                            <span>Řešení na míru</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Rozpočet</Label>
                      <Select name="budget">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Váš rozpočet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6-12k">6-12k Kč</SelectItem>
                          <SelectItem value="12-20k">12-20k Kč</SelectItem>
                          <SelectItem value="20-35k">20-35k Kč</SelectItem>
                          <SelectItem value="35k+">35k+ Kč</SelectItem>
                          <SelectItem value="dohodneme">Dohodneme individuálně</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Časový rámec</Label>
                      <Select name="timeline">
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Kdy potřebujete web" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">Co nejdříve</SelectItem>
                          <SelectItem value="1month">Do měsíce</SelectItem>
                          <SelectItem value="3months">Do 3 měsíců</SelectItem>
                          <SelectItem value="flexible">Flexibilní</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessType">Typ podnikání</Label>
                    <Select name="businessType">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Vyberte typ vašeho podnikání" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remeslo">Řemeslo a služby</SelectItem>
                        <SelectItem value="obchod">Obchod a e-commerce</SelectItem>
                        <SelectItem value="ubytovani">Ubytování a gastronomie</SelectItem>
                        <SelectItem value="zdravotnictvi">Zdravotnictví</SelectItem>
                        <SelectItem value="vzdelavani">Vzdělávání</SelectItem>
                        <SelectItem value="neziskovka">Nezisková organizace</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="jine">Jiné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Podmíněné zobrazení pro partnerství */}
            {inquiryType === "partnership" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">Partnerské příležitosti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="partnershipType">Typ partnerství</Label>
                    <Select name="partnershipType">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Vyberte typ spolupráce" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kreativni">
                          <div className="flex flex-col">
                            <span className="font-medium">Kreativní partner (15-25%)</span>
                            <span className="text-sm text-gray-500">Fotografové & Designéři</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="marketing">
                          <div className="flex flex-col">
                            <span className="font-medium">Marketing expert (20-30%)</span>
                            <span className="text-sm text-gray-500">Marketologové & Konzultanti</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="projektovy">
                          <div className="flex flex-col">
                            <span className="font-medium">Projektový lídr (Individuální)</span>
                            <span className="text-sm text-gray-500">Project Manageři & Agentury</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="other">Jiné partnerství</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Vaše zkušenosti</Label>
                    <Select name="experience">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Úroveň zkušeností" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Začátečník (0-1 rok)</SelectItem>
                        <SelectItem value="intermediate">Pokročilý (1-3 roky)</SelectItem>
                        <SelectItem value="advanced">Zkušený (3-5 let)</SelectItem>
                        <SelectItem value="expert">Expert (5+ let)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="portfolio">Portfolio/Reference</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      placeholder="Odkaz na vaše portfolio nebo web"
                      type="url"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lokace - důležité pro Vysočinu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Lokace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="location">Město/Obec</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Jihlava, Havlíčkův Brod, Třebíč..."
                    type="text"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Specializujeme se na Kraj Vysočina, ale pracujeme i s klienty z celé ČR
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Zpráva */}
            <Card>
              <CardHeader>
                <CardTitle>Vaše zpráva</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="message">
                    {inquiryType === "service"
                      ? "Popište svou představu o webu"
                      : inquiryType === "partnership"
                        ? "Popište, jak si představujete spolupráci"
                        : "Vaše zpráva"}{" "}
                    *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={
                      inquiryType === "service"
                        ? "Popište svou firmu, co očekáváte od webu, jaké funkce potřebujete..."
                        : inquiryType === "partnership"
                          ? "Popište své služby, zkušenosti a jak byste chtěli spolupracovat..."
                          : "Napište nám svou zprávu..."
                    }
                    required
                    rows={6}
                    className="mt-1 resize-y"
                  />
                  {state.errors?.message && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.message.join(", ")}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tlačítko odeslat */}
            <div className="flex flex-col items-center space-y-4">
              <Button
                type="submit"
                disabled={isPending || !inquiryType}
                className="w-full md:w-auto inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Odesílám...
                  </>
                ) : (
                  <>
                    {inquiryType === "service"
                      ? "Odeslat poptávku"
                      : inquiryType === "partnership"
                        ? "Odeslat nabídku spolupráce"
                        : "Odeslat zprávu"}
                    <Clock className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-gray-500 space-y-1">
                <p>✅ Odpovím do 24 hodin</p>
                <p>🎯 První konzultace zdarma</p>
                <p>
                  📞 Můžete také volat:{" "}
                  <a href="tel:+420777596216" className="text-blue-600 hover:underline">
                    +420 777 596 216
                  </a>
                </p>
              </div>
            </div>

            {/* Zpráva o stavu odeslání */}
            {state.message && (
              <Card
                className={`${
                  state.errors && Object.keys(state.errors).length > 0
                    ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                    : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                }`}
              >
                <CardContent className="pt-6">
                  <p
                    className={`text-center font-medium ${
                      state.errors && Object.keys(state.errors).length > 0
                        ? "text-red-700 dark:text-red-300"
                        : "text-green-700 dark:text-green-300"
                    }`}
                    aria-live="polite"
                  >
                    {state.message}
                  </p>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
