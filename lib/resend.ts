// lib/resend.ts
import { Resend } from 'resend';

// Zkontrolujeme klíč hned při startu aplikace
if (!process.env.RESEND_API_KEY) {
  console.error("FATAL ERROR: RESEND_API_KEY is not defined in environment variables.");
  // V produkci by to mohlo shodit aplikaci, což je správně, protože bez klíče nemůže fungovat.
  // V developmentu jen varujeme.
  if (process.env.NODE_ENV === 'production') {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
}

export const resend = new Resend(process.env.RESEND_API_KEY);