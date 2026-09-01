import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPosts, type Collection } from 'app/lib/posts'
import { formatDate } from 'app/lib/format-date'
import { CustomMDX } from 'app/components/mdx'
import { inline } from 'app/lib/inline'
import { getIntro } from 'app/lib/intro'
import { getSections, type Section } from 'app/lib/sections'
import { teaching, type Item } from 'app/data/teaching'
import { work } from 'app/data/work'

/** `2022-11-11` → `nov 2022` */
function monthYear(publishedAt: string) {
  return formatDate(publishedAt.slice(0, 7)).toLowerCase()
}

function PostList({ collection }: { collection: Collection }) {
  return (
    <ul>
      {getPosts(collection).map((post) => (
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

/** A homepage section: markdown copy, then the generated list, then more copy. */
function SectionBlock({
  section,
  children,
}: {
  section: Section
  children: React.ReactNode
}) {
  return (
    <section id={section.id}>
      {section.before && <CustomMDX source={section.before} />}
      {children}
      {section.after && <CustomMDX source={section.after} />}
    </section>
  )
}

export default function Page() {
  const intro = getIntro()
  const sections = getSections()
  const tabs = Object.values(sections)

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
        {tabs.map((section, i) => (
          <React.Fragment key={section.id}>
            {i > 0 && (
              <span className="sep" aria-hidden="true">
                |
              </span>
            )}
            <a href={`#${section.id}`}>{section.label}</a>
          </React.Fragment>
        ))}
      </nav>

      <SectionBlock section={sections.fiction}>
        <PostList collection="fiction" />
      </SectionBlock>

      <SectionBlock section={sections.blog}>
        <PostList collection="blog" />
      </SectionBlock>

      <SectionBlock section={sections.teaching}>
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
      </SectionBlock>

      <SectionBlock section={sections.work}>
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
      </SectionBlock>
    </>
  )
}
