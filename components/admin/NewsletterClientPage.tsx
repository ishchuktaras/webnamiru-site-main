// components/admin/NewsletterClientPage.tsx

"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { type Campaign, type Newsletter } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Users, Send, Plus, Eye, UserCheck, UserX, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createCampaign } from "@/app/(admin)/admin/newsletter/actions";
import { useEffect, useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-pink-600 hover:bg-pink-700">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Ukládám..." : <><Plus className="w-4 h-4 mr-2" /> Uložit jako koncept</>}
    </Button>
  );
}

interface NewsletterClientPageProps {
  initialCampaigns: Campaign[];
  initialSubscribers: Newsletter[];
}

export default function NewsletterClientPage({ initialCampaigns, initialSubscribers }: NewsletterClientPageProps) {
  const [createState, createFormAction] = useActionState(createCampaign, { success: false, message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (createState.message) {
      if (createState.success) {
        toast.success("Úspěch!", { description: createState.message });
        formRef.current?.reset();
      } else {
        toast.error("Chyba!", { description: createState.message });
      }
    }
  }, [createState]);
  
  return (
    <Tabs defaultValue="campaigns" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-lg">
        <TabsTrigger value="campaigns">Kampaně</TabsTrigger>
        <TabsTrigger value="subscribers">Odběratelé</TabsTrigger>
        <TabsTrigger value="create">Nová kampaň</TabsTrigger>
      </TabsList>

      <TabsContent value="campaigns">
        <Card className="border-0 shadow-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5" />Emailové kampaně</CardTitle></CardHeader>
          <CardContent>
            {initialCampaigns.length > 0 ? (
                <div className="space-y-4">
                    {initialCampaigns.map((campaign) => (
                        <div key={campaign.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{campaign.subject}</h3>
                                <Badge variant={campaign.status === "sent" ? "default" : "secondary"}>{campaign.status}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p>Zatím nebyly vytvořeny žádné kampaně.</p>}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="subscribers">
        <Card className="border-0 shadow-lg">
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" />Odběratelé newsletteru</CardTitle></CardHeader>
            <CardContent>
                {initialSubscribers.length > 0 ? (
                    <div className="space-y-4">
                        {initialSubscribers.map((subscriber) => (
                            <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">{subscriber.name || 'Anonym'}</h3>
                                    <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                                </div>
                                <Badge variant={subscriber.active ? "default" : "secondary"}>{subscriber.active ? <UserCheck className="w-4 h-4 mr-1"/> : <UserX className="w-4 h-4 mr-1"/>}{subscriber.active ? 'Aktivní' : 'Neaktivní'}</Badge>
                            </div>
                        ))}
                    </div>
                ) : <p>Zatím nemáte žádné odběratele.</p>}
            </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="create">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5" />Vytvořit novou kampaň</CardTitle>
            <CardDescription>Vytvořte nový newsletter pro vaše odběratele.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={createFormAction} className="space-y-6">
              <div><Label htmlFor="subject">Předmět emailu*</Label><Input id="subject" name="subject" placeholder="Zadejte předmět..." required /></div>
              <div><Label htmlFor="previewText">Náhledový text</Label><Input id="previewText" name="previewText" placeholder="Krátký text zobrazený v náhledu..." /></div>
              <div><Label htmlFor="content">Obsah emailu*</Label><Textarea id="content" name="content" placeholder="Napište obsah..." rows={10} required /></div>
              <div className="flex gap-4"><SubmitButton /><Button variant="outline" type="button"><Eye className="w-4 h-4 mr-2" />Náhled</Button></div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}