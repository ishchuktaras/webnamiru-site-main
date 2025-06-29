// components/admin/NewsletterTabs.tsx

"use client";

import { useActionState } from "react";
import { type Campaign, type Newsletter } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Users, Send, Plus, Eye, UserCheck, UserX, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createCampaign } from "@/app/(admin)/admin/newsletter/actions";
import { useFormStatus } from "react-dom";

// Komponenta pro tlačítko s loading stavem
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-pink-600 hover:bg-pink-700"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? (
        "Ukládám..."
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" /> Uložit jako koncept
        </>
      )}
    </Button>
  );
}

// Přijímáme data ze serveru jako props
interface NewsletterTabsProps {
  initialCampaigns: Campaign[];
  initialSubscribers: Newsletter[];
}

export default function NewsletterTabs({
  initialCampaigns,
  initialSubscribers,
}: NewsletterTabsProps) {
  const [createState, createFormAction] = useActionState(createCampaign, {
    success: false,
    message: "",
  });

  if (createState.success) {
    toast.success("Úspěch!", { description: createState.message });
    createState.success = false; // Reset stavu po zobrazení notifikace
  }

  return (
    <Tabs defaultValue="campaigns" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-lg">
        <TabsTrigger value="campaigns">Kampaně</TabsTrigger>
        <TabsTrigger value="subscribers">Odběratelé</TabsTrigger>
        <TabsTrigger value="create">Nová kampaň</TabsTrigger>
      </TabsList>

      <TabsContent value="campaigns">
        {/* ... kód pro zobrazení kampaní ... */}
      </TabsContent>

      <TabsContent value="subscribers">
        {/* ... kód pro zobrazení odběratelů ... */}
      </TabsContent>

      <TabsContent value="create">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Vytvořit novou kampaň</CardTitle>
            <CardDescription>
              Vytvořte nový newsletter pro vaše odběratele.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createFormAction} className="space-y-6">
              <div>
                <Label htmlFor="subject">Předmět emailu*</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Zadejte předmět..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="previewText">Náhledový text</Label>
                <Input
                  id="previewText"
                  name="previewText"
                  placeholder="Krátký text zobrazený v náhledu..."
                />
              </div>
              <div>
                <Label htmlFor="content">Obsah emailu*</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Napište obsah..."
                  rows={10}
                  required
                />
              </div>
              <div className="flex gap-4">
                <SubmitButton />
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Náhled
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
