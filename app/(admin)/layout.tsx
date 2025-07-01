// app/(admin)/layout.tsx

import AdminLayoutComponent from "@/components/admin/AdminLayout"; // Přejmenováno pro srozumitelnost
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // Tato pojistka tu zůstává pro případ, že by selhal middleware
  if (!session?.user) {
    redirect('/login');
  }

  // Komponenta AdminLayoutComponent nyní obsahuje sidebar, header atd.
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}