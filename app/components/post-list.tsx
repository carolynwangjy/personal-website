'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export type PostEntry = {
  slug: string
  title: string
  /** already formatted, e.g. `nov 2022` */
  date: string
  /** publishedAt as epoch ms, for sorting */
  time: number
}

export function PostList({ posts }: { posts: PostEntry[] }) {
  const [dir, setDir] = useState<'desc' | 'asc'>('desc')

  const sorted = useMemo(
    () =>
      [...posts].sort((a, b) => (dir === 'desc' ? b.time - a.time : a.time - b.time)),
    [posts, dir]
  )

  return (
    <>
      <p className="sort">
        sort by{' '}
        <button
          type="button"
          onClick={() => setDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
          aria-label={`sort by date, currently ${
            dir === 'desc' ? 'newest first' : 'oldest first'
          }`}
        >
          date {dir === 'desc' ? '↓' : '↑'}
        </button>
      </p>
      <ul>
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`}>
              {post.title} <span className="meta">({post.date})</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
