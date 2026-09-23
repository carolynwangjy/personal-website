import { notFound } from 'next/navigation'
import { BackLink } from 'app/components/keep-scroll'
import { CustomMDX } from 'app/components/mdx'
import { getPosts, postHref, type Collection } from 'app/lib/posts'
import { formatDate } from 'app/lib/format-date'
import { inline } from 'app/lib/inline'
import { baseUrl } from 'app/lib/site'
import { SECTION_HREFS } from 'app/lib/sections'

/** A post reads the same whichever section it's in; only the url differs. */
function find(collection: Collection, slug: string) {
  return getPosts(collection).find((post) => post.slug === slug)
}

export function postParams(collection: Collection) {
  return getPosts(collection).map((post) => ({ slug: post.slug }))
}

export function postMetadata(collection: Collection, slug: string) {
  const post = find(collection, slug)
  if (!post) {
    return
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}${postHref(post)}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function PostPage({ collection, slug }: { collection: Collection; slug: string }) {
  const post = find(collection, slug)

  if (!post) {
    notFound()
  }

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
            url: `${baseUrl}${postHref(post)}`,
            author: {
              '@type': 'Person',
              name: 'Carolyn Wang',
            },
          }),
        }}
      />
      <BackLink href={SECTION_HREFS[post.collection]}>← back</BackLink>
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
