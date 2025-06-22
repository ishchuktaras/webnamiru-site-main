"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"

// Schéma pro validaci komentáře
const commentSchema = z.object({
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  author: z.string().min(1, { message: "Jméno je povinné." }),
  email: z.string().email({ message: "Neplatný e-mail." }),
  content: z.string().min(1, { message: "Obsah komentáře je povinný." }),
})

// Server Action pro přidání komentáře
export async function addComment(
  prevState: { message: string; errors?: Record<string, string[]> },
  formData: FormData,
) {
  try {
    const validatedFields = commentSchema.safeParse({
      postId: formData.get("postId"),
      author: formData.get("author"),
      email: formData.get("email"),
      content: formData.get("content"),
    })

    if (!validatedFields.success) {
      return {
        message: "Chyba validace komentáře.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { postId, author, email, content } = validatedFields.data

    // Zkontrolujeme, jestli Prisma klient existuje
    if (!prisma) {
      console.error("Prisma client is not available")
      return { message: "Databáze není dostupná. Zkuste to prosím později." }
    }

    await prisma.comment.create({
      data: {
        postId,
        author,
        email,
        content,
      },
    })

    console.log(`Komentář přidán pro příspěvek ${postId} od ${author}`)
    return { message: "Váš komentář byl úspěšně přidán!" }
  } catch (error) {
    console.error("Chyba při přidávání komentáře:", error)
    return { message: "Nastala chyba při přidávání komentáře. Zkuste to prosím znovu." }
  }
}

// Server Action pro načtení komentářů
export async function getComments() {
  try {
    // Zkontrolujeme, jestli Prisma klient existuje
    if (!prisma) {
      console.error("Prisma client is not available")
      return { success: false, error: "Databáze není dostupná.", data: [] }
    }

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Omezíme na 50 nejnovějších komentářů
    })

    return { success: true, data: comments }
  } catch (error) {
    console.error("Chyba při načítání komentářů:", error)
    return { success: false, error: "Chyba při načítání komentářů.", data: [] }
  }
}
