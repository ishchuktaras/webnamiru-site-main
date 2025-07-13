// components/admin/tabs/ContractTab.tsx
"use client";

import { useActionState, useEffect } from "react";
import { createOrUpdateContract } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Contract, type Project } from "@prisma/client";
import { toast } from "sonner";
import { format } from 'date-fns';

interface ContractTabProps {
  project: Project & { contract: Contract | null };
}

export default function ContractTab({ project }: ContractTabProps) {
  const [state, formAction, isPending] = useActionState(createOrUpdateContract, { success: false, message: "" });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Uloženo!", { description: state.message });
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  const defaultDate = project.contract?.signedAt ? format(new Date(project.contract.signedAt), 'yyyy-MM-dd') : '';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Správa smlouvy / Závazné objednávky</CardTitle>
        <CardDescription>
          Zaznamenejte stav smlouvy a odkaz na digitální dokument.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6 max-w-2xl">
          <input type="hidden" name="projectId" value={project.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status smlouvy</Label>
              <Select name="status" defaultValue={project.contract?.status || "Čeká na podpis"}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Čeká na podpis">Čeká na podpis</SelectItem>
                  <SelectItem value="Podepsáno">Podepsáno</SelectItem>
                  <SelectItem value="Zrušeno">Zrušeno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signedAt">Datum podpisu</Label>
              <Input id="signedAt" name="signedAt" type="date" defaultValue={defaultDate} />
              {state.errors?.signedAt && <p className="text-sm text-red-500">{state.errors.signedAt}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">Odkaz na PDF soubor smlouvy (volitelné)</Label>
            <Input id="fileUrl" name="fileUrl" type="url" placeholder="https://..." defaultValue={project.contract?.fileUrl || ""} />
            {state.errors?.fileUrl && <p className="text-sm text-red-500">{state.errors.fileUrl}</p>}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Ukládám..." : "Uložit stav smlouvy"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
