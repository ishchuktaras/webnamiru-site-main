"use client"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

// Mock server action - replace with real implementation
async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const name = formData.get("name") as string

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!email || !email.includes("@")) {
    return { success: false, message: "Prosím zadejte platný email." }
  }

  return { success: true, message: "Děkujeme! Byli jste úspěšně přihlášeni k odběru." }
}

export default function BlogNewsletter() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, { success: false, message: "" })

  if (state.success) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
            <CheckCircle className="h-6 w-6" />
            <p className="font-medium">{state.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-xl">Nezmeškejte nové články</CardTitle>
        <CardDescription>
          Přihlaste se k odběru a dostávejte nejnovější tipy o webdevelopmentu a online marketingu přímo do emailu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="name" placeholder="Vaše jméno" className="bg-white dark:bg-gray-800" />
            <Input name="email" type="email" placeholder="Váš email" required className="bg-white dark:bg-gray-800" />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Přihlašuji..." : "Přihlásit se k odběru"}
          </Button>
          {state.message && !state.success && <p className="text-red-500 text-sm">{state.message}</p>}
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          Žádný spam. Odhlásit se můžete kdykoliv.
        </p>
      </CardContent>
    </Card>
  )
}
