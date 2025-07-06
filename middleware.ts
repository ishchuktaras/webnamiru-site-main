import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Seznam všech podporovaných jazyků
  locales: ['cs', 'en', 'uk'],

  // Výchozí jazyk, pokud není v URL specifikován žádný
  defaultLocale: 'cs'
});

export const config = {
  // Omezíme middleware jen na cesty, které nejsou pro API, obrázky atd.
  matcher: ['/', '/(cs|en|uk)/:path*']
};