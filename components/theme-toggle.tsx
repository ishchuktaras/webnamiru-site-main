// components/theme-toggle.tsx

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  // Použijeme hook z knihovny next-themes
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Zobrazí ikonu slunce pro světlý režim */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Zobrazí ikonu měsíce pro tmavý režim */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Přepnout motiv</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Světlý
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Tmavý
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Systém
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}