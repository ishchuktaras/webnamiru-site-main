// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/actions/post.actions';

// Definice typu pro Blogový příspěvek, aby TypeScript věděl, co 'slug' a 'updatedAt' jsou
// Přizpůsobte tento typ vaší skutečné struktuře dat z Prisma/databáze
interface BlogPost {
  slug: string;
  updatedAt: Date | string; // Předpokládáme, že updatedAt je Date nebo string, který lze převést na Date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://webnamiru.site';

  // Načtení dynamických stránek (blogových příspěvků)
  // Explicitně typujeme výsledek getPublishedPosts
  const posts: BlogPost[] = await getPublishedPosts(); 
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({ // Změna na 'post' a explicitní typ
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    changeFrequency: 'weekly', 
    priority: 0.8,
  }));

  // Seznam statických stránek
  // Abychom se vyhnuli problémům s typy, budeme vytvářet pole objektů přímo s očekávanými literály.
  const staticRoutes: MetadataRoute.Sitemap = [
    { 
      url: `${baseUrl}/`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'daily', 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/o-mne`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/kontakt`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'weekly', 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/blog`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'daily', 
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/sluzby/balicky`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'monthly', 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/sluzby/partnerstvi`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'monthly', 
      priority: 0.7 
    },
    { 
      url: `${baseUrl}/obchodni-podminky`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'yearly', 
      priority: 0.4 
    },
    { 
      url: `${baseUrl}/ochrana-osobnich-udaju`, 
      lastModified: new Date().toISOString(), 
      changeFrequency: 'yearly', 
      priority: 0.4 
    },
    
    { url: `${baseUrl}/sluzby`, lastModified: new Date().toISOString(), changeFrequency: 'monthly', priority: 0.8 }, 
    { url: `${baseUrl}/pripadove-studie`, lastModified: new Date().toISOString(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  return [
    ...staticRoutes, 
    ...postEntries,
  ];
}