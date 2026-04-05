import fs from 'fs'
import path from 'path'
import React from 'react'

type Entry = {
  date?: string
  title: string
  org: string
  orgUrl?: string
  description?: string
  bullets: string[]
}

type Section = {
  label: string
  entries: Entry[]
}

function parseLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index))
    const [, linkText, linkUrl] = match
    parts.push(
      <a
        key={key++}
        href={linkUrl}
        target={linkUrl.startsWith('http') ? '_blank' : undefined}
        rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
      >
        {linkText}
      </a>
    )
    lastIndex = linkRegex.lastIndex
  }

  if (lastIndex < text.length) parts.push(text.substring(lastIndex))
  return parts.length > 0 ? parts : text
}

function parseExperience(): Section[] {
  const filePath = path.join(process.cwd(), 'app', 'experience', 'content.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const content = raw.replace(/^---[\s\S]*?---\n?/, '').trim()

  return content
    .split(/^## /m)
    .slice(1)
    .map((sectionRaw) => {
      const firstNl = sectionRaw.indexOf('\n')
      const label = sectionRaw.slice(0, firstNl).trim()
      const body = sectionRaw.slice(firstNl)

      const entries: Entry[] = body
        .split(/^### /m)
        .slice(1)
        .map((entryRaw) => {
          const nl = entryRaw.indexOf('\n')
          const header = nl >= 0 ? entryRaw.slice(0, nl).trim() : entryRaw.trim()
          const bodyLines = nl >= 0
            ? entryRaw.slice(nl + 1).split('\n').map((l) => l.trim()).filter(Boolean)
            : []

          const [rawDate, rawTitle, rawOrg, rawUrl] = header.split(' | ')

          const description = bodyLines[0] && !bodyLines[0].startsWith('-') ? bodyLines[0] : undefined
          const bullets = bodyLines.filter((l) => l.startsWith('- ')).map((l) => l.slice(2))

          return {
            date: rawDate?.trim() || undefined,
            title: rawTitle?.trim() ?? '',
            org: rawOrg?.trim() ?? '',
            orgUrl: rawUrl?.trim() || undefined,
            description,
            bullets,
          }
        })

      return { label, entries }
    })
}

export default function ExperiencePage() {
  const sections = parseExperience()

  return (
    <section className="space-y-5 leading-[1.45] text-neutral-800 dark:text-neutral-200 max-w-3xl -mt-3">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">experience <span className="ml-1">🌱</span></h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        official resume available upon{' '}
        <a
          href="https://mail.google.com/mail/?view=cm&to=carolynwang.jy@berkeley.edu"
          className="inline-flex items-baseline gap-0.5 underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
        >
          request
          <svg width="0.65em" height="0.65em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-y-[-0.05em]">
            <path d="M7 17L17 7"/>
            <path d="M7 7h10v10"/>
          </svg>
        </a>
      </p>

      {sections.map((section) => (
        <div key={section.label}>
          {/* Label */}
          <p className="text-xl sm:text-2xl font-semibold text-neutral-400 dark:text-neutral-500 mb-2">
            {section.label}
          </p>

          <div className="flex gap-0 items-stretch experience-card bg-white border border-neutral-200 rounded-lg overflow-hidden">
            {/* Vertical rose line */}
            <div className="w-1 bg-[#c8a0a0] dark:bg-[#5a2020] shrink-0" />

            {/* Entries */}
            <div className="flex-1 divide-y divide-neutral-100 dark:divide-neutral-800 pt-1.5 pb-2">
            {section.entries.map((entry, idx) => (
              <div key={idx} className="px-5 py-2.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 gap-0.5">
                  <div>
                    <span className="font-semibold">{entry.title}</span>
                    {', '}
                    {entry.orgUrl ? (
                      <a
                        href={entry.orgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 dark:text-neutral-400 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-2 rounded transition-colors hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
                      >
                        {entry.org}
                      </a>
                    ) : (
                      <span className="text-neutral-500 dark:text-neutral-400">{entry.org}</span>
                    )}
                    {entry.description && (
                      <span className="text-neutral-500 dark:text-neutral-400 text-left"> <span>{parseLinks(entry.description)}</span></span>
                    )}
                  </div>
                  <p className="shrink-0 text-neutral-400 dark:text-neutral-500 text-[0.95rem] sm:text-[length:var(--text-body)]">
                    {entry.date ?? ''}
                  </p>
                </div>
                {entry.bullets.length > 0 && (
                  <ul className="list-disc pl-5 mt-1.5 space-y-1">
                    {entry.bullets.map((b, i) => (
                      <li key={i} className="experience-bullet leading-snug text-neutral-800 dark:text-neutral-200 text-left text-[18px] sm:text-[length:var(--text-body)]"><span>{parseLinks(b)}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            </div>
          </div>
        </div>
      ))}

    </section>
  )
}
