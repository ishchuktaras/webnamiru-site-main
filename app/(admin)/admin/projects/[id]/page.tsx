// app/(admin)/admin/projects/[id]/page.tsx

import { getProjectById } from "@/lib/actions/project.actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ProjectDetailTabs from "@/components/admin/ProjectDetailTabs";
import {
  Briefcase,
  User,
  Mail,
  CircleDollarSign,
  CheckCircle,
  Clock,
} from "lucide-react";

// Funkce pro výběr barvy a ikony statusu
const getStatusProps = (status: string) => {
  switch (status) {
    case "V realizaci":
      return { color: "bg-blue-500", icon: Clock };
    case "Dokončeno":
      return { color: "bg-green-500", icon: CheckCircle };
    case "Poptávka":
      return { color: "bg-yellow-500", icon: Briefcase };
    default:
      return { color: "bg-gray-500", icon: Briefcase };
  }
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: project, error } = await getProjectById(params.id);

  if (error || !project) {
    notFound();
  }

  const StatusIcon = getStatusProps(project.status).icon;
  const statusColor = getStatusProps(project.status).color;

  return (
    <div className="space-y-6">
      {/* Hlavička projektu */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{project.clientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${project.clientEmail}`} className="hover:underline">
                {project.clientEmail}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" />
              <span>
                {project.price
                  ? `${project.price.toLocaleString("cs-CZ")} Kč`
                  : "Cena nespecifikována"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Badge
            className={`text-white text-base px-4 py-2 ${statusColor}`}
          >
            <StatusIcon className="mr-2 h-5 w-5" />
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Záložky pro správu projektu */}
      <ProjectDetailTabs project={project} />
    </div>
  );
}
