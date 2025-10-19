// app/(admin)/admin/projects/page.tsx
import { getProjects } from "@/lib/actions/project.actions"; // deleteProject už není potřeba importovat přímo sem
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import { auth } from "@/auth";
import { Role } from "@prisma/client";
import DeleteProjectDialog from "@/components/admin/DeleteProjectDialog";

export default async function AdminProjectsPage() {
  const session = await auth();
  const isSuperAdmin = session?.user?.role === Role.SUPERADMIN;

  const { data: projects, error } = await getProjects();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Správa projektů</h1>
        {isSuperAdmin && (
          <Button asChild>
            <Link href="/admin/projects/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nový projekt
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seznam projektů</CardTitle>
          <CardDescription>
            Přehled všech vašich zakázek a projektů.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Název projektu</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cena</TableHead>
                <TableHead className="text-right">Akce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/projects/${project.id}`} className="hover:underline">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>{project.clientName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {project.price ? `${project.price.toLocaleString('cs-CZ')} Kč` : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right flex justify-end items-center gap-2">
                       <Button asChild variant="ghost" size="sm">
                         <Link href={`/admin/projects/${project.id}`}>Detail</Link>
                      </Button>
                      {isSuperAdmin && (
                        <>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/admin/projects/${project.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteProjectDialog projectId={project.id} projectName={project.name} />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Zatím nebyly vytvořeny žádné projekty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}