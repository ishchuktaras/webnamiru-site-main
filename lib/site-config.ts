// lib/site-config.ts

/**
 * Definuje typ pro navigační odkaz.
 * @property {string} href - Cílová URL adresa odkazu.
 * @property {string} label - Text, který se zobrazí uživateli.
 */
interface NavLink {
  href: string;
  label: string;
}

/**
 * Hlavní konfigurační objekt webu.
 * Obsahuje centralizovaná data, jako jsou navigační odkazy,
 * aby se snadno spravovala z jednoho místa.
 */
export const siteConfig: {
  navLinks: NavLink[];
} = {
  navLinks: [
    { href: '/', label: 'Služby' },
    { href: '/pripadove-studie', label: 'Případové studie' },
    { href: '/o-mne', label: 'O mně' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
};