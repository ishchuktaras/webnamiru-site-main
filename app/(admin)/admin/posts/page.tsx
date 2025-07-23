// app/admin/posts/page.tsx

import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit } from "lucide-react";
import DeletePostButton from "@/components/admin/DeletePostButton";

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, author: true },
  });
  return posts;
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Správa článků</h1>
          <p className="text-gray-500 dark:text-gray-400">Zde můžete spravovat veškerý obsah vašeho blogu.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Vytvořit nový článek
          </Link>
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Název článku</TableHead>
              <TableHead>Stav</TableHead>
              <TableHead>Kategorie</TableHead>
              <TableHead>Datum vytvoření</TableHead>
              <TableHead className="text-right">Akce</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {post.title}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Publikováno" : "Koncept"}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-gray-600 dark:text-gray-300">{post.category?.name || 'N/A'}</TableCell>
                
                <TableCell className="text-gray-600 dark:text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString("cs-CZ")}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/posts/edit/${post.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeletePostButton postId={post.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}