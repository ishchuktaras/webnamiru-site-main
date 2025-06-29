// components/blog-rating-safe.tsx

"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { addRating } from "@/app/(main)/ratings/actions"; // Používáme naši funkční Server Action

// Změna názvu props pro lepší srozumitelnost
interface BlogRatingSafeProps {
  postId: string;
  initialAverage: number;
  initialCount: number;
}

export default function BlogRatingSafe({ postId, initialAverage, initialCount }: BlogRatingSafeProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  // ZMĚNA: Stavy se nyní inicializují z props načtených na serveru
  const [averageRating, setAverageRating] = useState(initialAverage);
  const [ratingCount, setRatingCount] = useState(initialCount);

  const initialState = { message: "" };
  const [state, formAction, isPending] = useActionState(addRating, initialState);

  const handleRatingSubmit = (rating: number) => {
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("value", rating.toString());
    formAction(formData);

    // Optimistická aktualizace UI pro okamžitou zpětnou vazbu
    setAverageRating((averageRating * ratingCount + rating) / (ratingCount + 1));
    setRatingCount(ratingCount + 1);
  };
  
  // Efekt pro zobrazení zprávy o úspěchu/chybě
  useEffect(() => {
    if (state?.message) {
      // Zde můžeš v budoucnu použít toast notifikaci, pokud budeš chtít
      console.log("Výsledek akce:", state.message);
    }
  }, [state]);

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
            className="p-1 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors",
                (hoverRating || averageRating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {averageRating > 0 ? (
          <span>
            {averageRating.toFixed(1)}/5 ({ratingCount}{" "}
            {ratingCount === 1 ? "hodnocení" : "hodnocení"})
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