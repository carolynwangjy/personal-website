'use client'

import { useMemo, useState } from 'react'

type YearItem = { label: string }

const data: { year: string; items: YearItem[] }[] = [
  {
    year: '2025',
    items: [
      { label: "taught berkeley's cs61a course, leading the cs scholars program" },
      { label: 'ran the eecs-dept sponsored cs kickstart program' },
      { label: 'built ai agents for finance reconciliation systems at amazon' },
    ],
  },
  {
    year: '2024',
    items: [
      { label: 'conducted ai + election research at the brookings institution' },
      { label: 'building tech policy opportunities at the paragon policy fellowship' },
      { label: 'authored for the tech policy press' },
    ],
  },
  {
    year: '2023 - prior',
    items: [
      { label: 'wrote for the berkeley political review' },
      { label: 'led the saratoga falcon newspaper' },
      { label: 'served on the city of saratoga\'s youth commission' },
    ],
  },
]

const years = data.map((d) => d.year)

export default function ArchivesPage() {
  const [selectedYears, setSelectedYears] = useState<string[]>(['all', ...years])

  const isAllSelected = selectedYears.includes('all')

  const toggleYear = (year: string) => {
    setSelectedYears((prev) => {
      if (isAllSelected) {
        const next = prev.filter((y) => y !== 'all' && y !== year)
        return next
      }
      const next = prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year]
      return next
    })
  }

  const toggleAll = () => {
    setSelectedYears((prev) => (prev.includes('all') ? [] : ['all', ...years]))
  }

  const visibleYears = useMemo(
    () => (selectedYears.includes('all') ? years : selectedYears),
    [selectedYears]
  )

  return (
    <section className="space-y-4 text-[18.5px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">experience</h1>
      <p className="text-neutral-700 dark:text-neutral-300">some things i've been up to :)</p>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={toggleAll}
          className={[
            'rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition flex items-center gap-2',
            isAllSelected
              ? 'border-[#cbb896] bg-[#e1d4be] text-neutral-900'
              : 'border-[#d9c8aa] bg-[#f2e8da] text-neutral-900 hover:bg-[#e1d4be] hover:border-[#cbb896]',
          ].join(' ')}
        >
          <span>all</span>
          {isAllSelected && <span className="text-xs text-neutral-800">×</span>}
        </button>

        {years.map((year) => {
          const active = selectedYears.includes(year)
          return (
            <button
              key={year}
              type="button"
              onClick={() => toggleYear(year)}
              className={[
                'rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition flex items-center gap-2',
                active
                  ? 'border-[#cbb896] bg-[#e1d4be] text-neutral-900'
                  : 'border-[#d9c8aa] bg-[#f2e8da] text-neutral-900 hover:bg-[#e1d4be] hover:border-[#cbb896]',
              ].join(' ')}
            >
              <span>{year}</span>
              {active && <span className="text-xs text-neutral-800">×</span>}
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        {data
          .filter((entry) => visibleYears.includes(entry.year))
          .map((entry) => (
            <div
              key={entry.year}
              className="border border-neutral-200 bg-white/80 rounded-xl"
            >
              <div className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span className="text-lg font-semibold tracking-tight">{entry.year}</span>
              </div>
              <div className="px-6 pb-4 text-[18.5px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
                <ul className="list-disc space-y-1.5 pl-5">
                  {entry.items.map((item, idx) => (
                    <li key={idx}>{item.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
