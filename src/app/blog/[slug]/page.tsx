import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/site-data"

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) notFound()

  return (
    <section className="px-4 py-20 md:px-8">
      <article className="mx-auto w-full max-w-3xl rounded-2xl border border-border-default bg-bg-surface p-8">
        <p className="text-xs uppercase tracking-wide text-accent-primary">{post.readTime}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-text-primary">{post.title}</h1>
        <p className="mt-4 text-text-secondary">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border-accent px-3 py-1 text-xs text-accent-bright">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-text-tertiary">
          Published {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <Link
          href="/blog"
          className="gold-focus-ring mt-8 inline-flex rounded-full border border-border-accent px-5 py-2 text-sm text-accent-primary"
        >
          Back to Blog
        </Link>
      </article>
    </section>
  )
}
