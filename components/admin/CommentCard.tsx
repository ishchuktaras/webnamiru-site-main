"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, XCircle, Clock, Mail, User, Calendar, FileText, Eye, MessageSquare } from "lucide-react"
import { approveComment, rejectComment } from "@/app/admin/comments/actions"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

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
  onSelectionChange?: (id: string, selected: boolean) => void
}

export function CommentCard({ comment, onSelectionChange }: CommentCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

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

  const handleSelectionChange = (checked: boolean) => {
    setIsSelected(checked)
    onSelectionChange?.(comment.id, checked)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("cs-CZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).length
  }

  return (
    <Card
      className={`w-full transition-all duration-200 border-0 shadow-lg hover:shadow-xl ${
        comment.approved ? "bg-green-50 border-l-4 border-l-green-500" : "bg-orange-50 border-l-4 border-l-orange-500"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            {!comment.approved && onSelectionChange && (
              <Checkbox checked={isSelected} onCheckedChange={handleSelectionChange} className="mt-1" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg text-slate-800">Komentář k článku: {comment.postId}</CardTitle>
                <Link href={`/blog/${comment.postId}`} target="_blank">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Eye className="w-3 h-3 mr-1" />
                    Zobrazit
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <Badge variant={comment.approved ? "default" : "secondary"} className="gap-1">
                  {comment.approved ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Schváleno
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      Čeká na schválení
                    </>
                  )}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {getWordCount(comment.content)} slov
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Autor</p>
              <p className="font-medium text-slate-800">{comment.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-full">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-800 text-sm">{comment.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-full">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Datum</p>
              <p className="font-medium text-slate-800 text-sm">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Comment Content */}
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-l-slate-300">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">Obsah komentáře</span>
          </div>
          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
        </div>

        {/* Action Buttons */}
        {!comment.approved && (
          <div className="flex gap-3 pt-2">
            <Button onClick={handleApprove} disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              {isLoading ? "Schvaluji..." : "Schválit"}
            </Button>
            <Button onClick={handleReject} disabled={isLoading} variant="destructive" className="flex-1">
              <XCircle className="w-4 h-4 mr-2" />
              {isLoading ? "Mažu..." : "Zamítnout"}
            </Button>
          </div>
        )}

        {comment.approved && (
          <div className="flex justify-center pt-2">
            <Badge variant="default" className="gap-2 px-4 py-2">
              <CheckCircle className="w-4 h-4" />
              Komentář je schválen a zobrazen na webu
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
