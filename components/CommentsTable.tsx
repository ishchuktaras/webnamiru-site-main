"use client"

import { useEffect, useState } from "react"
import { getComments } from "@/app/comments/actions" // Correct import path
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/formatDate" // Import the date formatting utility

interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: Date // Assuming it's a Date object from Prisma
}

interface CommentsTableProps {
  postId: string
}

export default function CommentsTable({ postId }: CommentsTableProps)  {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      setError(null)
      const result = await getComments() // Call without arguments
      console.log("Result from getComments:", result) // Log the result for debugging

      if (result.success && Array.isArray(result.data)) {
        // Explicitly check if data is an array
        setComments(result.data as Comment[])
      } else {
        // If not successful or data is not an array, set an error and clear comments
        setError(result.error || "An unknown error occurred or data is not an array.")
        setComments([]) // Ensure comments is an empty array on error/invalid data
      }
      setLoading(false)
    }

    fetchComments()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p>Loading comments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground">No comments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Post ID</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium truncate max-w-[100px]">
                      {comment.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="truncate max-w-[100px]">{comment.postId.substring(0, 8)}...</TableCell>
                    <TableCell>{comment.author}</TableCell>
                    <TableCell>{comment.email}</TableCell>
                    <TableCell className="truncate max-w-[200px]">{comment.content}</TableCell>
                    <TableCell className="text-right">{formatDate(comment.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
