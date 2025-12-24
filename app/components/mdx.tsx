import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href
  const { className = '', ...restProps } = props
  const linkClasses = 'rounded bg-[#f2e8da] hover:bg-[#e1d4be] dark:bg-neutral-700/70 dark:hover:bg-neutral-600/70 transition-colors'
  const mergedClassName = className ? `${linkClasses} ${className}` : linkClasses

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={mergedClassName} {...restProps}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a className={mergedClassName} {...restProps} />
  }

  return <a target="_blank" rel="noopener noreferrer" className={mergedClassName} {...restProps} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function parseCaptionWithLinks(caption: string): React.ReactNode {
  // Match markdown-style links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = linkRegex.exec(caption)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(caption.substring(lastIndex, match.index))
    }
    
    // Add the link
    const linkText = match[1]
    const linkUrl = match[2]
    const isExternal = linkUrl.startsWith('http://') || linkUrl.startsWith('https://')
    
    if (isExternal) {
      parts.push(
        <a
          key={key++}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70"
        >
          {linkText}
        </a>
      )
    } else {
      parts.push(
        <Link
          key={key++}
          href={linkUrl}
          className="underline decoration-neutral-400 dark:decoration-neutral-500 underline-offset-2 rounded transition-colors hover:bg-[#f2e8da] dark:hover:bg-neutral-700/70"
        >
          {linkText}
        </Link>
      )
    }
    
    lastIndex = linkRegex.lastIndex
  }
  
  // Add remaining text after the last link
  if (lastIndex < caption.length) {
    parts.push(caption.substring(lastIndex))
  }
  
  return parts.length > 0 ? parts : caption
}

function ImageWithCaption({ caption, alt, ...props }: React.ComponentProps<typeof Image> & { caption?: string }) {
  return (
    <figure className="my-6">
      <Image alt={alt || caption || ''} className="rounded-lg" {...props} />
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-neutral-600 dark:text-neutral-400">
          {parseCaptionWithLinks(caption)}
        </figcaption>
      )}
    </figure>
  )
}

function PullQuote({ children }) {
  return (
    <blockquote className="pull-quote border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 italic text-neutral-800 dark:text-neutral-50 bg-neutral-50/80 dark:bg-neutral-800/90 rounded-md py-3 px-4">
      {children}
    </blockquote>
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  ImageWithCaption,
  a: CustomLink,
  code: Code,
  Table,
  PullQuote,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
