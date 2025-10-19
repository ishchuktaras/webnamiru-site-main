// lib/types/project.types.ts - Tento soubor NEBUDE mít "use client" ani "use server"
import { z } from "zod";

// --- SCHÉMA PROJEKTU ---
export const projectSchema = z.object({
  name: z.string().min(1, "Název projektu je povinný."),
  clientName: z.string().min(1, "Jméno klienta je povinné."),
  clientEmail: z.string().email("Neplatný formát e-mailu."),
  status: z.string().min(1, "Status je povinný."),
  description: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
});

// Typ pro chyby vrácené ze Zod (odpovídá `flatten().fieldErrors`)
export type ZodFieldErrors<T extends z.ZodTypeAny> = {
  [K in keyof z.infer<T>]?: string[];
} & { formErrors?: string[] };

// Vytvořte globální typ pro návratové hodnoty server akcí, které používají zprávu a potenciální chyby
export type ActionReturnType<T extends z.ZodTypeAny> = {
  success: boolean;
  message: string;
  errors?: ZodFieldErrors<T>;
};

// Exportujeme typ ProjectFormValues pro klient stranu
export type ProjectFormValues = z.infer<typeof projectSchema>;