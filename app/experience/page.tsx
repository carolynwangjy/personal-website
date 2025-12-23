'use client'

import { useState, useEffect } from 'react'

type YearItem = { label: string | JSX.Element }

const data: { year: string; items: YearItem[] }[] = [
  {
    year: '2025',
    items: [
      {
        label: (
            <>
              taught{' '}
            <a
              href="https://cs61a.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
              >
                uc berkeley&apos;s cs61a course
              </a>
              , leading the{' '}
              <a
              href="https://eecs.berkeley.edu/cs-scholars/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
                cs scholars program
              </a>
            </>
        ),
      },
      {
        label: (
          <>
            ran the eecs-dept sponsored{' '}
            <a
              href="https://www.cskickstart.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              cs kickstart program
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            built ai agents for finance reconciliation systems at{' '}
            <a
              href="https://amazon.jobs/content/en/teams/fgbs/finance-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#fbf4e6] dark:hover:bg-neutral-800/50"
            >
              amazon
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            computationally solved puzzles at{' '}
            <a
              href="https://gamescrafters.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              gamescrafters
            </a>
          </>
        ),
      },
    ],
  },
  {
    year: '2024',
    items: [
      {
        label: (
          <>
            conducted{' '}
            <a
              href="https://www.brookings.edu/projects/artificial-intelligence-and-emerging-technology-initiative/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              ai + election research
            </a>{' '}
            at{' '}
            <a
              href="https://www.brookings.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              the brookings institution
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            building tech policy opportunities at the{' '}
            <a
              href="https://www.paragonfellowship.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              paragon policy fellowship
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            authored for the{' '}
            <a
              href="https://www.techpolicy.press/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              tech policy press
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            taught berkeley students how to program at{' '}
            <a
              href="https://csmentors.studentorg.berkeley.edu/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              computer science mentors
            </a>
          </>
        ),
      },
    ],
  },
  {
    year: '2023 - prior',
    items: [
      {
        label: (
          <>
            wrote for the{' '}
            <a
              href="https://bpr.studentorg.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              berkeley political review
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            led the{' '}
            <a
              href="https://saratogafalcon.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              saratoga falcon newspaper
            </a>
          </>
        ),
      },
      {
        label: (
          <>
            served on the{' '}
            <a
              href="https://www.saratoga.ca.us/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] writing-chip"
            >
              city of saratoga&apos;s
            </a>{' '}
            youth commission
          </>
        ),
      },
    ],
  },
]

export default function ExperiencePage() {
  const [activeYear, setActiveYear] = useState<string | null>(null)

  useEffect(() => {
    // Get the hash from URL on mount and when hash changes
    const updateActiveYear = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('year-')) {
        setActiveYear(hash)
      } else {
        setActiveYear(null)
      }
    }

    updateActiveYear()
    window.addEventListener('hashchange', updateActiveYear)
    return () => window.removeEventListener('hashchange', updateActiveYear)
  }, [])

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">experience</h1>
      <p className="text-neutral-700 dark:text-neutral-300">some things i've been up to :)</p>

      <div className="space-y-3">
        {data.map((entry) => {
          const targetId = `year-${entry.year.replace(/\s+/g, '-').toLowerCase()}`
          return (
            <div
              key={entry.year}
              id={targetId}
              className={`experience-card border-2 rounded-xl scroll-mt-20 ${
                activeYear === targetId
                  ? 'border-[#e1d4be] bg-white/80 ring-8 ring-[#f5ecde]/60 dark:border-neutral-700/70 dark:bg-transparent dark:ring-neutral-800/60'
                  : 'border-neutral-200 bg-white/80 dark:border-neutral-700/70 dark:bg-transparent'
              }`}
            >
              <div className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="text-lg font-semibold tracking-tight">{entry.year}</span>
              </div>
              <div className="px-6 pb-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                <ul className="list-disc space-y-1.5 pl-5">
                  {entry.items.map((item, idx) => (
                    <li key={idx}>{item.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
