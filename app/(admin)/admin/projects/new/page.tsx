// app/(admin)/admin/projects/new/page.tsx
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/project.actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Vytvořit nový projekt</h1>
      {/* Nyní action očekává (projectId, prevState, formData) */}
      {/* Pro nový projekt je projectId null. prevState je null, protože useFormState nepoužíváme přímo */}
      <ProjectForm action={(_, prevState, formData) => createProject(prevState, formData)} projectId={null} />
    </div>
  );
}