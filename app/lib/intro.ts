import fs from 'fs'
import path from 'path'

type Intro = {
  image: string
  imageAlt: string
  /** the mdx body, frontmatter stripped */
  content: string
}

const DEFAULTS = { image: '/carolyn-wang.jpg', imageAlt: 'carolyn wang' }

/** Reads app/intro.mdx — the editable homepage intro. */
export function getIntro(): Intro {
  const raw = fs.readFileSync(path.join(process.cwd(), 'app', 'intro.mdx'), 'utf-8')

  const frontmatter = /^---\s*([\s\S]*?)\s*---/.exec(raw)
  const meta: Record<string, string> = {}

  if (frontmatter) {
    for (const line of frontmatter[1].split('\n')) {
      const [key, ...rest] = line.split(': ')
      if (rest.length === 0) continue
      meta[key.trim()] = rest.join(': ').trim().replace(/^['"](.*)['"]$/, '$1')
    }
  }

  return {
    image: meta.image || DEFAULTS.image,
    imageAlt: meta.imageAlt || DEFAULTS.imageAlt,
    content: raw.replace(/^---[\s\S]*?---/, '').trim(),
  }
}
