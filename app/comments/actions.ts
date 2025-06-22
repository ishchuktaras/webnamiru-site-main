"use server"

import { z } from "zod"
import prisma from "@/lib/prisma" // Import the singleton Prisma client

// Use a non-null assertion to tell TypeScript that prisma will be defined
// This is safe because of the singleton pattern in lib/prisma.ts
const db = prisma!

// Schéma pro validaci komentáře
const commentSchema = z.object({
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  author: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky." }),
  email: z.string().email({ message: "Neplatný formát e-mailu." }),
  content: z.string().min(5, { message: "Komentář musí mít alespoň 5 znaků." }),
})

// Server Action pro přidání komentáře
export async function addComment(
  prevState: { message: string; errors?: Record<string, string[]> },
  formData: FormData,
) {
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

  try {
    await db.comment.create({
      // Use 'db' instead of 'prisma'
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

// Server Action pro načtení všech komentářů (adjusted for CommentsTable)
export async function getComments() {
  console.log("Attempting to fetch comments...") 
  try {
    const comments = await db.comment.findMany({
      orderBy: { createdAt: "desc" },
    })
    console.log("Comments fetched successfully:", comments.length)
    return { success: true, data: comments }
  } catch (error) {
    console.error("Error fetching comments in getComments:", error)
    return { success: false, error: "Nastala chyba při načítání komentářů." }
  }
}
