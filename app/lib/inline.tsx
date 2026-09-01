import Link from 'next/link'
import React from 'react'

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g

/**
 * Renders the small subset of markdown used in prose strings that live in
 * TSX/frontmatter rather than MDX: `[text](url)`, `**bold**` and `*italic*`.
 */
export function inline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  TOKEN.lastIndex = 0
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    lastIndex = TOKEN.lastIndex

    if (match[3] !== undefined) {
      parts.push(<strong key={key++}>{match[3]}</strong>)
    } else if (match[4] !== undefined) {
      parts.push(<em key={key++}>{match[4]}</em>)
    } else {
      parts.push(
        <ExternalOrInternal key={key++} href={match[2]}>
          {match[1]}
        </ExternalOrInternal>
      )
    }
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length > 0 ? parts : text
}

export function ExternalOrInternal({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link href={href}>{children}</Link>
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
