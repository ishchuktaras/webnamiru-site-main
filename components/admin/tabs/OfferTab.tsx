// components/admin/tabs/OfferTab.tsx
"use client";

import { useActionState, useEffect } from "react";
import { createOrUpdateOffer } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Offer, type Project } from "@prisma/client";
import { toast } from "sonner";
import { format } from 'date-fns';

interface OfferTabProps {
  project: Project & { offer: Offer | null };
}

export default function OfferTab({ project }: OfferTabProps) {
  const [state, formAction, isPending] = useActionState(createOrUpdateOffer, { success: false, message: "" });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Uloženo!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  // Převedeme datum do formátu YYYY-MM-DD pro input type="date"
  const defaultDate = project.offer?.validUntil ? format(new Date(project.offer.validUntil), 'yyyy-MM-dd') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Správa nabídky</CardTitle>
        <CardDescription>
          Zde můžete vytvořit nebo aktualizovat cenovou nabídku pro tento projekt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6 max-w-2xl">
          <input type="hidden" name="projectId" value={project.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="offerNumber">Číslo nabídky</Label>
              <Input id="offerNumber" name="offerNumber" defaultValue={project.offer?.offerNumber || ""} required />
              {state.errors?.offerNumber && <p className="text-sm text-red-500">{state.errors.offerNumber}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Platnost do</Label>
              <Input id="validUntil" name="validUntil" type="date" defaultValue={defaultDate} required />
              {state.errors?.validUntil && <p className="text-sm text-red-500">{state.errors.validUntil}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status nabídky</Label>
            <Select name="status" defaultValue={project.offer?.status || "Koncept"}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Koncept">Koncept</SelectItem>
                <SelectItem value="Odesláno">Odesláno</SelectItem>
                <SelectItem value="Přijato">Přijato</SelectItem>
                <SelectItem value="Zamítnuto">Zamítnuto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">Odkaz na PDF soubor nabídky (volitelné)</Label>
            <Input id="fileUrl" name="fileUrl" type="url" placeholder="https://..." defaultValue={project.offer?.fileUrl || ""} />
            {state.errors?.fileUrl && <p className="text-sm text-red-500">{state.errors.fileUrl}</p>}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Ukládám..." : "Uložit nabídku"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
