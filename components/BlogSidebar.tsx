// components/BlogSidebar.tsx

import Link from "next/link";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AffiliateLinkCard from "@/components/AffiliateLinkCard"; 
import { Folder, Hash } from "lucide-react";

async function getSidebarData() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 10, // Zobrazíme 10 nejpoužívanějších tagů
  });

  return { categories, tags };
}

export default async function BlogSidebar() {
  const { categories, tags } = await getSidebarData();

  return (
    <aside className="w-full lg:w-80 space-y-8 sticky top-24">
      {/* Sekce s kategoriemi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" /> Kategorie
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {categories.map((category) => (
            <Link key={category.id} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex justify-between">
              <span>{category.name}</span>
              <span>({category._count.posts})</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Sekce s tagy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" /> Populární tagy
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              <Link href="#">{tag.name}</Link>
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* Sekce s affiliate doporučením */}
      <AffiliateLinkCard 
        title="Nástroje, kterým věřím"
        description="Pro své projekty i pro klienty sázím na ověřenou kvalitu a skvělou podporu od WEDOS."
        link="https://www.wedos.cz/?ap=KdCnWf" // <-- ZDE VLOŽ SVŮJ AFFILIATE LINK!
        buttonText="Prozkoumat hosting WEDOS"
        imageUrl="/images/logo/logo-hor-s.png" // <-- Ujisti se, že máš logo na této cestě
        partnerName="WEDOS"
      />
    </aside>
  );
}