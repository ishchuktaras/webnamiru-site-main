// app/(admin)/admin/projects/[id]/edit/page.tsx
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById, updateProject } from "@/lib/actions/project.actions";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session || session.user?.role !== Role.SUPERADMIN) {
    notFound(); // Nebo redirect('/admin?error=unauthorized');
  }

  const { data: project, error } = await getProjectById(params.id);

  if (error || !project) {
    notFound();
  }

  // Připravíme defaultValues pro formulář z dat projektu
  const defaultValues = {
    name: project.name,
    clientName: project.clientName,
    clientEmail: project.clientEmail,
    status: project.status,
    price: project.price,
    description: project.description, // Může být null, pokud je typ nullable
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Upravit projekt: {project.name}</h1>
      {/* action očekává (projectId, prevState, formData) */}
      {/* projectId je zde ID aktuálního projektu. prevState je null. */}
      <ProjectForm action={(pId, prevState, formData) => updateProject(pId!, prevState, formData)} defaultValues={defaultValues} projectId={project.id} />
    </div>
  );
}