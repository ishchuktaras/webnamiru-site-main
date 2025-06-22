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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MenuIcon,
  Phone,
  Mail,
  ArrowRight,
  Users,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const scrollToSection = (sectionId: string) => {
    // Pouze pokud jsme na hlavní stránce
    if (pathname === "/") {
      const element = document.querySelector(`[data-section="${sectionId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Pokud nejsme na hlavní stránce, přejdeme tam
      window.location.href = `/#${sectionId}`;
    }
  };

  const navigationItems = [
    { href: "/", label: "Domů" },
    { href: "/o-mne", label: "O mně" },
    { href: "/pripadove-studie", label: "Případové studie" },
    { href: "/kontakt", label: "Kontakt" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      {/* Top bar s kontaktními informacemi */}
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
              <a
                href="mailto:poptavka@webnamiru.site"
                className="hover:text-blue-200 transition-colors"
              >
                poptavka@webnamiru.site
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:partnerstvi@webnamiru.site"
                className="hover:text-blue-200 transition-colors"
              >
                partnerstvi@webnamiru.site
              </a>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:tech-podpora@webnamiru.site"
                className="hover:text-blue-200 transition-colors"
              >
                tech-podpora@webnamiru.site
              </a>
            </div>
          </div>
          <div className="text-blue-200 font-medium">
            🎯 Specializujeme se na Kraj Vysočina
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b"
            : "bg-white dark:bg-gray-900 shadow-sm"
        )}
      >
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
            href="/"
            aria-label="webnamíru - Domovská stránka"
          >
            <div className="relative">
              <Image
                src="/images/logo/logo.svg"
                width={50}
                height={50}
                alt="webnamíru - Logo"
                className="rounded-full transition-all duration-200 group-hover:shadow-lg group-hover:ring-2 group-hover:ring-blue-500/20"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                webnamíru
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                Strategické weby pro Vysočinu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 relative",
                        isActivePath(item.href) &&
                          "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-blue-600 after:rounded-full"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              {/* Services dropdown */}
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
                          href="/sluzby"
                        >
                          <div className="mb-2 mt-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
                            Web na míru
                          </div>
                          <p className="text-sm leading-tight text-blue-700 dark:text-blue-300">
                            Strategické weby, které skutečně vydělávají pro
                            firmy na Vysočině.
                          </p>
                          <ArrowRight className="h-4 w-4 mt-2 text-blue-600" />
                        </Link>
                      </NavigationMenuLink>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <Link href="/sluzby/balicky" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                            <div className="text-sm font-medium leading-none flex items-center gap-2">
                              📦 Balíčky služeb
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              START, RŮST, EXPANZE - vyberte si podle potřeb.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </div>

                      <div>
                        <Link href="/kontakt" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                            <div className="text-sm font-medium leading-none">
                              ⚡ Individuální řešení
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Řešení na míru pro specifické projekty.
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Partnership dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                  Partnerství
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="space-y-2">
                      <div>
                        <Link
                          href="/sluzby/partnerstvi"
                          legacyBehavior
                          passHref
                        >
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

                      <div>
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200 cursor-pointer"
                          onClick={() => scrollToSection("partners")}
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Naši partneři
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Připojte se k našim partnerům a klientům.
                          </p>
                        </NavigationMenuLink>
                      </div>

                      <div>
                        <Link href="/partners-section" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 border border-transparent hover:border-blue-200">
                            <div className="text-sm font-medium leading-none flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Kontakt pro partnery
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              partnerstvi@webnamiru.site
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button for Desktop */}
          <Button
            className="hidden lg:inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 group"
            asChild
          >
            <Link href="/kontakt">
              Nezávazná konzultace
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300"
                aria-label="Otevřít navigační menu"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <Image
                    src="/placeholder-logo.png"
                    width={40}
                    height={40}
                    alt="webnamíru Logo"
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      webnamíru
                    </div>
                    <div className="text-sm text-gray-600">
                      Strategické weby
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      className={cn(
                        "text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group",
                        isActivePath(item.href) &&
                          "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold"
                      )}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </Link>
                  ))}

                  {/* Služby sekce */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-sm font-semibold text-gray-500 px-4 py-2 uppercase tracking-wide">
                      Služby
                    </div>

                    <Link
                      className="text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      href="/sluzby/balicky"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      📦 Balíčky služeb
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </Link>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("service-packages-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      ⚡ Individuální řešení
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Partnerství sekce */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-sm font-semibold text-gray-500 px-4 py-2 uppercase tracking-wide">
                      Partnerství
                    </div>

                    <Link
                      className="text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      href="/sluzby/partnerstvi"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Handshake className="h-4 w-4" />
                        Partnerské balíčky
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </Link>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("partners-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Naši partneři
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("partners-packages-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Partnerské balíčky (sekce)
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Rychlé odkazy na sekce */}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="text-sm font-semibold text-gray-500 px-4 py-2 uppercase tracking-wide">
                      Rychlé odkazy
                    </div>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("hero-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      🎯 Úvod
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("problem-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      ❓ Problém
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("solution-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      ✅ Řešení
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("process-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      🔄 Proces
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      className="w-full text-left text-lg font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-between group"
                      onClick={() => {
                        scrollToSection("testimonials-section");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      💬 Reference
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </nav>

                {/* Mobile CTA and Contact */}
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Button
                    className="w-full inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl group"
                    asChild
                  >
                    <Link
                      href="/kontakt"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Nezávazná konzultace
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <a
                        href="tel:+420777596216"
                        className="hover:text-blue-600 transition-colors"
                      >
                        +420 777 596 216
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <a
                        href="mailto:poptavka@webnamiru.site"
                        className="hover:text-blue-600 transition-colors"
                      >
                        poptavka@webnamiru.site
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <a
                        href="mailto:partnerstvi@webnamiru.site"
                        className="hover:text-blue-600 transition-colors"
                      >
                        partnerstvi@webnamiru.site
                      </a>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <a
                        href="mailto:tech-podpora@webnamiru.site"
                        className="hover:text-blue-600 transition-colors"
                      >
                        tech-podpora@webnamiru.site
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
