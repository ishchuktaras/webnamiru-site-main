// components/admin/DeleteProjectDialog.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteProject } from '@/lib/actions/project.actions';

interface DeleteProjectDialogProps {
  projectId: string;
  projectName: string;
}

export default function DeleteProjectDialog({ projectId, projectName }: DeleteProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProject(projectId); // Voláme server action

    if (result.success) { // Nyní kontrolujeme result.success
      toast.success(result.message); // Použijeme zprávu z akce
      setIsOpen(false);
      router.push('/admin/projects'); // Přesměrování na seznam projektů po úspěšném smazání
    } else {
      toast.error(result.message); // Použijeme chybovou zprávu z akce
    }
    setIsDeleting(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Opravdu chcete smazat tento projekt?</AlertDialogTitle>
          <AlertDialogDescription>
            Tato akce je nevratná. Dojde k trvalému smazání projektu "{projectName}" a všech souvisejících dat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Zrušit</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
            {isDeleting ? 'Mažu...' : 'Smazat'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}