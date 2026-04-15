import type { Metadata } from "next"
import { BlogListSection } from "@/components/sections/blog-list-section"

export const metadata: Metadata = {
  title: "Blog | Innovation Club",
  description: "Engineering stories, event notes, and innovation insights from KITS.",
}

export default function BlogPage() {
  return <BlogListSection />
}
