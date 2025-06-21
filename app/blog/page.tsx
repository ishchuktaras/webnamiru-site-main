"use client" // Označení jako klientský komponent

import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/Footer"
import BlogSearchInput from "@/components/blog-search-input" // Import nového komponentu
import { useState, useMemo } from "react"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrování blogových příspěvků na základě vyhledávacího dotazu
  const filteredBlogPosts = useMemo(() => {
    if (!searchQuery) {
      return blogPosts
    }
    const lowerCaseQuery = searchQuery.toLowerCase()
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery) ||
        post.content.toLowerCase().includes(lowerCaseQuery), // Hledání i v obsahu
    )
  }, [searchQuery])

  return (
    <main className="flex flex-col min-h-[calc(100svh-64px)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Novinky a články</h1>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
            Zde najdete nejnovější články, tipy a postřehy ze světa webdevelopmentu a online marketingu.
          </p>
          <div className="mt-8">
            <BlogSearchInput onSearch={setSearchQuery} /> {/* Vyhledávací pole */}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 flex-grow">
        <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredBlogPosts.length > 0 ? (
            filteredBlogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col shadow-md dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                    {post.author} |{" "}
                    {new Date(post.date).toLocaleDateString("cs-CZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                    href={`/blog/${post.slug}`}
                  >
                    Číst dále
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-xl">
              Nenalezeny žádné blogové příspěvky odpovídající vašemu dotazu.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
