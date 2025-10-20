// app/(admin)/admin/projects/new/page.tsx
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject as serverCreateProject } from "@/lib/actions/project.actions"; // Přejmenujeme import, abychom se vyhnuli kolizi

export default function NewProjectPage() {
  // Vytvoříme obalovací Server Action pro createProject
  async function projectCreateAction(projectId: string | null, prevState: any, formData: FormData) {
    "use server"; // <-- Klíčové! Označí tuto funkci jako Server Action
    return serverCreateProject(prevState, formData);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Vytvořit nový projekt</h1>
      {/* Nyní předáváme přímo Server Action */}
      <ProjectForm action={projectCreateAction} projectId={null} />
    </div>
  );
}