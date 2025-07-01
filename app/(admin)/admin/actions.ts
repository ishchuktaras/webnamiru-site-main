// app/(admin)/admin/actions.ts

"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    // Spustíme všechny dotazy do databáze paralelně pro maximální rychlost
    const [
      postCount,
      totalComments,
      pendingComments,
      totalViews,
      subscriberCount,
      ratingData,
    ] = await prisma.$transaction([
      prisma.post.count(),
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: false } }),
      prisma.blogView.count(),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.rating.aggregate({
        _avg: { value: true },
        _count: true,
      }),
    ]);

    return {
      success: true,
      data: {
        postCount,
        totalComments,
        pendingComments,
        totalViews,
        subscriberCount,
        averageRating: parseFloat((ratingData._avg.value || 0).toFixed(1)),
        ratingCount: ratingData._count,
      },
    };
  } catch (error) {
    console.error("Chyba při načítání statistik pro dashboard:", error);
    return { success: false, error: "Nepodařilo se načíst statistiky." };
  }
}
