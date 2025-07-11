// app/(forms)/layout.tsx

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import React from "react";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Minimalistická hlavička jen s logem a přepínačem tématu */}
      <header className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            className="flex items-center gap-3 group"
            href="/"
            aria-label="Zpět na domovskou stránku"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo/logo.svg"
                alt="webnamíru.site - Logo"
                fill
                className="rounded-full object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold hidden sm:inline">
              webnamíru.site
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      {/* Hlavní obsah - samotný formulář */}
      <main className="py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
}