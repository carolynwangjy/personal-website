import fs from 'fs'
import path from 'path'
import { parseFrontmatter } from './frontmatter'

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
  const { meta, body } = parseFrontmatter(raw)

  return {
    image: meta.image || DEFAULTS.image,
    imageAlt: meta.imageAlt || DEFAULTS.imageAlt,
    content: body,
  }
}
