// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Přesměrovat nepřihlášené uživatele na login stránku
      }
      return true;
    },
    // Ostatní callbacky (jwt, session) zde nepotřebujeme, budou v hlavním souboru
  },
  providers: [], // Vždy prázdné, aby se nenačítaly v middleware
} satisfies NextAuthConfig;