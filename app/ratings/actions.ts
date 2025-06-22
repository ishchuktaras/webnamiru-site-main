"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"

// Schéma pro validaci hodnocení
const ratingSchema = z.object({
  postId: z.string().min(1, { message: "ID příspěvku je povinné." }),
  value: z.number().int().min(1).max(5, { message: "Hodnocení musí být mezi 1 a 5." }),
})

// Server Action pro přidání hodnocení
export async function addRating(prevState: { message: string; errors?: Record<string, string[]> }, formData: FormData) {
  try {
    const validatedFields = ratingSchema.safeParse({
      postId: formData.get("postId"),
      value: Number.parseInt(formData.get("value") as string),
    })

    if (!validatedFields.success) {
      return {
        message: "Chyba validace hodnocení.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { postId, value } = validatedFields.data

    // Zkontrolujeme, jestli Prisma klient existuje
    if (!prisma) {
      console.error("Prisma client is not available")
      return { message: "Databáze není dostupná. Zkuste to prosím později." }
    }

    await prisma.rating.create({
      data: {
        postId,
        value,
      },
    })

    console.log(`Hodnocení ${value} přidáno pro příspěvek ${postId}`)
    return { message: "Vaše hodnocení bylo úspěšně přidáno!" }
  } catch (error) {
    console.error("Chyba při přidávání hodnocení:", error)
    return { message: "Nastala chyba při přidávání hodnocení. Zkuste to prosím znovu." }
  }
}

// Server Action pro načtení průměrného hodnocení a počtu hodnocení
export async function getAverageRating(postId: string) {
  try {
    // Zkontrolujeme, jestli Prisma klient existuje
    if (!prisma) {
      console.error("Prisma client is not available")
      return { average: 0, count: 0 }
    }

    const ratings = await prisma.rating.findMany({
      where: { postId },
      select: { value: true },
    })

    if (ratings.length === 0) {
      return { average: 0, count: 0 }
    }

    const totalValue = ratings.reduce((sum, r) => sum + r.value, 0)
    const average = totalValue / ratings.length

    return { average: Number.parseFloat(average.toFixed(1)), count: ratings.length }
  } catch (error) {
    console.error("Chyba při načítání hodnocení:", error)
    return { average: 0, count: 0 }
  }
}
