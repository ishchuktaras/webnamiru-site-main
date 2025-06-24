"use client";

import { z } from "zod";

// Definujeme schéma pro ukládané preference, abychom měli jistotu, co ukládáme.
export const cookieConsentSchema = z.object({
  necessary: z.literal(true), // Nezbytné cookies jsou vždy povoleny
  analytics: z.boolean(),
  marketing: z.boolean(),
});

// Typ odvozený od schématu
export type CookieConsent = z.infer<typeof cookieConsentSchema>;

/**
 * Získá hodnotu cookie podle názvu z document.cookie.
 * @param name Název cookie
 * @returns Hodnota cookie jako string, nebo null, pokud neexistuje.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null; // Na straně serveru cookies nejsou dostupné
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

/**
 * Nastaví cookie v prohlížeči.
 * @param name Název cookie
 * @param value Hodnota pro uložení
 * @param days Doba platnosti ve dnech
 */
export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") {
    return;
  }
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  // Nastavíme cookie s cestou pro celý web a bezpečnostním atributem SameSite=Lax
  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Lax`;
}

/**
 * Získá a bezpečně parsuje preference souhlasu z cookie.
 * @returns Objekt s preferencemi (CookieConsent) nebo null, pokud cookie neexistuje nebo je neplatná.
 */
export function getCookieConsent(): CookieConsent | null {
    const cookie = getCookie("cookie_consent");
    if (!cookie) {
      return null;
    }

    try {
        const preferences = JSON.parse(cookie);
        // Ověříme, zda data v cookie odpovídají našemu schématu
        const parsed = cookieConsentSchema.safeParse(preferences);
        if (parsed.success) {
            return parsed.data;
        }
        // Pokud data neodpovídají, cookie je neplatná
        console.warn("Invalid cookie consent data:", parsed.error);
        return null;
    } catch (e) {
        console.error("Failed to parse cookie consent:", e);
        return null;
    }
}
