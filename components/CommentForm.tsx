"use client"

import { useActionState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { addComment } from "@/app/(main)/comments/actions"
import { useRouter } from "next/navigation"

interface CommentFormProps {
  postId: string
}

export default function CommentForm({ postId }: CommentFormProps) {
  const initialState = {
    message: "",
    errors: {},
  }
  const [state, formAction, isPending] = useActionState(addComment, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const prevMessageRef = useRef<string>("")

  useEffect(() => {
    // Only reset and refresh if we have a new success message
    if (
      state.message &&
      state.message !== prevMessageRef.current &&
      Object.keys(state.errors || {}).length === 0 &&
      state.message.includes("úspěšně")
    ) {
      formRef.current?.reset()
      router.refresh()
      prevMessageRef.current = state.message
    }
  }, [state.message, state.errors, router])

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Přidat komentář</h2>
      <form ref={formRef} action={formAction} className="space-y-6">
        <input type="hidden" name="postId" value={postId} />
        <div>
          <Label htmlFor="author" className="sr-only">
            Jméno
          </Label>
          <Input id="author" name="author" placeholder="Vaše jméno" type="text" required className="w-full" />
          {state.errors?.author && <p className="text-red-500 text-sm mt-1">{state.errors.author.join(", ")}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="sr-only">
            E-mail
          </Label>
          <Input id="email" name="email" placeholder="Váš e-mail" type="email" required className="w-full" />
          {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email.join(", ")}</p>}
        </div>
        <div>
          <Label htmlFor="content" className="sr-only">
            Komentář
          </Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Váš komentář..."
            required
            rows={5}
            className="w-full resize-y"
          />
          {state.errors?.content && <p className="text-red-500 text-sm mt-1">{state.errors.content.join(", ")}</p>}
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
        >
          {isPending ? "Odesílám..." : "Odeslat komentář"}
        </Button>
        {state.message && (
          <p
            className={`mt-4 text-center ${
              state.errors && Object.keys(state.errors || {}).length > 0 ? "text-red-500" : "text-green-500"
            }`}
            aria-live="polite"
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  )
}
