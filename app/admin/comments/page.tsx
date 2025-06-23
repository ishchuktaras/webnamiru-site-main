"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { CommentCard } from "@/components/admin/CommentCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllComments, bulkApproveComments } from "./actions"
import { MessageSquare, Clock, CheckCircle, Users } from "lucide-react"
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

export default function AdminCommentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComments, setSelectedComments] = useState<string[]>([])

  useEffect(() => {
    // Zkontroluj autentizaci
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadComments()
    }
  }, [isAuthenticated])

  const loadComments = async () => {
    setLoading(true)
    try {
      const result = await getAllComments()
      if (result.success) {
        setComments(result.data)
      } else {
        toast({
          title: "Chyba",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst komentáře.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBulkApprove = async () => {
    if (selectedComments.length === 0) {
      toast({
        title: "Upozornění",
        description: "Nejsou vybrány žádné komentáře.",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await bulkApproveComments(selectedComments)
      if (result.success) {
        toast({
          title: "Úspěch",
          description: result.message,
        })
        setSelectedComments([])
        loadComments()
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
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  const pendingComments = comments.filter((c) => !c.approved)
  const approvedComments = comments.filter((c) => c.approved)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Správa komentářů</h1>
            <p className="text-muted-foreground mt-2">Schvalujte a spravujte komentáře na vašem webu</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Odhlásit se
          </Button>
        </div>

        {/* Statistiky */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{comments.length}</p>
                  <p className="text-sm text-muted-foreground">Celkem komentářů</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{pendingComments.length}</p>
                  <p className="text-sm text-muted-foreground">Čeká na schválení</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{approvedComments.length}</p>
                  <p className="text-sm text-muted-foreground">Schváleno</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{new Set(comments.map((c) => c.email)).size}</p>
                  <p className="text-sm text-muted-foreground">Unikátní autoři</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Načítání komentářů...</p>
          </div>
        ) : (
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Čeká na schválení ({pendingComments.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Schváleno ({approvedComments.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Všechny ({comments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingComments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hromadné akce</CardTitle>
                    <CardDescription>Vyberte komentáře a proveďte hromadnou akci</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleBulkApprove} disabled={selectedComments.length === 0}>
                      Schválit vybrané ({selectedComments.length})
                    </Button>
                  </CardContent>
                </Card>
              )}

              {pendingComments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Žádné komentáře nečekají na schválení</p>
                    <p className="text-muted-foreground">Všechny komentáře jsou zpracované!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingComments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedComments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Žádné schválené komentáře</p>
                    <p className="text-muted-foreground">Schválené komentáře se zobrazí zde</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {approvedComments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {comments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Žádné komentáře</p>
                    <p className="text-muted-foreground">Komentáře se zobrazí zde po jejich přidání</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
