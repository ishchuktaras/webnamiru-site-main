"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Server Action pro schválení komentáře
export async function approveComment(commentId: string) {
  try {
    if (!prisma) {
      return { success: false, message: "Databáze není dostupná." }
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { approved: true },
    })

    revalidatePath("/admin/comments")
    return { success: true, message: "Komentář byl schválen." }
  } catch (error) {
    console.error("Chyba při schvalování komentáře:", error)
    return { success: false, message: "Chyba při schvalování komentáře." }
  }
}

// Server Action pro zamítnutí komentáře
export async function rejectComment(commentId: string) {
  try {
    if (!prisma) {
      return { success: false, message: "Databáze není dostupná." }
    }

    await prisma.comment.delete({
      where: { id: commentId },
    })

    revalidatePath("/admin/comments")
    return { success: true, message: "Komentář byl zamítnut a smazán." }
  } catch (error) {
    console.error("Chyba při zamítání komentáře:", error)
    return { success: false, message: "Chyba při zamítání komentáře." }
  }
}

// Server Action pro načtení všech komentářů (schválené i neschválené)
export async function getAllComments() {
  try {
    if (!prisma) {
      return { success: false, error: "Databáze není dostupná.", data: [] }
    }

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Omezíme na posledních 50 komentářů
    })

    return { success: true, data: comments }
  } catch (error) {
    console.error("Chyba při načítání komentářů:", error)
    return { success: false, error: "Chyba při načítání komentářů.", data: [] }
  }
}

// Server Action pro hromadné schválení
export async function bulkApproveComments(commentIds: string[]) {
  try {
    if (!prisma) {
      return { success: false, message: "Databáze není dostupná." }
    }

    await prisma.comment.updateMany({
      where: { id: { in: commentIds } },
      data: { approved: true },
    })

    revalidatePath("/admin/comments")
    return { success: true, message: `${commentIds.length} komentářů bylo schváleno.` }
  } catch (error) {
    console.error("Chyba při hromadném schvalování:", error)
    return { success: false, message: "Chyba při hromadném schvalování." }
  }
}
