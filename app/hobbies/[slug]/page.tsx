import { notFound } from 'next/navigation'
import { getHobbySections } from '../utils'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export default async function HobbyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sections = getHobbySections()
  const section = sections.find((s) => s.id === slug)

  if (!section) {
    notFound()
  }

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <Link
        href="/hobbies"
        className="inline-flex items-center px-2 py-1 rounded text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70 transition-colors mb-2"
      >
        ← back
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">{section.title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            a: ({ node, href, ...props }) => {
              const isExternal = href?.startsWith('http://') || href?.startsWith('https://')
              return (
                <a
                  {...props}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
                />
              )
            },
            p: ({ node, ...props }) => (
              <p {...props} className="mb-4 last:mb-0" />
            ),
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>
    </section>
  )
}

