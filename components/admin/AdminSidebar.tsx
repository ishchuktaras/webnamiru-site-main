// components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// ZMĚNA: Přidána ikona Inbox pro poptávky
import { Home, Newspaper, MessageSquare, BarChart2, Settings, Tags, Inbox, Briefcase } from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Přehled", icon: Home },
  { href: "/admin/posts", label: "Články", icon: Newspaper },
  { href: "/admin/comments", label: "Komentáře", icon: MessageSquare },
  // PŘIDÁNO: Nová položka pro Poptávky
  { href: "/admin/inquiries", label: "Poptávky", icon: Inbox },
  { href: "/admin/taxonomy", label: "Kategorie & Tagy", icon: Tags },
  { href: "/admin/analytics", label: "Analytika", icon: BarChart2 },
  { href: "/admin/projects", icon: Briefcase, label: "Projekty" },
  { href: "/admin/settings", label: "Nastavení", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-200 dark:border-gray-800 hidden md:block">
      <nav className="flex flex-col gap-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-800",
              (pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))) && "bg-gray-200 dark:bg-gray-800 font-semibold"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}