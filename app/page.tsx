import fs from 'fs'
import path from 'path'
import HomeBio from './home-bio'

type HomeContent = {
  title: string
  emoji?: string
  image?: string
  imageAlt?: string
  paragraphs: string[]
}

function parseHomeContent(): HomeContent {
  const filePath = path.join(process.cwd(), 'app', 'content.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')

  const frontmatterMatch = /^---\s*([\s\S]*?)\s*---/.exec(raw)
  const meta: Record<string, string> = {}
  if (frontmatterMatch) {
    frontmatterMatch[1].split('\n').forEach((line) => {
      const [key, ...valueArr] = line.split(': ')
      if (valueArr.length === 0) return
      meta[key.trim()] = valueArr.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    })
  }

  const body = raw.replace(/^---[\s\S]*?---/, '').trim()
  // Blank lines separate paragraphs
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)

  return {
    title: meta.title ?? '',
    emoji: meta.emoji || undefined,
    image: meta.image || undefined,
    imageAlt: meta.imageAlt || undefined,
    paragraphs,
  }
}

export default function Page() {
  const { title, emoji, image, imageAlt, paragraphs } = parseHomeContent()

  return (
    <HomeBio
      title={title}
      emoji={emoji}
      image={image}
      imageAlt={imageAlt}
      paragraphs={paragraphs}
    />
  )
}
