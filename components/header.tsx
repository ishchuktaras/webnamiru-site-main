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
import { MenuIcon } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/placeholder-logo.png" width={40} height={40} alt="Web na míru Logo" className="rounded-full" />
        <span className="text-lg font-bold text-black dark:text-gray-50">Web na míru</span>
      </Link>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Domů</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/o-mne" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>O mně</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Služby</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="#"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">Web na míru</div>
                      <p className="text-sm leading-tight text-muted-foreground">Strategické weby, které vydělávají.</p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <NavigationMenuItem>
                  <Link href="/sluzby/balicky" legacyBehavior passHref>
                    <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md p-3 no-underline outline-none focus:shadow-md hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Balíčky služeb</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Přehled našich balíčků START, RŮST, EXPANZE.
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="#contact-form" legacyBehavior passHref>
                    <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md p-3 no-underline outline-none focus:shadow-md hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium leading-none">Individuální řešení</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Řešení na míru pro specifické projekty.
                      </p>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pripadove-studie" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Případové studie</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/kontakt" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Kontakt</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* CTA Button for Desktop */}
      <Button
        className="hidden lg:inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
        asChild // Přidáno pro správné chování Linku
      >
        <Link href="/kontakt">Kontaktujte nás</Link>
      </Button>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 py-6">
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/">
              Domů
            </Link>
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/o-mne">
              O mně
            </Link>
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/sluzby/balicky">
              Služby
            </Link>
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/blog">
              Blog
            </Link>
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/pripadove-studie">
              Případové studie
            </Link>
            <Link className="text-lg font-medium hover:text-gray-900 dark:hover:text-gray-50" href="/kontakt">
              Kontakt
            </Link>
            <Button
              className="mt-4 w-full inline-flex h-10 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              asChild // Přidáno pro správné chování Linku
            >
              <Link href="/kontakt">Kontaktujte nás</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
