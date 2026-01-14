import { notFound } from 'next/navigation'
import { getHobbySections } from '../utils'
import { CustomMDX } from 'app/components/mdx'
import Link from 'next/link'

export default async function HobbyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sections = getHobbySections()
  const section = sections.find((s) => s.id === slug)

  if (!section) {
    notFound()
  }

  return (
    <section className="hobbies-page space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl -mt-3">
      <Link
        href="/hobbies"
        className="inline-flex items-center px-2 py-1 rounded text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70 transition-colors mb-2"
      >
        ← back
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">{section.title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={section.content} />
      </div>
    </section>
  )
}

