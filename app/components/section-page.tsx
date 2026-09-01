import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CustomMDX } from 'app/components/mdx'
import { getPosts, type Collection } from 'app/lib/posts'
import { formatDate } from 'app/lib/format-date'
import { inline } from 'app/lib/inline'
import { getIntro } from 'app/lib/intro'
import { getSections, type Section, type SectionId } from 'app/lib/sections'
import { teaching, type Item } from 'app/data/teaching'
import { experience, service, type Group } from 'app/data/experience'

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
            {post.metadata.displayTitle || post.metadata.title}{' '}
            <span className="meta">({monthYear(post.metadata.publishedAt)})</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Resources({ item }: { item: Item }) {
  return (
    <>
      {item.meta && <span className="meta">{item.meta}</span>}
      {item.links?.map((link, i) => (
        <React.Fragment key={link.label}>
          {i > 0 && <span className="rule"> / </span>}
          {link.url ? (
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ) : (
            <span className="rule">{link.label}</span>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

function TeachingList() {
  return (
    <>
      {teaching.map((group) => (
        <React.Fragment key={group.heading}>
          <h2>{group.heading}</h2>
          {group.table ? (
            <div className="rows">
              {group.items.map((item, i) => (
                <div className="row" key={i}>
                  <span className="row-topic">{inline(item.text)}</span>
                  <span className="row-links">
                    <Resources item={item} />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <ul>
              {group.items.map((item, i) => (
                <li key={i}>
                  {inline(item.text)}{' '}
                  <Resources item={item} />
                </li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

/** industry / research / teaching, or community / writing — an h2 per group */
function GroupedEntries({ groups }: { groups: Group[] }) {
  return (
    <>
      {groups.map((group) => (
        <React.Fragment key={group.heading}>
          <h2>{group.heading}</h2>
          <ul>
            {group.entries.map((entry, i) => (
              <li key={i}>
                {entry.url ? (
                  <a href={entry.url} target="_blank" rel="noopener noreferrer">
                    {entry.org}
                  </a>
                ) : (
                  entry.org
                )}{' '}
                <span className="meta">({entry.dates})</span>. {entry.role}.{' '}
                {inline(entry.bullets.join('; '))}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  )
}

const CONTENT: Record<SectionId, React.ReactNode> = {
  fiction: <PostList collection="fiction" />,
  blog: <PostList collection="blog" />,
  teaching: <TeachingList />,
  experience: <GroupedEntries groups={experience} />,
  service: <GroupedEntries groups={service} />,
}

function Tabs({ sections, current }: { sections: Section[]; current: SectionId }) {
  return (
    <nav aria-label="sections">
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          {i > 0 && (
            <span className="sep" aria-hidden="true">
              |
            </span>
          )}
          <Link
            href={section.href}
            aria-current={section.id === current ? 'page' : undefined}
          >
            {section.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
}

/** Intro and tabs, then one section's copy wrapped around its generated list. */
export function SectionPage({ current }: { current: SectionId }) {
  const intro = getIntro()
  const sections = getSections()
  const section = sections[current]

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

      <Tabs sections={Object.values(sections)} current={current} />

      <section id={section.id}>
        {section.before && <CustomMDX source={section.before} />}
        {CONTENT[current]}
        {section.after && <CustomMDX source={section.after} />}
      </section>
    </>
  )
}
