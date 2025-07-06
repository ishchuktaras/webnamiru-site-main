// components/LanguageSwitcher.tsx

"use client";

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: string) => {
    // Replace the locale in the pathname (assuming locale is the first segment)
    const segments = pathname.split('/');
    if (segments[1] && ['cs', 'en', 'uk'].includes(segments[1])) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    const newPath = segments.join('/') || '/';
    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Změnit jazyk</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale('cs')}>
          Čeština
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('uk')}>
          Українська
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}