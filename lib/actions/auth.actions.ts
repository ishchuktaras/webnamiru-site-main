// lib/actions/auth.actions.ts
"use server";

import { signIn, signOut } from '@/auth';
import AuthError from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: "/admin",
    });
    return undefined;
  } catch (error) {
    if (
      error instanceof AuthError ||
      (typeof error === "object" && error !== null && "type" in error)
    ) {
      const err = error as { type?: string };
      switch (err.type) {
        case "CredentialsSignin":
          return "Nesprávné přihlašovací údaje.";
        default:
          return "Něco se pokazilo. Zkuste to prosím znovu.";
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: '/login' });
}