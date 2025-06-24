"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Users, Send, Plus, Eye, TrendingUp, UserCheck, UserX } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data
const mockSubscribers = [
  { id: 1, email: "jan.novak@email.cz", name: "Jan Novák", subscribed: "2024-01-15", status: "active" },
  { id: 2, email: "marie.svoboda@email.cz", name: "Marie Svoboda", subscribed: "2024-02-20", status: "active" },
  { id: 3, email: "petr.dvorak@email.cz", name: "Petr Dvořák", subscribed: "2024-03-10", status: "active" },
  { id: 4, email: "anna.novotna@email.cz", name: "Anna Novotná", subscribed: "2024-03-25", status: "unsubscribed" },
  { id: 5, email: "tomas.cerny@email.cz", name: "Tomáš Černý", subscribed: "2024-04-05", status: "active" },
]

const mockCampaigns = [
  {
    id: 1,
    subject: "Nové trendy ve webovém vývoji 2025",
    sent: "2024-06-20",
    recipients: 89,
    opens: 67,
    clicks: 23,
    status: "sent",
  },
  {
    id: 2,
    subject: "SEO tipy pro malé firmy",
    sent: "2024-06-15",
    recipients: 85,
    opens: 58,
    clicks: 19,
    status: "sent",
  },
  {
    id: 3,
    subject: "Jak vytvořit úspěšný web",
    sent: null,
    recipients: 0,
    opens: 0,
    clicks: 0,
    status: "draft",
  },
]

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState(mockSubscribers)
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [newCampaign, setNewCampaign] = useState({
    subject: "",
    content: "",
    previewText: "",
  })

  const activeSubscribers = subscribers.filter((s) => s.status === "active").length
  const totalCampaigns = campaigns.length
  const avgOpenRate =
    campaigns.filter((c) => c.status === "sent").reduce((acc, c) => acc + (c.opens / c.recipients) * 100, 0) /
      campaigns.filter((c) => c.status === "sent").length || 0

  const handleCreateCampaign = () => {
    if (!newCampaign.subject.trim() || !newCampaign.content.trim()) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím všechna povinná pole.",
        variant: "destructive",
      })
      return
    }

    const campaign = {
      id: Date.now(),
      subject: newCampaign.subject,
      sent: null,
      recipients: 0,
      opens: 0,
      clicks: 0,
      status: "draft" as const,
    }

    setCampaigns([...campaigns, campaign])
    setNewCampaign({ subject: "", content: "", previewText: "" })
    toast({
      title: "Kampaň vytvořena",
      description: "Nová newsletterová kampaň byla uložena jako koncept.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Aktivní odběratelé</p>
                <p className="text-2xl font-bold">{activeSubscribers}</p>
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
                <p className="text-2xl font-bold">{totalCampaigns}</p>
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
                <p className="text-2xl font-bold">{avgOpenRate.toFixed(1)}%</p>
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
                <p className="text-2xl font-bold">+12</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="campaigns">Kampaně</TabsTrigger>
          <TabsTrigger value="subscribers">Odběratelé</TabsTrigger>
          <TabsTrigger value="create">Nová kampaň</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Emailové kampaně
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{campaign.subject}</h3>
                      <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>
                        {campaign.status === "sent" ? "Odesláno" : "Koncept"}
                      </Badge>
                    </div>
                    {campaign.status === "sent" && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600">
                        <div>
                          <span className="font-medium">Odesláno:</span> {campaign.sent}
                        </div>
                        <div>
                          <span className="font-medium">Příjemci:</span> {campaign.recipients}
                        </div>
                        <div>
                          <span className="font-medium">Otevřeno:</span> {campaign.opens} (
                          {((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)
                        </div>
                        <div>
                          <span className="font-medium">Kliknuto:</span> {campaign.clicks} (
                          {((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Náhled
                      </Button>
                      {campaign.status === "draft" && (
                        <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                          <Send className="w-4 h-4 mr-2" />
                          Odeslat
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscribers Tab */}
        <TabsContent value="subscribers" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Odběratelé newsletteru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h3 className="font-semibold">{subscriber.name}</h3>
                      <p className="text-sm text-slate-600">{subscriber.email}</p>
                      <p className="text-xs text-slate-500">Přihlášen: {subscriber.subscribed}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={subscriber.status === "active" ? "default" : "secondary"}>
                        {subscriber.status === "active" ? (
                          <>
                            <UserCheck className="w-3 h-3 mr-1" />
                            Aktivní
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3 mr-1" />
                            Odhlášen
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Campaign Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Vytvořit novou kampaň
              </CardTitle>
              <CardDescription>Vytvořte nový newsletter pro vaše odběratele</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="subject">Předmět emailu *</Label>
                <Input
                  id="subject"
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  placeholder="Zadejte předmět emailu..."
                />
              </div>

              <div>
                <Label htmlFor="preview">Náhledový text</Label>
                <Input
                  id="preview"
                  value={newCampaign.previewText}
                  onChange={(e) => setNewCampaign({ ...newCampaign, previewText: e.target.value })}
                  placeholder="Krátký text zobrazený v náhledu emailu..."
                />
              </div>

              <div>
                <Label htmlFor="content">Obsah emailu *</Label>
                <Textarea
                  id="content"
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  placeholder="Napište obsah vašeho newsletteru..."
                  rows={10}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleCreateCampaign} className="bg-pink-600 hover:bg-pink-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Uložit jako koncept
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Náhled
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
