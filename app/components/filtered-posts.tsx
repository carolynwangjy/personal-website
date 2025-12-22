'use client'

import Link from 'next/link'
import { formatDate } from 'app/lib/format-date'
import { useMemo, useState } from 'react'

type Post = {
  slug?: string
  href: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
    category?: string
  }
}

const categoryOrder = ['short stories', 'reflections', 'thought pieces', 'miscellaneous']

const prettyDate = (date: string) => {
  const safe = date.includes('T') ? date : `${date}T00:00:00`
  return new Date(safe).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function FilteredPosts({ posts }: { posts: Post[] }) {
  const [sortMode, setSortMode] = useState<'date' | 'topic'>('date')
  const [dateDir, setDateDir] = useState<'desc' | 'asc'>('desc')

  const normCat = (p: Post) =>
    (p.metadata.category?.toLowerCase().trim() || 'miscellaneous')

  const dateCompare = (a: Post, b: Post) =>
    new Date(a.metadata.publishedAt).getTime() -
    new Date(b.metadata.publishedAt).getTime()

  const dateSorted = useMemo(
    () =>
      [...posts].sort((a, b) =>
        dateDir === 'desc' ? dateCompare(b, a) : dateCompare(a, b)
      ),
    [posts, dateDir]
  )

  const groupedByTopic = useMemo(() => {
    const bucket = new Map<string, Post[]>()
    posts.forEach((p) => {
      const cat = normCat(p)
      if (!bucket.has(cat)) bucket.set(cat, [])
      bucket.get(cat)!.push(p)
    })

    const order = [
      ...categoryOrder.filter((c) => bucket.has(c)),
      ...Array.from(bucket.keys()).filter((c) => !categoryOrder.includes(c)).sort(),
    ]

    return order.map((cat) => {
      const list = bucket.get(cat) ?? []
      const sorted = [...list].sort((a, b) =>
        dateDir === 'desc' ? dateCompare(b, a) : dateCompare(a, b)
      )
      return { cat, posts: sorted }
    })
  }, [posts, dateDir])

  return (
    <div className="space-y-4">
      <div className="text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 flex flex-wrap items-center gap-2">
        <span className="text-neutral-700 dark:text-neutral-300">sort by:</span>
        <button
          type="button"
          onClick={() => {
            if (sortMode === 'date') {
              setDateDir((d) => (d === 'desc' ? 'asc' : 'desc'))
            }
            setSortMode('date')
          }}
          className={[
            'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
            sortMode === 'date'
              ? 'text-neutral-900 dark:text-neutral-100 bg-[#f2e8da] hover:bg-[#e1d4be]'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70',
          ].join(' ')}
        >
          date {dateDir === 'desc' ? '↓' : '↑'}
        </button>
        <span>|</span>
        <button
          type="button"
          onClick={() => setSortMode('topic')}
          className={[
            'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
            sortMode === 'topic'
              ? 'text-neutral-900 dark:text-neutral-100 bg-[#f2e8da]'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70',
          ].join(' ')}
        >
          topic
        </button>
      </div>

      <div>
        {sortMode === 'date' ? (
          dateSorted.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-300">
              no posts yet.
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-[1px]">
              {dateSorted.map((post) => (
                <li
                  key={post.slug || post.href}
                  className="transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70 rounded-lg -mx-2 px-2 py-1 list-inside"
                >
                  <Link
                    className="text-neutral-900 dark:text-neutral-100 tracking-tight"
                    href={post.href}
                  >
                    {post.metadata.title}{' '}
                    <span className="italic text-neutral-700 dark:text-neutral-300">
                      ({prettyDate(post.metadata.publishedAt)})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        ) : groupedByTopic.length === 0 ? (
          <p className="text-neutral-600 dark:text-neutral-300">
            no posts yet.
          </p>
        ) : (
          groupedByTopic.map((group) => (
            <div
              key={group.cat}
              className="border border-neutral-200 bg-transparent rounded-xl dark:border-neutral-700/70 dark:bg-transparent mb-3"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-lg font-semibold tracking-tight lowercase">
                  {group.cat}
                </span>
              </div>
              <div className="px-4 pb-3">
                <ul className="list-disc pl-5 space-y-[1px]">
                  {group.posts.map((post) => (
                    <li
                      key={post.slug || post.href}
                      className="transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-800/70 rounded-lg -mx-2 px-2 py-1 list-inside"
                    >
                      <Link
                        className="text-neutral-900 dark:text-neutral-100 tracking-tight"
                        href={post.href}
                      >
                        {post.metadata.title}{' '}
                        <span className="italic text-neutral-700 dark:text-neutral-300">
                          ({prettyDate(post.metadata.publishedAt)})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


