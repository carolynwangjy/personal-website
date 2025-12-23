import { notFound } from 'next/navigation'
import { getHobbySections } from '../utils'
import ReactMarkdown from 'react-markdown'

export default async function HobbyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sections = getHobbySections()
  const section = sections.find((s) => s.id === slug)

  if (!section) {
    notFound()
  }

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{section.title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-blue-700 hover:underline dark:text-blue-300"
              />
            ),
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

