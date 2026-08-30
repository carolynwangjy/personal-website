'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'

// Renders [text](url) links; internal paths open in the same tab
function parseLinks(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index))
    const [, linkText, linkUrl] = match
    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://')
    parts.push(
      <a
        key={key++}
        href={linkUrl}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="rounded transition-colors underline decoration-neutral-400 dark:decoration-neutral-400 underline-offset-2 decoration-[0.1em] hover:bg-[#f5dada] dark:hover:bg-neutral-700/70"
      >
        {linkText}
      </a>
    )
    lastIndex = linkRegex.lastIndex
  }

  if (lastIndex < text.length) parts.push(text.substring(lastIndex))
  return parts.length > 0 ? parts : text
}

type HomeBioProps = {
  title: string
  emoji?: string
  image?: string
  imageAlt?: string
  paragraphs: string[]
}

export default function HomeBio({ title, emoji, image, imageAlt, paragraphs }: HomeBioProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className={`home-bio ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="flex flex-col md:items-start">
        <div className="text-[var(--text-body)] leading-relaxed text-neutral-900 dark:text-neutral-100 space-y-6 md:space-y-4 md:max-w-4xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight mb-4 text-neutral-900 dark:text-neutral-100 text-left max-[600px]:text-center min-[601px]:mb-0">
            {title}
            {emoji && <span className="ml-1">{emoji}</span>}
          </h1>
          {image && (
            <div className="float-right mb-4 w-[190px] min-w-[190px] max-w-[190px] rounded-full overflow-hidden border-2 border-neutral-300 shadow-sm dark:border-neutral-700 min-[601px]:mt-2 min-[601px]:ml-10 min-[601px]:mb-4 min-[601px]:mr-4 max-[600px]:float-none max-[600px]:mx-auto max-[600px]:mt-6 max-[600px]:mb-8 max-[600px]:w-[160px] max-[600px]:min-w-[160px] max-[600px]:max-w-[160px]">
              <div className="relative w-full aspect-[9.6/10] overflow-hidden rounded-full">
                <Image
                  src={image}
                  alt={imageAlt ?? ''}
                  fill
                  className="object-cover object-[center_70%] "
                  priority
                />
              </div>
            </div>
          )}
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{parseLinks(paragraph)}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
