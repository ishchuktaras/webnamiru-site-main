// next-auth.d.ts

import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client"; // Importujeme enum Role z Prisma klienta

declare module "next-auth" {
  /**
   * Rozšíření základního User modelu z next-auth
   */
  interface User {
    role?: Role;
  }

  /**
   * Rozšíření session objektu, abychom měli přístup k id a roli
   */
  interface Session {
    user: {
      id: string;
      role?: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Rozšíření JWT tokenu */
  interface JWT {
    role?: Role;
    id: string;
  }
}