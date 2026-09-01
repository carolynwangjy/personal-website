'use client'

import React, { useState } from 'react'

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

  return (
    <>
      <p className="filter">
        filter by{' '}
        <button
          type="button"
          onClick={() => setActive(null)}
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
              onClick={() => setActive(active === option.id ? null : option.id)}
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
