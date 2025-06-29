// components/CommentsTable.tsx

"use client";

import { useState, useEffect } from "react";
import { getComments } from "@/app/(main)/comments/actions"; // Importujeme naši novou Server Action
import { type Comment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const COMMENTS_PER_PAGE = 5;

interface CommentsTableProps {
  postId: string;
}

export default function CommentsTable({ postId }: CommentsTableProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreComments = async () => {
    setIsLoading(true);
    const result = await getComments(postId, COMMENTS_PER_PAGE, offset);
    
    if (result.success && result.data) {
      setComments(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        
        // ZMĚNA ZDE: Explicitně definujeme typ pro 'c'
        const newComments = result.data.filter((c: Comment) => !existingIds.has(c.id));
        
        return [...prev, ...newComments];
      });
      setOffset(prev => prev + COMMENTS_PER_PAGE);
      setHasMore(result.hasMore);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMoreComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Komentáře ({comments.length})</h2>
      
      {isLoading && comments.length === 0 ? (
        <p>Načítám komentáře...</p>
      ) : comments.length === 0 ? (
        <p>Zatím žádné komentáře. Buďte první!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold">
                {comment.originalAuthor.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{comment.originalAuthor}</p>
                  <time className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString("cs-CZ")}
                  </time>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreComments} disabled={isLoading} variant="outline">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Načítám...
              </>
            ) : "Načíst další komentáře"}
          </Button>
        </div>
      )}
    </div>
  );
}