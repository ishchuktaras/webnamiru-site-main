// app/[locale]/(admin)/admin/comments/page.tsx

import prisma from "@/lib/prisma";
import CommentCard from "@/components/admin/CommentCard"; // Používame default import
import { approveComment, deleteComment } from '@/lib/actions/commentActions';

export const dynamic = 'force-dynamic';

async function getComments() {
  return await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { post: { select: { title: true } } },
  });
}

export default async function CommentsPage() {
  const comments = await getComments();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Správa komentárov</h1>
      <div className="space-y-4">
        {comments.map(comment => (
          <CommentCard 
            key={comment.id}
            comment={comment} // Predávame celý objekt priamo, ako príde z databázy
            approveAction={approveComment} 
            deleteAction={deleteComment} 
          />
        ))}
        {comments.length === 0 && (
            <p className="text-gray-500">Žiadne komentáre na zobrazenie.</p>
        )}
      </div>
    </div>
  );
}