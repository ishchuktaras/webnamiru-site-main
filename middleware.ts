// middleware.ts

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['cs', 'en', 'uk'],
  defaultLocale: 'cs',
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(cs|en|uk)/:path*']
};