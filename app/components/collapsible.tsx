'use client'

import { useState } from 'react'

export function Collapsible({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-left w-full group"
      >
        <span
          className={`text-neutral-400 dark:text-neutral-500 transition-transform duration-200 text-sm ${isOpen ? 'rotate-90' : ''}`}
        >
          ▶
        </span>
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {title}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pl-5">
          {children}
        </div>
      )}
    </div>
  )
}
