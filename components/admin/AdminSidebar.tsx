// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/lib/actions/auth.actions";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  BarChart2,
  Settings,
  FileText,
  Briefcase,
  GanttChartSquare,
  LogOut,
  Users, 
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Přehled" },
  {
    href: "/admin/workflow",
    icon: GanttChartSquare,
    label: "Průvodce zakázkou",
  },
  { href: "/admin/inquiries", icon: FileText, label: "Poptávky" },
  { href: "/admin/projects", icon: Briefcase, label: "Projekty" },
  { href: "/admin/posts", icon: Newspaper, label: "Články" },
  { href: "/admin/comments", icon: MessageSquare, label: "Komentáře" },
  { href: "/admin/analytics", icon: BarChart2, label: "Analytika" },
  { href: "/admin/settings", icon: Settings, label: "Nastavení" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession(); 

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background p-4 space-y-4">
      <div className="flex-grow">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname.startsWith(item.href) && item.href !== "/admin" || pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
                 
          {session?.user?.role === 'SUPERADMIN' && (
            <>
              <div className="pt-2">
                <hr />
              </div>
              <p className="px-3 pt-2 text-xs font-semibold uppercase text-muted-foreground">
                Super Admin
              </p>
              <Button
                asChild
                variant={pathname.startsWith("/admin/users") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href="/admin/users">
                  <Users className="mr-3 h-5 w-5" />
                  <span>Správa uživatelů</span>
                </Link>
              </Button>
            </>
          )}
          

        </nav>
      </div>
      <div className="mt-auto">
        <form action={handleSignOut}>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-3 h-5 w-5" />
            Odhlásit se
          </Button>
        </form>
      </div>
    </aside>
  );
}