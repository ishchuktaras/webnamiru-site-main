import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Seznam všech podporovaných jazyků
const locales = ['cs', 'en', 'uk'];

export default getRequestConfig(async ({locale}) => {
  // Zkontroluje, zda je jazyk v URL podporován
  if (typeof locale !== 'string' || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});