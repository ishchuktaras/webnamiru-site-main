"use client"

import { useEffect, useState, useCallback } from "react"
import { getComments } from "@/app/comments/actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/formatDate"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Import Tooltip components
import { MessageCircle } from "lucide-react" // Import icon

interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: Date
  approved: boolean // Přidáno pro konzistenci, i když filtrujeme na true
}

interface CommentsTableProps {
  postId: string
}

const COMMENTS_PER_LOAD = 5 // Kolik komentářů načíst najednou

export default function CommentsTable({ postId }: CommentsTableProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true) // Indikuje, zda jsou k dispozici další komentáře
  const [offset, setOffset] = useState(0) // Offset pro načítání dalších komentářů

  const fetchComments = useCallback(async () => {
    setLoading(true)
    setError(null)
    const result = await getComments(postId, COMMENTS_PER_LOAD, offset)

    if (result.success && Array.isArray(result.data)) {
      setComments((prevComments) => [...prevComments, ...(result.data as Comment[])])
      setHasMore(result.hasMore)
      setOffset((prevOffset) => prevOffset + result.data.length)
    } else {
      setError(result.error || "An unknown error occurred or data is not an array.")
      setComments([])
      setHasMore(false)
    }
    setLoading(false)
  }, [postId, offset]) // Závislost na offsetu pro načítání dalších

  useEffect(() => {
    // Reset stavu a načtení prvních komentářů při změně postId nebo při prvním načtení
    setComments([])
    setOffset(0)
    setHasMore(true)
    fetchComments()
  }, [postId]) // Závislost pouze na postId pro reset

  const handleLoadMore = () => {
    fetchComments()
  }

  if (loading && comments.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-600" /> Komentáře
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p>Načítám komentáře...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-600" /> Komentáře
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Chyba při načítání komentářů: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-blue-600" /> Komentáře
        </CardTitle>
      </CardHeader>
      <CardContent>
        {comments.length === 0 && !loading ? (
          <p className="text-center text-muted-foreground py-4">Zatím zde nejsou žádné komentáře. Buďte první!</p>
        ) : (
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="w-[120px]">ID Komentáře</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Komentář</TableHead>
                  <TableHead className="text-right">Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                    <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="cursor-help">{comment.id.substring(0, 8)}...</TooltipTrigger>
                          <TooltipContent>
                            <p>{comment.id}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {comment.author}
                      <div className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <Button onClick={handleLoadMore} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? "Načítám..." : "Načíst další komentáře"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
