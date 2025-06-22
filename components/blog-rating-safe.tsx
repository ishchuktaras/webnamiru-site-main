"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface BlogRatingSafeProps {
  postId: string
}

export default function BlogRatingSafe({ postId }: BlogRatingSafeProps) {
  const [averageRating, setAverageRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simplified rating submission without Server Actions
  const handleRatingSubmit = async (rating: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          value: rating,
        }),
      })

      if (response.ok) {
        setUserRating(rating)
        setAverageRating(rating) // Simplified - just show user's rating
        setRatingCount(1)
      } else {
        throw new Error("Failed to submit rating")
      }
    } catch (error) {
      console.error("Rating error:", error)
      setError("Hodnocení se nepodařilo odeslat. Zkuste to prosím později.")
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 space-y-4">
        <h3 className="text-lg font-semibold">Ohodnoťte tento článek</h3>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 space-y-4">
      <h3 className="text-lg font-semibold">Ohodnoťte tento článek</h3>

      {/* Current Rating Display */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {averageRating > 0 ? `${averageRating.toFixed(1)}/5` : "Bez hodnocení"}
          {ratingCount > 0 && ` (${ratingCount} hodnocení)`}
        </span>
      </div>

      {/* User Rating Input */}
      {!userRating && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">Vaše hodnocení:</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingSubmit(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={isLoading}
                className="p-1 hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                  }`}
                />
              </button>
            ))}
          </div>
          {isLoading && <p className="text-sm text-gray-500">Odesílám hodnocení...</p>}
        </div>
      )}

      {/* Success Message */}
      {userRating > 0 && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm">Děkujeme za vaše hodnocení!</span>
        </div>
      )}
    </div>
  )
}
