// lib/types.ts

import { Post, User, Category, Tag } from '@prisma/client';

// Tento typ přesně popisuje, jak vypadá objekt článku,
// když ho načteme z databáze se všemi detaily.
export type PostWithDetails = Post & {
  author: User;
  category: Category | null;
  tags: Tag[];
};