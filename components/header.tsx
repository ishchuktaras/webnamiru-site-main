// components/header.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MenuIcon, Phone, Mail, ArrowRight, Home, Settings, Briefcase, Star, Users, MessageSquare, Workflow } from "lucide-react"; 
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import InquirySheet from "@/components/InquirySheet"; 
import React from "react";

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (pathname === "/") {
        const sections = document.querySelectorAll<HTMLElement>("[data-section]");
        let currentSection: string | null = null;
        const offset = (headerRef.current?.offsetHeight || 80) + 100;
        sections.forEach((section) => {
          if (window.scrollY >= section.offsetTop - offset) {
            currentSection = section.getAttribute("data-section");
          }
        });
        setActiveSection(currentSection);
      } else {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navigationItems = [
    { label: "Domů", type: 'scroll', target: 'hero-section' },
    {
      label: 'Služby',
      type: 'dropdown',
      items: [
        { label: 'Tvorba webu', target: 'service-packages-section', description: 'Balíčky na míru pro váš byznys.' },
        { label: 'Správa a údržba', target: 'maintenance-section', description: 'Dlouhodobá péče a bezpečnost.' },
        { label: 'Můj proces', target: 'process-section', description: 'Transparentní postup od A do Z.' },
      ]
    },
    {
      label: 'Reference',
      type: 'dropdown',
      items: [
        { label: 'Případové studie', target: 'case-studies-section', description: 'Konkrétní výsledky mých projektů.' },
        { label: 'Pro koho tvořím', target: 'for-whom-section', description: 'Řešení pro různé segmenty.' },
        { label: 'Co o mně říkají', target: 'testimonials-section', description: 'Hodnocení a zpětná vazba.' },
      ]
    },
    { label: "Partnerství", type: 'scroll', target: 'partners-packages-section' },
    { label: "Blog", type: 'page', href: '/blog' },
    { label: "Kontakt", type: 'page', href: '/kontakt' },
  ];

  return (
    <>
      <div className="hidden lg:block bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
           <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4" />
              <a href="tel:+420777596216" className="hover:underline">+420 777 596 216</a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:poptavka@webnamiru.site" className="hover:text-blue-200 transition-colors">poptavka@webnamiru.site</a>
            </div>
          </div>
          <div className="text-blue-200 font-medium">🎯 Specializujeme se na Kraj Vysočina</div>
        </div>
      </div>

      <header ref={headerRef} className={cn("sticky top-0 z-50 w-full transition-all duration-300 ease-in-out", isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b" : "bg-background shadow-sm")}>
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="webnamíru.site - Domovská stránka">
            <div className="relative w-[50px] h-[50px]">
              <Image src="/images/logo/logo.svg" alt="webnamíru.site - Logo" fill className="rounded-full object-contain" priority/>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">webnamíru.site</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Strategické weby pro Vysočinu</span>
            </div>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.type === 'dropdown' ? (
                    <>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items?.map((subItem) => (
                            <ListItem key={subItem.label} title={subItem.label} onClick={() => scrollToSection(subItem.target!)} href={`/#${subItem.target}`}>
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : item.type === 'scroll' ? (
                    // ZMĚNA: Odebrána podmínka '&& pathname === "/"'
                    <button onClick={() => scrollToSection(item.target!)} className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none", activeSection === item.target && pathname === '/' && "bg-accent")}>
                      {item.label}
                    </button>
                  ) : ( // item.type === 'page'
                     <Link href={item.href!} legacyBehavior passHref>
                        <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", pathname.startsWith(item.href!) && "bg-accent")}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <InquirySheet
              title="Nezávazná konzultace"
              description="Zanechte mi kontakt a probereme, jak mohu pomoci vašemu projektu."
              serviceInfo="Obecná poptávka z hlavičky"
              trigger={ <Button className="h-10 px-6 group">Nezávazná konzultace<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button> }
            />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Otevřít menu"><MenuIcon className="h-6 w-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                <nav className="flex flex-col gap-1 text-lg font-medium mt-10 p-2">
                  {navigationItems.map((item) =>
                    item.type === 'dropdown' ? (
                      <Accordion type="single" collapsible key={item.label}>
                        <AccordionItem value={item.label} className="border-b-0">
                          <AccordionTrigger className="p-2 font-medium text-lg hover:no-underline">{item.label}</AccordionTrigger>
                          <AccordionContent className="pl-4">
                            {item.items?.map((subItem) => (
                              <button key={subItem.label} onClick={() => scrollToSection(subItem.target!)} className={cn("w-full text-left p-2 rounded-md text-base", activeSection === subItem.target && pathname === '/' ? "bg-accent" : "hover:bg-accent/50")}>
                                {subItem.label}
                              </button>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : item.type === 'scroll' ? (
                      // ZMĚNA: Odebrána podmínka '&& pathname === "/"'
                      <button key={item.label} onClick={() => scrollToSection(item.target!)} className={cn("text-left p-2 rounded-md", activeSection === item.target && pathname === '/' ? "bg-accent" : "hover:bg-accent/50")}>
                        {item.label}
                      </button>
                    ) : ( // item.type === 'page'
                      <Link key={item.label} href={item.href!} onClick={() => setIsMobileMenuOpen(false)} className={cn("block p-2 rounded-md", pathname.startsWith(item.href!) ? "bg-accent" : "hover:bg-accent/50")}>
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a ref={ref} className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer", className)}
            onClick={(e) => {
              e.preventDefault();
              if (props.onClick) {
                props.onClick(e);
              }
            }}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";