"use client"
import { useActionState } from "react" // Import useActionState
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { submitContactForm } from "@/app/actions" // Import Server Action

export default function ContactForm() {
  // Inicializační stav pro useActionState
  const initialState = {
    message: "",
    errors: {},
  }

  // Použití useActionState pro správu stavu formuláře a volání Server Action
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Máte dotaz nebo chcete nezávaznou konzultaci?
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Vyplňte formulář a já se Vám co nejdříve ozvu. První konzultace je zdarma!
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md py-12">
          <form action={formAction} className="space-y-6">
            {/* Pole Jméno */}
            <div>
              <Label htmlFor="name" className="sr-only">
                Jméno
              </Label>
              <Input
                id="name"
                name="name" // Důležité pro FormData
                placeholder="Vaše jméno"
                type="text"
                required
                className="w-full"
              />
              {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name.join(", ")}</p>}
            </div>
            {/* Pole E-mail */}
            <div>
              <Label htmlFor="email" className="sr-only">
                E-mail
              </Label>
              <Input
                id="email"
                name="email" // Důležité pro FormData
                placeholder="Váš e-mail"
                type="email"
                required
                className="w-full"
              />
              {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email.join(", ")}</p>}
            </div>
            {/* Pole Telefon */}
            <div>
              <Label htmlFor="phone" className="sr-only">
                Telefon
              </Label>
              <Input
                id="phone"
                name="phone" // Důležité pro FormData
                placeholder="Váš telefon (nepovinné)"
                type="tel"
                className="w-full"
              />
              {state.errors?.phone && <p className="text-red-500 text-sm mt-1">{state.errors.phone.join(", ")}</p>}
            </div>
            {/* Pole Zpráva */}
            <div>
              <Label htmlFor="message" className="sr-only">
                Zpráva
              </Label>
              <Textarea
                id="message"
                name="message" // Důležité pro FormData
                placeholder="Vaše zpráva..."
                required
                rows={5}
                className="w-full resize-y"
              />
              {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message.join(", ")}</p>}
            </div>
            {/* Tlačítko Odeslat */}
            <Button
              type="submit"
              disabled={isPending} // Tlačítko je disabled, když se akce provádí
              className="w-full inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
            >
              {isPending ? "Odesílám..." : "Odeslat zprávu"}
            </Button>
            {/* Zpráva o stavu odeslání */}
            {state.message && (
              <p
                className={`mt-4 text-center ${
                  state.errors && Object.keys(state.errors).length > 0 ? "text-red-500" : "text-green-500"
                }`}
                aria-live="polite"
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
