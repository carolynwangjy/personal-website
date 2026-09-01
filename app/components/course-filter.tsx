'use client'

import React, { useRef, useState } from 'react'

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
   * Filtering can shrink the page by thousands of pixels, and the browser
   * clamps the scroll position to the new height — which dumps you at the
   * bottom. Pull the controls back into view when they've scrolled off.
   */
  function choose(next: string | null) {
    setActive(next)
    if (controls.current && controls.current.getBoundingClientRect().top < 0) {
      controls.current.scrollIntoView({ block: 'start' })
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
