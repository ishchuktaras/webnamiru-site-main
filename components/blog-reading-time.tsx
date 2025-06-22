import { Clock } from "lucide-react"

interface BlogReadingTimeProps {
  readingTime: number
  className?: string
}

export default function BlogReadingTime({ readingTime, className = "" }: BlogReadingTimeProps) {
  return (
    <div className={`flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <Clock className="h-4 w-4" />
      <span>{readingTime} min čtení</span>
    </div>
  )
}
