// components/admin/tabs/HandoverTab.tsx
"use client";

import { useActionState, useEffect } from "react";
import { createOrUpdateHandover } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type HandoverProtocol, type Project } from "@prisma/client";
import { toast } from "sonner";
import { format } from 'date-fns';

interface HandoverTabProps {
  project: Project & { handover: HandoverProtocol | null };
}

export default function HandoverTab({ project }: HandoverTabProps) {
  const [state, formAction, isPending] = useActionState(createOrUpdateHandover, { success: false, message: "" });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Uloženo!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  const defaultDate = project.handover?.handedOverAt ? format(new Date(project.handover.handedOverAt), 'yyyy-MM-dd') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Předávací protokol</CardTitle>
        <CardDescription>
          Zaznamenejte finální předání projektu klientovi.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6 max-w-2xl">
          <input type="hidden" name="projectId" value={project.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status protokolu</Label>
              <Select name="status" defaultValue={project.handover?.status || "Připraveno"}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Připraveno">Připraveno</SelectItem>
                  <SelectItem value="Předáno klientovi">Předáno klientovi</SelectItem>
                  <SelectItem value="Potvrzeno">Potvrzeno klientem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="handedOverAt">Datum předání</Label>
              <Input id="handedOverAt" name="handedOverAt" type="date" defaultValue={defaultDate} />
               {state.errors?.handedOverAt && <p className="text-sm text-red-500">{state.errors.handedOverAt}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">Odkaz na PDF soubor protokolu (volitelné)</Label>
            <Input id="fileUrl" name="fileUrl" type="url" placeholder="https://..." defaultValue={project.handover?.fileUrl || ""} />
             {state.errors?.fileUrl && <p className="text-sm text-red-500">{state.errors.fileUrl}</p>}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Ukládám..." : "Uložit protokol"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
