// app/admin/analytics/actions.ts

"use server";

import prisma from "@/lib/prisma";

export async function getAnalyticsData() {
  try {
    // Použijeme Promise.all pro paralelní načítání dat pro vyšší výkon
    const [
      totalViews,
      totalComments,
      totalRatings,
      totalSubmissions,
      postsWithViews,
    ] = await Promise.all([
      prisma.blogView.count(),
      prisma.comment.count({ where: { approved: true } }),
      prisma.rating.count(),
      prisma.contactSubmission.count(),
      prisma.post.findMany({
        where: { published: true },
        select: {
          id: true,
          title: true,
          slug: true,
          _count: {
            select: { views: true, comments: true, ratings: true },
          },
        },
        orderBy: {
          views: {
            _count: 'desc',
          },
        },
        take: 5, // Vezmeme top 5 nejčtenějších
      }),
    ]);

    const averageRatingResult = await prisma.rating.aggregate({
      _avg: {
        value: true,
      },
    });

    const averageRating = averageRatingResult._avg.value || 0;

    return {
      success: true,
      data: {
        totalViews,
        totalComments,
        totalRatings,
        totalSubmissions,
        averageRating: parseFloat(averageRating.toFixed(1)),
        topPosts: postsWithViews.map(p => ({
          title: p.title,
          slug: p.slug,
          views: p._count.views,
          comments: p._count.comments,
          rating: 0, // Průměrné hodnocení pro jednotlivé články bychom museli počítat zvlášť
        })),
      },
    };
  } catch (error) {
    console.error("Chyba při načítání analytických dat:", error);
    return { success: false, error: "Nepodařilo se načíst data." };
  }
}