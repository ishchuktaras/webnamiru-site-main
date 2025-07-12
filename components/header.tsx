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
import { MenuIcon, Phone, Mail, ArrowRight } from "lucide-react"; 
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import InquirySheet from "@/components/InquirySheet"; 
import React from "react";
import LanguageSwitcher from '@/components/LanguageSwitcher'; 
import { useTranslations } from 'next-intl';

// --- LEPŠÍ TYPOVÉ DEFINICE ---

// Typ pro položku v rozbalovacím menu
interface SubNavItem {
  key: string;
  target: string;
  descKey: string;
  label: string;
  description: string;
}

// Typy pro hlavní navigační položky
interface BaseNavItem {
  key: string;
  label: string;
}

interface ScrollNavItem extends BaseNavItem {
  type: 'scroll';
  target: string;
}

interface PageNavItem extends BaseNavItem {
  type: 'page';
  href: string;
}

interface DropdownNavItem extends BaseNavItem {
  type: 'dropdown';
  items: SubNavItem[];
}

// Sjednocený typ pro všechny možnosti
type NavItem = ScrollNavItem | PageNavItem | DropdownNavItem;


// Struktura navigačních položek (bez textů) - zůstává stejná
const navStructure = [
  { key: 'home', type: 'scroll' as const, target: 'hero-section' },
  {
    key: 'services',
    type: 'dropdown' as const,
    items: [
      { key: 'webCreation', target: 'service-packages-section', descKey: 'webCreationDesc' },
      { key: 'maintenance', target: 'maintenance-section', descKey: 'maintenanceDesc' },
      { key: 'process', target: 'process-section', descKey: 'processDesc' },
    ]
  },
  {
    key: 'references',
    type: 'dropdown' as const,
    items: [
      { key: 'caseStudies', target: 'case-studies-section', descKey: 'caseStudiesDesc' },
      { key: 'forWhom', target: 'for-whom-section', descKey: 'forWhomDesc' },
      { key: 'testimonials', target: 'testimonials-section', descKey: 'testimonialsDesc' },
    ]
  },
  { key: 'partnership', type: 'scroll' as const, target: 'partners-packages-section' },
  { key: 'blog', type: 'page' as const, href: '/blog' },
  { key: 'contact', type: 'page' as const, href: '/kontakt' },
];


export default function Header(): React.JSX.Element {
  const t = useTranslations('Navigation');
  const tHeader = useTranslations('Header');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // --- TYPOVĚ BEZPEČNÉ VYTVOŘENÍ NAVIGACE ---
  const navigationItems: NavItem[] = navStructure.map(item => {
    if (item.type === 'dropdown') {
      return {
        ...item,
        label: t(`${item.key}.label`),
        items: item.items.map(subItem => ({
          ...subItem,
          label: t(`${item.key}.${subItem.key}`),
          description: t(`${item.key}.${subItem.descKey}`)
        }))
      };
    }
    // Pro 'scroll' a 'page' typy
    const baseItem = { key: item.key, label: t(item.key) };
    if (item.type === 'scroll') {
      return { ...item, ...baseItem };
    }
    // item.type === 'page'
    return { ...item, ...baseItem };
  });

  // Zbytek komponenty (useEffect, scrollToSection) zůstává beze změny
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


  return (
    <>
      {/* Horní informační lišta */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
           <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4" />
              <a href={`tel:${tHeader('phone')}`} className="hover:underline">{tHeader('phone')}</a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${tHeader('email')}`} className="hover:text-blue-200 transition-colors">{tHeader('email')}</a>
            </div>
          </div>
          <div className="text-blue-200 font-medium">{tHeader('slogan')}</div>
        </div>
      </div>

      {/* Hlavní hlavička */}
      <header ref={headerRef} className={cn("sticky top-0 z-50 w-full transition-all duration-300 ease-in-out", isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b" : "bg-background shadow-sm")}>
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="webnamíru.site - Domovská stránka">
            <div className="relative w-[50px] h-[50px]">
              <Image src="/images/logo/logo.svg" alt="webnamíru.site - Logo" fill className="rounded-full object-contain" priority/>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">webnamíru.site</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">{tHeader('logoSubtitle')}</span>
            </div>
          </Link>

          {/* Desktopová navigace */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.type === 'dropdown' ? (
                    <>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items.map((subItem) => ( // Zde už je `item.items` bezpečně dostupné
                            <ListItem key={subItem.label} title={subItem.label} onClick={() => scrollToSection(subItem.target)} href={`/#${subItem.target}`}>
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : item.type === 'scroll' ? (
                    <button onClick={() => scrollToSection(item.target)} className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:outline-none", activeSection === item.target && pathname === '/' && "bg-accent")}>
                      {item.label}
                    </button>
                  ) : ( // item.type === 'page'
                     <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent", pathname.startsWith(item.href) && "bg-accent")}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Tlačítka vpravo */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <InquirySheet
              title={tHeader('inquiryTitle')}
              description={tHeader('inquiryDescription')}
              serviceInfo="Obecná poptávka z hlavičky"
              trigger={ <Button className="h-10 px-6 group">{tHeader('inquiryButton')}<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button> }
            />
          </div>

          {/* Mobilní menu */}
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
                            {item.items.map((subItem) => ( // Zde už je `item.items` bezpečně dostupné
                              <button key={subItem.label} onClick={() => scrollToSection(subItem.target)} className={cn("w-full text-left p-2 rounded-md text-base", activeSection === subItem.target && pathname === '/' ? "bg-accent" : "hover:bg-accent/50")}>
                                {subItem.label}
                              </button>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : item.type === 'scroll' ? (
                      <button key={item.label} onClick={() => scrollToSection(item.target)} className={cn("text-left p-2 rounded-md", activeSection === item.target && pathname === '/' ? "bg-accent" : "hover:bg-accent/50")}>
                        {item.label}
                      </button>
                    ) : ( // item.type === 'page'
                      <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn("block p-2 rounded-md", pathname.startsWith(item.href) ? "bg-accent" : "hover:bg-accent/50")}>
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

// Komponenta ListItem zůstává beze změny
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