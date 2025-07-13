// components/admin/ProjectForm.tsx
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Project } from "@prisma/client";

type ProjectAction = (
  prevState: any,
  formData: FormData
) => Promise<{ errors?: any; message?: string }>;

interface ProjectFormProps {
  action: ProjectAction;
  project?: Project | null;
}

export default function ProjectForm({ action, project }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, { errors: {} });

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {project && <input type="hidden" name="projectId" value={project.id} />}
      
      <div className="space-y-2">
        <Label htmlFor="name">Název projektu</Label>
        <Input id="name" name="name" defaultValue={project?.name} required />
        {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Jméno klienta</Label>
          <Input id="clientName" name="clientName" defaultValue={project?.clientName} required />
          {state.errors?.clientName && <p className="text-sm text-red-500">{state.errors.clientName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientEmail">Email klienta</Label>
          <Input id="clientEmail" name="clientEmail" type="email" defaultValue={project?.clientEmail} required />
          {state.errors?.clientEmail && <p className="text-sm text-red-500">{state.errors.clientEmail}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="status">Status projektu</Label>
          <Select name="status" defaultValue={project?.status || "Poptávka"}>
            <SelectTrigger>
              <SelectValue placeholder="Vyberte status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Poptávka">Poptávka</SelectItem>
              <SelectItem value="V realizaci">V realizaci</SelectItem>
              <SelectItem value="Čeká na klienta">Čeká na klienta</SelectItem>
              <SelectItem value="Dokončeno">Dokončeno</SelectItem>
              <SelectItem value="Pozastaveno">Pozastaveno</SelectItem>
              <SelectItem value="Zrušeno">Zrušeno</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Cena (Kč)</Label>
          <Input id="price" name="price" type="number" step="0.01" defaultValue={project?.price || ""} placeholder="např. 15000" />
          {state.errors?.price && <p className="text-sm text-red-500">{state.errors.price}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Popis projektu</Label>
        <Textarea id="description" name="description" rows={5} defaultValue={project?.description || ""} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Ukládám..." : (project ? "Uložit změny" : "Vytvořit projekt")}
      </Button>
      {state.message && <p className="text-sm text-red-500">{state.message}</p>}
    </form>
  );
}
