'use client'

import { useState } from 'react'

type YearItem = {
  label: string
  href?: string
}

type YearData = {
  year: string
  items: YearItem[]
}

export function YearBubbles({ data }: { data: YearData[] }) {
  const [activeYear, setActiveYear] = useState(data[0]?.year ?? '')
  const active = data.find((entry) => entry.year === activeYear)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3 pt-1">
        {data.map((entry) => {
          let isActive = entry.year === activeYear
          return (
            <button
              key={entry.year}
              type="button"
              onClick={() => setActiveYear(isActive ? '' : entry.year)}
              className={[
                'flex items-center gap-2 cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition',
                isActive
                  ? 'border-neutral-800 bg-white text-neutral-900'
                  : 'border-neutral-300 bg-white/80 text-neutral-800 hover:bg-white',
              ].join(' ')}
            >
              <span>{entry.year}</span>
            </button>
          )
        })}
      </div>

      {active && active.items.length > 0 ? (
        <div className="text-[18.5px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
          <ul className="list-disc space-y-1.5 pl-7">
            {active.items.map((item, idx) => (
              <li key={idx}>{item.label}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

