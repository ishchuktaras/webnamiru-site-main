// components/SectionWrapper.tsx

"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string; // ZMĚNA: Přejmenováno z dataSection na id pro srozumitelnost
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id, // ZMĚNA: Používáme id
  title,
  subtitle,
  badgeText,
  className,
}: SectionWrapperProps) {

  // ZMĚNA: Animace je odstraněna, takže useEffect a useState nejsou potřeba
  
  return (
    <section
      // ZMĚNA: Přidán atribut id a data-section nyní používá hodnotu z id
      id={id}
      data-section={id} 
      className={cn(`w-full py-12 md:py-24 lg:py-32`, className)}
    >
      <div className="container px-4 md:px-6">
        {(title || subtitle) && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
            <div className="space-y-4">
              {badgeText && (
                <Badge variant="outline" className="mb-4 text-sm px-3 py-1">
                  {badgeText}
                </Badge>
              )}
              {title && (
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}