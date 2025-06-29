// app/admin/analytics/page.tsx

import { getAnalyticsData } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  MessageSquare,
  Star,
  Inbox,
  TrendingUp,
  BarChart,
} from "lucide-react";
import Link from "next/link";

export default async function AnalyticsPage() {
  const result = await getAnalyticsData();

  if (!result.success || !result.data) {
    return <div>Chyba při načítání dat: {result.error}</div>;
  }

  const {
    totalViews,
    totalComments,
    totalRatings,
    totalSubmissions,
    averageRating,
    topPosts,
  } = result.data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Přehled výkonu</h1>
        <p className="text-gray-500 dark:text-gray-400">Sledujte klíčové metriky vašeho webu.</p>
      </div>

      {/* Karty s klíčovými metrikami */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Celkem zobrazení</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString('cs-CZ')}</div>
            <p className="text-xs text-muted-foreground">Všech stránek od spuštění</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schválené komentáře</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalComments}</div>
            <p className="text-xs text-muted-foreground">Celkový počet interakcí</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Celkem hodnocení</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalRatings}</div>
            <p className="text-xs text-muted-foreground">Průměr: {averageRating}/5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nové poptávky</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Celkem odeslaných formulářů</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabulka s nejpopulárnějšími články */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Nejpopulárnější články
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Název článku</TableHead>
                <TableHead className="text-right">Zobrazení</TableHead>
                <TableHead className="text-right">Komentářů</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell>
                    <Link href={`/blog/${post.slug}`} className="font-medium hover:underline" target="_blank">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{post.views}</TableCell>
                  <TableCell className="text-right">{post.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}