// app/(admin)/admin/projects/[id]/edit/page.tsx
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById, updateProject as serverUpdateProject } from "@/lib/actions/project.actions"; // Přejmenujeme import
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id: projectId } = params;
  const projectResult = await getProjectById(projectId);

  if (!projectResult.success || !projectResult.data) {
    notFound();
  }

  const project = projectResult.data;

  const defaultValues = {
    name: project.name,
    clientName: project.clientName,
    clientEmail: project.clientEmail,
    status: project.status,
    description: project.description,
    price: project.price,
  };

  // Vytvoříme obalovací Server Action pro updateProject
  async function projectUpdateAction(currentProjectId: string | null, prevState: any, formData: FormData) {
    "use server"; // <-- Klíčové! Označí tuto funkci jako Server Action
    if (!currentProjectId) {
      throw new Error("Missing projectId for update action.");
    }
    return serverUpdateProject(currentProjectId, prevState, formData);
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Upravit projekt: {project.name}</h1>
      {/* Nyní předáváme přímo Server Action */}
      <ProjectForm
        action={projectUpdateAction}
        defaultValues={defaultValues}
        projectId={projectId}
      />
    </div>
  );
}