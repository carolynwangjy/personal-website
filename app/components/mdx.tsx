import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { inline } from 'app/lib/inline'

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

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} {...props} />
}

function ImageWithCaption({
  caption,
  alt,
  href,
  ...props
}: React.ComponentProps<typeof Image> & { caption?: string; href?: string }) {
  const image = <Image alt={alt || caption || ''} {...props} />

  return (
    <figure>
      {href ? <Link href={href}>{image}</Link> : image}
      {caption && <figcaption>{inline(caption)}</figcaption>}
    </figure>
  )
}

function PullQuote({ children }) {
  return <blockquote className="pull-quote">{children}</blockquote>
}

function LargeQuote({ children }) {
  return <blockquote className="large-quote">{children}</blockquote>
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function SmallText({ children, ...props }) {
  return (
    <p className="small-text" {...props}>
      {children}
    </p>
  )
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
    return React.createElement(`h${level}`, { id: slug }, children)
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

function SectionHeader({ children }) {
  return <p className="section-header">{children}</p>
}

function NotesLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="notes-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details open={defaultOpen}>
      <summary>{title}</summary>
      {children}
    </details>
  )
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
  SmallText,
  a: CustomLink,
  code: Code,
  Table,
  PullQuote,
  LargeQuote,
  SectionHeader,
  Collapsible,
  NotesLink,
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      options={{
        ...props.options,
        parseFrontmatter: true,
        blockJS: false,
        blockDangerousJS: false,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
      }}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
