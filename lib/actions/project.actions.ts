// lib/actions/project.actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Role } from "@prisma/client";

// --- Pomocná funkce pro ověření role SUPERADMIN ---
async function checkSuperAdminAuth() {
  const session = await auth();
  if (!session || session.user?.role !== Role.SUPERADMIN) {
    redirect("/admin?error=unauthorized");
  }
}

// --- SCHÉMATA ---
export const projectSchema = z.object({ // Exportujeme schema pro použití v ProjectForm
  name: z.string().min(1, "Název projektu je povinný."),
  clientName: z.string().min(1, "Jméno klienta je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  status: z.string().min(1, "Status je povinný."),
  description: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
});

// Typ pro chyby vrácené ze Zod (odpovídá `flatten().fieldErrors`)
export type ZodFieldErrors<T extends z.ZodTypeAny> = { // Exportujeme typ
  [K in keyof z.infer<T>]?: string[];
} & { formErrors?: string[] };


// Vytvořte globální typ pro návratové hodnoty server akcí, které používají zprávu a potenciální chyby
export type ActionReturnType<T extends z.ZodTypeAny> = { // Exportujeme typ
  success: boolean;
  message: string;
  errors?: ZodFieldErrors<T>;
};

// --- AKCE PRO PROJEKTY ---

export async function createProject(prevState: any, formData: FormData): Promise<ActionReturnType<typeof projectSchema>> {
  await checkSuperAdminAuth();

  const validatedFields = projectSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Chyba validace při vytváření projektu.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.project.create({ data: validatedFields.data });
    revalidatePath("/admin/projects");
    return { success: true, message: "Projekt byl úspěšně vytvořen." };
  } catch (error) {
    console.error("Chyba při vytváření projektu:", error);
    return { success: false, message: "Nepodařilo se vytvořit projekt." };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Chyba při načítání projektů:", error);
    return { success: false, error: "Nepodařilo se načíst projekty." };
  }
}

export async function getProjectById(projectId: string) {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { tasks: { orderBy: { createdAt: 'asc' } }, offer: true, contract: true, invoices: true, handover: true }
      });
      if (!project) return { success: false, error: "Projekt nebyl nalezen." };
      return { success: true, data: project };
    } catch (error) {
      console.error("Chyba při načítání projektu:", error);
      return { success: false, error: `Nepodařilo se načíst projekt: ${error}` };
    }
}

// === AKCE PRO AKTUALIZACI PROJEKTU ===
export async function updateProject(
  projectId: string,
  prevState: any,
  formData: FormData
): Promise<ActionReturnType<typeof projectSchema>> {
  await checkSuperAdminAuth();

  const validatedFields = projectSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Chyba validace při aktualizaci projektu.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.project.update({
      where: { id: projectId },
      data: validatedFields.data,
    });
    revalidatePath(`/admin/projects/${projectId}`);
    revalidatePath("/admin/projects");
    return { success: true, message: "Projekt byl úspěšně aktualizován." };
  } catch (e: any) {
    console.error("Chyba při aktualizaci projektu:", e);
    return { success: false, message: e.message || "Nepodařilo se aktualizovat projekt." };
  }
}

// === AKCE PRO MAZÁNÍ PROJEKTU ===
export async function deleteProject(projectId: string): Promise<ActionReturnType<typeof projectSchema>> {
  await checkSuperAdminAuth();

  try {
    await prisma.$transaction(async (tx) => {
      // Předpokládáme, že máte vztahy nastavené a modely existují
      // a chcete smazat závislé záznamy.
      await tx.projectTask.deleteMany({ where: { projectId } });
      await tx.offer.deleteMany({ where: { projectId } });
      await tx.contract.deleteMany({ where: { projectId } });
      await tx.invoice.deleteMany({ where: { projectId } });
      await tx.handoverProtocol.deleteMany({ where: { projectId } });

      await tx.project.delete({
        where: { id: projectId },
      });
    });

    revalidatePath("/admin/projects");
    return { success: true, message: "Projekt byl úspěšně smazán." };
  } catch (e: any) {
    console.error("Chyba při mazání projektu:", e);
    return { success: false, message: e.message || "Nepodařilo se smazat projekt." };
  }
}


// --- AKCE PRO NABÍDKY ---
const offerSchema = z.object({
    projectId: z.string(),
    offerNumber: z.string().min(1, "Číslo nabídky je povinné."),
    status: z.string(),
    validUntil: z.coerce.date({ required_error: "Datum platnosti je povinné." }),
    summary: z.string().optional().nullable(),
    scope_package: z.string().optional().nullable(),
    scope_items: z.string().transform(str => JSON.parse(str)).optional(),
    price_items: z.string().transform(str => JSON.parse(str)).optional(),
    price_total: z.coerce.number().optional().nullable(),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')).nullable(),
    preliminary_package: z.string().optional().nullable(),
    main_goal: z.string().optional().nullable(),
    target_audience: z.string().optional().nullable(),
    potential_problems: z.string().optional().nullable(),
    added_value_ideas: z.string().optional().nullable(),
    estimated_delivery: z.preprocess((arg) => (typeof arg === 'string' && arg ? new Date(arg) : null), z.date().nullable()),
});
export async function createOrUpdateOffer(prevState: any, formData: FormData): Promise<ActionReturnType<typeof offerSchema>> {
    await checkSuperAdminAuth();
    const dataToParse = Object.fromEntries(formData.entries());
    const validatedFields = offerSchema.safeParse(dataToParse);
    if (!validatedFields.success) {
        console.error("Chyba validace nabídky:", validatedFields.error);
        return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    }
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.offer.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Nabídka byla úspěšně uložena." };
    } catch (error) {
      console.error("Chyba při ukládání nabídky:", error);
      return { success: false, message: "Nepodařilo se uložit nabídku." };
    }
}

// --- AKCE PRO SMLOUVY ---
const contractSchema = z.object({
    projectId: z.string(),
    status: z.string(),
    signedAt: z.preprocess((arg) => (typeof arg === 'string' && arg ? new Date(arg) : null), z.date().nullable()),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')) .nullable(),
});
export async function createOrUpdateContract(prevState: any, formData: FormData): Promise<ActionReturnType<typeof contractSchema>> {
    await checkSuperAdminAuth();
    const validatedFields = contractSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      console.error("Chyba validace smlouvy:", validatedFields.error);
      return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    }
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.contract.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Smlouva byla úspěšně uložena." };
    } catch (error) {
      console.error("Chyba při ukládání smlouvy:", error);
      return { success: false, message: "Nepodařilo se uložit smlouvu." };
    }
}

// --- AKCE PRO FAKTURY ---
const invoiceSchema = z.object({
    projectId: z.string(),
    invoiceNumber: z.string().min(1, "Číslo faktury je povinné."),
    amount: z.coerce.number().min(1, "Částka musí být větší než 0."),
    type: z.string(),
    status: z.string(),
    dueDate: z.coerce.date({ required_error: "Datum splatnosti je povinné." }),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')) .nullable(),
});
export async function createInvoice(prevState: any, formData: FormData): Promise<ActionReturnType<typeof invoiceSchema>> {
    await checkSuperAdminAuth();
    const validatedFields = invoiceSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      console.error("Chyba validace faktury:", validatedFields.error);
      return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    }
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.invoice.create({ data: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Faktura byla úspěšně vytvořena." };
    } catch (error) {
      console.error("Chyba při vytváření faktury:", error);
      return { success: false, message: "Nepodařilo se vytvořit fakturu." };
    }
}
export async function updateInvoiceStatus(invoiceId: string, status: string): Promise<Omit<ActionReturnType<any>, 'errors'>> {
    await checkSuperAdminAuth();
    if (!invoiceId || !status) return { success: false, message: "Chybějící data." };
    try {
        const updatedInvoice = await prisma.invoice.update({
            where: { id: invoiceId },
            data: { status: status, paidAt: status === "Zaplaceno" ? new Date() : null },
        });
        revalidatePath(`/admin/projects/${updatedInvoice.projectId}`);
        return { success: true, message: `Status faktury byl změněn na "${status}".` };
    } catch (error) {
      console.error("Chyba při aktualizaci statusu faktury:", error);
      return { success: false, message: "Nepodařilo se aktualizovat fakturu." };
    }
}

// --- AKCE PRO PŘEDÁVACÍ PROTOKOL ---
const handoverSchema = z.object({
    projectId: z.string(),
    status: z.string(),
    handedOverAt: z.preprocess((arg) => (typeof arg === 'string' && arg ? new Date(arg) : null), z.date().nullable()),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')) .nullable(),
});
export async function createOrUpdateHandover(prevState: any, formData: FormData): Promise<ActionReturnType<typeof handoverSchema>> {
    await checkSuperAdminAuth();
    const validatedFields = handoverSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      console.error("Chyba validace předávacího protokolu:", validatedFields.error);
      return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    }
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.handoverProtocol.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Předávací protokol byl úspěšně uložen." };
    } catch (error) {
      console.error("Chyba při ukládání předávacího protokolu:", error);
      return { success: false, message: "Nepodařilo se uložit předávací protokol." };
    }
}

// --- AKCE PRO ÚKOLY ---
const taskSchema = z.object({
    projectId: z.string(),
    title: z.string().min(1, "Název úkolu je povinný."),
});
export async function createTask(prevState: any, formData: FormData): Promise<ActionReturnType<typeof taskSchema>> {
    await checkSuperAdminAuth();
    const validatedFields = taskSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
      console.error("Chyba validace úkolu:", validatedFields.error);
      return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    }
    const { projectId, title } = validatedFields.data;
    try {
        await prisma.projectTask.create({ data: { projectId, title } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Úkol byl úspěšně vytvořen." };
    } catch (error) {
      console.error("Chyba při vytváření úkolu:", error);
      return { success: false, message: "Nepodařilo se vytvořit úkol." };
    }
}
export async function updateTaskStatus(taskId: string, status: string): Promise<Omit<ActionReturnType<any>, 'errors'>> {
    await checkSuperAdminAuth();
    if (!taskId || !status) return { success: false, message: "Chybějící data." };
    try {
        const updatedTask = await prisma.projectTask.update({ where: { id: taskId }, data: { status } });
        revalidatePath(`/admin/projects/${updatedTask.projectId}`);
        return { success: true, message: `Status úkolu byl změněn.` };
    } catch (error) {
      console.error("Chyba při aktualizaci statusu úkolu:", error);
      return { success: false, message: "Nepodařilo se aktualizovat úkol." };
    }
}
export async function deleteTask(taskId: string): Promise<Omit<ActionReturnType<any>, 'errors'>> {
    await checkSuperAdminAuth();
    if (!taskId) return { success: false, message: "Chybí ID úkolu." };
    try {
        const deletedTask = await prisma.projectTask.delete({ where: { id: taskId } });
        revalidatePath(`/admin/projects/${deletedTask.projectId}`);
        return { success: true, message: "Úkol byl smazán." };
    } catch (error) {
      console.error("Chyba při mazání úkolu:", error);
      return { success: false, message: "Nepodařilo se smazat úkol." };
    }
}