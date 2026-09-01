import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { getAllPosts } from 'app/lib/posts'
import { formatDate } from 'app/lib/format-date'
import { inline } from 'app/lib/inline'
import { baseUrl } from 'app/lib/site'
import { SECTION_HREFS } from 'app/lib/sections'

export async function generateStaticParams() {
  let posts = getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post = getAllPosts().find((post) => post.slug === slug)
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
      url: `${baseUrl}/writing/${post.slug}`,
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
  let post = getAllPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const backHref = SECTION_HREFS[post.collection]

  return (
    <section>
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
            url: `${baseUrl}/writing/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Carolyn Wang',
            },
          }),
        }}
      />
      <Link href={backHref} className="post-back">
        ← back
      </Link>
      <h1 className="post-title">{post.metadata.title}</h1>
      {post.metadata.subtitle && (
        <p className="post-subtitle">{inline(post.metadata.subtitle)}</p>
      )}
      <p className="post-meta">
        {formatDate(post.metadata.publishedAt).toLowerCase()}
        {post.metadata.originalLink && (
          <>
            <span className="sep">|</span>
            <a
              href={post.metadata.originalLink.trim()}
              target="_blank"
              rel="noopener noreferrer"
            >
              read original
            </a>
          </>
        )}
      </p>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
