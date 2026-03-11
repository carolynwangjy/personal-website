import { getBlogPosts } from '../blog/utils'
import { FilteredPosts } from '../components/filtered-posts'
import { Suspense } from 'react'

export default function WritingPage() {
  const posts = getBlogPosts().map((p) => ({
    slug: p.slug,
    href: `/writing/${p.slug}`,
    metadata: p.metadata,
  }))

  return (
    <section className="space-y-4 text-[var(--text-body)] leading-relaxed text-neutral-900 dark:text-neutral-100 md:max-w-4xl">
      <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        writing <span className="ml-1">✍️</span>
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FilteredPosts posts={posts} />
      </Suspense>
    </section>
  )
}

