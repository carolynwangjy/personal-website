'use client'

import React, { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export type FilterOption = { id: string; short: string }

/**
 * Shows one course at a time. The groups arrive already rendered from the
 * server, so no course data crosses the client boundary — only visibility.
 */
export function CourseFilter({
  options,
  children,
}: {
  options: FilterOption[]
  children: React.ReactNode[]
}) {
  const [active, setActive] = useState<string | null>(null)
  const controls = useRef<HTMLParagraphElement>(null)

  /**
   * Filtering changes the page height by thousands of pixels, and the browser
   * re-clamps the scroll position, which yanks the page. Measure where the
   * controls sit, apply the change synchronously, then scroll by the
   * difference — so the row stays exactly where it was, before any paint.
   */
  function choose(next: string | null) {
    const before = controls.current?.getBoundingClientRect().top
    flushSync(() => setActive(next))
    const after = controls.current?.getBoundingClientRect().top
    if (before !== undefined && after !== undefined && after !== before) {
      window.scrollBy(0, after - before)
    }
  }

  return (
    <>
      <p className="filter" ref={controls}>
        filter by{' '}
        <button
          type="button"
          onClick={() => choose(null)}
          aria-pressed={active === null}
        >
          all
        </button>
        {options.map((option) => (
          <React.Fragment key={option.id}>
            <span className="sep" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => choose(active === option.id ? null : option.id)}
              aria-pressed={active === option.id}
            >
              {option.short}
            </button>
          </React.Fragment>
        ))}
      </p>
      {options.map((option, i) => (
        <div key={option.id} hidden={active !== null && active !== option.id}>
          {children[i]}
        </div>
      ))}
    </>
  )
}
