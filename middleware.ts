// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
// Middleware volá NextAuth POUZE s edge-safe konfigurací
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/admin/:path*'],
};