'use client'

import { useState } from 'react'

export function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mt-1 mb-1 pl-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-left group font-medium text-neutral-800 dark:text-neutral-200 underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 decoration-[0.1em] rounded transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70"
      >
        {title}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  )
}
