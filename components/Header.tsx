// components/header.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

import { siteConfig } from '../lib/site-config';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './ui/sheet';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { navLinks } = siteConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
        isScrolled
          ? 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image
            src="/images/logo/logo.svg" 
            alt="Web Na Míru - Vývoj moderních webových aplikací v Jihlavě" 
            width={160}
            height={40}
            priority
            className="h-auto w-40"
          />
        </Link>

        {/* Desktop Navigace */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            // <-- 3. Vylepšená logika pro aktivní odkaz
            const isActive =
              link.href === '/'
                ? pathname === link.href
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobilní Menu (Sheet) */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Otevřít menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-xs">
              <SheetHeader className="flex-row items-center justify-between">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                  <Image
                    src="/images/logo/logo.svg"
                    alt="Logo Web Na Míru"
                    width={140}
                    height={35}
                  />
                </Link>
                {/* Tlačítko pro zavření je již součástí SheetContent, ale můžeme si ho nastylovat, pokud chceme */}
              </SheetHeader>
              <nav className="mt-8 flex flex-1 flex-col items-start gap-6">
                {navLinks.map((link, index) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === link.href
                      : pathname.startsWith(link.href);

                  return (
                    // <-- 4. Jemná animace pro položky menu
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="w-full"
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={cn(
                          'w-full text-lg font-medium transition-colors hover:text-primary',
                          isActive
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

