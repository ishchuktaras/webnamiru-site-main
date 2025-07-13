// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/actions/post.actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ujistěte se, že máte proměnnou prostředí pro základní URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webnamiru.site';

  // Načtení dynamických stránek (blogových příspěvků)
  const posts = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Seznam statických stránek
  const staticRoutes = [
    '/',
    '/o-mne',
    '/kontakt',
    '/blog',
    '/sluzby/balicky',
    '/sluzby/partnerstvi',
    '/obchodni-podminky',
    '/ochrana-osobnich-udaju',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1.0 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...postEntries,
  ];
}
