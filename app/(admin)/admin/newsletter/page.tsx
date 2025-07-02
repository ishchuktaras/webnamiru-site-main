// app/(admin)/admin/newsletter/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Eye, TrendingUp } from "lucide-react";
import { getNewsletterStats, getCampaigns, getSubscribers } from "./actions";
import NewsletterTabs from "@/components/admin/NewsletterTabs";

export default async function NewsletterPage() {
  // Načteme všechna data na serveru
  const statsResult = await getNewsletterStats();
  const campaigns = await getCampaigns();
  const subscribers = await getSubscribers();

  const stats = statsResult.data;

  return (
    <div className="space-y-6">
      {/* Karty se statistikami (načítají se ze serveru) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Aktivní odběratelé</p>
                <p className="text-2xl font-bold">
                  {stats?.activeSubscribers || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Kampaně</p>
                <p className="text-2xl font-bold">
                  {stats?.campaignCount || 0}
                </p>
              </div>
              <Mail className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Míra otevření</p>
                <p className="text-2xl font-bold">N/A</p>
              </div>
              <Eye className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Růst tento měsíc</p>
                <p className="text-2xl font-bold">N/A</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interaktivní záložky předáváme jako Klientskou komponentu */}
      <NewsletterTabs
        initialCampaigns={campaigns}
        initialSubscribers={subscribers}
      />
    </div>
  );
}
