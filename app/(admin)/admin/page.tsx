// app/(admin)/admin/page.tsx

import { getDashboardStats } from "@/lib/actions/dashboard.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Newspaper,
  MessageSquare,
  CalendarCheck2,
  Eye,
  Star,
  ArrowRight,
  BarChart,
  Settings,
  Tags,
  Inbox, 
} from "lucide-react";

// Pomocné komponenty (StatCard, ActionCard) zůstávají stejné

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: React.ElementType, color?: string }) {
  return (
    <Card className={`text-white ${color || 'bg-gray-700'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ title, description, href, buttonText, icon: Icon }: { title: string, description: string, href: string, buttonText: string, icon: React.ElementType }) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
            <div className="p-6 pt-0">
                <Button asChild className="w-full">
                    <Link href={href}>{buttonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
        </Card>
    )
}

export default async function AdminDashboardPage() {
  const result = await getDashboardStats();

  if (!result.success || !result.data) {
    return <div>Chyba při načítání statistik: {result.error}</div>;
  }

  const stats = result.data;

  return (
    <div className="space-y-8">
      {/* Horní karty se statistikami */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Články" value={stats.postCount} icon={Newspaper} color="bg-blue-600" />
        <StatCard title="Komentáře" value={stats.totalComments} icon={MessageSquare} color="bg-green-600" />
        <StatCard title="Čeká na schválení" value={stats.pendingComments} icon={CalendarCheck2} color="bg-orange-500" />
        <StatCard title="Zobrazení" value={stats.totalViews.toLocaleString('cs-CZ')} icon={Eye} color="bg-purple-600" />
        {/* ZMĚNA: Karta pro odběratele nahrazena kartou pro poptávky */}
        <StatCard title="Nové poptávky" value={stats.inquiryCount} icon={Inbox} color="bg-teal-600" />
        <StatCard title="Prům. hodnocení" value={stats.averageRating} icon={Star} color="bg-yellow-500" />
      </div>

      {/* Akční bloky */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ActionCard 
            title="Správa článků"
            description="Vytvářejte a spravujte blogové příspěvky, kategorie a tagy pro lepší organizaci obsahu."
            href="/admin/posts"
            buttonText="Spravovat články"
            icon={Newspaper}
        />
        <ActionCard 
            title="Správa komentářů"
            description="Moderujte a spravujte diskuze. Schvalujte, editujte a udržujte kvalitní komunikaci."
            href="/admin/comments"
            buttonText="Spravovat komentáře"
            icon={MessageSquare}
        />
        <ActionCard 
            title="Poptávky"
            description="Prohlížejte a spravujte poptávky a strategické dotazníky od potenciálních klientů."
            href="/admin/inquiries"
            buttonText="Zobrazit poptávky"
            icon={Inbox}
        />
        <ActionCard 
            title="Analytika"
            description="Sledujte výkon vašeho webu, hodnocení článků a chování uživatelů."
            href="/admin/analytics"
            buttonText="Zobrazit analytiku"
            icon={BarChart}
        />
        <ActionCard 
            title="Kategorie & Tagy"
            description="Organizujte obsah webu pro lepší orientaci a SEO."
            href="/admin/taxonomy"
            buttonText="Spravovat taxonomie"
            icon={Tags}
        />
        <ActionCard 
            title="Nastavení"
            description="Konfigurace webu, SEO, bezpečnosti a dalších klíčových aspektů."
            href="/admin/settings"
            buttonText="Otevřít nastavení"
            icon={Settings}
        />
      </div>
    </div>
  );
}