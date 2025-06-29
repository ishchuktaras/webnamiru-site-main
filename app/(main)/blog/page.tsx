"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  blogPosts,
  blogCategories,
  getPostsByCategory,
  searchPosts,
} from "@/lib/blog-data";
import BlogSearchInput from "@/components/blog-search-input";
import BlogCategoryFilter from "@/components/blog-category-filter";
import BlogReadingTime from "@/components/blog-reading-time";
import BlogTags from "@/components/blog-tags";
import BlogNewsletter from "@/components/blog-newsletter";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Calculate post counts per category
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogCategories.forEach((category) => {
      counts[category.slug] = getPostsByCategory(category.slug).length;
    });
    return counts;
  }, []);

  // Filter posts based on search, category, and tags
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Apply search filter
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      posts = posts.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      );
    }

    // Sort by date (newest first)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [searchQuery, selectedCategory, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Blog o webdevelopmentu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Praktické tipy, návody a poznatky ze světa tvorby webů. Od strategie
            po technickou realizaci.
          </p>

          {/* Search */}
          <div className="mb-8">
            <BlogSearchInput onSearch={setSearchQuery} />
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 &&
          !searchQuery &&
          !selectedCategory &&
          selectedTags.length === 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Doporučené články</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <Card
                    key={post.slug}
                    className="group hover:shadow-lg transition-shadow border-2 border-blue-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" className="bg-blue-600">
                          Doporučeno
                        </Badge>
                        <BlogReadingTime readingTime={post.readingTime} />
                      </div>
                      <CardTitle className="text-xl leading-tight">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {post.author} •{" "}
                        {new Date(post.date).toLocaleDateString("cs-CZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-blue-100"
                            onClick={() => handleTagClick(tag)}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Číst více →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

        {/* Filters */}
        <section className="mb-8">
          <div className="flex flex-col gap-4">
            <BlogCategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              postCounts={postCounts}
            />

            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Vybrané tagy:</span>
                <BlogTags
                  selectedTags={selectedTags}
                  onTagClick={handleTagClick}
                />
              </div>
            )}
          </div>
        </section>

        {/* All Posts */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery
                ? `Výsledky hledání: "${searchQuery}"`
                : selectedCategory
                ? `Kategorie: ${
                    blogCategories.find((c) => c.slug === selectedCategory)
                      ?.name
                  }`
                : "Všechny články"}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "článek" : "článků"}
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery || selectedCategory || selectedTags.length > 0
                  ? "Nenašli jsme žádné články odpovídající vašim kritériím."
                  : "Zatím nejsou k dispozici žádné články."}
              </p>
              {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                    setSelectedTags([]);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Zobrazit všechny články
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Card
                  key={post.slug}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          blogCategories.find((c) => c.slug === post.category)
                            ?.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : blogCategories.find(
                                (c) => c.slug === post.category
                              )?.color === "green"
                            ? "bg-green-100 text-green-800"
                            : blogCategories.find(
                                (c) => c.slug === post.category
                              )?.color === "purple"
                            ? "bg-purple-100 text-purple-800"
                            : blogCategories.find(
                                (c) => c.slug === post.category
                              )?.color === "orange"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {
                          blogCategories.find((c) => c.slug === post.category)
                            ?.name
                        }
                      </Badge>
                      <BlogReadingTime readingTime={post.readingTime} />
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {post.author} •{" "}
                      {new Date(post.date).toLocaleDateString("cs-CZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-blue-100"
                          onClick={() => handleTagClick(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Číst více →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="mb-12">
          <BlogNewsletter />
        </section>
      </main>
      <Footer />
    </>
  );
}
