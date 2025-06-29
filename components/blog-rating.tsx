// components/blog-rating.tsx

"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addRating } from "@/app/(main)/ratings/actions"; // Importujeme naši novou Server Action

interface BlogRatingProps {
  postId: string;
  average: number;
  count: number;
}

export default function BlogRating({ postId, average, count }: BlogRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(average);
  const [ratingCount, setRatingCount] = useState(count);

  const initialState = { message: "" };
  const [state, formAction, isPending] = useActionState(addRating, initialState);

  const handleRatingSubmit = (rating: number) => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("value", rating.toString());
    formAction(formData);
    
    // Optimisticky aktualizujeme UI
    if (ratingCount === 0) {
      setCurrentRating(rating);
      setRatingCount(1);
    } else {
      setCurrentRating((currentRating * ratingCount + rating) / (ratingCount + 1));
      setRatingCount(ratingCount + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h3 className="font-semibold text-lg">Ohodnoťte tento článek</h3>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingSubmit(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={isPending || state?.message?.includes("již hodnotili")}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors",
                (hoverRating || currentRating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {currentRating > 0 ? (
          <span>
            {currentRating.toFixed(1)}/5 ({ratingCount}{" "}
            {ratingCount === 1 ? "hodnocení" : ratingCount < 5 ? "hodnocení" : "hodnocení"})
          </span>
        ) : (
          <span>Zatím bez hodnocení</span>
        )}
      </div>
      {state?.message && (
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          {state.message}
        </p>
      )}
    </div>
  );
}