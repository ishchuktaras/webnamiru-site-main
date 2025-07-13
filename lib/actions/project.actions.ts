// lib/actions/project.actions.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

// --- AKCE PRO PROJEKTY ---
const projectSchema = z.object({
  name: z.string().min(1, "Název projektu je povinný."),
  clientName: z.string().min(1, "Jméno klienta je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  status: z.string().min(1, "Status je povinný."),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
});

export async function createProject(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };
  try {
    await prisma.project.create({ data: validatedFields.data });
  } catch (error) {
    return { message: "Nepodařilo se vytvořit projekt." };
  }
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
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
      return { success: false, error: `Nepodařilo se načíst projekt: ${error}` };
    }
}

// --- AKCE PRO NABÍDKY ---
const offerSchema = z.object({
    projectId: z.string(),
    offerNumber: z.string().min(1, "Číslo nabídky je povinné."),
    status: z.string(),
    validUntil: z.date({ required_error: "Datum platnosti je povinné." }),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')),
});
export async function createOrUpdateOffer(prevState: any, formData: FormData) {
    const validatedFields = offerSchema.safeParse({
        projectId: formData.get('projectId'),
        offerNumber: formData.get('offerNumber'),
        status: formData.get('status'),
        validUntil: new Date(formData.get('validUntil') as string),
        fileUrl: formData.get('fileUrl'),
    });
    if (!validatedFields.success) return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.offer.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Nabídka byla úspěšně uložena." };
    } catch (error) { return { success: false, message: "Nepodařilo se uložit nabídku." }; }
}

// --- AKCE PRO SMLOUVY ---
const contractSchema = z.object({
    projectId: z.string(),
    status: z.string(),
    signedAt: z.preprocess((arg) => (typeof arg === 'string' && arg ? new Date(arg) : null), z.date().nullable()),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')),
});
export async function createOrUpdateContract(prevState: any, formData: FormData) {
    const validatedFields = contractSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.contract.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Smlouva byla úspěšně uložena." };
    } catch (error) { return { success: false, message: "Nepodařilo se uložit smlouvu." }; }
}

// --- AKCE PRO FAKTURY ---
const invoiceSchema = z.object({
    projectId: z.string(),
    invoiceNumber: z.string().min(1, "Číslo faktury je povinné."),
    amount: z.coerce.number().min(1, "Částka musí být větší než 0."),
    type: z.string(),
    status: z.string(),
    dueDate: z.date({ required_error: "Datum splatnosti je povinné." }),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')),
});
export async function createInvoice(prevState: any, formData: FormData) {
    const validatedFields = invoiceSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.invoice.create({ data: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Faktura byla úspěšně vytvořena." };
    } catch (error) { return { success: false, message: "Nepodařilo se vytvořit fakturu." }; }
}
export async function updateInvoiceStatus(invoiceId: string, status: string) {
    if (!invoiceId || !status) return { success: false, message: "Chybějící data." };
    try {
        const updatedInvoice = await prisma.invoice.update({
            where: { id: invoiceId },
            data: { status: status, paidAt: status === "Zaplaceno" ? new Date() : null },
        });
        revalidatePath(`/admin/projects/${updatedInvoice.projectId}`);
        return { success: true, message: `Status faktury byl změněn na "${status}".` };
    } catch (error) { return { success: false, message: "Nepodařilo se aktualizovat fakturu." }; }
}

// --- AKCE PRO PŘEDÁVACÍ PROTOKOL ---
const handoverSchema = z.object({
    projectId: z.string(),
    status: z.string(),
    handedOverAt: z.preprocess((arg) => (typeof arg === 'string' && arg ? new Date(arg) : null), z.date().nullable()),
    fileUrl: z.string().url("Zadejte platnou URL adresu.").optional().or(z.literal('')),
});
export async function createOrUpdateHandover(prevState: any, formData: FormData) {
    const validatedFields = handoverSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    const { projectId, ...data } = validatedFields.data;
    try {
        await prisma.handoverProtocol.upsert({ where: { projectId }, update: data, create: { projectId, ...data } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Předávací protokol byl úspěšně uložen." };
    } catch (error) { return { success: false, message: "Nepodařilo se uložit předávací protokol." }; }
}

// --- AKCE PRO ÚKOLY ---
const taskSchema = z.object({
    projectId: z.string(),
    title: z.string().min(1, "Název úkolu je povinný."),
});
export async function createTask(prevState: any, formData: FormData) {
    const validatedFields = taskSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) return { success: false, message: "Chyba validace.", errors: validatedFields.error.flatten().fieldErrors };
    const { projectId, title } = validatedFields.data;
    try {
        await prisma.projectTask.create({ data: { projectId, title } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, message: "Úkol byl úspěšně vytvořen." };
    } catch (error) { return { success: false, message: "Nepodařilo se vytvořit úkol." }; }
}
export async function updateTaskStatus(taskId: string, status: string) {
    if (!taskId || !status) return { success: false, message: "Chybějící data." };
    try {
        const updatedTask = await prisma.projectTask.update({ where: { id: taskId }, data: { status } });
        revalidatePath(`/admin/projects/${updatedTask.projectId}`);
        return { success: true, message: `Status úkolu byl změněn.` };
    } catch (error) { return { success: false, message: "Nepodařilo se aktualizovat úkol." }; }
}
export async function deleteTask(taskId: string) {
    if (!taskId) return { success: false, message: "Chybí ID úkolu." };
    try {
        const deletedTask = await prisma.projectTask.delete({ where: { id: taskId } });
        revalidatePath(`/admin/projects/${deletedTask.projectId}`);
        return { success: true, message: "Úkol byl smazán." };
    } catch (error) { return { success: false, message: "Nepodařilo se smazat úkol." }; }
}
