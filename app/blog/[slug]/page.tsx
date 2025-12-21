import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getBlogPosts } from 'app/blog/utils'
import { formatDate } from 'app/lib/format-date'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="space-y-4 text-lg leading-relaxed text-neutral-900 dark:text-neutral-100 md:max-w-4xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {post.metadata.title}
      </h1>
      {post.metadata.subtitle && (
        <h2 className="text-xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300">
          {post.metadata.subtitle}
        </h2>
      )}
      <div className="flex flex-wrap items-center gap-3 mt-3 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        <span>{formatDate(post.metadata.publishedAt)}</span>
        {post.metadata.originalLink && (
          <>
            <span className="text-neutral-400">|</span>
            <a
              href={post.metadata.originalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 rounded transition-colors bg-[#f2e8da] hover:bg-[#e1d4be] text-neutral-900 dark:text-neutral-100"
            >
              Read Original
            </a>
          </>
        )}
      </div>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
