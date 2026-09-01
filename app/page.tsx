import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getBlogPosts, formatDate } from 'app/blog/utils'
import { CustomMDX } from 'app/components/mdx'
import { inline } from 'app/lib/inline'
import { getIntro } from 'app/lib/intro'
import { teaching, type Item } from 'app/data/teaching'
import { work } from 'app/data/work'

const FICTION_CATEGORY = 'short stories'

/** `2022-11-11` → `nov 2022` */
function monthYear(publishedAt: string) {
  return formatDate(publishedAt.slice(0, 7)).toLowerCase()
}

function postsIn(category: 'fiction' | 'blog') {
  return getBlogPosts()
    .filter((post) =>
      category === 'fiction'
        ? post.metadata.category === FICTION_CATEGORY
        : post.metadata.category !== FICTION_CATEGORY
    )
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
}

function PostList({ category }: { category: 'fiction' | 'blog' }) {
  return (
    <ul>
      {postsIn(category).map((post) => (
        <li key={post.slug}>
          <Link href={`/writing/${post.slug}`}>
            {post.metadata.displayTitle || post.metadata.title}
          </Link>{' '}
          <span className="meta">— {monthYear(post.metadata.publishedAt)}</span>
        </li>
      ))}
    </ul>
  )
}

function TeachingItem({ item }: { item: Item }) {
  return (
    <li>
      {inline(item.text)}
      {item.meta && <span className="meta"> — {item.meta}</span>}
      {item.links && (
        <>
          <span className="meta"> — </span>
          {item.links.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && <span className="meta"> / </span>}
              {link.url ? (
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              ) : (
                <span className="meta">{link.label}</span>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </li>
  )
}

export default function Page() {
  const intro = getIntro()

  return (
    <>
      <div className="intro">
        <div className="text">
          <CustomMDX source={intro.content} />
        </div>
        <Image
          src={intro.image}
          alt={intro.imageAlt}
          width={120}
          height={120}
          priority
        />
      </div>

      <nav aria-label="sections">
        <a href="#fiction">fiction</a>
        <span className="sep" aria-hidden="true">
          |
        </span>
        <a href="#blog">blog</a>
        <span className="sep" aria-hidden="true">
          |
        </span>
        <a href="#teaching">teaching</a>
        <span className="sep" aria-hidden="true">
          |
        </span>
        <a href="#work">work</a>
      </nav>

      <section id="fiction">
        <p>short stories, mostly. the ones i’m least embarrassed by live here.</p>
        <PostList category="fiction" />
      </section>

      <section id="blog">
        <p>
          occasional notes on ml, books, running, and whatever else is rattling around.{' '}
          <Link href="/rss">rss</Link> if you’re into that.
        </p>
        <PostList category="blog" />
      </section>

      <section id="teaching">
        {teaching.map((group) => (
          <React.Fragment key={group.heading}>
            <h2>{group.heading}</h2>
            <ul>
              {group.items.map((item, i) => (
                <TeachingItem key={i} item={item} />
              ))}
            </ul>
          </React.Fragment>
        ))}
      </section>

      <section id="work">
        <ul>
          {work.map((entry, i) => (
            <li key={i}>
              {entry.url ? (
                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                  {entry.org}
                </a>
              ) : (
                entry.org
              )}{' '}
              <span className="meta">— {entry.dates}</span>. {inline(entry.line)}
            </li>
          ))}
        </ul>
        <p>
          a fuller version lives on{' '}
          <a
            href="https://www.linkedin.com/in/carolyn-wang-jy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          .
        </p>
      </section>
    </>
  )
}
