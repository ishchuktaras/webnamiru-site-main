"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { addRating } from "@/lib/actions/rating.actions";

// Typ pro props komponenty
interface BlogRatingProps {
  postId: string;
  slug: string; // Slug je potřebný pro efektivní revalidaci
  average: number;
  count: number;
}

// Typ pro stav vrácený ze serverové akce
interface FormState {
  message: string;
}

export default function BlogRating({ postId, slug, average, count }: BlogRatingProps) {
  // Stavy pro interaktivitu a zobrazení
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(average);
  const [ratingCount, setRatingCount] = useState(count);

  // Inicializace serverové akce pomocí hooku useActionState
  const initialState: FormState = { message: "" };
  const [state, formAction, isPending] = useActionState(addRating, initialState);

  // Funkce, která se zavolá po kliknutí na hvězdu
  const handleRatingSubmit = (rating: number) => {
    // Vytvoříme data formuláře pro odeslání do serverové akce
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("slug", slug);
    formData.append("value", rating.toString());
    
    // Spustíme serverovou akci
    formAction(formData);
    
    // Optimisticky aktualizujeme UI, aby uživatel viděl okamžitou odezvu
    if (ratingCount === 0) {
      setCurrentRating(rating);
      setRatingCount(1);
    } else {
      // Vypočítáme nový průměr
      const newAverage = (currentRating * ratingCount + rating) / (ratingCount + 1);
      setCurrentRating(newAverage);
      setRatingCount(ratingCount + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-gray-50 dark:bg-gray-900/50">
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Jak se vám líbil tento článek?</h3>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            aria-label={`Ohodnotit ${star} hvězdičkami`}
            onClick={() => handleRatingSubmit(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={isPending || state?.message.includes("již hodnotili")}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Star
              className={cn(
                "h-8 w-8 transition-colors",
                (hoverRating || Math.round(currentRating)) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              )}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 h-5">
        {ratingCount > 0 ? (
          <span>
            Průměrné hodnocení: <strong>{currentRating.toFixed(1)}/5</strong> ({ratingCount}{" "}
            {ratingCount === 1 ? "hlas" : ratingCount < 5 ? "hlasy" : "hlasů"})
          </span>
        ) : (
          <span>Zatím bez hodnocení. Buďte první!</span>
        )}
      </div>
      {state?.message && (
        <p className={`text-sm font-medium mt-2 ${state.message.includes("Děkujeme") ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
          {state.message}
        </p>
      )}
    </div>
  );
}