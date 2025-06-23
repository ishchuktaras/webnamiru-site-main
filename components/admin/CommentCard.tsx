"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, Mail, User, Calendar } from "lucide-react"
import { approveComment, rejectComment } from "@/app/admin/comments/actions"
import { toast } from "@/hooks/use-toast"

interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  approved: boolean
  createdAt: Date
}

interface CommentCardProps {
  comment: Comment
}

export function CommentCard({ comment }: CommentCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)
    try {
      const result = await approveComment(comment.id)
      if (result.success) {
        toast({
          title: "Úspěch",
          description: result.message,
        })
      } else {
        toast({
          title: "Chyba",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nastala neočekávaná chyba.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    if (!confirm("Opravdu chcete tento komentář smazat? Tato akce je nevratná.")) {
      return
    }

    setIsLoading(true)
    try {
      const result = await rejectComment(comment.id)
      if (result.success) {
        toast({
          title: "Úspěch",
          description: result.message,
        })
      } else {
        toast({
          title: "Chyba",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nastala neočekávaná chyba.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Komentář k článku: {comment.postId}</CardTitle>
          <Badge variant={comment.approved ? "default" : "secondary"}>
            {comment.approved ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Schváleno
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Čeká na schválení
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{comment.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{comment.email}</span>
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(comment.createdAt).toLocaleString("cs-CZ")}</span>
          </div>
        </div>

        <Separator />

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm leading-relaxed">{comment.content}</p>
        </div>

        {!comment.approved && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleApprove} disabled={isLoading} className="flex-1" variant="default">
              <CheckCircle className="w-4 h-4 mr-2" />
              Schválit
            </Button>
            <Button onClick={handleReject} disabled={isLoading} className="flex-1" variant="destructive">
              <XCircle className="w-4 h-4 mr-2" />
              Zamítnout
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
