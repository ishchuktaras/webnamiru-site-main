// app/(admin)/admin/actions.ts

"use server";

import prisma from "@/lib/prisma";
import { signOut } from '@/auth';

export async function getDashboardStats() {
  try {
    // Spustíme všechny dotazy do databáze paralelně pro maximální rychlost
    const [
      postCount,
      totalComments,
      pendingComments,
      totalViews,
      
      ratingData,
    ] = await prisma.$transaction([
      prisma.post.count(),
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: false } }),
      prisma.blogView.count(),
      // prisma.newsletter.count({ where: { active: true } }), // Tento řádek jsme smazali
      prisma.rating.aggregate({
        _avg: { value: true },
        _count: true,
      }),
    ]);

   
    const averageRating = ratingData?._avg?.value ?? 0;
    const ratingCount = ratingData?._count ?? 0;

    return {
      success: true,
      data: {
        postCount,
        totalComments,
        pendingComments,
        totalViews,
        subscriberCount: 0, 
        averageRating: parseFloat(averageRating.toFixed(1)),
        ratingCount,
      },
    };
  } catch (error) {
    console.error("Chyba při načítání statistik pro dashboard:", error);
    return { success: false, error: "Nepodařilo se načíst statistiky." };
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/login' });
}