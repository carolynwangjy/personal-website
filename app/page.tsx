import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getBlogPosts, formatDate } from 'app/blog/utils'
import { inline } from 'app/lib/inline'
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
  return (
    <>
      <div className="intro">
        <div className="text">
          <h1>carolyn wang</h1>
          <p>
            i’m an undergrad at{' '}
            <a href="https://www.berkeley.edu/" target="_blank" rel="noopener noreferrer">
              uc berkeley
            </a>{' '}
            majoring in{' '}
            <a href="https://eecs.berkeley.edu/cs/" target="_blank" rel="noopener noreferrer">
              computer science
            </a>{' '}
            and minoring in{' '}
            <a href="https://ppl-minor.berkeley.edu/" target="_blank" rel="noopener noreferrer">
              politics, philosophy &amp; law (ppl)
            </a>{' '}
            as part of the{' '}
            <a
              href="https://eecs.berkeley.edu/resources/undergrads/honors/"
              target="_blank"
              rel="noopener noreferrer"
            >
              eecs honors program
            </a>
            .
          </p>
          <p>
            i’m currently doing nlp research at{' '}
            <a href="https://bair.berkeley.edu/" target="_blank" rel="noopener noreferrer">
              bair
            </a>
            , teaching <a href="#teaching">cs189</a> (cal’s flagship ml course), and
            inhabiting a little intellectual burrow between machine learning and social
            systems. the bookshelf in my brain is:
          </p>
          <ul>
            <li>
              enamored, quite hopelessly, with good stories. i’m probably writing or taking
              a nap
            </li>
            <li>
              interested in knowledge tracing w/ llms, social systems, languages, and
              endurance sports
            </li>
            <li>
              adores music gigs, novels, giving (and receiving) hugs,{' '}
              <a href="https://www.newyorker.com/" target="_blank" rel="noopener noreferrer">
                the new yorker
              </a>
              , jorts, funny pranks
            </li>
          </ul>
        </div>
        <Image src="/carolyn-wang.jpg" alt="carolyn wang" width={120} height={120} priority />
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
