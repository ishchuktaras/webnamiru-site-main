// app/api/posts/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { 
        published: true // Načteme jen publikované články
      },
      orderBy: { 
        createdAt: 'desc' // Seřadíme od nejnovějšího
      },
      include: {
        // Připojíme i jméno autora a kategorii
        author: {
          select: { name: true }
        },
        category: {
          select: { name: true, slug: true, color: true }
        },
      },
    });
    
    return NextResponse.json(posts);

  } catch (error) {
    console.error("Chyba při načítání příspěvků (API):", error);
    // V případě chyby vrátíme srozumitelnou chybovou hlášku
    return new NextResponse(
      JSON.stringify({ error: 'Nepodařilo se načíst příspěvky.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}