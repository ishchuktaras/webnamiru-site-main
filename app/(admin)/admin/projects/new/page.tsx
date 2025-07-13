// app/(admin)/admin/projects/new/page.tsx
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/actions/project.actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Vytvořit nový projekt</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
