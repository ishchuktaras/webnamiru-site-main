import createNextIntlPlugin from 'next-intl/plugin';
 
// Předejte cestu k vašemu konfiguračnímu souboru
const withNextIntl = createNextIntlPlugin('./i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);