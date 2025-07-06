// lib/actions/postActions.ts

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { z } from "zod";

// Definuje schému pre validáciu dát z formulára
const postSchema = z.object({
  title: z.string().min(1, "Nadpis je povinný."),
  content: z.string().min(1, "Obsah je povinný."),
  slug: z.string().min(1, "URL slug je povinný."),
  excerpt: z.string().optional(),
  imageUrl: z.string().url({ message: "Neplatná URL adresa." }).optional().or(z.literal('')),
  published: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
  featured: z.preprocess((val) => val === 'on' || val === true, z.boolean()),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

// Interná funkcia, ktorá spracováva logiku pre vytvorenie a aktualizáciu
async function handlePostSubmission(formData: FormData, postId?: string) {
    const rawData = Object.fromEntries(formData.entries());
    const dataToValidate = {
        ...rawData,
        categoryIds: formData.getAll('categoryIds'),
        tagIds: formData.getAll('tagIds'),
    };
    
    const validatedFields = postSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        // Vráti chyby, ak validácia zlyhá
        return { 
            success: false, 
            message: "Formulár obsahuje chyby.", 
            errors: validatedFields.error.flatten().fieldErrors 
        };
    }

    const { categoryIds, tagIds, ...postData } = validatedFields.data;

    // OPRAVA ZDE: Pripraví dáta pre Prisma a správne spracuje voliteľné polia
    const dataPayload: any = {
      ...postData,
      categories: { set: categoryIds?.map(id => ({ id })) },
      tags: { set: tagIds?.map(id => ({ id })) },
    };

    // Podmienene pridáme voliteľné polia, aby sme sa vyhli `null` hodnotám
    if (postData.excerpt) {
        dataPayload.excerpt = postData.excerpt;
    }
    if (postData.imageUrl) {
        dataPayload.imageUrl = postData.imageUrl;
    }


    try {
        if (postId) {
            // Aktualizácia existujúceho príspevku
            await prisma.post.update({
                where: { id: postId },
                data: dataPayload
            });
        } else {
            // Vytvorenie nového príspevku
            await prisma.post.create({
                data: {
                    ...dataPayload,
                    // Dočasne natvrdo nastavený autor
                    authorId: "clwscb1350000ij1k68n18z24" 
                }
            });
        }
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Databázová chyba." };
    }

    // Po úspešnom uložení presmeruje a obnoví dáta
    revalidatePath('/admin/posts');
    redirect('/admin/posts');
}

// Exportujeme obe funkcie správne
export async function createPost(formData: FormData) {
    return handlePostSubmission(formData);
}

export async function updatePost(formData: FormData) {
    const postId = formData.get('id') as string;
    return handlePostSubmission(formData, postId);
}

export async function deletePost(postId: string) {
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}