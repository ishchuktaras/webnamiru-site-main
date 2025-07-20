'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function getDashboardStats() {
  try {
    const session = await auth()

    // Souběžné dotazy do databáze pro vyšší výkon
    const [
      postCount,
      projectCount,
      inquiryCount,
      totalComments,
      pendingComments,
      totalViewsData,
      averageRatingData,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.project.count(),
      prisma.contactSubmission.count({ where: { status: 'new' } }),
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: false } }),
      prisma.blogView.count(),
      prisma.rating.aggregate({ _avg: { value: true } }),
    ])

    const totalViews = totalViewsData || 0;
    const averageRating = averageRatingData._avg.value ? averageRatingData._avg.value.toFixed(1) : 'N/A';

    let userCount = 0;
    // Zjistíme počet uživatelů, pouze pokud je role SUPERADMIN
    if (session?.user?.role === 'SUPERADMIN') {
      userCount = await prisma.user.count();
    }

    return {
      success: true,
      data: {
        postCount,
        projectCount,
        inquiryCount,
        totalComments,
        pendingComments,
        totalViews,
        averageRating,
        userCount, // Přidáváme počet uživatelů
      },
    };
  } catch (error) {
    console.error('Database Error:', error);
    let errorMessage = 'Neznámá chyba';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { 
        success: false, 
        error: `Nepodařilo se načíst statistiky: ${errorMessage}`,
        data: null 
    };
  }
}