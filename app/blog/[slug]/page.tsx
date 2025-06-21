import { getPostBySlug, getPostSlugs } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm" // Správný název komponenty
import CommentsTable from "@/components/CommentsTable" // Správný název komponenty
import { Suspense } from "react"

// Generování statických cest pro blogové příspěvky
export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <Suspense fallback={<div>Načítám formulář pro komentáře...</div>}>
          <ContactForm /> {/* Použijte správný název komponenty */}
        </Suspense>

        <div className="mt-8">
          <Suspense fallback={<div>Načítám komentáře...</div>}>
            <CommentsTable /> {/* Použijte správný název komponenty */}
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}
