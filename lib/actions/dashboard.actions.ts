// lib/actions/dashboard.actions.ts
"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const [
      postCount,
      totalComments,
      pendingComments,
      totalViews,
      inquiryCount,
      ratingData,
    ] = await prisma.$transaction([
      prisma.post.count(),
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: false } }),
      prisma.blogView.count(),
      prisma.projectInquiry.count(),
      prisma.rating.aggregate({ _avg: { value: true }, _count: true }),
    ]);

    const averageRating = ratingData?._avg?.value ?? 0;

    return {
      success: true,
      data: {
        postCount,
        totalComments,
        pendingComments,
        totalViews,
        inquiryCount,
        subscriberCount: 0,
        averageRating: parseFloat(averageRating.toFixed(1)),
      },
    };
  } catch (error) {
    console.error("Chyba při načítání statistik pro dashboard:", error);
    return { success: false, error: "Nepodařilo se načíst statistiky." };
  }
}