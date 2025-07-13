// components/admin/ProjectDetailTabs.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  ClipboardCheck,
  FileSignature,
  CreditCard,
  PackageCheck,
} from "lucide-react";
import { type Project, type ProjectTask, type Offer, type Contract, type Invoice, type HandoverProtocol } from "@prisma/client";
import OfferTab from "./tabs/OfferTab";
import ContractTab from "./tabs/ContractTab";
import InvoicesTab from "./tabs/InvoicesTab";
import HandoverTab from "./tabs/HandoverTab";
import TasksTab from "./tabs/TasksTab"; // PŘIDÁN IMPORT

type FullProject = Project & {
  tasks: ProjectTask[];
  offer: Offer | null;
  contract: Contract | null;
  invoices: Invoice[];
  handover: HandoverProtocol | null;
};

interface ProjectDetailTabsProps {
  project: FullProject;
}

export default function ProjectDetailTabs({ project }: ProjectDetailTabsProps) {
  return (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <TabsTrigger value="tasks">
          <ClipboardCheck className="mr-2 h-4 w-4" />
          Úkoly ({project.tasks?.length ?? 0})
        </TabsTrigger>
        <TabsTrigger value="offer">
          <FileText className="mr-2 h-4 w-4" />
          Nabídka
        </TabsTrigger>
        <TabsTrigger value="contract">
          <FileSignature className="mr-2 h-4 w-4" />
          Smlouva
        </TabsTrigger>
        <TabsTrigger value="invoices">
          <CreditCard className="mr-2 h-4 w-4" />
          Faktury ({project.invoices?.length ?? 0})
        </TabsTrigger>
        <TabsTrigger value="handover">
          <PackageCheck className="mr-2 h-4 w-4" />
          Předání
        </TabsTrigger>
      </TabsList>
      
      {/* ZMĚNA: Placeholder nahrazen funkční komponentou */}
      <TabsContent value="tasks" className="mt-4">
        <TasksTab project={project} />
      </TabsContent>
      
      <TabsContent value="offer" className="mt-4">
        <OfferTab project={project} />
      </TabsContent>

      <TabsContent value="contract" className="mt-4">
        <ContractTab project={project} />
      </TabsContent>

      <TabsContent value="invoices" className="mt-4">
        <InvoicesTab project={project} />
      </TabsContent>

      <TabsContent value="handover" className="mt-4">
        <HandoverTab project={project} />
      </TabsContent>
    </Tabs>
  );
}
