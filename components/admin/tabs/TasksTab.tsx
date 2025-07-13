// components/admin/tabs/TasksTab.tsx
"use client";

import React, { useState, useActionState, useEffect, useTransition } from "react"; // OPRAVA: Přidán chybějící import
import { createTask, updateTaskStatus, deleteTask } from "@/lib/actions/project.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type ProjectTask, type Project } from "@prisma/client";
import { toast } from "sonner";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";

interface TasksTabProps {
  project: Project & { tasks: ProjectTask[] };
}

export default function TasksTab({ project }: TasksTabProps) {
  const [state, formAction, isPending] = useActionState(createTask, { success: false, message: "" });
  const [isTransitioning, startTransition] = useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success("Hotovo!", { description: state.message });
        formRef.current?.reset();
      } else {
        toast.error("Chyba!", { description: state.message });
      }
    }
  }, [state]);

  const handleStatusChange = (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Hotovo" ? "Čeká" : "Hotovo";
    startTransition(async () => {
      await updateTaskStatus(taskId, newStatus);
    });
  };

  const handleDelete = (taskId: string) => {
    startTransition(async () => {
      const result = await deleteTask(taskId);
      if(result.success) toast.success("Smazáno!", { description: result.message });
      else toast.error("Chyba!", { description: result.message });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seznam úkolů</CardTitle>
        <CardDescription>Spravujte a sledujte postup jednotlivých úkolů projektu.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="flex items-center gap-2 mb-6">
          <input type="hidden" name="projectId" value={project.id} />
          <div className="flex-grow space-y-1">
            <Label htmlFor="title" className="sr-only">Nový úkol</Label>
            <Input id="title" name="title" placeholder="Přidat nový úkol..." required />
            {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">Přidat</span>
          </Button>
        </form>

        <div className="space-y-3">
          {project.tasks?.length > 0 ? (
            project.tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.status === "Hotovo"}
                  onCheckedChange={() => handleStatusChange(task.id, task.status)}
                  disabled={isTransitioning}
                />
                <Label
                  htmlFor={`task-${task.id}`}
                  className={`flex-grow text-sm ${task.status === "Hotovo" ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </Label>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(task.id)} disabled={isTransitioning}>
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">Zatím nebyly přidány žádné úkoly.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
