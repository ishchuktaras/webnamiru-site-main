// components/admin/CommentCard.tsx

"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Comment as PrismaComment, Post } from "@prisma/client";
import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

// Definuje typ pre komentár s pripojeným názvom článku
type CommentWithPost = PrismaComment & { post: { title: string } };

// Definuje props, ktoré komponent očakáva
interface CommentCardProps {
  comment: CommentWithPost;
  approveAction: (commentId: string) => Promise<void>;
  deleteAction: (commentId: string) => Promise<void>;
}

export function CommentCard({ comment, approveAction, deleteAction }: CommentCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    startTransition(async () => {
      await approveAction(comment.id);
      toast.success("Komentár bol schválený.");
    });
  };

  const handleDelete = () => {
    if (!confirm("Naozaj chcete tento komentár zmazať?")) return;
    startTransition(async () => {
      await deleteAction(comment.id);
      toast.warning("Komentár bol zmazaný.");
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{comment.originalAuthor}</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              K článku: "{comment.post.title}" | {new Date(comment.createdAt).toLocaleString('cs-CZ')}
            </CardDescription>
          </div>
          <Badge variant={comment.approved ? "default" : "secondary"}>
            {comment.approved ? "Schválené" : "Čaká na schválenie"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {!comment.approved && (
            <Button size="sm" onClick={handleApprove} disabled={isPending} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              {isPending ? "Schvaľujem..." : "Schváliť"}
            </Button>
        )}
        <Button size="sm" variant="destructive" onClick={handleDelete} disabled={isPending}>
          <XCircle className="w-4 h-4 mr-2" />
          {isPending ? "Mažem..." : "Zmazať"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Export ako default pre konzistenciu
export default CommentCard;