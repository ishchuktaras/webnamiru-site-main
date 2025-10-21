// app/(admin)/admin/inquiries/[id]/edit/page.tsx

import InquiryForm from "@/components/admin/InquiryForm";
import { getProjectInquiryById, updateProjectInquiry } from "@/lib/actions/inquiry.actions";
import { notFound } from "next/navigation";

// Definice rozhraní pro props stránky
interface EditInquiryPageProps {
  params: { id: string }; // `id` je parametr z URL
}

export default async function EditInquiryPage({ params }: EditInquiryPageProps) {
  const { id: inquiryId } = params;

  // Načte poptávku z databáze na základě ID z URL
  const inquiry = await getProjectInquiryById(inquiryId);

  // Pokud poptávka nebyla nalezena, zobrazí 404 stránku
  if (!inquiry) {
    notFound();
  }

  // Připraví výchozí hodnoty pro editační formulář.
  // Důležité: 'description' pole by mělo být zahrnuto pouze,
  // pokud skutečně existuje ve tvém Prisma modelu `ProjectInquiry`.
  // Pokud ne, odstraň ho odsud, z InquiryForm.tsx a z updateInquirySchema v inquiry.actions.ts.
  const defaultValues = {
    id: inquiry.id, // ID je klíčové pro Server Action updateProjectInquiry
    projectName: inquiry.projectName || "",
    clientName: inquiry.clientName || "",
    clientEmail: inquiry.clientEmail || "",
    projectType: inquiry.projectType || "",
    description: inquiry.description || "", // Ponechejte, pokud 'description' je v DB modelu ProjectInquiry
  };

  // Tato funkce je Server Action, která se předá Client Component InquiryForm.
  // Její podpis (prevState, formData) je vyžadován hookem `useFormState`.
  async function handleUpdateInquiry(prevState: any, formData: FormData) {
    "use server"; // Označuje, že toto je Server Action

    // `formData` již obsahuje 'id', protože ho InquiryForm přidává jako skryté pole
    // (viz kód v InquiryForm.tsx: `<input type="hidden" name="id" value={defaultValues.id} />`).
    // Proto není potřeba ho zde ručně přidávat do formData.

    // Volá Server Action pro aktualizaci poptávky
    return updateProjectInquiry(prevState, formData);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Upravit poptávku: {inquiry.projectName}</h1>
      <InquiryForm
        action={handleUpdateInquiry} // Předá Server Action do formuláře
        defaultValues={defaultValues} // Předá aktuální hodnoty poptávky pro předvyplnění formuláře
      />
    </div>
  );
}