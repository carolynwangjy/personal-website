import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { getHobbies } from 'app/lib/hobbies'

export async function generateStaticParams() {
  return getHobbies().map((hobby) => ({ slug: hobby.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hobby = getHobbies().find((h) => h.slug === slug)
  return hobby ? { title: hobby.title } : {}
}

export default async function Hobby({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hobby = getHobbies().find((h) => h.slug === slug)

  if (!hobby) {
    notFound()
  }

  return (
    <section>
      <Link href="/hobbies" className="post-back">
        ← back
      </Link>
      <h1 className="post-title">{hobby.title}</h1>
      <article className="prose">
        <CustomMDX source={hobby.content} />
      </article>
    </section>
  )
}
