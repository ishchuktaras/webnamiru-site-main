"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MenuIcon, Phone, Mail, ArrowRight, Handshake, Package, Zap } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

type HeaderProps = {}

import React from "react"

export default function Header({}: HeaderProps): React.JSX.Element {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActivePath = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // === ZMĚNA ZDE: Rozdělení navigačních položek pro snazší vložení dropdownů ===
  const navItemsPart1 = [
    { href: "/", label: "Domů" },
    { href: "/o-mne", label: "O mně" },
    { href: "/pripadove-studie", label: "Případové studie" },
  ];
  
  const navItemsPart2 = [
    { href: "/blog", label: "Blog" },
    { href: "/kontakt", label: "Kontakt" },
  ];
  // === KONEC ZMĚNY ===


  const mobileLinkClasses = "text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group";
  const mobileActiveLinkClasses = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold";


  return (
    <>
      <div className="hidden lg:block bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4" />
              <a href="tel:+420777596216" className="hover:underline">
                +420 777 596 216
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <a href="mailto:poptavka@webnamiru.site" className="hover:text-blue-200 transition-colors">
                poptavka@webnamiru.site
              </a>
            </div>
          </div>
          <div className="text-blue-200 font-medium">🎯 Specializujeme se na Kraj Vysočina</div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b"
            : "bg-white dark:bg-gray-900 shadow-sm",
        )}
      >
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
            href="/"
            aria-label="webnamíru.site - Domovská stránka"
          >
             <div className="relative w-[50px] h-[50px]">
              <Image
                src="/images/logo/logo.svg"
                alt="webnamíru.site - Logo"
                fill
                className="rounded-full object-contain transition-all duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500/20"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                webnamíru.site
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                Strategické weby pro Vysočinu
              </span>
            </div>
          </Link>
          
          {/* === ZMĚNA ZDE: Úprava vykreslování DESKTOPOVÉ navigace === */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Vykreslení první části odkazů */}
              {navItemsPart1.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 relative",
                        isActivePath(item.href) &&
                          "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600 after:rounded-full",
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Vložení dropdownu "Služby" */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                  Služby
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border border-blue-200/50"
                          href="/sluzby/balicky"
                        >
                          <div className="mb-2 mt-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
                            Web na míru
                          </div>
                          <p className="text-sm leading-tight text-blue-700 dark:text-blue-300">
                            Strategické weby, které skutečně vydělávají pro firmy na Vysočině.
                          </p>
                          <ArrowRight className="h-4 w-4 mt-2 text-blue-600" />
                        </Link>
                      </NavigationMenuLink>
                    </div>

                    <div className="space-y-2">
                      <Link href="/sluzby/balicky" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Package className="h-4 w-4" /> Balíčky služeb
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            START, RŮST, EXPANZE - vyberte si podle potřeb.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                      <Link href="/kontakt" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Zap className="h-4 w-4" /> Individuální řešení
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Řešení na míru pro specifické projekty.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Vložení dropdownu "Partnerství" */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                  Partnerství
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                      <Link href="/sluzby/partnerstvi" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Handshake className="h-4 w-4" />
                            Partnerské balíčky
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Výhodné podmínky spolupráce pro kreativce.
                          </p>
                        </NavigationMenuLink>
                      </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Vykreslení druhé části odkazů */}
              {navItemsPart2.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 relative",
                        isActivePath(item.href) &&
                          "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600 after:rounded-full",
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* === KONEC ZMĚNY DESKTOPOVÉ NAVIGACE === */}


          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button
              className="h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
              asChild
            >
              <Link href="/kontakt">
                Nezávazná konzultace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300"
                  aria-label="Otevřít navigační menu"
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
                <div className="flex flex-col gap-4 py-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 px-4">
                    <Image
                      src="/images/logo/logo.svg"
                      width={60}
                      height={36}
                      alt="webnamíru.site Logo"
                      className="rounded-lg"
                    />
                    <div>
                      <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        webnamíru.site
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Strategické weby</div>
                    </div>
                  </div>
                  
                  {/* === ZMĚNA ZDE: Úprava vykreslování MOBILNÍ navigace === */}
                  <nav className="flex flex-col gap-1 px-2"> {/* Přidán padding pro zarovnání s Accordion */}
                    {/* Vykreslení první části odkazů */}
                    {navItemsPart1.map((item) => (
                      <Link
                        key={item.href}
                        className={cn(mobileLinkClasses, isActivePath(item.href) && mobileActiveLinkClasses)}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </nav>

                  {/* Vložení Accordion s dropdowny */}
                  <div className="px-2">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="sluzby">
                        <AccordionTrigger className={cn(mobileLinkClasses, "py-3")}>Služby</AccordionTrigger>
                        <AccordionContent className="pb-1">
                            <Link href="/sluzby/balicky" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => setIsMobileMenuOpen(false)}>
                                <Package className="h-5 w-5 text-blue-600" />
                                <div className="flex flex-col">
                                    <span className="font-medium">Balíčky služeb</span>
                                    <span className="text-sm text-muted-foreground">START, RŮST, EXPANZE</span>
                                </div>
                            </Link>
                            <Link href="/kontakt" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => setIsMobileMenuOpen(false)}>
                                <Zap className="h-5 w-5 text-blue-600" />
                                <div className="flex flex-col">
                                    <span className="font-medium">Individuální řešení</span>
                                    <span className="text-sm text-muted-foreground">Pro specifické projekty</span>
                                </div>
                            </Link>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="partnerstvi">
                        <AccordionTrigger className={cn(mobileLinkClasses, "py-3")}>Partnerství</AccordionTrigger>
                        <AccordionContent className="pb-1">
                           <Link href="/sluzby/partnerstvi" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20" onClick={() => setIsMobileMenuOpen(false)}>
                                <Handshake className="h-5 w-5 text-blue-600" />
                                <div className="flex flex-col">
                                    <span className="font-medium">Partnerské balíčky</span>
                                    <span className="text-sm text-muted-foreground">Pro kreativce</span>
                                </div>
                            </Link>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <nav className="flex flex-col gap-1 px-2"> {/* Přidán padding pro zarovnání s Accordion */}
                    {/* Vykreslení druhé části odkazů */}
                    {navItemsPart2.map((item) => (
                      <Link
                        key={item.href}
                        className={cn(mobileLinkClasses, isActivePath(item.href) && mobileActiveLinkClasses)}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </nav>
                  {/* === KONEC ZMĚNY MOBILNÍ NAVIGACE === */}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 px-4">
                    <Button
                      className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl group"
                      asChild
                    >
                      <Link href="/kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                        Nezávazná konzultace
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}