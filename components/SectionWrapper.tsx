// components/SectionWrapper.tsx

import React from "react"; // Není potřeba useEffect a useState
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  dataSection: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  dataSection,
  title,
  subtitle,
  badgeText,
  className,
}: SectionWrapperProps) {
  // ZMĚNA: Veškerá logika pro 'isMounted' je pryč
  
  return (
    <section
      // ZMĚNA: Odebrány třídy pro animaci, zůstává jen základ
      className={cn(`w-full py-12 md:py-24 lg:py-32`, className)}
      data-section={dataSection}
    >
      <div className="container px-4 md:px-6">
        {(title || subtitle) && (
          // ZMĚNA: Odebrán atribut data-animate-item z hlavičky
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