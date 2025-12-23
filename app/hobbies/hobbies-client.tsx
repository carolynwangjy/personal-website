'use client'

import { useState } from 'react'
import React from 'react'
import ReactMarkdown from 'react-markdown'

type HobbySection = {
  title: string
  id: string
  content: string
}

export function HobbiesClient({ sections }: { sections: HobbySection[] }) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const filteredSections = selectedSection
    ? sections.filter((s) => s.id === selectedSection)
    : sections

  return (
    <section className="space-y-4 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">hobbies</h1>
      
      <div className="text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200 flex flex-wrap items-center gap-2">
        <span className="text-neutral-700 dark:text-neutral-300">filter by:</span>
        <button
          type="button"
          onClick={() => setSelectedSection(null)}
          className={[
            'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
            selectedSection === null
              ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
              : 'text-neutral-700 dark:text-neutral-300 writing-chip',
          ].join(' ')}
        >
          all
        </button>
        {sections.map((section) => (
          <React.Fragment key={section.id}>
            <span>|</span>
            <button
              type="button"
              onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              className={[
                'px-1 rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2 decoration-[0.1em]',
                selectedSection === section.id
                  ? 'text-neutral-900 dark:text-neutral-100 writing-chip-active'
                  : 'text-neutral-700 dark:text-neutral-300 writing-chip',
              ].join(' ')}
            >
              {section.title}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="space-y-3">
        {filteredSections.map((section) => (
          <div
            key={section.id}
            className="border border-neutral-200 bg-transparent rounded-xl dark:border-neutral-700/70 dark:bg-transparent"
          >
            <div className="flex items-center justify-between px-4 py-3 pb-0">
              <span className="text-lg font-medium tracking-tight lowercase">
                {section.title}
              </span>
            </div>
            <div className="px-4 pt-1 pb-3 text-[17px] leading-[1.45] text-neutral-800 dark:text-neutral-200">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-700 hover:underline dark:text-blue-300"
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-4 last:mb-0 mt-0" />
                  ),
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

