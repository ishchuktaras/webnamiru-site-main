"use client"

import { useState, useEffect } from "react"
import { AdminAuth } from "@/components/admin/AdminAuth"
import { CommentCard } from "@/components/admin/CommentCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getAllComments, bulkApproveComments } from "./actions"
import {
  MessageSquare,
  Clock,
  CheckCircle,
  Users,
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ArrowLeft,
} from "lucide-react"
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

export default function AdminCommentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [filteredComments, setFilteredComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterBy, setFilterBy] = useState("all")

  useEffect(() => {
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

  useEffect(() => {
    filterAndSortComments()
  }, [comments, searchTerm, sortBy, filterBy])

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

  const filterAndSortComments = () => {
    let filtered = [...comments]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (comment) =>
          comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.postId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((comment) => {
        if (filterBy === "approved") return comment.approved
        if (filterBy === "pending") return !comment.approved
        return true
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "author":
          return a.author.localeCompare(b.author)
        default:
          return 0
      }
    })

    setFilteredComments(filtered)
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
  const todayComments = comments.filter((c) => {
    const today = new Date()
    const commentDate = new Date(c.createdAt)
    return commentDate.toDateString() === today.toDateString()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Správa komentářů
              </h1>
              <p className="text-slate-600 mt-2 text-lg">Moderujte a spravujte diskuze na vašem webu</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              {comments.length} celkem
            </Badge>
            <Button onClick={handleLogout} variant="outline">
              Odhlásit se
            </Button>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-200" />
                <div>
                  <p className="text-2xl font-bold">{comments.length}</p>
                  <p className="text-sm text-blue-100">Celkem komentářů</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-200" />
                <div>
                  <p className="text-2xl font-bold">{pendingComments.length}</p>
                  <p className="text-sm text-orange-100">Čeká na schválení</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <div>
                  <p className="text-2xl font-bold">{approvedComments.length}</p>
                  <p className="text-sm text-green-100">Schváleno</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-200" />
                <div>
                  <p className="text-2xl font-bold">{new Set(comments.map((c) => c.email)).size}</p>
                  <p className="text-sm text-purple-100">Unikátní autoři</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-pink-200" />
                <div>
                  <p className="text-2xl font-bold">{todayComments.length}</p>
                  <p className="text-sm text-pink-100">Dnes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-200" />
                <div>
                  <p className="text-2xl font-bold">
                    {comments.length > 0 ? Math.round((approvedComments.length / comments.length) * 100) : 0}%
                  </p>
                  <p className="text-sm text-yellow-100">Míra schválení</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtry a vyhledávání
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Hledat podle autora, emailu, obsahu nebo článku..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrovat podle stavu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všechny komentáře</SelectItem>
                  <SelectItem value="pending">Čeká na schválení</SelectItem>
                  <SelectItem value="approved">Schválené</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Řadit podle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Nejnovější</SelectItem>
                  <SelectItem value="oldest">Nejstarší</SelectItem>
                  <SelectItem value="author">Podle autora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Načítání komentářů...</p>
          </div>
        ) : (
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Čeká ({pendingComments.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Schváleno ({approvedComments.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Všechny ({filteredComments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingComments.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Hromadné akce
                    </CardTitle>
                    <CardDescription>Vyberte komentáře a proveďte hromadnou akci</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button
                      onClick={handleBulkApprove}
                      disabled={selectedComments.length === 0}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Schválit vybrané ({selectedComments.length})
                    </Button>
                    <Button variant="outline" disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </CardContent>
                </Card>
              )}

              {filteredComments.filter((c) => !c.approved).length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <p className="text-xl font-medium text-slate-700">Žádné komentáře nečekají na schválení</p>
                    <p className="text-slate-500 mt-2">Všechny komentáře jsou zpracované! 🎉</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredComments
                    .filter((c) => !c.approved)
                    .map((comment) => (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        onSelectionChange={(id, selected) => {
                          if (selected) {
                            setSelectedComments((prev) => [...prev, id])
                          } else {
                            setSelectedComments((prev) => prev.filter((cId) => cId !== id))
                          }
                        }}
                      />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {filteredComments.filter((c) => c.approved).length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <MessageSquare className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <p className="text-xl font-medium text-slate-700">Žádné schválené komentáře</p>
                    <p className="text-slate-500 mt-2">Schválené komentáře se zobrazí zde</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredComments
                    .filter((c) => c.approved)
                    .map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {filteredComments.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="text-center py-12">
                    <Search className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <p className="text-xl font-medium text-slate-700">
                      {searchTerm ? "Žádné výsledky" : "Žádné komentáře"}
                    </p>
                    <p className="text-slate-500 mt-2">
                      {searchTerm ? "Zkuste změnit vyhledávací kritéria" : "Komentáře se zobrazí zde po jejich přidání"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredComments.map((comment) => (
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
