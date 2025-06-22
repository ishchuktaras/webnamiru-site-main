"use client"

import { useState, useEffect, useTransition } from "react"
import { Star } from "lucide-react"
import { addRating, getAverageRating } from "@/app/ratings/actions"

interface BlogRatingProps {
  postId: string
}

export default function BlogRating({ postId }: BlogRatingProps) {
  const [averageRating, setAverageRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [message, setMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchRating = async () => {
      const { average, count } = await getAverageRating(postId)
      setAverageRating(average)
      setRatingCount(count)
    }
    fetchRating()
  }, [postId])

  const handleRatingSubmit = async (rating: number) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append("postId", postId)
        formData.append("value", rating.toString())

        // Správný initial state objekt
        const initialState = { message: "", errors: {} }
        const result = await addRating(initialState, formData)

        if (result.message && !result.errors) {
          // Úspěch
          setMessage("Děkujeme za vaše hodnocení!")
          setUserRating(rating)

          // Refresh rating after submission
          const { average, count } = await getAverageRating(postId)
          setAverageRating(average)
          setRatingCount(count)
        } else {
          // Chyba
          setMessage(result.message || "Došlo k chybě při odesílání hodnocení.")
        }
      } catch (error) {
        setMessage("Došlo k chybě při odesílání hodnocení.")
        console.error("Rating submission error:", error)
      }
    })
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
          {ratingCount > 0 && ` (${ratingCount} ${ratingCount === 1 ? "hodnocení" : "hodnocení"})`}
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
                disabled={isPending}
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
          {isPending && <p className="text-sm text-gray-500">Odesílám hodnocení...</p>}
        </div>
      )}

      {/* Success Message */}
      {userRating > 0 && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm">Děkujeme za vaše hodnocení!</span>
        </div>
      )}

      {/* Message */}
      {message && !userRating && (
        <p className="text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  )
}
